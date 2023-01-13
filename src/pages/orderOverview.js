import MainLayout from '../layout/MainLayout';
import Link from 'next/link'
import {updateOrderTable, getOrderTableData, OrderTable, TableRow, GreenButton, WhiteButton, nextPage, previousPage} from '../components/OrderTable'
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/20/solid';

function Header() {
    return <div className={`border-b pb-[4%] flex flex-col font-['Roboto'] px-[4%] pt-[2%]`}>
        <div className={`font-['Roboto'] ml-[1%] mb-[1%]`}>
            <ArrowLeftIcon
                className="h-5 w-5 pr-[1] inline-block"
                aria-hidden="true"
            />
            <Link href={"/"}>Dashboard</Link>
        </div>
        <div className={`flex flex-row`}>
            <div className={`font-['Roboto'] items-start text-3xl font-bold w-1/2 `}>
                Bestellingen
            </div>
            <div className={`flex justify-end w-1/2 gap-x-4`}>
                <GreenButton link="/addOrder">Nieuwe Bestelling</GreenButton>
                <WhiteButton link="#">Importeer Bestelling</WhiteButton>
                <WhiteButton link="#">Exporteer Bestelling</WhiteButton>
            </div>
        </div>
    </div>
}

export async function getServerSideProps() {
    return getOrderTableData();
}

export default function OrderOverview({findAllOrders, findAllCustomers}) {
    let content = updateOrderTable({startIndex: 0, findAllOrders, findAllCustomers,
        pageLoad: true})

    return (
        <MainLayout>
            <Header/>
            <div className={`h-full flex flex-col items-center py-0 px-8`}>
                <div className="mt-[3%] overflow-auto items-center justify-center w-[95%]">
                    <div className={`font-['Roboto'] items-start text-2xl font-bold w-1/2 pb-4`}>
                        Aantal orders op pagina:
                        <select className="text-sm h-full font-bold border-[1px] border-black rounded ml-5 py-[8px] px-[20px]
                            font-['Roboto'] bg-white text-black" id="orderCount"
                                onChange={() => {
                                    updateOrderTable({startIndex: 0, findAllOrders, findAllCustomers})
                                }}>
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                        </select>
                    </div>
                    <div className={"mb-3"}>
                        <button id={"prevButton"}
                            className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`} type="button"
                        onClick={() => {
                        previousPage({findAllOrders, findAllCustomers})}
                        }>
                            <ArrowLeftIcon
                                className="h-5 w-5 "
                                aria-hidden="true"
                            />
                        </button>
                        <button id={"nextButton"} className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`}
                                type="button" onClick={() => {
                            nextPage({findAllOrders, findAllCustomers})}
                        }>
                            <ArrowRightIcon
                                className="h-5 w-5 "
                                aria-hidden="true"
                            />
                        </button>

                    </div>
                    <div id="tableContainer">
                        <OrderTable data={content} orders={findAllOrders} customers={findAllCustomers}></OrderTable>
                    </div>
                    <div className={"mt-20 w-full flex justify-end"}>
                        <GreenButton>Route maken</GreenButton>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
