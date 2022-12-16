import MainLayout from '../layout/MainLayout';
import {OrderTable, TableRow} from '../components/OrderTable'

function Header() {
    return <div className={`font-['Roboto'] ml-[5%] mt-[2%]`}>
        <div className={`font-['Roboto'] text-2xl font-bold`}>
            Dashboard
        </div>
    </div>
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
