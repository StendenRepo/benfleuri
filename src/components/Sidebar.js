import styles from "../styles/Sidebar.module.css"
import Image from 'next/image'

export default function sidebar() {
    return (
        <div className={styles.container}>
            <div className={styles.imagecontainer}>
                <Image
                    src="/Logo.svg"
                    width={100}
                    height={100}
                    className={styles.logo}
                />
            </div>
            <div>
                <p className={styles.welcomeText}>Goedemorgen, Bernhardus</p>
                <p className={styles.admin}>Admin</p>
            </div>
            <hr className={styles.hr}></hr>
            <div className={styles.pages}>
                <div className={styles.screenBox}>
                    <Image
                        src='/heart.svg'
                        width={20}
                        height={20}
                        className={styles.heart}
                    />
                    <p className={styles.screenName}>Dashboard</p>
                </div>
                <div className={styles.screenBox}>
                    <Image
                        src='/heart.svg'
                        width={20}
                        height={20}
                        className={styles.heart}
                    />
                    <p className={styles.screenName}>Nieuwe Bestelling</p>
                </div>
                <div className={styles.screenBox}>
                    <Image
                        src='/heart.svg'
                        width={20}
                        height={20}
                        className={styles.heart}
                    />
                    <p className={styles.screenName}>Bestellingen</p>
                </div>
                <div className={styles.screenBox}>
                    <Image
                        src='/heart.svg'
                        width={20}
                        height={20}
                        className={styles.heart}
                    />
                    <p className={styles.screenName}>Gebruikerbeheer</p>
                </div>
            </div>
            <div className={styles.logoutContainer}>
                <button className={styles.logoutButton}>Logout</button>
            </div>
        </div>
    )
}