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
      <div className="flex justify-center content-center h-2/4 items-end">
        <button className="bg-primary-green hover:bg-hover-green rounded-3xl h-8 w-20 text-white">
          Logout
        </button>
      </div>
    </div>
  );
}
