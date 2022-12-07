import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/addOrder.module.css';

export default function AddOrder() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.goBack}>
          <p>
            <a href="#">Dashboard</a>
          </p>
        </div>
        <div className={styles.title}>
          <h1 className={styles.h1}>Bestelling 1</h1>
          <button
            className={styles.exportButton}
            type="button"
          >
            Exporteer bestellingen
          </button>
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.cardHeader}>
          <p className={styles.cardTitle}>Bestelling gegevens</p>
        </div>
        <div className={styles.orderData}>
          <div className={styles.section}>
            <h3>Besteller</h3>
            <form
              action=""
              method="POST"
            >
              <div className={styles.formRow}>
                <div className={styles.labelInput}>
                  <label
                    className={styles.label}
                    for="naamOpdrachtgever"
                  >
                    Naam opdrachtgever
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="naamOpdrachtgever"
                    id="naamOpdrachtgever"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInput}>
                  <label
                    className={styles.label}
                    for="naamContactpersoon"
                  >
                    Naam contactpersoon
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="naamContactpersoon"
                    id="naamContactpersoon"
                  />
                </div>
                <div className={styles.labelInput}>
                  <label
                    className={styles.label}
                    for="naamContactpersoon"
                  >
                    Achternaam
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="naamContactpersoon"
                    id="naamContactpersoon"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInputMedium}>
                  <label
                    className={styles.label}
                    for="straatnaam"
                  >
                    Straatnaam
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="straatnaam"
                    id="straatnaam"
                  />
                </div>
                <div className={styles.labelInputShort}>
                  <label
                    className={styles.label}
                    for="nummer"
                  >
                    Nummer
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="nummer"
                    id="nummer"
                  />
                </div>
                <div className={styles.labelInputShort}>
                  <label
                    className={styles.label}
                    for="postcode"
                  >
                    Postcode
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="postcode"
                    id="postcode"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInputLong}>
                  <label
                    className={styles.label}
                    for="plaatsnaam"
                  >
                    Plaatsnaam
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="plaatsnaam"
                    id="plaatsnaam"
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInputLong}>
                  <label
                    className={styles.label}
                    for="telefoonnummer"
                  >
                    Telefoonnummer
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="telefoonnummer"
                    id="telefoonnummer"
                  />
                </div>
              </div>
              <div className={styles.formRowRadio}>
                <label className={styles.label}>Bezorgkosten</label>
                <div className={styles.radio}>
                  <input
                    className={styles.inputRadio}
                    type="radio"
                    name="bezorgkosten"
                    id="ja"
                    value="ja"
                  />
                  <label
                    className={styles.label}
                    for="ja"
                  >
                    ja
                  </label>
                  <input
                    className={styles.inputRadio}
                    type="radio"
                    name="bezorgkosten"
                    id="nee"
                    value="nee"
                  />
                  <label
                    className={styles.label}
                    for="nee"
                  >
                    nee
                  </label>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInput}>
                  <label
                    className={styles.label}
                    for="datumBezorging"
                  >
                    Datum van bezorging
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    name="datumBezorging"
                    id="datumBezorging"
                  ></input>
                </div>
                <div className={styles.labelInput}>
                  <label
                    className={styles.label}
                    for="verzending"
                  >
                    Type verzending
                  </label>
                  <select
                    className={styles.dropdown}
                    name="verzending"
                    id="verzending"
                  >
                    <option value="bezorging">Bezorging</option>
                    <option value="afhalen">Afhalen</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className={styles.section}>
            <h3>Ontvanger</h3>
            <form
              action=""
              method="POST"
            >
              <div className={styles.formRow}>
                <div className={styles.labelInput}>
                  <label
                    className={styles.label}
                    for="naamOpdrachtgever"
                  >
                    Naam opdrachtgever
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="naamOpdrachtgever"
                    id="naamOpdrachtgever"
                  ></input>
                </div>
                <div className={styles.labelInput}>
                  <label
                    className={styles.label}
                    for="naamContactpersoon"
                  >
                    Naam contactpersoon
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="naamContactpersoon"
                    id="naamContactpersoon"
                  ></input>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInputMedium}>
                  <label
                    className={styles.label}
                    for="straatnaam"
                  >
                    Straatnaam
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="straatnaam"
                    id="straatnaam"
                  ></input>
                </div>
                <div className={styles.labelInputShort}>
                  <label
                    className={styles.label}
                    for="nummer"
                  >
                    Nummer
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="nummer"
                    id="nummer"
                  ></input>
                </div>
                <div className={styles.labelInputShort}>
                  <label
                    className={styles.label}
                    for="postcode"
                  >
                    Postcode
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="postcode"
                    id="postcode"
                  ></input>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInputLong}>
                  <label
                    className={styles.label}
                    for="plaatsnaam"
                  >
                    Plaatsnaam
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="plaatsnaam"
                    id="plaatsnaam"
                  ></input>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInputLong}>
                  <label
                    className={styles.label}
                    for="telefoonnummer"
                  >
                    Telefoonnummer
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="telefoonnummer"
                    id="telefoonnummer"
                  ></input>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInputShort}>
                  <label
                    className={styles.label}
                    for="prijs"
                  >
                    Prijs bestelling
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="prijs"
                    id="prijs"
                  ></input>
                </div>
                <div className={styles.labelInputShort}>
                  <label
                    className={styles.label}
                    for="prijsTotaal"
                  >
                    Prijs totaal
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="prijsTotaal"
                    id="prijsTotaal"
                  ></input>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className={styles.orderData}>
          <div className={styles.section}>
            <h3>Product</h3>
            <div className={styles.labelInputLong}>
              <label
                className={styles.label}
                for="omschrijvingBestelling"
              >
                Omschrijving bestelling
              </label>
              <textarea
                className={styles.textarea}
                type="text"
                name="omschrijvingBestelling"
                id="omschrijvingBestelling"
              ></textarea>
            </div>
            <div className={styles.labelInputLong}>
              <label
                className={styles.label}
                for="tekstKaartje"
              >
                Optionele tekst voor op het kaartje
              </label>
              <textarea
                className={styles.textarea}
                type="text"
                name="tekstKaartje"
                id="tekstKaartje"
              ></textarea>
            </div>
            <div className={styles.labelInputLong}>
              <label
                className={styles.label}
                for="bijzonderheden"
              >
                Bijzonderheden
              </label>
              <textarea
                className={styles.textarea}
                type="text"
                name="bijzonderheden"
                id="bijzonderheden"
              ></textarea>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.kaartSection}>
              <div className={styles.formRowRadioExtra}>
                <input
                  className={styles.inputRadio}
                  type="radio"
                  name="bezorgkosten"
                  id="gratis"
                  value="Gratis kaartje"
                />
                <label
                  className={styles.label}
                  for="gratis"
                >
                  Gratis Kaartje
                </label>
                <input
                  className={styles.inputRadio}
                  type="radio"
                  name="bezorgkosten"
                  id="wenslintje"
                  value="Speciaal wenslintje"
                />
                <label
                  className={styles.label}
                  for="nee"
                >
                  Speciaal wenslintje
                </label>
              </div>
              <div className={styles.formRowRadioExtra}>
                <input
                  className={styles.inputRadio}
                  type="radio"
                  name="bezorgkosten"
                  id="geen"
                  value="Geen kaartje"
                />
                <label
                  className={styles.label}
                  for="geen"
                >
                  Geen kaartje
                </label>
                <input
                  className={styles.inputRadio}
                  type="radio"
                  name="bezorgkosten"
                  id="wenslintje"
                  value="Speciaal wenslintje"
                />
                <label
                  className={styles.label}
                  for="wenslintje"
                >
                  Speciaal wenskaartje
                </label>
              </div>
              <div className={styles.formRow}>
                <div className={styles.labelInputDropdown}>
                  <label for="aangenomen">Aangenomen door:</label>
                  <select className={styles.dropdown}>
                    <option value="Bernhardus Annen">Bernhardus Annen</option>
                    <option value="Medewerker1">Medewerker1</option>
                    <option value="Medewerker2">Medewerker2</option>
                  </select>
                </div>
              </div>
              <div className={styles.annuleerSection}>
                <div className={styles.formRow}>
                  <button className={styles.buttonAnnuleren}>Annuleren</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
