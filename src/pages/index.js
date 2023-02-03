import MainLayout from '../layout/MainLayout';

import {
    getOrderTableData,
    GreenButton,
    OrderTable,
    updateOrderTable,
} from '../components/OrderTable';
import {
    ArrowLeftIcon, ArrowPathIcon,
    ArrowRightIcon,
} from '@heroicons/react/20/solid';
import { importWooCommerceOrder } from './orderOverview';

let currentPage = [1, 1, 1, 1, 1, 1, 1]
let currentWeekOffset = 0;

function Header() {
    return (
        <div
            className={`border-b pb-[4%] flex flex-col font-['Roboto'] px-[4%] pt-[5%]`}
        >
            <div className={`flex flex-row`}>
                <div
                    className={`font-['Roboto'] items-start text-3xl font-bold w-1/2 `}>
                    Bestellingen
                </div>
                <div className={`flex justify-end w-1/2 gap-x-4`}>
                    <GreenButton className={"route-button"}>Route maken</GreenButton>
                    <GreenButton link="/addOrder">Voeg nieuwe bestelling toe</GreenButton>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    await importWooCommerceOrder()
    return getOrderTableData();
}

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

function getDates(){
    let dates = []
    let weekDay = new Date();
    weekDay.setDate(new Date().getDate() + (currentWeekOffset * 7))
    //Loop through days of the week.
    for(let i = 0; i < 7; i++){
        let date = getMonday(weekDay)
        date.setDate(date.getDate() + i)
        dates[i] = date;
    }
    return dates;
}

export default function Home({findAllOrders, findAllCustomers}) {
    let dates = getDates();
    let count = -1;

    return (
        <MainLayout>
            <Header/>
            <div className={`h-full flex flex-col items-center pt-5 pb-0 px-8`}>
                <div className={"font-['Roboto'] items-start mb-[50px] font-bold w-full"}>
                    <div className="gap-x-2 flex ">

                        <button id={"previousWeekButton"} className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white`}
                                type="button" onClick={() => {
                            previousWeek({findAllOrders, findAllCustomers})
                        }
                        }>
                            <ArrowLeftIcon
                                className="h-5 w-5 "
                                aria-hidden="true"
                            />
                        </button>
                        <button id={"nextWeekButton"} className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white`}
                                type="button" onClick={() => {
                            nextWeek({findAllOrders, findAllCustomers})
                        }
                        }>
                            <ArrowRightIcon
                                className="h-5 w-5 "
                                aria-hidden="true"
                            />
                        </button>
                        <button onClick={async () => {
                            let dbData = await getOrderTableData();
                            updateTables(dbData.props.findAllOrders, dbData.props.findAllCustomers)
                        }
                        } className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`} type="button">
                            <ArrowPathIcon className="h-5 w-5 " aria-hidden="true"/></button>
                        <span id={"weekIndicator"} className="pl-8 text-2xl">{"Week: " + getWeekNumber(new Date()) + " (huidige week)"}</span>
                    </div>
                </div>
                {

                    dates.map(f  => {
                        let dayName = f.toLocaleDateString("nl-NL", { weekday: 'long' });
                        let month = f.toLocaleString('nl-NL', { month: 'long' });
                        let dateString =  dayName[0].toUpperCase() + dayName.substring(1) + " " + f.getDate() + " " + month + " " + f.getFullYear()
                        let orders = [];
                        //Loop over all the orders.
                        findAllOrders.map(order => {
                            let orderDate = new Date(+order.dateOfDelivery);

                            if(orderDate.getFullYear() === f.getFullYear() &&
                                orderDate.getMonth() === f.getMonth() &&
                                orderDate.getDate() === f.getDate()){
                                console.log("Add order!")
                                orders.push(order);
                            }
                        })

                        count++

                        let content = updateOrderTable({
                            startIndex: 0, findAllOrders: orders, findAllCustomers, number: count,
                            pageLoad: true
                        })
                        return (<DayTable day={dateString} number={count}  content={content} customers={findAllCustomers} orders={orders}/>
                        )
            })}
            </div>
        </MainLayout>
    );
}

function DayTable({day, number, content, customers, orders}){
    return (<div className={"w-full mb-[50px]"}>
        <div className={`font-['Roboto'] items-start mb-[50px] font-bold w-full`}>
            <div id={"dayLabel-" + number} className="pt-5 text-3xl">{day}</div>
            <div className={`font-['Roboto'] mt-5 items-start text-2xl font-bold w-1/2 pb-3`}>
                Aantal orders op pagina:
                <select className="text-sm h-full font-bold border-[1px] border-black rounded ml-5 py-[8px] px-[20px]
                            font-['Roboto'] bg-white text-black" id={"orderCount-" + number}
                        onChange={() => {
                            updateOrderTable({startIndex: 0, number: number,
                                findAllOrders: orders, findAllCustomers: customers})
                        }}>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                </select>
                <div className={"mt-2"}>
                    <button id={"prevButton-" + number}
                            className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`} type="button"
                            onClick={() => {
                                previousPage({number: number, findAllOrders: orders, findAllCustomers: customers})
                            }
                            }>
                        <ArrowLeftIcon
                            className="h-5 w-5 "
                            aria-hidden="true"
                        />
                    </button>
                    <button id={"nextButton-" + number} className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white disabled:bg-gray-300`}
                            type="button" onClick={() => {
                        nextPage({number: number, findAllOrders: orders, findAllCustomers: customers})
                    }
                    }>
                        <ArrowRightIcon
                            className="h-5 w-5 "
                            aria-hidden="true"
                        />
                    </button>

                </div>
            </div>
        <div className="overflow-auto items-center justify-center w-[95%]">
            <OrderTable data={content} orders={orders} number={number} customers={customers}></OrderTable>
        </div>
    </div>
    </div>)
}

function updateTables(findAllOrders, findAllCustomers){
    console.log(findAllOrders)
    let dates = getDates();

    document.getElementById("weekIndicator").innerHTML = "Week: " +
        getWeekNumber(dates[0]) + ( currentWeekOffset === 0 ? " (huidige week)" : "")

    for(let count = 0; count < 6; count++){
        let date = dates[count];
        let dayName = date.toLocaleDateString("nl-NL", { weekday: 'long' });
        let month = date.toLocaleString('nl-NL', { month: 'long' });
        let dateString =  dayName[0].toUpperCase() + dayName.substring(1) + " " + date.getDate() + " " + month + " " + date.getFullYear()
        document.getElementById("dayLabel-" + count).innerHTML = dateString;

        let orders = []

        //Loop over all the orders.
        findAllOrders.map(order => {
            let orderDate = new Date(+order.dateOfDelivery);

            if(orderDate.getFullYear() === date.getFullYear() &&
                orderDate.getMonth() === date.getMonth() &&
                orderDate.getDate() === date.getDate()){
                orders.push(order);
            }
        })

        updateOrderTable({
            startIndex: 0, findAllOrders: orders, findAllCustomers, number: count
        })
    }
}

function nextWeek({findAllOrders, findAllCustomers}){
    currentWeekOffset++;
    updateTables(findAllOrders, findAllCustomers)
}

function previousWeek({findAllOrders, findAllCustomers}){
    currentWeekOffset--;
    updateTables(findAllOrders, findAllCustomers)
}

function getWeekNumber(date){
    let startDate = new Date(date.getFullYear(), 0, 1);
    let days = Math.floor((date - startDate) /
        (24 * 60 * 60 * 1000));

    return Math.ceil(days / 7);
}

/**
 * Handles the next page button.
 *
 * @param number The key of the array.
 * @param findAllOrders The order data.
 * @param findAllCustomers The customer data.
 */
export function nextPage({number, findAllOrders, findAllCustomers}){
    currentPage[number]++;
    let page = currentPage[number] - 1;
    let limit = parseInt(document.getElementById("orderCount-" + number).value);
    let startIndex = (page * limit);
    if(startIndex > findAllOrders.length){
        //Should already be stopped by disabling the button.
        return;
    }

    updateOrderTable({number: number, startIndex, findAllOrders, findAllCustomers});
}

/**
 * Handles the previous page button.
 *
 * @param number The key of the array.
 * @param findAllOrders The order data.
 * @param findAllCustomers The customer data.
 */
export function previousPage({number, findAllOrders, findAllCustomers}){
    if(currentPage[number] === 0){
        return;
    }
    let page = currentPage[number] - 1;
    let limit = parseInt(document.getElementById("orderCount-" + number).value);
    let startIndex = (page * limit)  - (limit)
    if(startIndex < 0){
        //Should already be stopped by disabling the button.
        return;
    }
    currentPage[number]--
    if(currentPage[number] <= 0){
        currentPage[number] = 1;
    }
    updateOrderTable({number: number, startIndex, findAllOrders, findAllCustomers});
}
