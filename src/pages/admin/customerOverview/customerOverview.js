import MainLayout from '../../../layout/MainLayout';

export default function CustomerOverview() {
  return (
    <div className={'bg-white bg-opacity-0 mt-1 ml-0.5'}>
      <div
        className={
          'flex text-black  flex-col justify-between items-start w-[9/10] mx-0 my-auto'
        }
      >
        <a
          href="index.js"
          className={'text-black no-underline text-base m-4 w-fit'}
        >
          <h3 className={'flex flex-row justify-between items-center'}>
            <div className={'mr-[5px]'}>
              <svg
                width="12"
                height="19"
                viewBox="0 0 12 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.4729 2.80625L9.41663 0.75L0.666626 9.5L9.41663 18.25L11.4729 16.1938L4.79371 9.5L11.4729 2.80625Z"
                  fill="black"
                  fillOpacity="0.87"
                />
              </svg>
            </div>
            Beheer
          </h3>
        </a>
        <h1 className={'text-3xl m-4 mt-0 w-fit'}>Klanten</h1>
      </div>
      <hr className={'border-0 bg-[#DEF2E6] h-px w-full mt-[5%] mb-5'}></hr>
      <div
        className={
          'flex flex-col items-center justify-center h-full w-9/10 mx-0 my-auto'
        }
      >
        <div className={'flex w-[90%]'}>
          <div className={'flex flex-row align-middle justify-start'}>
            <p className={'text-lg font-bold'}>Aantal klanten op pagina: </p>
            <select
              className={
                'bg-white border text-black font-bold py-1 px-3 rounded ml-1'
              }
            >
              <option value="10">5</option>
              <option value="20">10</option>
              <option value="30">15</option>
              <option value="40">20</option>
            </select>
          </div>
          <form>
            <input
              type="text"
              placeholder="&#x1F50E;&#xFE0E; Zoek naar klanten"
              className={'bg-[#DEF2E6] text-black font-bold py-2 px-4 rounded'}
            ></input>
            <input
              type="button"
              value="Zoek"
              className={'bg-[#DEF2E6] text-black font-bold py-2 px-4 rounded'}
            ></input>
            <select
              className={'bg-[#DEF2E6] text-black font-bold py-2 px-4 rounded'}
            >
              <option value="Sort">Sorteer op</option>
              <option value="name">Naam A-Z</option>
              <option value="name2">Naam Z-A</option>
              <option value="surname">Achternaam A-Z</option>
              <option value="surname2">Achternaam Z-A</option>
              <option value="phone">Telefoon</option>
              <option value="email">E-mail</option>
            </select>
            <input
              type="button"
              value="&#128472;"
              className={'bg-[#DEF2E6] text-black font-bold py-2 px-4 rounded'}
            ></input>
          </form>
        </div>
        <form className={'w-[90%]'}>
          <table className={'table-auto w-[90%]'}>
            <thead>
              <tr>
                <th className={'px-4 py-2'}>
                  <input type="checkbox"></input>
                </th>
                <th className={'px-4 py-2'}>ID</th>
                <th className={'px-4 py-2'}>Naam</th>
                <th className={'px-4 py-2'}>Achternaam</th>
                <th className={'px-4 py-2'}>Telefoon</th>
                <th className={'px-4 py-2'}>E-mail</th>
                <th className={'px-4 py-2'}>Bekijk</th>
              </tr>
            </thead>
            <tbody>
              <tr className={'text-center'}>
                <td className={'border-y px-4 py-2'}>
                  <input type="checkbox"></input>
                </td>
                <td className={'border-y px-4 py-2'}>1</td>
                <td className={'border-y px-4 py-2'}>Mark</td>
                <td className={'border-y px-4 py-2'}>Otto</td>
                <td className={'border-y px-4 py-2'}>123456789</td>
                <td className={'border-y px-4 py-2'}>Test@test.com</td>
                <td className={'border-y px-4 py-2'}>
                  <button
                    className={
                      'bg-[#DEF2E6] text-black font-bold py-2 px-4 rounded'
                    }
                  >
                    Bekijk
                  </button>
                </td>
              </tr>
              <tr className={'bg-gray-100 text-center'}>
                <td className={'border-y px-4 py-2'}>
                  <input type="checkbox"></input>
                </td>
                <td className={'border-y px-4 py-2'}>2</td>
                <td className={'border-y px-4 py-2'}>Jacob</td>
                <td className={'border-y px-4 py-2'}>Thornton</td>
                <td className={'border-y px-4 py-2'}>123456789</td>
                <td className={'border-y px-4 py-2'}>Test@test.com</td>
                <td className={'border-y px-4 py-2'}>
                  <button
                    className={
                      'bg-[#DEF2E6] text-black font-bold py-2 px-4 rounded'
                    }
                  >
                    Bekijk
                  </button>
                </td>
              </tr>
              <tr className={'text-center'}>
                <td className={'border-y px-4 py-2'}>
                  <input type="checkbox"></input>
                </td>
                <td className={'border-y px-4 py-2'}></td>
                <td className={'border-y px-4 py-2'}></td>
                <td className={'border-y px-4 py-2'}></td>
                <td className={'border-y px-4 py-2'}></td>
                <td className={'border-y px-4 py-2'}></td>
                <td className={'border-y px-4 py-2'}>
                  <button
                    className={
                      'bg-[#DEF2E6] text-black font-bold py-2 px-4 rounded'
                    }
                  >
                    Bekijk
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}