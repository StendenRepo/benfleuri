import styles from '../styles/Sidebar.module.css';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="z-1 bg-white w-72 h-screen shadow-lg shadow-black ">
      <div className="flex justify-center">
        <Image
          src="/Logo.svg"
          width={100}
          height={100}
          className="mt-8"
          alt="Benfleuri-icon"
        />
      </div>
      <div>
        <p className="text-base text-black mt-6 ml-3">
          Goedemorgen, Bernhardus
        </p>
        <p className="text-sm text-gray-500 ml-3 mb-3">Admin</p>
      </div>
      <hr></hr>
      <div className="flex flex-col">
        <div className="flex align-middle pl-3 pt-3">
          <Image
            src="/heart.svg"
            width={20}
            height={20}
            className="grayscale"
            alt="Icon"
          />
          <p className="text-black text-base pb-1 pl-9">Dashboard</p>
        </div>
        <div className="flex content-center pl-3">
          <Image
            src="/heart.svg"
            width={20}
            height={20}
            className="grayscale"
            alt="Icon"
          />
          <p className="text-black text-base pb-1 pl-9">Nieuwe Bestelling</p>
        </div>
        <div className="flex content-center pl-3">
          <Image
            src="/heart.svg"
            width={20}
            height={20}
            className="grayscale"
            alt="Icon"
          />
          <p className="text-black text-base pb-1 pl-9">Bestellingen</p>
        </div>
        <div className="flex content-center pl-3">
          <Image
            src="/heart.svg"
            width={20}
            height={20}
            className="grayscale"
            alt="Icon"
          />
          <p className="text-black text-base pb-1 pl-9">Gebruikerbeheer</p>
        </div>
        <div className="flex content-center pl-3">
          <Image
            src="/heart.svg"
            width={20}
            height={20}
            className="grayscale"
            alt="Icon"
          />
          <p className="text-black text-base pb-1 pl-9">Klanten</p>
        </div>
      </div>
      <div className="flex justify-center content-center">
        <button className="bg-primary-green rounded-3xl w-30 h-6 text-white">
          Logout
        </button>
      </div>
    </div>
  );
}
