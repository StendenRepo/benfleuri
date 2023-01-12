import MainLayout from '../layout/MainLayout';
import Link from 'next/link'
import {updateOrderTable, OrderTable, TableRow, GreenButton, WhiteButton} from '../components/OrderTable'
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/20/solid';
import {getAllCustomers, getAllOrders} from './sql'
import { renderToString } from 'react-dom/server'

let currentPage = 1;

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
    const {findAllOrders} = await getAllOrders(
        "id customerId productInfo recieverId paymentMethod orderState price")
    const {findAllCustomers} = await getAllCustomers("id firstName lastName")

    return {
        props: {
            findAllOrders,
            findAllCustomers
        },
    }
}





function nextPage({findAllOrders, findAllCustomers}){
    let limit = parseInt(document.getElementById("orderCount").value);
    let startIndex = (currentPage * limit);
    if(startIndex > findAllOrders.length){
        //Should already be stopped by disabling the button.
        return;
    }
    console.log(startIndex + limit)
    console.log(findAllCustomers.length)

    document.getElementById("nextButton").disabled = startIndex + limit > findAllOrders.length;
    document.getElementById("prevButton").disabled = startIndex - limit < 0;
    updateOrderTable({startIndex, findAllOrders, findAllCustomers});
}

function previousPage({findAllOrders, findAllCustomers}){
    let limit = parseInt(document.getElementById("orderCount").value);
    let startIndex = (currentPage * limit)  - (limit)
    if(startIndex < 0){
        return;
    }
    document.getElementById("nextButton").disabled = startIndex + limit > findAllOrders.length;
    document.getElementById("prevButton").disabled = startIndex - limit < 0;
    updateOrderTable({startIndex, findAllOrders, findAllCustomers});
}

export default function OrderOverview({findAllOrders, findAllCustomers}) {
    let limit = 5;
    let amount = 0;
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
                        <OrderTable orders={findAllOrders} customers={findAllCustomers}>
                            {findAllOrders.map(f => {
                                if (amount >= limit) {
                                    return true;
                                }
                                let customerName = "";
                                let receiverName = "";

                                let customerId = f.customerId;
                                let receiverId = f.recieverId;

                                for (let i = 0; i < findAllCustomers.length; i++) {
                                    console.log(i)
                                    let v = findAllCustomers[i];
                                    console.log(v)
                                    if (customerName !== "" && receiverName !== "") {
                                        continue;
                                    }
                                    let cID = v.id;
                                    if (cID === customerId) {
                                        customerName = v.firstName + " " + v.lastName;
                                    }
                                    if (cID === receiverId) {
                                        receiverName = v.firstName + " " + v.lastName;
                                    }
                                }
                                amount++;
                                return <TableRow
                                    data={[f.id, customerName, f.productInfo, receiverName, f.paymentMethod,
                                        f.orderState, f.price]}></TableRow>
                            })
                            }
                        </OrderTable>
                    </div>
                    <div className={"mt-20 w-full flex justify-end"}>
                        <GreenButton>Route maken</GreenButton>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
