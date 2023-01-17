import Image from 'next/image'
import styles from '../styles/Login.module.css'


export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div>
        <Image
          src="/FlowerBackground.jpg"
          alt="Achtergrond met bloemen"
          layout='fill'
          className={styles.background}
        />
      </div>
      <div className={styles.block}>
        <Image
          src="/Logo.svg"
          alt="Logo van BenFleuri"
          width={175}
          height={175}
          className={styles.logo}
        />
        <div className={styles.title}>
          <p>Voer wachtwoord in</p>
        </div>
        <div className={styles.form}>
          <form action='' method='post'>
              <input className={styles.password} type="password" />
              <button className={styles.button} type="submit">Inloggen</button>
          </form>
        </div>
      </div>
    </div>
  )
}


