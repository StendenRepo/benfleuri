import MainLayout from '../../layout/MainLayout';
//Is used for hyperlinks.
import Link from 'next/link'
import {
  addEmployee,
  getAllEmployees,
  updateEmployee,
} from "../../components/sql";
import {validateElements} from "../../components/OrderFormFunctions";
import {useRouter} from "next/router";
import {WhiteButton} from "../../components/OrderTable";
import {ArrowLeftIcon} from "@heroicons/react/20/solid";

/**
 * Handles the validating and submitting of the form.
 * When something goes wrong, an alert with an error will be displayed.
 * Otherwise, the data will be added to the database and the user will be redirected
 * to the orderOverview page.
 */

async function handleFormSubmit() {
  //Check if all the required fields have been filled out.
  let missingInput = validateElements(false, document.querySelectorAll("input[type=text]"));
  missingInput = validateElements(missingInput, document.querySelectorAll("input[type=password]"));

  if (missingInput) {
    alert("Er zijn verplichte velden niet ingevuld.")
    return
  }

  let employee = await addEmployee(
      document.getElementById('employee-name').value,
      document.getElementById('isAdmin').value === "true",
      document.getElementById('pincode').value,
  )

  if (employee.error) {
    alert(employee.error.message);
  } else {
    //Redirect to orderOverview if the Order was successfully added to the database.
    window.location.replace("./employeeOverview");
  }
}

function Header() {
  return (
      <div
          className={`border-b pb-[4%] flex flex-col font-['Roboto'] px-[4%] pt-[2%]`}
      >
        <div
            className={`flex font-['Roboto'] ml-[1%] mb-[1%] w-[150px] justify-between`}
        >
          <Link
              className={`mr-[50px]`}
              href={'/'}
          >
            <ArrowLeftIcon
                className="h-5 w-5 pr-[2%] inline-block"
                aria-hidden="true"
            />
            Dashboard
          </Link>
        </div>
        <div className={`flex flex-row`}>
          <div
              className={`font-['Roboto'] items-start text-3xl font-bold w-1/2 `}
          >
            Medewerker toevoegen
          </div>
        </div>
      </div>
  );
}

function FormRow({children}) {
  return <div className={`flex gap-x-[10px] justify-between max-[900px]:flex-wrap max-[900px]:gap-x-0`}>
    {children}
  </div>
}

function InputField(props) {
  let type = props.type === undefined ? "text" : props.type;
  let labelStyle = "flex-grow lock text-[#39383A] text-xs font-['Roboto'] max-[900px]:w-full max-[900px]:pt-[10px] ";
  let inputStyle = "block text-black bg-white h-[25px] " +
      "w-full border-1 border-[#ADADAE] font-['Roboto'] ";

  if(props.required){
    return <label className={`${labelStyle}`}>
      {props.label}
      <input required id={props.id} defaultValue={props.defaultValue} className={`${inputStyle}`} type={type}/>
    </label>
  } else {
    return <label className={`${labelStyle}`}>
      {props.label}
      <input id={props.id} defaultValue={props.defaultValue} className={`${inputStyle}`} type={type}/>
    </label>
  }
}

function Buttons() {
  return <div className={`flex gap-x-[10px] flex-row justify-end max-[900px]:justify-center max-[900px]:pt-[20px]`}>
    <input className={`text-sm border-[1px] h-full py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] text-white font-bold border-[#45a049] rounded-lg hover:bg-[#45a049]`}
           value="Toevoegen" type="button" onClick={
      async () => {
        await handleFormSubmit();
      }
    }></input>
    <WhiteButton link={"./employeeOverview"}>Annuleren</WhiteButton>
  </div>
}

/**
 * Gets called when the page is loaded, this is where the data from the database is loaded.
 *
 * @returns {Promise<{props: {findAllCustomers: *, findAllEmployees: *}}>}
 */
export async function getServerSideProps() {
  const {findAllEmployees} = await getAllEmployees("id name isAdmin")

  return {
    props: {
      findAllEmployees
    },
  }
}

export default function CreateUser() {
  return (
      <MainLayout>
        <Header/>
        <div className={`h-full flex justify-center flex-col items-center py-0 px-8`}>
          <div className={`mt-[5%] max-w-[900px] text-black rounded-t-lg flex flex-col
                 items-start bg-[#DEF2E6] w-[80%] py-[1%] px-[5%]`}>
            <div>
              <p>Medewerker gegevens</p>
            </div>
          </div>
          <div id={`block`} className={`bg-[#f4f4f4] w-[80%] rounded-b-lg flex gap-x-[50px] max-w-[900px]
                 pt-0 pb-[2%] px-[5%] items-center justify-center max-[900px]:py-[2%] max-[900px]:px-0`}>
            <form action='src/pages' method='post' className={`flex flex-col gap-y-[20px] w-[80%] max-w-[900px] pt-5
                     max-[900px]:gap-y-0 max-[900px]:pt-0`}>
              <FormRow>
                <InputField id="employee-name" required="true"
                            size="full" label="Naam"/>
              </FormRow>
              <FormRow>
                <label className={"flex-grow block text-[#39383A] text-xs font-['Roboto'] max-[900px]:w-full max-[900px]:pt-[10px]"}>Rechten
                <select id="isAdmin" name="isAdmin" required
                    className={
                      "block text-black bg-white h-[25px] w-full border-1 border-[#ADADAE] font-['Roboto'] "
                    }>
                  <option value="true">Admin</option>
                  <option value="false">Gebruiker</option>
                </select>
                </label>
              </FormRow>
              <FormRow>
                <InputField id="pincode" type={"password"} size="full" required="true"
                            label="Pincode"/>
              </FormRow>
              <Buttons></Buttons>
            </form>
          </div>
        </div>
      </MainLayout>
  )
}


