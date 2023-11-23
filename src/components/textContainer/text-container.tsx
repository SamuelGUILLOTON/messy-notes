import styles from './text-container-style.module.css'

export const TextContainer = () => {
  return (
    <div  className={styles.textContainer}>
      <textarea
        rows="5" 
        cols="33"
        placeholder="Enter your messy note"
        className={styles.textArea}
        value={newItem.note}
      />
    </div>
  );
}

