import Image from 'next/image'
import styles from '../styles/AddUser.module.css'


export default function AddUserPage() {
    return (
        <div className={styles.container}>
            <div className={styles.topBlock}>
                <div>
                    <p>Klant gegevens</p>
                </div>
            </div>
            <div className={styles.block}>
                    <form action='' method='post'>
                        <div className={styles.inputHeader}>
                            Besteller
                        </div>
                        <div className={styles.formRow}>
                            <label className={styles.inputLabel}>
                                Naam opdrachtgever (optioneel)
                                <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                            </label>
                            <label className={styles.inputLabel}>
                                Naam Contactpersoon
                                <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                            </label>
                            <label className={styles.inputLabel}>
                                Achternaam Contactpersoon
                                <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                            </label>
                        </div>
                        <div className={styles.formRow}>
                            <label className={styles.inputLabel}>
                                Naam ontvanger
                                <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                            </label>
                        </div>

                        <button className={styles.button} type="submit">Plaats Bestelling</button>
                    </form>
                </div>
        </div>
    )
}


