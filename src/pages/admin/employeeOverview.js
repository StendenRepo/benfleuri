import MainLayout from '../../layout/MainLayout';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import {
  EmployeeTable,
  getEmployeeTableData,
  nextPage,
  previousPage,
  updateEmployeeTable
} from "../../components/EmployeeTable";
import {GreenButton} from "../../components/Table";
import {WhiteButton} from "../../components/OrderTable";

function Header() {
  return (
      <div
          className={`border-b pb-[4%] flex flex-col font-['Roboto'] px-[4%] pt-[2%]`}
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
        <div className={`flex flex-row`}>
          <div
              className={`font-['Roboto'] items-start text-3xl font-bold w-1/2 `}
          >
            Medewerkers
          </div>
          <div className={`flex justify-end w-1/2 gap-x-4`}>
            <GreenButton link="/admin/createUser">Nieuwe Medewerker</GreenButton>
          </div>
        </div>
      </div>
  );
}

export async function getServerSideProps() {
  return getEmployeeTableData();
}

export default function EmployeeOverview({findAllEmployees}) {
  let content = updateEmployeeTable({
    startIndex: 0,
    findAllEmployees,
    pageLoad: true,
  });

  return (
      <MainLayout>
        <Header />
        <div className={`h-full flex flex-col items-center py-0 px-8`}>
          <div className="mt-[3%] overflow-auto items-center justify-center w-[95%]">
            <div
                className={`font-['Roboto'] items-start text-2xl font-bold w-1/2 pb-2`}>
              Aantal medewerkers op pagina:
              <select
                  className="text-sm h-full font-bold border-[1px] border-black rounded ml-5 py-[8px] px-[20px]
                            font-['Roboto'] bg-white text-black"
                  id="employeeCount"
                  onChange={() => {
                    updateEmployeeTable({
                      startIndex: 0,
                      findAllEmployees,
                    });
                  }}
              >
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
            <div className={'mb-3'}>
              <button
                  id={'prevButton'}
                  className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`}
                  type="button"
                  onClick={() => {
                    previousPage({ findAllEmployees });
                  }}
              >
                <ArrowLeftIcon
                    className="h-5 w-5 "
                    aria-hidden="true"
                />
              </button>
              <button
                  id={'nextButton'}
                  className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`}
                  type="button"
                  onClick={() => {
                    nextPage({ findAllEmployees });
                  }}
              >
                <ArrowRightIcon
                    className="h-5 w-5 "
                    aria-hidden="true"
                />
              </button>
            </div>
            <div id="tableContainer">
              <EmployeeTable
                  data={content}
                  employees={findAllEmployees}
              ></EmployeeTable>
            </div>
          </div>
        </div>
      </MainLayout>
  );
}
