import Image from 'next/image'
import styles from '../styles/viewOrder.module.css'

export default function viewOrder() {
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

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <p className={styles.cardTitle}>Bestelling gegevens</p>
        </div>


        <div className={styles.orderData}>
          <div className={styles.bestellerSection}>
            <h3>Besteller</h3>
            <form action="" method="POST">
              <div className={styles.formRow}>
                <div className={styles.labelInput}>
                  <label for="naamOpdrachtgever">Naam opdrachtgever</label>
                  <input className={styles.input} type="text" name="naamOpdrachtgever" id="naamOpdrachtgever"></input>
                </div>
                <div className={styles.labelInput}>
                  <label for="naamContactpersoon">Naam contactpersoon</label>
                  <input className={styles.input} type="text" name="naamContactpersoon" id="naamContactpersoon"></input>
                </div>
              </div>
              <div className={styles.formRow}>
                  <div className={styles.labelInput}>
                    <label for="straatnaam">Straatnaam</label>
                    <input className={styles.input} type="text" name="straatnaam" id="straatnaam"></input>
                  </div>
                  <div className={styles.labelInput}>
                    <label for="nummer">nummer</label>
                    <input className={styles.input} type="text" name="nummer" id="nummer"></input>
                  </div>
                  <div className={styles.labelInput}>
                    <label for="postcode">Postcode</label>
                    <input className={styles.input} type="text" name="postcode" id="postcode"></input>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.labelInput}>
                    <label for="plaatsnaam">plaatsnaam</label>
                    <input className={styles.input} type="text" name="plaatsnaam" id="plaatsnaam"></input>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.labelInput}>
                    <label for="telefoonnummer">Telefoonnummer</label>
                    <input className={styles.input} type="text" name="telefoonnummer" id="telefoonnummer"></input>
                  </div>
                </div>
                <div className={styles.formRowRadio}>
                  <label>Bezorgkosten</label>
                   <div className={styles.inputRadio}>
                      <input className={styles.input} type="radio" name="bezorgkosten" id="ja" value="ja"></input>
                      <label for="ja">ja</label>
                      <input className={styles.input} type="radio" name="bezorgkosten" id="nee" value="nee"></input>
                      <label for="nee">nee</label>
                   </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.labelInput}>
                    <label for="datumBezorging">datum van bezorging</label>
                    <input className={styles.input} type="date" name="datumBezorging" id="datumBezorging"></input>
                  </div>
                  <div className={styles.labelInput}>
                    <label for="verzending">Type verzending</label>
                    <select name="verzending" id="verzending">
                      <option value="bezorging">Bezorging</option>
                      <option value="afhalen">Afhalen</option>
                    </select>
                  </div>
                </div>
            </form>
          </div>

          <div className={styles.ontvangerSection}>
            <h3>Ontvanger</h3>
              <form action="" method="POST">
                <div className={styles.formRow}>
                  <div className={styles.labelInput}>
                    <label for="naamOpdrachtgever">Naam opdrachtgever</label>
                    <input className={styles.input} type="text" name="naamOpdrachtgever" id="naamOpdrachtgever"></input>
                  </div>
                  <div className={styles.labelInput}>
                    <label for="naamContactpersoon">Naam contactpersoon</label>
                    <input className={styles.input} type="text" name="naamContactpersoon" id="naamContactpersoon"></input>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.labelInput}>
                    <label for="straatnaam">Straatnaam</label>
                    <input className={styles.input} type="text" name="straatnaam" id="straatnaam"></input>
                  </div>
                  <div className={styles.labelInput}>
                    <label for="nummer">nummer</label>
                    <input className={styles.input} type="text" name="nummer" id="nummer"></input>
                  </div>
                  <div className={styles.labelInput}>
                    <label for="postcode">Postcode</label>
                    <input className={styles.input} type="text" name="postcode" id="postcode"></input>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.labelInput}>
                    <label for="plaatsnaam">plaatsnaam</label>
                    <input className={styles.input} type="text" name="plaatsnaam" id="plaatsnaam"></input>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.labelInput}>
                    <label for="telefoonnummer">Telefoonnummer</label>
                    <input className={styles.input} type="text" name="telefoonnummer" id="telefoonnummer"></input>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.labelInput}>
                    <label for="prijs">Prijs bestelling</label>
                    <input className={styles.input} type="text" name="prijs" id="prijs"></input>
                  </div>
                  <div className={styles.labelInput}>
                    <label for="prijsTotaal">Prijs totaal</label>
                    <input className={styles.input} type="text" name="prijsTotaal" id="prijsTotaal"></input>
                  </div>
                </div>
              </form>
          </div>
        </div> 
      </div>
    </div>
  )
}