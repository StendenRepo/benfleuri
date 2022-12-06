import Image from 'next/image'
import styles from '../styles/EditCustomer.module.css'

export default function EditCustomerPage() {
    return (
        <div className={styles.container}>
            <div className={styles.topBlock}>
                <div>
                    <p>Klantgegevens</p>
                </div>
            </div>
            <div className={styles.block}>
            <form action='' method='post' className={styles.blockForm}>
                <div className={styles.formInputs}></div>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>
                            Naam opdrachtgever (optioneel)
                            <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                        </label>
                        <label className={styles.inputLabel}>
                            Naam
                            <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                        </label>
                        <label className={styles.inputLabel}>
                            Achternaam
                            <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                        </label>
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.inputLabel}>
                            Straatnaam
                            <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                        </label>
                        <label className={ `${styles.inputLabel} ${styles.inputLabelRightAlign}` }>
                            Nummer
                            <input name="client-name" className={ `${styles.inputNumber} ${styles.inputField}` } type="text" />
                        </label>
                        <label className={ `${styles.inputLabel} ${styles.inputLabelRightAlign}` }>
                            Postcode
                            <input name="client-name" className={ `${styles.inputPostal} ${styles.inputField}` } type="text" />
                        </label>
                    </div>
                <div className={styles.formRow}>
                    <label className={ `${styles.inputLabel} ${styles.inputLabelFullWidth}` }>
                        Plaats
                        <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                    </label>
                </div>
                <div className={styles.formRow}>
                    <label className={ `${styles.inputLabel} ${styles.inputLabelFullWidth}` }>
                        Telefoon Nr
                        <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="tel" />
                    </label>
                </div>
                <div className={styles.formRow}>
                    <label className={ `${styles.inputLabel} ${styles.inputLabelFullWidth}` }>
                        Email
                        <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="email" />
                    </label>
                </div>

                <div className={styles.formButtons}>
                    <button className={styles.submitButton} type="submit">Plaats Bestelling</button>
                    <button className={styles.cancelButton} type="submit">Annuleren</button>
                </div>
            </form>
            </div>
        </div>
    )
}


