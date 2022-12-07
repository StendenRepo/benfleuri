import MainLayout from '../layout/MainLayout';
import styles from '../styles/EditCustomer.module.css'

function Header() {
    return <div className={`font-['Roboto'] ml-[5%] mt-[2%]`} >
        <div className={`font-['Roboto'] ml-[2%] mb-[1%]`}>
            <a href={"#"}>Klantoverzicht</a>
        </div>
        <div className={`font-['Roboto'] text-2xl font-bold`}>
            Klanten
        </div>
    </div>
}

function FormRow({children}){
    return <div className={`flex gap-x-[10px] justify-between`}>
        {children}
    </div>
}

function InputField(props) {
    let type = props.type === undefined ? "text" : props.type;
    let labelStyle = "block text-[#39383A] text-xs font-['Roboto'] ";
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
    return <div className={`flex gap-x-[10px] flex-row justify-end`}>
        <button className={`text-sm py-[8px] px-[20px] font-['Roboto'] 
        bg-[#00A952] text-white font-bold border-0 rounded`}
                type="submit">Wijzig klant</button>
        <a href={"#"}>
            <button className={`text-sm font-bold border-[1px] border-black rounded py-[8px] px-[20px] 
         font-['Roboto'] bg-white text-black`} type="button">Annuleren</button>
        </a>
    </div>
}

export default function EditCustomerPage() {
    return (
        <MainLayout>
            <Header/>
            <div className={styles.container}>
                <div className={styles.topBlock}>
                    <div>
                        <p>Klantgegevens</p>
                    </div>
                </div>
                <div className={styles.block}>
                    <form action='' method='post' className={styles.blockForm}>
                        <div className={styles.formInputs}></div>
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


