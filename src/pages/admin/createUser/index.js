import MainLayout from '../../../layout/MainLayout';

export default function CreateUser() {
  return (
    <div class="bg-white bg-opacity-0 mt-1 ml-0.5">
      <div class="flex text-black  flex-col justify-between items-start w-9/10 mx-0 my-auto">
        <a
          href="index.js"
          class="text-black no-underline text-base m-4 w-fit"
        >
          <h3>
            <svg
              class="mr-10 pt-5"
              width="12"
              height="19"
              viewBox="0 0 12 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.4729 2.80625L9.41663 0.75L0.666626 9.5L9.41663 18.25L11.4729 16.1938L4.79371 9.5L11.4729 2.80625Z"
                fill="black"
                fill-opacity="0.87"
              />
            </svg>
            Beheer
          </h3>
        </a>
        <h1 class="text-3xl m-4 mt-0 w-fit">Nieuwe gebruiker</h1>
      </div>
      <hr class="border-0 bg-[#DEF2E6] h-px w-full mt-5 mb-5"></hr>
      <div class="flex flex-col items-center justify-center h-full w-9/10 mx-0 my-auto">
        <div class="text-left mt-5 mb-5 bg-[#def2e6] rounded-t-[25px] h-[50px] w-full pl-[50px]  text-[100]">
          <p>Gebruiker aanmaken</p>
        </div>
        <form class="w-[30%] mt-[50px]">
          <label>Naam gebruiker</label>
          <input
            type="text"
            name="Naam"
            placeholder="Naam gebruiker"
            class="w-full h-[25px] px-[12px] py-[20px] mx-[8px] ml-0 my-0 inline-block border-[#CCC] box-border"
          />
          <label>Rechten</label>
          <select
            name="role"
            class="w-full h-[25px] pt-0 pr-5 pl-0 mx-[8px] my-0 ml-0 inline-bloc border-[1px] border-[#ccc] box-border"
          >
            <option value="admin">Admin</option>
            <option value="user">Gebruiker</option>
          </select>
          <label>Pincode</label>
          <input
            type="password"
            name="pincode"
            placeholder="Pincode"
            class="w-full h-[25px] px-[12px] py-[20px] mx-[8px] ml-0 my-0 inline-block border-[#CCC] box-border"
          />
        </form>
        <div class=" bg-white bg-opacity-0 flex justify-end w-full mt-12">
          <button
            type="submit"
            class="bg-[#009a42] border-0 text-white px-[15px] py-[32px] text-center no-underline inline-block text-[16px] mx-[4px] my[2px] cursor-pointer rounded-[5px] mr-[10px]"
          >
            Voeg gebruiker
          </button>
          <button
            type="button"
            class="bg-white text-black px-[13px] py-[32px] text-center no-underline inline-block text-[16px] mx-[4px] my[2px] cursor-pointer border-2 border-[black] rounded-[5px] mr-[90px]"
          >
            Annuleren
          </button>
        </div>
      </div>
    </div>
  );
}
