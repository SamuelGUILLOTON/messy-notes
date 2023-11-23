"use client"

import { useState } from 'react';
import styles from './note-list-style.module.css'
import { list } from 'postcss';

export const NoteList = () => {

  const [items, setItems] = useState([
    { title:' Liste course' },
    { title:' devoirs' },
    { title:' Liste course' },
    { title:' Message ' },
    { title:' TODO' }
  ]);

  return (
    <div className={styles.list}>
        <ul>
          { items.map((item, id) => (
            <li className={styles.itemList}> {item.title} </li>
          ))}
        </ul>
    </div>
  );
};

