import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [close, setClose] = useState('');
  const [hamburger, setHamburger] = useState('hidden');

  function closeSidebar() {
    setHamburger('');
    setClose('hidden');
  }

  function openSidebar() {
    setClose('');
    setHamburger('hidden');
  }

  return (
    <>
      <div className="sm:hidden">
        <div className={hamburger}>
          <button onClick={() => openSidebar()}>
            <Image
              src="/hamburger.png"
              width={30}
              height={30}
              alt="close logo"
              className="fixed top-5 right-5"
            />
          </button>
        </div>
      </div>
      <div className={close}>
        <div className="z-1 bg-white w-64 h-full max-sm:h-screen shadow-lg max-sm:w-screen shadow-black">
          <div className="sm:fixed sm:w-64">
            <div className="flex justify-center">
              <Link href="/">
                <Image
                  src="/Logo.svg"
                  width={100}
                  height={100}
                  className="mt-8"
                  alt="Benfleuri-logo"
                />
              </Link>
            </div>
            <div className="sm:hidden">
              <button onClick={() => closeSidebar()}>
                <Image
                  src="/close.png"
                  width={15}
                  height={15}
                  alt="close logo"
                  className="fixed top-5 right-5"
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
                  <Link href="/">Dashboard</Link>
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
                  <Link href="/addOrder">Nieuwe Bestelling</Link>
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
                  <Link href="/orderOverview">Bestellingen</Link>
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
                  <Link href="/userOverview">Gebruikerbeheer</Link>
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
                  <Link href="/admin/customerOverview">Klanten</Link>
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
