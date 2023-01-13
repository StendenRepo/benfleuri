import MainLayout from '../../layout/MainLayout';

function Header() {
    return <div className={`font-['Roboto'] ml-[5%] mt-[2%]`}>
        <div className={`font-['Roboto'] ml-[2%] mb-[1%]`}>
            <a href={"#"}>Klantoverzicht</a>
        </div>
        <div className={`font-['Roboto'] text-2xl font-bold`}>
            Klanten
        </div>
    </div>
}

function FormRow({children}) {
    return <div className={`flex gap-x-[10px] justify-between max-[900px]:flex-wrap max-[900px]:gap-x-0`}>
        {children}
    </div>
}

function InputField(props) {
    let type = props.type === undefined ? "text" : props.type;
    let labelStyle = "block text-[#39383A] text-xs font-['Roboto'] max-[900px]:w-full max-[900px]:pt-[10px] ";
    let inputStyle = "block text-black bg-white h-[25px] " +
        "w-full border-1 border-[#ADADAE] font-['Roboto'] ";

    if (props.name === "house-number") {
        labelStyle += "w-[10%]"
    } else if (props.name === "postal-code") {
        labelStyle += "w-[18%] ml-auto"
    } else {
        if (props.size === "full") {
            labelStyle += "flex-grow"
        } else if (props.size === "half") {
            labelStyle += "w-[49%]"
        }
    }
    return <label className={`${labelStyle}`}>
        {props.label}
        <input name={props.name} className={`${inputStyle}`} type={type}/>
    </label>
}

function Buttons() {
    return <div className={`flex gap-x-[10px] flex-row justify-end max-[900px]:justify-center max-[900px]:pt-[20px]`}>
        <button className={`text-sm py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] text-white font-bold border-0 rounded hover:bg-[#45a049]`}
                type="submit">Wijzig klant
        </button>
        <a href={"#"}>
            <button className={`text-sm font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black hover:bg-black hover:text-white`} type="button">Annuleren
            </button>
        </a>
    </div>
}

export default function EditCustomerPage() {
    return (
        <MainLayout>
            <Header/>
            <div className={`h-full flex justify-center flex-col items-center py-0 px-8`}>
                <div className={`mt-[5%] max-w-[900px] text-black rounded-t-lg flex flex-col
                 items-start bg-[#DEF2E6] w-[80%] py-[1%] px-[5%]`}>
                    <div>
                        <p>Klantgegevens</p>
                    </div>
                </div>
                <div id={`block`} className={`bg-[#f4f4f4] w-[80%] rounded-b-lg flex gap-x-[50px] max-w-[900px]
                 pt-0 pb-[2%] px-[5%] items-center justify-center max-[900px]:py-[2%] max-[900px]:px-0`}>
                    <form action='src/pages' method='post' className={`flex flex-col gap-y-[20px] w-[80%] max-w-[900px] pt-5
                     max-[900px]:gap-y-0 max-[900px]:pt-0`}>
                        <FormRow>
                            <InputField name="client-name" size="full" label="Naam opdrachtgever (optioneel)"/>
                        </FormRow>
                        <FormRow>
                            <InputField name="customer-firstname" size="half" label="Voornaam"/>
                            <InputField name="customer-lastname" size="half" label="Achternaam"/>
                        </FormRow>
                        <FormRow>
                            <InputField name="address" size="half" label="Straatnaam"/>
                            <InputField name="house-number" label="Nummer"/>
                            <InputField name="postal-code" label="Postcode"/>
                        </FormRow>
                        <FormRow>
                            <InputField name="residence" size="full" label="Plaats"/>
                        </FormRow>
                        <FormRow>
                            <InputField name="phone" size="full" type="tel" label="Telefoon Nr"/>
                        </FormRow>
                        <Buttons/>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}


