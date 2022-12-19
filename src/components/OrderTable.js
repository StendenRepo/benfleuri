
function TableHeaderCell({children}) {
    return <th scope="col"
               className="text-sm font-normal text-gray-400 px-6 py-2 text-left">
        {children}
    </th>
}

function TableButtonCell(orderID) {
    return <td className={`text-sm text-gray-900 font-light px-6 py-0 whitespace-nowrap`}>
        <button id={`edit-` + orderID} className={`py-[2px] px-[4px] text-xs font-normal border-[#e5e7eb] border uppercase`}>Bekijk</button>
    </td>
}

function PillLabel({type}) {
    let colorStyle = "rounded px-px text-center "
    let text = ""
    if(type === "send"){
        colorStyle+="bg-yellow-400 text-black"
        text = "Verzonden"
    }else if(type === "complete"){
        colorStyle+="bg-[#009A40] text-white"
        text = "Voltooid"
    }else if(type === "open"){
        colorStyle+="bg-[#FF623F] text-black"
        text = "Open"
    }else if(type === "not-delivered"){
        colorStyle+="bg-[#FF623F] text-black"
        text = "Geleverd maar niet thuis"
    }

    return <div className={colorStyle}>
        {text}
    </div>
}

function TableCell({children, center}) {
    let className="text-sm text-black font-normal px-6 py-2 whitespace-nowrap"
    if(center){
        className+=" text-center"
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
export function TableRow({data}){
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

export function OrderTable({children}){
    return (
        <div>
        <div className={"bg-slate-100 flex flex-row p-2 gap-x-4 rounded-t-lg"}>
            <input className={`grow rounded-lg`} type="text" placeholder="Search.."></input>
            <GreenButton>Zoek</GreenButton>
            <div>
                <select className="text-sm h-full font-bold border-[1px] border-black rounded-l py-[8px] px-[20px]
                font-['Roboto'] bg-white text-black ">
                    <option selected="selected" disabled="disabled">Status</option>
                    <option>Verzonden</option>
                    <option>Voltooid</option>
                    <option>Open</option>
                    <option>In behandeling</option>
                    <option>Geleverd maar niet thuis</option>
                </select>
                <select className="text-sm h-full font-bold border-[1px] border-y-black border-r-black rounded-r py-[8px] px-[20px]
                font-['Roboto'] bg-white text-black ">
                    <option selected="selected" disabled="disabled">Gemaakt op</option>
                </select>
            </div>
            <div>
            <select className="text-sm h-full font-bold border-[1px] border-black rounded py-[8px] px-[20px]
                font-['Roboto'] bg-white text-black ">
                <option selected="selected" disabled="disabled">Sorteer op</option>
                <option>ID</option>
                <option>Bestelling</option>
                <option>Datum</option>
                <option>Betaling</option>
                <option>Status</option>
                <option>Totaal</option>
            </select>
            </div>
            <WhiteButton>R</WhiteButton>
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
