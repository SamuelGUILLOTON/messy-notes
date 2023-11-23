'use client';

import { useState, useEffect } from 'react'
import styles from '../src/components/textContainer/text-container-style.module.css'
import { collection, addDoc, getDoc, onSnapshot, QuerySnapshot, query, deleteDoc, doc, updateDoc, where } from 'firebase/firestore'
import { db }  from './firebase'
import stylesButtonSave from '../src/components/saveButton/save-button-style.module.css'
import stylesList from '../src/components/noteList/note-list-style.module.css'
import stylesDelete from '../src/components/deleteButton/delete-button-style.module.css'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import styleHome from './home.module.css'
import { signOut } from "next-auth/react"
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {

//userSession variable
const router = useRouter()

const [Onesession, setOneSession] = useState('');

const [OneNoteId, setNoteId] = useState('');

const [items, setItem] = useState([]);

const [oneError, setError] = useState('');

const [newItem, setNewItem] = useState({note: '' });

const [oneNote, setOneNote] = useState([]);

const  { data: session, status } = useSession({
  required: true,
  onUnauthenticated() {
    router.push('/signin')
  } 
})

useEffect(() => {
  if (status === 'authenticated' && session?.user) {
    console.log(session.user.email);
    setOneSession(session.user.email);
  }
}, [session, status]);

  //add items to ddb
const addNote = async (e: React.FormEvent<HTMLInputElement>) => {
  e.preventDefault()

  if ( newItem.note === '' ) {
    setError('Veuillez écrire votre note')
  }

  if (OneNoteId === '' && newItem.note !== '') {
    setError('');
    console.log(newItem.note)
    await addDoc(collection(db, 'items'), {
      note: newItem.note.trim(),
      user: Onesession
    })
    setNewItem({note: ''});
    toast.success('Note enregistrée');
  } else {
    setError('');
    console.log(OneNoteId);
    const itemRef = doc(db, "items", OneNoteId);
    await updateDoc(itemRef, {
      note: newItem.note.trim(),
      user: Onesession
    });
    toast.success('Note enregModifiée');
  }
}

//read items from ddb
useEffect(() => {
  console.log(Onesession);
  const q = query(collection(db, 'items'), where('user', '==', Onesession));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let itemsArr: any = []

    querySnapshot.forEach((doc) => {
      console.log(Onesession);
        const summary = doc.data().note.slice(0, 10);
        itemsArr.push({...doc.data(), summary: summary, id: doc.id})
    })
    setItem(itemsArr)
  })
}, [Onesession])

// Delete items from database
const deleteItem = async (id: any) => {
  setError('');
  await deleteDoc(doc(db, 'items', id));
  if (id === OneNoteId) {
    setNewItem({ note: ''});
    setNoteId('');
  }
  toast.success('Note supprimée');
};

//display item
const displayItem = async (id: any) => {
  const note = items.find((element) => element.id === id);
  setNewItem({ note: note.note});
  setNoteId(note.id);
};

//clear note
const clearNote = async (e: React.FormEvent<HTMLInputElement>) => {
  e.preventDefault()
  setError('');
  console.log(session)
  setNewItem({ note: ''});
  setNoteId('');
  toast.success('Clear');
};

  return (
    <div className={ styleHome.noteContainer  }>
        <div className={ styleHome.navbar }>
          <h3 className={ styleHome.logo }> Mess<span className={styleHome.logoSpan} >y</span> notes </h3>
          <span className={ styleHome.welcomed}> Bienvenue { Onesession }  </span>
          <button className={ styleHome.signedOut }  onClick={() => signOut({redirect: false, callbackUrl: "/signin"})}> Se déconnecter </button>
        </div>
        <div className={styleHome.main}>
          <div className={stylesList.list}>
            <ul>
              { items.map((item, id) => (
                <li key={id} className={`${stylesList.itemList}  ${item.id === OneNoteId ? stylesList.selectedItem : ''}`}> 
                  <button  onClick={() => displayItem(item.id)}>{item.summary}... </button> 
                  <button onClick={() => deleteItem(item.id)} className={ stylesList.deleteButton } >
                      
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <form className={ styleHome.formText}>
            <div  className={styles.textContainer}>
              <textarea
                rows="5" 
                cols="33"
                data-note={ OneNoteId }
                placeholder="Enter your messy note"
                id='textarea-note'
                className={styles.textArea}
                value={newItem.note}
                onChange={(e) => setNewItem({ ...newItem, note: e.target.value})}
              />
            </div>
            <p className={ styleHome.error }> { oneError } </p>
            <button
            className={stylesButtonSave.saveButton}
            onClick={addNote}>
              <span  className={stylesButtonSave.svgDownload}> </span>
            </button>
            <button 
            className={stylesDelete.deleteButton}
            onClick={clearNote} 
            >
              <span  className={stylesDelete.svgClear}> </span>
            </button>
          </form>
        </div>  
        <Toaster />    
    </div>
  )
}

Home.requireAuth = true;