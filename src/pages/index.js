import MainLayout from '../layout/MainLayout';
import {GreenButton, OrderTable, TableRow, WhiteButton} from '../components/OrderTable'
import {ArrowLeftIcon, ArrowPathIcon, ArrowRightIcon} from '@heroicons/react/20/solid'

function Header() {
    return <div className={`border-b pb-[4%] flex flex-col font-['Roboto'] px-[4%] pt-[5%]`}>
        <div className={`flex flex-row`}>
            <div className={`font-['Roboto'] items-start text-3xl font-bold w-1/2 `}>
                Bestellingen
            </div>
            <div className={`flex justify-end w-1/2 gap-x-4`}>
                <GreenButton>Voeg nieuwe bestelling toe</GreenButton>
            </div>
        </div>
    </div>
}



export default function Home() {
    return (
        <MainLayout>
            <Header/>
            <div className={`h-full flex flex-col items-center pt-5 pb-0 px-8`}>
                <div className={`font-['Roboto'] items-start  font-bold w-full`}>
                    <div className="gap-x-2 flex ">
                        <WhiteButton><ArrowLeftIcon className="h-5 w-5 " aria-hidden="true"/></WhiteButton>
                        <WhiteButton><ArrowRightIcon className="h-5 w-5 " aria-hidden="true"/></WhiteButton>
                        <span className="pl-8 text-2xl">Huidige week</span>
                    </div>
                    <div className="pt-5 text-3xl">Maandag 5 december 2022</div>
                </div>
                <div className="mt-[5%] overflow-scroll items-center justify-center w-[95%]">
                    <OrderTable>
                        <TableRow data={[1, "Brian Hoogerwerf", "23 rooie tulpen met gratis kaartje", "Brian Hoogerwerf", "Factuur", "send", "29,45"]}/>
                        <TableRow data={[1, "Brian Hoogerwerf", "23 rooie tulpen met gratis kaartje", "Brian Hoogerwerf", "Factuur", "send", "29,45"]}/>
                        <TableRow data={[1, "Brian Hoogerwerf", "23 rooie tulpen met gratis kaartje", "Brian Hoogerwerf", "Factuur", "send", "29,45"]}/>
                    </OrderTable>
                </div>
            </div>
        </MainLayout>
    );
}
