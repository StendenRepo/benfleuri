import MainLayout from '../layout/MainLayout';
import {
  OrderTable,
  TableRow,
  GreenButton,
  WhiteButton,
} from '../components/OrderTable';
import Popup from '../components/RouteList';
import React, { useState } from 'react';

function Header() {
  return (
    <div
      className={`border-b pb-[4%] flex flex-col font-['Roboto'] px-[4%] pt-[2%]`}
    >
      <div className={`font-['Roboto'] ml-[2%] mb-[1%]`}>
        <a href={'/'}>Dashboard</a>
      </div>
      <div className={`flex flex-row`}>
        <div
          className={`font-['Roboto'] items-start text-3xl font-bold w-1/2 `}
        >
          Bestellingen
        </div>
        <div className={`flex justify-end w-1/2 gap-x-4`}>
          <GreenButton>Nieuwe Bestelling</GreenButton>
          <WhiteButton>Importeer Bestelling</WhiteButton>
          <WhiteButton>Exporteer Bestelling</WhiteButton>
        </div>
      </div>
    </div>
  );
}

export default function OrderOverview() {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <MainLayout>
      <Header />

      <div className={`h-full flex flex-col items-center py-0 px-8`}>
        <div className="mt-[3%] overflow-auto items-center justify-center w-[95%]">
          <div
            className={`font-['Roboto'] items-start text-2xl font-bold w-1/2 pb-4`}
          >
            Aantal orders op pagina:
            <select
              className="text-sm h-full font-bold border-[1px] border-black rounded ml-5 py-[8px] px-[20px]
                            font-['Roboto'] bg-white text-black"
            >
              <option>10</option>
              <option>20</option>
            </select>
          </div>
          <OrderTable>
            <TableRow
              data={[
                1,
                'Brian Hoogerwerf',
                '23 rooie tulpen met gratis kaartje',
                'Brian Hoogerwerf',
                'Factuur',
                'send',
                '29,45',
              ]}
            />
            <TableRow
              data={[
                1,
                'Brian Hoogerwerf',
                '23 rooie tulpen met gratis kaartje',
                'Brian Hoogerwerf',
                'Factuur',
                'send',
                '29,45',
              ]}
            />
            <TableRow
              data={[
                1,
                'Brian Hoogerwerf',
                '23 rooie tulpen met gratis kaartje',
                'Brian Hoogerwerf',
                'Factuur',
                'send',
                '29,45',
              ]}
            />
          </OrderTable>
          <div className={'mt-20 w-full flex justify-end'}>
            <button
              className={`text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto']
                bg-[#00A952] text-white font-bold border-[#45a049] rounded-lg hover:bg-[#45a049]`}
              type="button"
              onClick={togglePopup}
            >
              Route maken
            </button>
            {isOpen && (
              <Popup
                content={
                  <div>
                    <h1>Lijst met Adressen</h1>
                  </div>
                }
                handleClose={togglePopup}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
