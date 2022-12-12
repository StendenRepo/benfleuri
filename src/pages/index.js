import styles from '../styles/changeUser.module.css';

export default function ChangeUser() {
  return (
    <>
      <div class="bg-white bg-opacity-0 mt-1 ml-0.5">
        <div class="flex text-black  flex-col justify-between items-start w-[9/10] mx-0 my-auto">
          <a
            href="index.js"
            class="text-black no-underline text-base m-4 w-fit"
          >
            <h3 class="flex flex-row justify-between items-center">
              <div class="mr-[5px]">
                <svg
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
              </div>
              Beheer
            </h3>
          </a>
          <h1 class="text-3xl m-4 mt-0 w-fit">Wijzigen</h1>
        </div>
        <hr class="border-0 bg-[#DEF2E6] h-px w-full mt-[100px] mb-5"></hr>
        <div class="flex flex-col items-center justify-center h-full w-9/10 mx-0 my-auto">
          <div class="text-left mb-5 bg-[#def2e6] rounded-t-[25px] h-[50px] w-[90%] pl-[50px] mt-[-100px]">
            <p>Gebruiker wijzigen</p>
          </div>
          <form class="w-[30%] mt-[50px]">
            <label>Naam gebruiker</label>
            <input
              type="text"
              name="Naam"
              placeholder="Naam gebruiker"
              class="w-full h-[25px] px-[12px] py-[12.5px] mx-[8px] ml-0 my-0 inline-block border-[#CCC] box-border"
            />
            <label>Rechten</label>
            <select
              name="role"
              class="w-full h-[25px] pt-0 pr-5 pl-[9px] mx-[8px] my-0 ml-0 inline-bloc border-[1px] border-[#ccc] box-border"
            >
              <option value="admin">Admin</option>
              <option value="user">Gebruiker</option>
            </select>
            <label>Pincode</label>
            <input
              type="password"
              name="pincode"
              placeholder="Pincode"
              class="w-full h-[10px] px-[12px] py-[12.5px] mx-[8px] ml-0 my-0 inline-block border-[#CCC] box-border"
            />
          </form>
          <div class=" bg-white bg-opacity-0 flex justify-end w-full mt-[7rem] h-0">
            <button
              type="button"
              className={styles.button3}
            >
              gebruiker verwijderen
            </button>
            <button
              type="submit"
              class="flex items-center bg-[#009a42] border-0 text-white px-[15px] py-[18px] text-center no-underline text-[16px] mx-[4px] my[2px] cursor-pointer rounded-[5px] mr-[10px]"
            >
              Wijzigen
            </button>
            <button
              type="button"
              class="flex items-center bg-white text-black px-[5px] py-[16px] text-center no-underline text-[16px] mx-[4px] my[2px] cursor-pointer border-2 border-[black] rounded-[5px] mr-[90px]"
            >
              Annuleren
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
