import MainLayout from '../layout/MainLayout';

function Header() {
    return <div className={`font-['Roboto'] ml-[5%] mt-[2%]`}>
        <div className={`font-['Roboto'] text-2xl font-bold`}>
            Dashboard
        </div>
    </div>
}

function TableHeaderCell({children}) {
    return <th scope="col"
               className="text-sm font-normal text-gray-400 px-6 py-2 text-left">
        {children}
    </th>
}

function TableButtonCell() {
    return <td className={`text-sm text-gray-900 font-light px-6 py-0 whitespace-nowrap`}>
        <button className={`py-[2px] px-[4px] text-xs font-normal border-[#e5e7eb] border uppercase`}>Bekijk</button>
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

export default function Home() {
    return (
        <MainLayout>
            <Header/>
            <div className={`h-full flex flex-col items-center py-0 px-8`}>
                <div className={`font-['Roboto'] items-start text-3xl font-bold w-full`}>
                    <div>Maandag 5 december 2022</div>
                </div>
                <div className="mt-[5%] overflow-scroll items-center justify-center w-[95%]">
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
                        <tr className="border-b">
                            <TableCell><input type="checkbox" name="name1" /></TableCell>
                            <TableCell center={true}>1</TableCell>
                            <TableCell>Brian Hoogerwerf</TableCell>
                            <TableCell>23 rooie tulpen met gratis kaartje</TableCell>
                            <TableCell>Brian Hoogerwerf</TableCell>
                            <TableCell>Factuur</TableCell>
                            <TableCell><PillLabel type={"send"}/></TableCell>
                            <TableCell>€29,45</TableCell>
                            <TableButtonCell/>
                        </tr>
                        <tr className="border-b">
                            <TableCell><input type="checkbox" name="name1" /></TableCell>
                            <TableCell center={true}>2</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>Otto</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell><PillLabel type={"complete"}/></TableCell>
                            <TableCell>Test</TableCell>
                            <TableButtonCell/>
                        </tr>
                        <tr className="border-b">
                            <TableCell><input type="checkbox" name="name1" /></TableCell>
                            <TableCell center={true}>3</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>Otto</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>Test</TableCell>
                            <TableCell>Test</TableCell>
                            <TableButtonCell/>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}
