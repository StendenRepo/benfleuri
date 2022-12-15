import Image from 'next/image';
import MainLayout from '../layout/MainLayout';
import styles from '../styles/viewOrder.module.css';

export default function viewOrder() {
  return (
    <MainLayout>
      {/* <div className={styles.container}> */}
      <div
        className={`font-['Roboto'] ml-[5%] mt-[2%] border-b-gray-400 border-b-[1px] w-[90%]`}
      >
        <div
          className={`flex font-['Roboto'] ml-[2%] mb-[1%] w-[150px] justify-between`}
        >
          <svg
            width="12"
            height="15"
            viewBox="0 0 12 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.4729 2.80625L9.41663 0.75L0.666626 9.5L9.41663 18.25L11.4729 16.1938L4.79371 9.5L11.4729 2.80625Z"
              fill="black"
              fill-opacity="0.87"
            />
          </svg>
          <a
            className={`mr-[50px]`}
            href={'#'}
          >
            Dashboard
          </a>
        </div>
        <div className={`flex justify-between w-12/12 mb-3`}>
          <div className={`font-['Roboto'] text-2xl font-bold`}>
            Bestelling 1
          </div>
          <button
            className={`text-sm border-[1px] border-black rounded py-[8px] px-[20px] 
                  font-['Roboto'] bg-white text-black cursor-pointer`}
            type="button"
          >
            Exporteer bestellingen
          </button>
        </div>
      </div>
      <div className={`flex mt-10 w-5/6 ml-[8%] flex-col`}>
        <div className={` bg-[#DEF2E6] h-10 w-[100%] rounded-t-2xl`}>
          <p className={`ml-5 mt-2`}>Bestelling gegevens</p>
        </div>
        <div className={` w-[100%]`}>
          {/*content card*/}
          <div
            className={`w-[100%] mt-10 flex flex-col sm:flex-row justify-between`}
          >
            {/*First row section card*/}
            <div className={`border-[1px]flex-col w-[45%] ml-[2%]`}>
              {/*Besteller section*/}
              <div className={`font-['Roboto'] text-1xl font-bold`}>
                Besteller
              </div>
              <form
                className={`mt-1`}
                method="POST"
                action=""
              >
                <div className={`flex flex-col`}>
                  <label for="opdrachtgever">Naam opdrachtgever</label>
                  <input
                    className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                    type="text"
                    name="opdrachtgever"
                    id="opdrachtgever"
                  ></input>
                </div>
                <div
                  className={`flex flex-col lg:flex-row justify-between mt-[3%] `}
                >
                  <div className={`flex flex-col`}>
                    <label
                      className={'w-[210px]'}
                      for="voornaamContactPersoon"
                    >
                      Voornaam contactpersoon
                    </label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="voornaamContactPersoon"
                      id="voornaamContactPersoon"
                    ></input>
                  </div>
                  <div className={`flex flex-col`}>
                    <label
                      className={'w-[210px]'}
                      for="achternaamContactPersoon"
                    >
                      Achternaam contactpersoon
                    </label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="achternaamContactPersoon"
                      id="achternaamContactPersoon"
                    ></input>
                  </div>
                </div>
                <div
                  className={`flex flex-col lg:flex-row justify-between mt-[3%]`}
                >
                  <div className={`flex flex-col`}>
                    <label for="straatnaam">Straatnaam</label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="straatnaam"
                      id="straatnaam"
                    ></input>
                  </div>
                  <div className={`flex w-[100%] lg:w-[48%] justify-between`}>
                    <div className={`flex flex-col`}>
                      <label for="nummer">Nummer</label>
                      <input
                        className={`border-[1px] border-gray-500 h-[25px] w-[95%]`}
                        type="text"
                        name="nummer"
                        id="nummer"
                      ></input>
                    </div>
                    <div className={`flex flex-col`}>
                      <label for="postcode">Postcode</label>
                      <input
                        className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                        type="text"
                        name="postcode"
                        id="postcode"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col  mt-[3%]`}>
                  <label for="plaats">Plaats</label>
                  <input
                    className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                    type="text"
                    name="plaats"
                    id="plaats"
                  ></input>
                </div>
                <div className={`flex flex-col  mt-[3%]`}>
                  <label className={`mt-[3%]`}>Bezorgkosten</label>
                  <div className={`flex w-[30%] justify-between lg:w-[20%]`}>
                    <div className={`flex justify-between`}>
                      <input
                        className={`accent-[#009A42]`}
                        type="radio"
                        name="bezorgkosten"
                        id="ja"
                        value="ja"
                      ></input>
                      <label
                        className={`ml-1`}
                        for="ja"
                      >
                        ja
                      </label>
                    </div>
                    <div className={`flex justify-between sm:ml[0px] ml-[5%]`}>
                      <input
                        className={`accent-[#009A42]`}
                        type="radio"
                        name="bezorgkosten"
                        id="nee"
                        value="nee"
                      ></input>
                      <label
                        className={`ml-1`}
                        for="nee"
                      >
                        Nee
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className={`flex flex-col lg:flex-row justify-between mt-[3%]`}
                >
                  <div className={`flex flex-col w-[100%]`}>
                    <label
                      className={`w-[200px]`}
                      for="datumBezorging"
                    >
                      Datum van bezorging
                    </label>
                    <input
                      className={`border-[1px] border-gray-500 h-6 w-[100%] lg:w-[200px]`}
                      type="date"
                      name="datumBezorging"
                      id="datumBezorging"
                    ></input>
                  </div>
                  <div className={`flex flex-col`}>
                    <label>Verzending</label>
                    <select className={`border-[1px] border-gray-500`}>
                      <option value="Bernhardus Annen">Bernhardus Annen</option>
                      <option value="Medewerker1">Medewerker 1</option>
                      <option value="Medewerker2">Medewerker 2</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div
              className={` sm:mt-[0px] mt-[10%] sm:ml-[0px] ml-[2%] border-[1px] flex-col w-[45%] mr-[2%]`}
            >
              <div className={`font-['Roboto'] text-1xl font-bold`}>
                Ontvanger
              </div>
              <form
                className={`mt-1`}
                method="POST"
                action=""
              >
                <div className={`flex flex-col lg:flex-row justify-between`}>
                  <div className={`flex flex-col`}>
                    <label
                      className={'w-[150px]'}
                      for="opdrachtgever"
                    >
                      Naam ontvanger
                    </label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="opdrachtgever"
                      id="opdrachtgever"
                    ></input>
                  </div>
                  <div className={`flex flex-col`}>
                    <label for="opdrachtgever">Achternaam</label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="opdrachtgever"
                      id="opdrachtgever"
                    ></input>
                  </div>
                </div>
                <div
                  className={`flex flex-col lg:flex-row justify-between mt-[3%]`}
                >
                  <div className={`flex flex-col`}>
                    <label for="straatnaam">Straatnaam</label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="straatnaam"
                      id="straatnaam"
                    ></input>
                  </div>
                  <div className={`flex w-[100%] lg:w-[45%] justify-between`}>
                    <div className={`flex flex-col`}>
                      <label for="nummer">Nummer</label>
                      <input
                        className={`border-[1px] border-gray-500 h-[25px] w-[95%]`}
                        type="text"
                        name="nummer"
                        id="nummer"
                      ></input>
                    </div>
                    <div className={`flex flex-col`}>
                      <label for="postcode">Postcode</label>
                      <input
                        className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                        type="text"
                        name="postcode"
                        id="postcode"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col  mt-[3%]`}>
                  <label for="plaats">Plaats</label>
                  <input
                    className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                    type="text"
                    name="plaats"
                    id="plaats"
                  ></input>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between mt-[3%]`}
                >
                  <div className={`flex flex-col`}>
                    <label
                      className={'w-[122px]'}
                      for="prijsBestelling"
                    >
                      Prijs bestelling
                    </label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] sm:w-[50%] w-[100%]`}
                      type="text"
                      name="prijsBestelling"
                      id="prijsBestelling"
                    ></input>
                  </div>
                  <div className={`flex flex-col`}>
                    <label
                      className={'w-[130px]'}
                      for="prijsTotaal"
                    >
                      Prijs totaal
                    </label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] sm:w-[50%] w-[100%]`}
                      type="text"
                      name="prijsTotaal"
                      id="prijsTotaal"
                    ></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className={`w-[100%] mt-20 flex flex-col sm:flex-row justify-between border-t-gray-400 border-t-[1px]`}
          >
            <div className={`border-[1px]flex-col w-[45%] ml-[2%] mt-[50px]`}>
              <div className={`font-['Roboto'] text-1xl font-bold`}>
                Product
              </div>
              <form>
                <div className={`flex flex-col`}>
                  <label
                    className={`mt-3`}
                    for="omschrijvingBestelling"
                  >
                    Omschrijving bestelling
                  </label>
                  <textarea
                    className={`border-[1px] border-gray-500 h-[80px] resize-none`}
                    type="text"
                    name="omschrijvingBestelling"
                    id="omschrijvingBestelling"
                  ></textarea>
                </div>
                <div className={`flex flex-col`}>
                  <label
                    className={`mt-3 w-[100%]`}
                    for="tekstKaartje"
                  >
                    Optioneel tekst voor op het kaartje
                  </label>
                  <textarea
                    className={`border-[1px] border-gray-500 h-[80px] resize-none`}
                    type="text"
                    name="tekstKaartje"
                    id="tekstKaartje"
                  ></textarea>
                </div>
                <div className={`flex flex-col`}>
                  <label
                    className={`mt-3`}
                    for="bijzonderheden"
                  >
                    Bijzonderheden
                  </label>
                  <textarea
                    className={`border-[1px] border-gray-500 h-[80px] resize-none`}
                    type="text"
                    name="bijzonderheden"
                    id="bijzonderheden"
                  ></textarea>
                </div>
              </form>
              <button
                className={`rounded bg-[#EA0101] text-white px-2.5 py-0.5 mt-7`}
              >
                Order verwijderen
              </button>
            </div>
            <div className={`border-[1px]flex-col w-[45%] mr-[2%] mt-[50px]`}>
              <div className={`font-['Roboto'] text-1xl font-bold`}>
                Afhandeling
              </div>
              <form
                method="POST"
                action=""
              >
                <div
                  className={`flex flex-col lg:flex-row w-[80%] justify-between mt-7`}
                >
                  <label for="aangenomenDoor">Aangenomen door:</label>
                  <select
                    className={`border-[1px] border-black w-[180px] h-[30px]`}
                    name="aangenomenDoor"
                    id="aangenomenDoor"
                  >
                    <option value="Bernhardus Annen">Bernhardus Annen</option>
                    <option value="Medewerker1">Medewerker1</option>
                    <option value="Medewerker2">Medewerker2</option>
                  </select>
                </div>
                <div
                  className={`flex flex-col lg:flex-row w-[80%] justify-between mt-5`}
                >
                  <label for="behandelingDoor">In behandeling door:</label>
                  <select
                    className={`border-[1px] border-black w-[180px] h-[30px]`}
                    name="behandelingDoor"
                    id="behandelingDoor"
                  >
                    <option value="Bernhardus Annen">Bernhardus Annen</option>
                    <option value="Medewerker1">Medewerker1</option>
                    <option value="Medewerker2">Medewerker2</option>
                  </select>
                </div>
              </form>
              <div
                className={`flex flex-col sm:flex-row justify-between w-[80%] mt-14`}
              >
                <button
                  className={`bg-[#FFCA3F] rounded text-white  px-2.5 py-0.5`}
                >
                  Markeren als verzonden
                </button>
                <button
                  className={`bg-[#EF790C] rounded text-white  px-2.5 py-0.5`}
                >
                  Geleverd maar niet thuis
                </button>
              </div>
              <div className={`mt-5`}>
                <button
                  className={`bg-[#00A952] rounded text-white  px-2.5 py-0.5`}
                >
                  Markeren als voltooid
                </button>
              </div>
              <div
                className={`flex flex-col w-[40%] mt-11 h-[75px] justify-between`}
              >
                <button
                  className={`bg-[#5DA4E4] rounded text-white  px-2.5 py-0.5`}
                >
                  Tekst kaartje uitprinten
                </button>
                <button
                  className={`bg-[#5DA4E4] rounded text-white  px-2.5 py-0.5`}
                >
                  Adres uitprinten
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>

    // {/* <div className={styles.formCard}>
    //     <div className={styles.cardHeader}>
    //       <p className={styles.cardTitle}>Bestelling gegevens</p>
    //     </div>
    //     <div className={styles.orderData}>
    //       <div className={styles.section}>
    //         <h3>Besteller</h3>
    //         <form
    //           action=""
    //           method="POST"
    //         >
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInput}>
    //               <label
    //                 className={styles.label}
    //                 for="naamOpdrachtgever"
    //               >
    //                 Naam opdrachtgever
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="naamOpdrachtgever"
    //                 id="naamOpdrachtgever"
    //               />
    //             </div>
    //           </div>
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInput}>
    //               <label
    //                 className={styles.label}
    //                 for="naamContactpersoon"
    //               >
    //                 Naam contactpersoon
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="naamContactpersoon"
    //                 id="naamContactpersoon"
    //               />
    //             </div>
    //             <div className={styles.labelInput}>
    //               <label
    //                 className={styles.label}
    //                 for="naamContactpersoon"
    //               >
    //                 Achternaam
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="naamContactpersoon"
    //                 id="naamContactpersoon"
    //               />
    //             </div>
    //           </div>
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInputMedium}>
    //               <label
    //                 className={styles.label}
    //                 for="straatnaam"
    //               >
    //                 Straatnaam
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="straatnaam"
    //                 id="straatnaam"
    //               />
    //             </div>
    //             <div className={styles.labelInputShort}>
    //               <label
    //                 className={styles.label}
    //                 for="nummer"
    //               >
    //                 Nummer
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="nummer"
    //                 id="nummer"
    //               />
    //             </div>
    //             <div className={styles.labelInputShort}>
    //               <label
    //                 className={styles.label}
    //                 for="postcode"
    //               >
    //                 Postcode
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="postcode"
    //                 id="postcode"
    //               />
    //             </div>
    //           </div>
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInputLong}>
    //               <label
    //                 className={styles.label}
    //                 for="plaatsnaam"
    //               >
    //                 Plaatsnaam
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="plaatsnaam"
    //                 id="plaatsnaam"
    //               />
    //             </div>
    //           </div>
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInputLong}>
    //               <label
    //                 className={styles.label}
    //                 for="telefoonnummer"
    //               >
    //                 Telefoonnummer
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="telefoonnummer"
    //                 id="telefoonnummer"
    //               />
    //             </div>
    //           </div>
    //           <div className={styles.formRowRadio}>
    //             <label className={styles.label}>Bezorgkosten</label>
    //             <div className={styles.radio}>
    //               <input
    //                 className={styles.inputRadio}
    //                 type="radio"
    //                 name="bezorgkosten"
    //                 id="ja"
    //                 value="ja"
    //               />
    //               <label
    //                 className={styles.label}
    //                 for="ja"
    //               >
    //                 ja
    //               </label>
    //               <input
    //                 className={styles.inputRadio}
    //                 type="radio"
    //                 name="bezorgkosten"
    //                 id="nee"
    //                 value="nee"
    //               />
    //               <label
    //                 className={styles.label}
    //                 for="nee"
    //               >
    //                 nee
    //               </label>
    //             </div>
    //           </div>
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInput}>
    //               <label
    //                 className={styles.label}
    //                 for="datumBezorging"
    //               >
    //                 Datum van bezorging
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="date"
    //                 name="datumBezorging"
    //                 id="datumBezorging"
    //               ></input>
    //             </div>
    //             <div className={styles.labelInput}>
    //               <label
    //                 className={styles.label}
    //                 for="verzending"
    //               >
    //                 Type verzending
    //               </label>
    //               <select
    //                 className={styles.dropdown}
    //                 name="verzending"
    //                 id="verzending"
    //               >
    //                 <option value="bezorging">Bezorging</option>
    //                 <option value="afhalen">Afhalen</option>
    //               </select>
    //             </div>
    //           </div>
    //         </form>
    //       </div>

    //       <div className={styles.section}>
    //         <h3>Ontvanger</h3>
    //         <form
    //           action=""
    //           method="POST"
    //         >
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInput}>
    //               <label
    //                 className={styles.label}
    //                 for="naamOpdrachtgever"
    //               >
    //                 Naam opdrachtgever
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="naamOpdrachtgever"
    //                 id="naamOpdrachtgever"
    //               ></input>
    //             </div>
    //             <div className={styles.labelInput}>
    //               <label
    //                 className={styles.label}
    //                 for="naamContactpersoon"
    //               >
    //                 Naam contactpersoon
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="naamContactpersoon"
    //                 id="naamContactpersoon"
    //               ></input>
    //             </div>
    //           </div>
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInputMedium}>
    //               <label
    //                 className={styles.label}
    //                 for="straatnaam"
    //               >
    //                 Straatnaam
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="straatnaam"
    //                 id="straatnaam"
    //               ></input>
    //             </div>
    //             <div className={styles.labelInputShort}>
    //               <label
    //                 className={styles.label}
    //                 for="nummer"
    //               >
    //                 Nummer
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="nummer"
    //                 id="nummer"
    //               ></input>
    //             </div>
    //             <div className={styles.labelInputShort}>
    //               <label
    //                 className={styles.label}
    //                 for="postcode"
    //               >
    //                 Postcode
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="postcode"
    //                 id="postcode"
    //               ></input>
    //             </div>
    //           </div>
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInputLong}>
    //               <label
    //                 className={styles.label}
    //                 for="plaatsnaam"
    //               >
    //                 Plaatsnaam
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="plaatsnaam"
    //                 id="plaatsnaam"
    //               ></input>
    //             </div>
    //           </div>
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInputLong}>
    //               <label
    //                 className={styles.label}
    //                 for="telefoonnummer"
    //               >
    //                 Telefoonnummer
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="telefoonnummer"
    //                 id="telefoonnummer"
    //               ></input>
    //             </div>
    //           </div>
    //           <div className={styles.formRow}>
    //             <div className={styles.labelInputShort}>
    //               <label
    //                 className={styles.label}
    //                 for="prijs"
    //               >
    //                 Prijs bestelling
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="prijs"
    //                 id="prijs"
    //               ></input>
    //             </div>
    //             <div className={styles.labelInputShort}>
    //               <label
    //                 className={styles.label}
    //                 for="prijsTotaal"
    //               >
    //                 Prijs totaal
    //               </label>
    //               <input
    //                 className={styles.input}
    //                 type="text"
    //                 name="prijsTotaal"
    //                 id="prijsTotaal"
    //               ></input>
    //             </div>
    //           </div>
    //         </form>
    //         <button className={styles.buttonWijzigen}>Order wijzigen</button>
    //       </div>
    //     </div>

    //     <div className={styles.orderData}>
    //       <div className={styles.section}>
    //         <h3>Product</h3>
    //         <div className={styles.labelInputLong}>
    //           <label
    //             className={styles.label}
    //             for="omschrijvingBestelling"
    //           >
    //             Omschrijving bestelling
    //           </label>
    //           <textarea
    //             className={styles.textarea}
    //             type="text"
    //             name="omschrijvingBestelling"
    //             id="omschrijvingBestelling"
    //           ></textarea>
    //         </div>
    //         <div className={styles.labelInputLong}>
    //           <label
    //             className={styles.label}
    //             for="tekstKaartje"
    //           >
    //             Optionele tekst voor op het kaartje
    //           </label>
    //           <textarea
    //             className={styles.textarea}
    //             type="text"
    //             name="tekstKaartje"
    //             id="tekstKaartje"
    //           ></textarea>
    //         </div>
    //         <div className={styles.labelInputLong}>
    //           <label
    //             className={styles.label}
    //             for="bijzonderheden"
    //           >
    //             Bijzonderheden
    //           </label>
    //           <textarea
    //             className={styles.textarea}
    //             type="text"
    //             name="bijzonderheden"
    //             id="bijzonderheden"
    //           ></textarea>
    //         </div>
    //         <button className={styles.buttonVerwijderOrder}>
    //           Order verwijderen
    //         </button>
    //       </div>

    //       <div className={styles.section}>
    //         <h3>Afhandeling</h3>
    //         <div className={styles.formRowSmall}>
    //           <label
    //             className={styles.label}
    //             for="aangenomen"
    //           >
    //             Aangenomen door:
    //           </label>
    //           <select
    //             className={styles.dropdown}
    //             name="aangenomen"
    //             id="aangenomen"
    //           >
    //             <option value="bernhardus">Bernhardus Annen</option>
    //             <option value="medewerker1">Medewerker1</option>
    //             <option value="medewerker2">Medewerker2</option>
    //           </select>
    //         </div>
    //         <div className={styles.formRowSmall}>
    //           <label
    //             className={styles.label}
    //             for="behandeling"
    //           >
    //             In behandeling door:
    //           </label>
    //           <select
    //             className={styles.dropdown}
    //             name="behandeling"
    //             id="behandeling"
    //           >
    //             <option value="bernhardus">Bernhardus Annen</option>
    //             <option value="medewerker1">Medewerker1</option>
    //             <option value="medewerker2">Medewerker2</option>
    //           </select>
    //         </div>
    //         <div className={styles.formRowSmall}>
    //           <label className={styles.label}>Status bestelling:</label>
    //         </div>
    //         <div className={styles.changeStatusButtons}>
    //           <div className={styles.formRowSmall}>
    //             <button className={styles.buttonVerzonden}>
    //               Markeren als verzonden
    //             </button>
    //             <button className={styles.buttonNietThuis}>
    //               Geleverd maar niet thuis
    //             </button>
    //           </div>
    //           <div className={styles.formRowSmall}>
    //             <button className={styles.buttonVoltooid}>
    //               Markeren als voltooid
    //             </button>
    //           </div>
    //         </div>
    //         <div className={styles.printRow}>
    //           <button className={styles.buttonPrinten}>
    //             Tekst kaartje uitprinten
    //           </button>
    //           <button className={styles.buttonPrinten}>
    //             Adres uitprinten
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div> */}
  );
}