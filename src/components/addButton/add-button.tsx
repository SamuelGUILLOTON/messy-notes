"use client"

import { useState } from 'react';
import styles from './add-button-style.module.css'
import { list } from 'postcss';

export const AddButton = () => {

  return (
    <button className={styles.addButton}>
        +
    </button>
  );
};
