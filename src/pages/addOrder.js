import MainLayout from '../layout/MainLayout';
import Link from 'next/link'
import {
  ArrowLeftIcon,
} from '@heroicons/react/20/solid';
import {
  GreenButton,
  WhiteButton,
} from '../components/OrderTable';

export default function AddOrder() {
  // const [file, setFile] = useState(null)
  const uploadToClient = (event) => {
    if(!event.target.files && !event.target.files[0]) {
      return
    }

    const file = event.target.files[0]
    if (file.type != 'application/pdf' && file.type != 'message/rfc822'){
      alert("Het is alleen mogelijk om pdf of eml bestanden te uploaden!")
      document.getElementById("file-uploader").value = null
      return
    }

    const supplierTypes = ['webbloemen', 'wybloem', 'euroflorist', 'bestelformulier', 'pimm']
    const originalFileName = file.name.toString().toLowerCase()
    if(!supplierTypes.some(supplier => originalFileName.includes(supplier))) {
      alert("De bestandsnaam moet de naam van het opdrachtgevende bedrijf bevatten")
      document.getElementById("file-uploader").value = null
      return
    }

    uploadToServer(file)
  }

  const uploadToServer = async (file) => {
    const body = new FormData();
    body.append("file", file)
    console.log(file)
    const response = await fetch("api/fileUpload", {
      method: "POST",
      body
    })
  }


  return (
    <MainLayout>
      <div
        className={`font-['Roboto'] ml-[5%] mt-[2%] border-b-gray-400 border-b-[1px] w-[90%]`}
      >
        <div
          className={`flex font-['Roboto'] ml-[1%] mb-[1%] w-[150px] justify-between`}
        >
          <Link
            className={`mr-[50px]`}
            href={'/'}
          >
            <ArrowLeftIcon
                className="h-5 w-5 pr-[2%] inline-block"
                aria-hidden="true"
            />
            Dashboard
          </Link>
        </div>
        <div className={`flex justify-between w-[100%] mb-3`}>
          <div className={`font-['Roboto'] text-2xl font-bold`}>
            Voeg order toe
          </div>
          <input type="file" 
          id="file-uploader"
          className={`file:mr-5 file:py-2 file:px-6
          file:rounded file:border
          file:text-sm file:font-medium hover:file:bg-[#DEF2E6] 
          file:bg-green file:text-black-700 border-none`}
          onChange={uploadToClient}
          >

          </input>
         
          <WhiteButton link="#">Exporteer bestellingen</WhiteButton>
        </div>
      </div>
      <div className={`flex mt-10 w-5/6 ml-[8%] flex-col`}>
        <div className={` bg-[#DEF2E6] h-10 w-[100%] rounded-t-2xl`}>
          <p className={`ml-5 mt-2`}>Klant gegevens</p>
        </div>
        <div className={` w-[100%]`}>
          <div
            className={`w-[100%] mt-10 flex flex-col sm:flex-row justify-between`}
          >
            <div className={`border-[1px]flex-col w-[45%] ml-[2%]`}>
              <div className={`font-['Roboto'] text-1xl font-bold`}>
                Besteller
              </div>
              <form
                className={`mt-1`}
                method="POST"
                action=""
              >
                <div className={`flex flex-col`}>
                  <label htmlFor="opdrachtgever">Naam opdrachtgever</label>
                  <input
                    className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                    type="text"
                    name="opdrachtgever"
                    id="opdrachtgever"
                  ></input>
                </div>
                <div
                  className={`flex flex-col lg:flex-row justify-between mt-[3%]`}
                >
                  <div className={`flex flex-col`}>
                    <label htmlFor="voornaamContactpersoon">
                      Voornaam contactpersoon
                    </label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="voornaamContactpersoon"
                      id="voornaamContactpersoon"
                    ></input>
                  </div>
                  <div className={`flex flex-col`}>
                    <label htmlFor="achternaamContactpersoon">
                      Achternaam contactpersoon
                    </label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="achternaamContactpersoon"
                      id="achternaamContactpersoon"
                    ></input>
                  </div>
                </div>
                <div
                  className={`flex flex-col lg:flex-row justify-between mt-[3%]`}
                >
                  <div className={`flex flex-col`}>
                    <label htmlFor="straatnaam">Straatnaam</label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="straatnaam"
                      id="straatnaam"
                    ></input>
                  </div>
                  <div className={`flex w-[100%] lg:w-[48%] justify-between`}>
                    <div className={`flex flex-col`}>
                      <label htmlFor="nummer">Nummer</label>
                      <input
                        className={`border-[1px] border-gray-500 h-[25px] w-[95%]`}
                        type="text"
                        name="nummer"
                        id="nummer"
                      ></input>
                    </div>
                    <div className={`flex flex-col`}>
                      <label htmlFor="postcode">Postcode</label>
                      <input
                        className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                        type="text"
                        name="postcode"
                        id="postcode"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col mt-[3%]`}>
                  <label htmlFor="plaats">Plaats</label>
                  <input
                    className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                    type="text"
                    name="plaats"
                    id="plaats"
                  ></input>
                </div>
                <div className={`flex flex-col mt-[3%]`}>
                  <label htmlFor="telefoonnummerBesteller">
                    Telefoonnummer
                  </label>
                  <input
                    className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                    type="text"
                    name="telefoonnummerBesteller"
                    id="telefoonnummerBesteller"
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
                        htmlFor="ja"
                      >
                        Ja
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
                        htmlFor="nee"
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
                      htmlFor="datumBezorging"
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
                    <label htmlFor="verzending">Verzending</label>
                    <select
                      className={`border-[1px] border-gray-500`}
                      name="verzending"
                      id="verzending"
                    >
                      <option value="afhalen">Afhalen</option>
                      <option value="bezorging">Bezorging</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div
              className={` sm:mt-[0px] mt-[10%] sm:ml-[0px] ml-[2%] flex-col w-[45%] mr-[2%] pb-1`}
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
                      htmlFor="opdrachtgever"
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
                    <label htmlFor="opdrachtgever">Achternaam</label>
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
                    <label htmlFor="straatnaam">Straatnaam</label>
                    <input
                      className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                      type="text"
                      name="straatnaam"
                      id="straatnaam"
                    ></input>
                  </div>
                  <div className={`flex w-[100%] lg:w-[45%] justify-between`}>
                    <div className={`flex flex-col`}>
                      <label htmlFor="nummer">Nummer</label>
                      <input
                        className={`border-[1px] border-gray-500 h-[25px] w-[95%]`}
                        type="text"
                        name="nummer"
                        id="nummer"
                      ></input>
                    </div>
                    <div className={`flex flex-col`}>
                      <label htmlFor="postcode">Postcode</label>
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
                  <label htmlFor="plaats">Plaats</label>
                  <input
                    className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                    type="text"
                    name="plaats"
                    id="plaats"
                  ></input>
                </div>
                <div className={`flex flex-col  mt-[3%]`}>
                  <label htmlFor="telefoonnummerOntvanger">
                    Telefoonnummer
                  </label>
                  <input
                    className={`border-[1px] border-gray-500 h-[25px] w-[100%]`}
                    type="text"
                    name="telefoonnummerOntvanger"
                    id="telefoonnummerOntvanger"
                  ></input>
                </div>
                <div
                  className={`flex flex-col sm:flex-row justify-between mt-[3%]`}
                >
                  <div className={`flex flex-col`}>
                    <label
                      className={'w-[122px]'}
                      htmlFor="prijsBestelling"
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
                      htmlFor="prijsTotaal"
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
            className={`w-[100%] mt-20 flex flex-col sm:flex-row justify-between border-t-gray-400 border-t-[1px] pb-5`}
          >
            <div className={`border-[1px]flex-col w-[45%] ml-[2%] mt-[50px]`}>
              <div className={`font-['Roboto'] text-1xl font-bold`}>
                Product
              </div>
              <form>
                <div className={`flex flex-col`}>
                  <label
                    className={`mt-3`}
                    htmlFor="omschrijvingBestelling"
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
                    htmlFor="tekstKaartje"
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
                    htmlFor="bijzonderheden"
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
            </div>
            <div className={`flex-col w-[45%] mr-[2%] mt-[110px]`}>
              <div className={`flex flex-col md:flex-row md:ml-[0px] ml-[5%]`}>
                <div className={`w-[82%] flex flex-col`}>
                  <div className={` w-[100%] `}>
                    <input
                      className={`accent-[#009A42]`}
                      type="radio"
                      name="extra"
                      id="gratisKaartje"
                      value="gratisKaartje"
                    ></input>
                    <label
                      className={`ml-[5px]`}
                      htmlFor="gratisKaartje"
                    >
                      Gratis kaartje
                    </label>
                  </div>
                  <div className={`w-[100%]`}>
                    <input
                      className={`accent-[#009A42]`}
                      type="radio"
                      name="extra"
                      id="geenKaartje"
                      value="geenKaartje"
                    ></input>
                    <label
                      className={`ml-[5px]`}
                      htmlFor="geenKaartje"
                    >
                      Geen kaartje
                    </label>
                  </div>
                </div>
                <div className={` w-[90%] flex flex-col`}>
                  <div className={` w-[100%] flex`}>
                    <input
                      className={`accent-[#009A42]`}
                      type="radio"
                      name="extra"
                      id="wenslintje"
                      value="wenslintje"
                    ></input>
                    <label
                      className={`ml-[5px]`}
                      htmlFor="wenslintje"
                    >
                      Speciaal wenslintje
                    </label>
                  </div>
                  <div className={` w-[100%] flex`}>
                    <input
                      className={`accent-[#009A42]`}
                      type="radio"
                      name="extra"
                      id="wensKaartje"
                      value="wensKaartje"
                    ></input>
                    <label
                      className={`ml-[5px]`}
                      htmlFor="wensKaartje"
                    >
                      Speciaal wenskaartje
                    </label>
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col sm:w-[80%] w-[100%] justify-between mt-[45px]`}
              >
                <label htmlFor="aangenomenDoor">Aangenomen door:</label>
                <select
                  className={`border-[1px] border-black w-[100%] h-[30px]`}
                  name="aangenomenDoor"
                  id="aangenomenDoor"
                >
                  <option value="Bernhardus Annen">Bernhardus Annen</option>
                  <option value="Medewerker1">Medewerker1</option>
                  <option value="Medewerker2">Medewerker2</option>
                </select>
              </div>
              <div
                className={`flex sm:flex-row flex-col sm:ml-[0px] ml-[10%] justify-between mt-[85px] w-[82%]`}
              >
                <GreenButton link="#">Voeg order</GreenButton>
                <WhiteButton link="/">Annuleren</WhiteButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
