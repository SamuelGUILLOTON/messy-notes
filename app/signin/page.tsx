'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styleHome from './../home.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '.././firebase';
import { signInWithEmailAndPassword,setPersistence, browserSessionPersistence  } from 'firebase/auth';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const SignIn =  async () => {
        await signIn('credentials', {email, password, redirect: false})
        .then((userCredential) => {
          console.log('Successfully signed in:', userCredential);
          if (userCredential.ok === false) {
            toast.error('Erreur de connexion');           
          }

          if (userCredential.ok === true) {
            router.push('/');
          }
          // Redirect to the home page
          
        })
  };


  return (
    <>
    <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${styleHome.signIn}`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h3 className={ styleHome.logo }>
          <span className={styleHome.logoContainer}>
            Mess<span className={styleHome.logoSpan} >y</span> note 
          </span>
        </h3>
        
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Se connecter
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Mot de passe
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={SignIn}
                disabled={!email || !password}
                className={`disabled:opacity-40 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${styleHome.bgColorDark}`}
              >
                Connexion
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm">
            Pas inscrit?{' '}
            <button onClick={() => router.push('signup')} className={`font-semibold leading-6 ${styleHome.colorDark}`}>
              S'inscrire
            </button>
          </p>
        </div>
        <Toaster />    
      </div>
    </>
  )
}