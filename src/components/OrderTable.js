import {Fragment} from 'react'
import {Listbox, Menu, Transition} from '@headlessui/react'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowPathIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {renderToString} from "react-dom/server";

function TableHeaderCell({children}) {
    return <th scope="col"
               className="text-sm font-normal text-gray-400 px-4 py-2 text-left">
        {children}
    </th>
}

function TableButtonCell(orderID) {
    return <td className={`text-sm text-gray-900 font-light px-6 py-0 whitespace-nowrap`}>
        <button id={`edit-` + orderID}
                className={`py-[2px] px-[4px] text-xs font-normal border-[#e5e7eb] border uppercase`}>Bekijk
        </button>
    </td>
}

function PillLabel({type}) {
    let colorStyle = "rounded px-px text-center "
    let text = "";
    if (type === "DELIVERED") {
        colorStyle += "bg-yellow-400 text-black"
        text = "Verzonden"
    } else if (type === "CLOSED") {
        colorStyle += "bg-[#009A40] text-white"
        text = "Voltooid"
    } else if (type === "OPEN") {
        colorStyle += "bg-[#FF623F] text-black"
        text = "Open"
    } else if (type === "IN_PROGRESS") {
        colorStyle += "bg-[#FF623F] text-black"
        text = "Geleverd maar niet thuis"
    } else {
        text = type;
    }

    return <div className={colorStyle}>
        {text}
    </div>
}

function TableCell({children, center}) {
    let className = "text-sm text-black font-normal px-4 py-2 whitespace-nowrap"
    if (center) {
        className += " text-center"
    }
    return <td className={className}>
        {children}
    </td>
}

export function GreenButton({children, link}) {
    return (
        <Link href={!link ? "" : link}>
            <button className={`text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] text-white font-bold border-[#45a049] rounded-lg hover:bg-[#45a049]`} type="button">{children}
            </button>
        </Link>
    )
}

export function WhiteButton({children, link}) {
    return (
        <Link href={!link ? "" : link}>
            <button className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white`} type="button">{children}
            </button>
        </Link>
    )
}

/**
 * @param data A array containing the data for the table row.
 */
export function TableRow({data}) {
    return (
        <tr className="border-b odd:bg-gray-100">
            <TableCell><input id={`check-` + data[0]} type="checkbox"/></TableCell>
            <TableCell center={true}>{data[0]}</TableCell>
            <TableCell>{data[1]}</TableCell>
            <TableCell>{data[2]}</TableCell>
            <TableCell>{data[3]}</TableCell>
            <TableCell>{data[4]}</TableCell>
            <TableCell><PillLabel type={data[5]}/></TableCell>
            <TableCell>€{data[6]}</TableCell>
            <TableButtonCell id={data[0]}/>
        </tr>
    );
}

export function OrderTable({orders, customers, children}) {
    let status = [
        { name: 'Status', disabled: true },
        { name: 'Geleverd maar niet thuis', disabled: false },
        { name: 'In behandeling', disabled: false },
        { name: 'Open', disabled: false },
        { name: 'Verzonden', disabled: false },
        { name: 'Voltooid', disabled: false },
    ]
    let sort = [
        { name: 'Sorteer op', disabled: true },
        { name: 'Order', disabled: false },
        { name: 'Besteller', disabled: false },
        { name: 'Bestelling', disabled: false },
        { name: 'Ontvanger', disabled: false },
        { name: 'Betaling', disabled: false },
        { name: 'Status', disabled: false },
        { name: 'Totaal geld', disabled: false },
    ]
    return (
        <div className="inline-block min-w-full">
            <div className={"bg-slate-100 flex max-lg:flex-col flex-row p-2 gap-x-4 rounded-t-lg"}>
                <div className="flex flex-grow gap-y-[5px]">
                <input className={`grow rounded-lg`} type="text" placeholder="Search.."></input>
                <GreenButton>Zoek</GreenButton>
                </div>
                <div className="gap-x-[5px] flex inline-block">
                <div className="items-stretch flex flex-row ">
                    <StatusDropdown orders={orders} customers={customers} listValues={status} roundCorners="left"/>
                    <Dropdown listValues={sort} roundCorners="right"/>
                </div>
                <div className="items-stretch flex flex-row">
                    <input className="text-sm rounded font-['Roboto'] border-[1px] border-black bg-white text-black" type="date"/>
                </div>
                <WhiteButton><ArrowPathIcon className="h-5 w-5 " aria-hidden="true"/></WhiteButton>
                </div>
            </div>
            <table className="min-w-full ">
                <thead className="border-b border-t">
                <tr>
                    <TableHeaderCell><input type="checkbox" name="select-all"/></TableHeaderCell>
                    <TableHeaderCell>Order</TableHeaderCell>
                    <TableHeaderCell>Besteller</TableHeaderCell>
                    <TableHeaderCell>Bestelling</TableHeaderCell>
                    <TableHeaderCell>Ontvanger</TableHeaderCell>
                    <TableHeaderCell>Betaling</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Totaal</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                </tr>
                </thead>
                <tbody id="tableContent">
                {children}
                </tbody>
            </table>
        </div>
    );
}

function StatusDropdown({customers, orders, listValues, roundCorners}) {
    const [selected, setSelected] = useState(listValues[0])
    let corners = roundCorners === "left" ? "rounded-l border-[1px]" :
        (roundCorners === "right" ? "rounded-r border-y-[1px] border-r-[1px]" : (roundCorners === "both" ?
            "rounded border-[1px]" : "border-[1px]"))
    return (
        <div className="items-stretch">
            <Listbox value={selected} onChange={setSelected}>
                <div className="h-full">
                    <div className="relative h-full">
                    <Listbox.Button className={corners + " h-full border-black w-full cursor-default " +
                        "text-sm font-['Roboto'] bg-white text-black py-2 pl-3 pr-10 text-left"}>
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400" aria-hidden="true"/></span></Listbox.Button>
                    </div>
                    <Transition as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto
                        rounded-md bg-white py-1 text-base shadow-lg ring-1
                         ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {listValues.map((listValue, listValueIdx) => (
                                <Listbox.Option
                                    key={listValueIdx}
                                    className={({ active, disabled }) =>
                                        `relative cursor-default select-none py-2 px-4 
                                        ${active ? 'bg-[#009a4040] text-[#009A40]' : 'text-gray-900'}
                                        ${disabled ? 'bg-gray-100 text-gray-300' : 'text-gray-900'} 
                                            `}
                                    value={listValue}
                                    disabled={listValue.disabled}
                                >
                                    {({ selected }) => (
                                        <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {listValue.name}</span></>)}
                                </Listbox.Option>))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

function Dropdown({listValues, roundCorners}) {
    const [selected, setSelected] = useState(listValues[0])
    let corners = roundCorners === "left" ? "rounded-l border-[1px]" :
        (roundCorners === "right" ? "rounded-r border-y-[1px] border-r-[1px]" : (roundCorners === "both" ?
            "rounded border-[1px]" : "border-[1px]"))
    return (
        <div className="items-stretch">
            <Listbox value={selected} onChange={setSelected}>

                <div className="h-full">
                    <div className="relative h-full">
                        <Listbox.Button className={corners + " h-full border-black w-full cursor-default " +
                            "text-sm font-['Roboto'] bg-white text-black py-2 pl-3 pr-10 text-left"}>
                            <span className="block truncate">{selected.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400" aria-hidden="true"/></span></Listbox.Button>
                    </div>
                    <Transition as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto
                        rounded-md bg-white py-1 text-base shadow-lg ring-1
                         ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {listValues.map((listValue, listValueIdx) => (
                                <Listbox.Option
                                    key={listValueIdx}
                                    className={({ active, disabled }) =>
                                        `relative cursor-default select-none py-2 px-4 
                                        ${active ? 'bg-[#009a4040] text-[#009A40]' : 'text-gray-900'}
                                        ${disabled ? 'bg-gray-100 text-gray-300' : 'text-gray-900'} 
                                            `}
                                    value={listValue}
                                    disabled={listValue.disabled}
                                >
                                    {({ selected }) => (
                                        <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {listValue.name}</span></>)}
                                </Listbox.Option>))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export function updateOrderTable({startIndex, findAllOrders, findAllCustomers}) {
    let content = "";
    let limit = parseInt(document.getElementById("orderCount").value);
    let status = ""
    let amount = 0;
    let index = 0;
    console.log(findAllOrders)
    findAllOrders.map(f => {
        if(index < startIndex){
            index++;
            return false;
        }
        if (amount >= limit) {
            return true;
        }
        let customerName = "";
        let receiverName = "";
        let customerId = f.customerId;
        let receiverId = f.recieverId;

        for (let i = 0; i < findAllCustomers.length; i++) {
            let v = findAllCustomers[i];
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
        content += renderToString(getTableRow(f, customerName, receiverName));
        amount++;
    })
    document.getElementById("tableContent").innerHTML = content
}


function getTableRow(order, customerName, receiverName){
    return (
        <TableRow data={[order.id, customerName, order.productInfo, receiverName, order.paymentMethod,
            order.orderState, order.price]}></TableRow>
    )
}
