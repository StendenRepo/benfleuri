import Image from 'next/image';
import { useState } from 'react';

export default function Sidebar() {
  const [visible, setVisible] = useState('');

  return (
    <>
      <div className="sm:hidden">
        <button onClick={() => setVisible('')}>
          <Image
            src="/hamburger.png"
            width={30}
            height={30}
            alt="close logo"
            className="fixed top-5 right-5"
          />
        </button>
      </div>
      <div className={visible}>
        <div className="z-1 bg-white w-64 h-full h-screen shadow-lg max-sm:w-screen shadow-black">
          <div className="fixed">
          <div className="flex justify-center">
            <Image
              src="/Logo.svg"
              width={100}
              height={100}
              className="mt-8"
              alt="Benfleuri-icon"
            />
          </div>
          <div className="sm:hidden">
            <button onClick={() => setVisible('hidden')}>
              <Image
                src="/close.png"
                width={20}
                height={20}
                alt="close logo"
                className="absolute top-5 right-5"
              />
            </button>
          </div>
          <div>
            <p className="text-base text-black mt-6 ml-3">
              Goedemorgen, Bernhardus
            </p>
            <p className="text-sm text-gray-500 ml-3 mb-5">Admin</p>
          </div>
          <hr></hr>
          <div className="flex flex-col">
            <div className="flex content-center p-2 group hover:bg-hover-green ">
              <Image
                src="/heart.svg"
                width={20}
                height={20}
                className="grayscale group-hover:grayscale-0"
                alt="Icon"
              />
              <p className="text-black text-base pb-1 pl-9 group-hover:text-primary-green">
                Dashboard
              </p>
            </div>
            <div className="flex content-center p-2 group hover:bg-hover-green">
              <Image
                src="/heart.svg"
                width={20}
                height={20}
                className="grayscale group-hover:grayscale-0"
                alt="Icon"
              />
              <p className="text-black text-base pb-1 pl-9 group-hover:text-primary-green">
                Nieuwe Bestelling
              </p>
            </div>
            <div className="flex content-center p-2 group hover:bg-hover-green">
              <Image
                src="/heart.svg"
                width={20}
                height={20}
                className="grayscale group-hover:grayscale-0"
                alt="Icon"
              />
              <p className="text-black text-base pb-1 pl-9 group-hover:text-primary-green">
                Bestellingen
              </p>
            </div>
            <div className="flex content-center p-2 group hover:bg-hover-green">
              <Image
                src="/heart.svg"
                width={20}
                height={20}
                className="grayscale group-hover:grayscale-0"
                alt="Icon"
              />
              <p className="text-black text-base pb-1 pl-9 group-hover:text-primary-green">
                Gebruikerbeheer
              </p>
            </div>
            <div className="flex content-center p-2 group hover:bg-hover-green">
              <Image
                src="/heart.svg"
                width={20}
                height={20}
                className="grayscale group-hover:grayscale-0"
                alt="Icon"
              />
              <p className="text-black text-base pb-1 pl-9 group-hover:text-primary-green">
                Klanten
              </p>
            </div>
          </div>
          <div className="flex justify-center content-center h-[calc(100vh-500px)] items-end mt-5">
            <button className="bg-primary-green hover:bg-hover-green rounded-3xl h-8 w-20 text-white">
              Logout
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
