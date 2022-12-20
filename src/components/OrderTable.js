import {Fragment} from 'react'
import {Listbox, Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import { useState } from 'react'
import { ArrowPathIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

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
    let text = ""
    if (type === "send") {
        colorStyle += "bg-yellow-400 text-black"
        text = "Verzonden"
    } else if (type === "complete") {
        colorStyle += "bg-[#009A40] text-white"
        text = "Voltooid"
    } else if (type === "open") {
        colorStyle += "bg-[#FF623F] text-black"
        text = "Open"
    } else if (type === "not-delivered") {
        colorStyle += "bg-[#FF623F] text-black"
        text = "Geleverd maar niet thuis"
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

export function GreenButton({children}) {
    return (
        <a href={"#"}>
            <button className={`text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] text-white font-bold border-[#45a049] rounded-lg hover:bg-[#45a049]`} type="button">{children}
            </button>
        </a>
    )
}

export function WhiteButton({children}) {
    return (
        <a href={"#"}>
            <button className={`text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white`} type="button">{children}
            </button>
        </a>
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

export function OrderTable({children}) {
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
        <div>
            <div className={"bg-slate-100 flex flex-row p-2 gap-x-4 rounded-t-lg"}>
                <input className={`grow rounded-lg`} type="text" placeholder="Search.."></input>
                <GreenButton>Zoek</GreenButton>
                <div className="relative items-stretch flex flex-row">
                    <Dropdown listValues={status} roundCorners="left"/>
                    <Dropdown listValues={sort} roundCorners="right"/>
                </div>
                <div className="relative items-stretch flex flex-row">
                    <input className="text-sm rounded font-['Roboto'] border-[1px] border-black bg-white text-black" type="date"/>
                </div>
                <WhiteButton><ArrowPathIcon className="h-5 w-5 " aria-hidden="true"/></WhiteButton>
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
                <tbody>
                {children}
                </tbody>
            </table>
        </div>
    );
}

function Dropdown({listValues, roundCorners}) {
    const [selected, setSelected] = useState(listValues[0])
    let corners = roundCorners === "left" ? "rounded-l border-[1px]" :
        (roundCorners === "right" ? "rounded-r border-y-[1px] border-r-[1px]" : (roundCorners === "both" ?
            "rounded border-[1px]" : "border-[1px]"))
    return (
        <div className="items-stretch">
            <Listbox value={selected} onChange={setSelected}>

                <div className="relative h-full">
                    <Listbox.Button className={corners + " h-full border-black w-full cursor-default " +
                        "text-sm font-['Roboto'] bg-white text-black py-2 pl-3 pr-10 text-left"}>
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400" aria-hidden="true"/></span></Listbox.Button>
                    <Transition as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto
                        rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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

function SortDropdown() {
    return (
        <Menu as="div" className="h-full border-y-[1px] border-r-[1px] border-black rounded-r">
            <div>
                <Menu.Button
                    className=" h-full w-full py-[10px] px-[20px] text-sm font-bold font-['Roboto'] bg-white text-black">
                    Sorteer op
                    <ChevronDownIcon className="inline -mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                </Menu.Button>
            </div>

            <Transition as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>{({active}) => (
                            <a href="#" className={(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm')}>ID</a>)}
                        </Menu.Item>
                        <Menu.Item>{({active}) => (
                            <a href="#" className={(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm')}>Besteller</a>)}
                        </Menu.Item>
                        <Menu.Item>{({active}) => (
                            <a href="#" className={(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm')}>Bestelling</a>)}
                        </Menu.Item>
                        <Menu.Item>{({active}) => (
                            <a href="#" className={(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm')}>Datum</a>)}
                        </Menu.Item>
                        <Menu.Item>{({active}) => (
                            <a href="#" className={(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm')}>Betaling</a>)}
                        </Menu.Item>
                        <Menu.Item>{({active}) => (
                            <a href="#" className={(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm')}>Status</a>)}
                        </Menu.Item>
                        <Menu.Item>{({active}) => (
                            <a href="#" className={(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm')}>Totaal prijs</a>)}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
