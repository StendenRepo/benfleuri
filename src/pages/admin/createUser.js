import MainLayout from '../../layout/MainLayout';
import { gql, request } from 'graphql-request';
import React, { useState } from 'react';

export default function createEmployee() {
  const [createUser, setCreateEmployee] = useState({});
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    const isAdmin = e.target.isAdmin.value === 'true';

    if (typeof name !== 'string' || name.length === 0) {
      setError({ error: { message: 'The given name is invalid.' } });
      return;
    }
    if (typeof password !== 'string' || password.length === 0) {
      setError({ error: { message: 'The given password is invalid.' } });
      return;
    }

    const query = `
      mutation CreateEmployee($name: String!, $isAdmin: Boolean, $password: String!) {
        createEmployee(name: $name, isAdmin: $isAdmin, password: $password) {
          id
        }
      }
    `;

    let variables = { name: name, isAdmin: isAdmin, password: password };
    const data = await request(
      'http://localhost:3000/api/graphql',
      query,
      variables
    );
    const { createEmployee } = data;

    setCreateEmployee({ createEmployee });
    redirectToHome();
  };
  const redirectToHome = () => {
    window.location.href = '/';
  };
  return (
    <MainLayout>
      <div className={'bg-white bg-opacity-0 mt-1 ml-0.5'}>
        <div
          className={
            'flex text-black  flex-col justify-between items-start w-[9/10] mx-0 my-auto'
          }
        >
          <a
            href="src/pages/index.js"
            className={'text-black no-underline text-base m-4 w-fit'}
          >
            <h3 className={'flex flex-row justify-between items-center'}>
              <div className={'mr-[5px]'}>
                <svg
                  width="12"
                  height="19"
                  viewBox="0 0 12 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4729 2.80625L9.41663 0.75L0.666626 9.5L9.41663 18.25L11.4729 16.1938L4.79371 9.5L11.4729 2.80625Z"
                    fill="black"
                    fillOpacity="0.87"
                  />
                </svg>
              </div>
              Beheer
            </h3>
          </a>
          <h1 className={'text-3xl m-4 mt-0 w-fit'}>Nieuwe gebruiker</h1>
        </div>
        <hr className={'border-0 bg-[#DEF2E6] h-px w-full mt-[5%] mb-5'}></hr>
        <div
          className={
            'flex flex-col items-center justify-center h-full w-9/10 mx-0 my-auto'
          }
        >
          <div
            className={
              'text-left mb-5 bg-[#def2e6] rounded-t-[25px] h-[50px] w-[90%] pl-[50px] mt-[-100px]'
            }
          >
            <p className={'mt-4'}>Gebruiker aanmaken</p>
          </div>
          <form
            className={'w-[30%] mt-[50px]'}
            onSubmit={handleSubmit}
          >
            <label>Naam gebruiker</label>
            <input
              type="text"
              name="name"
              placeholder="Naam gebruiker"
              className={
                'w-full h-[25px] px-[12px] py-[12.5px] mx-[8px] ml-0 my-0 inline-block border-[#CCC] box-border'
              }
            />
            <label>Rechten</label>
            <select
              name="isAdmin"
              className={
                'w-full h-[25px] pt-0 pr-5 pl-[9px] mx-[8px] my-0 ml-0 inline-bloc border-[1px] border-[#ccc] box-border'
              }
            >
              <option value="true">Admin</option>
              <option value="false">Gebruiker</option>
            </select>
            <label>Pincode</label>
            <input
              type="password"
              name="password"
              placeholder="Pincode"
              className={
                'w-full h-[10px] px-[12px] py-[12.5px] mx-[8px] ml-0 my-0 inline-block border-[#CCC] box-border'
              }
            />

            <div
              className={
                ' bg-white bg-opacity-0 flex justify-end w-full mt-[7rem] h-0'
              }
            >
              <button
                type="submit"
                className={
                  'flex items-center bg-[#009a42]  border-2 border-[#009a42] text-white px-[15px] py-[18px] text-center no-underline text-[16px] mx-[4px] my[2px] cursor-pointer rounded-[5px] mr-[10px]'
                }
              >
                Voeg gebruiker
              </button>
              <button
                type="button"
                className={
                  'flex items-center bg-white text-black px-[5px] py-[18px] text-center no-underline text-[16px] mx-[4px] my[2px] cursor-pointer border-2 border-[black] rounded-[5px] mr-[90px]'
                }
              >
                Annuleren
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
