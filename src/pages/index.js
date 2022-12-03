import Image from 'next/image'
import styles from '../styles/viewOrder.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.goBack}>
         <p><a href="#">Dashboard</a></p>
        </div>
        <div className={styles.title}>
          <h1 className={styles.h1}>Bestelling 1</h1>
          <button className = {styles.exportButton} type="button">Exporteer bestellingen</button>
        </div>
      </div>
    </div>
  )
}