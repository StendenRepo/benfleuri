import MainLayout from '../layout/MainLayout';
import Link from 'next/link'
import {OrderTable, TableRow, GreenButton, WhiteButton} from '../components/OrderTable'
import {ArrowLeftIcon} from '@heroicons/react/20/solid';

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

export default function OrderOverview() {
    return (
        <MainLayout>
            <Header/>

            <div className={`h-full flex flex-col items-center py-0 px-8`}>
                <div className="mt-[3%] overflow-auto items-center justify-center w-[95%]">
                    <div className={`font-['Roboto'] items-start text-2xl font-bold w-1/2 pb-4`}>
                        Aantal orders op pagina:
                        <select className="text-sm h-full font-bold border-[1px] border-black rounded ml-5 py-[8px] px-[20px]
                            font-['Roboto'] bg-white text-black">
                            <option>10</option>
                            <option>20</option>
                        </select>
                    </div>
                    <OrderTable>
                        <TableRow
                            data={[1, "Brian Hoogerwerf", "23 rooie tulpen met gratis kaartje", "Brian Hoogerwerf", "Factuur", "send", "29,45"]}/>
                        <TableRow
                            data={[1, "Brian Hoogerwerf", "23 rooie tulpen met gratis kaartje", "Brian Hoogerwerf", "Factuur", "send", "29,45"]}/>
                        <TableRow
                            data={[1, "Brian Hoogerwerf", "23 rooie tulpen met gratis kaartje", "Brian Hoogerwerf", "Factuur", "send", "29,45"]}/>
                    </OrderTable>
                    <div className={"mt-20 w-full flex justify-end"}>
                        <GreenButton>Route maken</GreenButton>
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}
