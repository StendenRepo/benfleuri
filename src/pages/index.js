import MainLayout from '../layout/MainLayout';

import {
    getOrderTableData,
    GreenButton,
    OrderTable,
    updateOrderTable,
    WhiteButton,
} from '../components/OrderTable';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
} from '@heroicons/react/20/solid';

let currentPage = [1, 1, 1, 1, 1, 1, 1]

function Header() {
    return (
        <div
            className={`border-b pb-[4%] flex flex-col font-['Roboto'] px-[4%] pt-[5%]`}
        >
            <div className={`flex flex-row`}>
                <div
                    className={`font-['Roboto'] items-start text-3xl font-bold w-1/2 `}
                >
                    Bestellingen
                </div>
                <div className={`flex justify-end w-1/2 gap-x-4`}>
                    <GreenButton link="/addOrder">Voeg nieuwe bestelling toe</GreenButton>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    return getOrderTableData();
}

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}


export default function Home({findAllOrders, findAllCustomers}) {
    let content = updateOrderTable({
        startIndex: 0, findAllOrders, findAllCustomers,
        pageLoad: true
    })
    let dates = []
    for(let i = 0; i < 7; i++){
        let date = getMonday(new Date())
        date.setDate(date.getDate() + i)
        let dayName = date.toLocaleDateString("nl-NL", { weekday: 'long' });
        let month = date.toLocaleString('nl-NL', { month: 'long' });
        dates[i] = (dayName[0].toUpperCase() + dayName.substring(1)) + " " + date.getDate() + " " + month + " " + date.getFullYear()
    }
    let count = -1;
    return (
        <MainLayout>
            <Header/>
            <div className={`h-full flex flex-col items-center pt-5 pb-0 px-8`}>
                <div className={"font-['Roboto'] items-start mb-[50px] font-bold w-full"}>
                    <div className="gap-x-2 flex ">
                        <WhiteButton>
                            <ArrowLeftIcon
                                className="h-5 w-5 "
                                aria-hidden="true"
                            />
                        </WhiteButton>
                        <WhiteButton>
                            <ArrowRightIcon
                                className="h-5 w-5 "
                                aria-hidden="true"
                            />
                        </WhiteButton>
                        <span className="pl-8 text-2xl">Huidige week</span>
                    </div>
                </div>

                {
                    dates.map(f => {
                        count++
                        return (<DayTable day={f} number={count}  content={content} customers={findAllCustomers} orders={findAllOrders}/>
                    )
            })}</div>
        </MainLayout>
    );
}

function DayTable({day, number, content, customers, orders}){
    return (<div className={"w-full mb-[50px]"}>
        <div className={`font-['Roboto'] items-start mb-[50px] font-bold w-full`}>
            <div className="pt-5 text-3xl">{day}</div>
            <div className={`font-['Roboto'] mt-5 items-start text-2xl font-bold w-1/2 pb-4`}>
                Aantal orders op pagina:
                <select className="text-sm h-full font-bold border-[1px] border-black rounded ml-5 py-[8px] px-[20px]
                            font-['Roboto'] bg-white text-black" id="orderCount"
                        onChange={() => {
                            updateOrderTable({startIndex: 0,
                                findAllOrders: orders, findAllCustomers: customers})
                        }}>
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                </select>
                <div className={"mt-2"}>
                    <button id={"prevButton"}
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
                    <button id={"nextButton"} className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
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
        <div className="mt-[5%] overflow-auto items-center justify-center w-[95%]">
            <OrderTable data={content} orders={orders} customers={customers}></OrderTable>
        </div>
    </div>
    <hr/></div>)
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
    let limit = parseInt(document.getElementById("orderCount").value);
    let startIndex = (page * limit);
    if(startIndex > findAllOrders.length){
        //Should already be stopped by disabling the button.
        return;
    }

    updateOrderTable({startIndex, findAllOrders, findAllCustomers});
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
    let limit = parseInt(document.getElementById("orderCount").value);
    let startIndex = (page * limit)  - (limit)
    if(startIndex < 0){
        //Should already be stopped by disabling the button.
        return;
    }
    currentPage[number]--
    if(currentPage[number] <= 0){
        currentPage[number] = 1;
    }
    updateOrderTable({startIndex, findAllOrders, findAllCustomers});
}
