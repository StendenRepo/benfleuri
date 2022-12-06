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
                        <label className={ `${styles.inputLabel} ${styles.inputLabelFullWidth}` }>
                            Naam opdrachtgever (optioneel)
                            <input name="client-name" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                        </label>
                    </div>
                <div className={styles.formRow}>
                    <label className={ `${styles.inputLabel} ${styles.inputLabelHalfWidth}` }>
                        Naam
                        <input name="customer-firstname" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                    </label>
                    <label className={ `${styles.inputLabel} ${styles.inputLabelHalfWidth}` }>
                        Achternaam
                        <input name="customer-lastname" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                    </label>
                </div>
                    <div className={styles.formRow}>
                        <label className={ `${styles.inputLabel} ${styles.inputLabelHalfWidth}` }>
                            Straatnaam
                            <input name="address" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                        </label>
                        <label className={ `${styles.inputLabel} ${styles.inputNumber}` }>
                            Nummer
                            <input name="house-number" className={ `${styles.inputField}` } type="text" />
                        </label>
                        <label className={ `${styles.inputLabel} ${styles.inputPostal}` }>
                            Postcode
                            <input name="postal_code" className={ `${styles.inputField}` } type="text" />
                        </label>
                    </div>
                <div className={styles.formRow}>
                    <label className={ `${styles.inputLabel} ${styles.inputLabelFullWidth}` }>
                        Plaats
                        <input name="residence" className={ `${styles.inputName} ${styles.inputField}` } type="text" />
                    </label>
                </div>
                <div className={styles.formRow}>
                    <label className={ `${styles.inputLabel} ${styles.inputLabelFullWidth}` }>
                        Telefoon Nr
                        <input name="phone" className={ `${styles.inputName} ${styles.inputField}` } type="tel" />
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


