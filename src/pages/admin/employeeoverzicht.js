import MainLayout from '../../layout/MainLayout';
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function CustomerOverview() {
  return (
    <MainLayout>
      <div className={'bg-white bg-opacity-0 mt-1 ml-0.5'}>
        <div
          className={
            'flex text-black  flex-col justify-between items-start w-[9/10] mx-0 my-auto'
          }
        >
          <a
            href="/"
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
          <h1 className={'text-3xl m-4 mt-0 w-fit'}>Medewerkers</h1>
        </div>
        <hr className={'border-0 bg-[#DEF2E6] h-px w-full mt-[5%]'}></hr>
        <div
          className={
            'flex flex-col items-center justify-center h-full w-9/10 mx-0 my-auto'
          }
        >
          <div className={'flex w-[90%]'}>
            <div className={'flex flex-row align-middle justify-start mb-5'}>
              <p className={'text-lg font-bold'}>
                Aantal medewerkers op pagina:{' '}
              </p>
              <select
                className={
                  'bg-white border text-black font-bold py-1 px-3 rounded ml-5'
                }
              >
                <option value="10">5</option>
                <option value="20">10</option>
                <option value="30">15</option>
                <option value="40">20</option>
              </select>
            </div>
          </div>
          <div className={'flex flex-row align-middle justify-between w-[90%]'}>
            <input
              type="text"
              className={'border rounded w-[60%] mr-2'}
              placeholder="Zoek naar medewerkers"
            ></input>
            <button
              className={
                'bg-[#009a42] border border-[#009a42] text-white py-1 px-8 rounded'
              }
            >
              Zoek
            </button>
            <select className={'border border-gray rounded'}>
              <option value="">Sorteer op</option>
              <option value="name">Naam</option>
              <option value="sirname">Rechten</option>
            </select>
            <button className={'border border-gray rounded mr-[5%] px-2.5'}>
              <ArrowPathIcon className={'h-5 w-5'} />
            </button>
          </div>
          <form className={'w-[90%]'}>
            <table className={'mt-10 table-auto w-[100%]'}>
              <thead>
                <tr className={'bg-gray-50 text-gray-300'}>
                  <th className={'px-4 py-2'}>
                    <input type="checkbox"></input>
                  </th>
                  <th className={'px-4 py-2'}>ID</th>
                  <th className={'px-4 py-2'}>Naam</th>
                  <th className={'px-4 py-2'}>Rechten</th>
                  <th className={'px-4 py-2'}>Bekijk</th>
                </tr>
              </thead>
              <tbody>
                <tr className={'text-center border-y px-4 py-2'}>
                  <td className={'px-4 py-2'}>
                    <input type="checkbox"></input>
                  </td>
                  <td className={'px-4 py-2'}></td>
                  <td className={'px-4 py-2'}></td>
                  <td className={'px-4 py-2'}></td>
                  <td className={'px-4 py-2'}>
                    <button
                      className={
                        'bg-white border uppercase text-black py-1 px-3'
                      }
                    >
                      <Link href="/admin/changeUser">Bekijk</Link>
                    </button>
                  </td>
                </tr>
                <tr className={'bg-gray-100 text-center'}>
                  <td className={'border-y px-4 py-2'}>
                    <input type="checkbox"></input>
                  </td>
                  <td className={'border-y px-4 py-2'}></td>
                  <td className={'border-y px-4 py-2'}></td>
                  <td className={'border-y px-4 py-2'}></td>
                  <td className={'border-y px-4 py-2'}>
                    <button
                      className={
                        'bg-white border uppercase text-black py-1 px-3'
                      }
                    >
                      <Link href="/admin/changeUser">Bekijk</Link>
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
                  <td className={'border-y px-4 py-2'}>
                    <button
                      className={
                        'bg-white border uppercase text-black py-1 px-3'
                      }
                    >
                      <Link href="/admin/changeUser">Bekijk</Link>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
