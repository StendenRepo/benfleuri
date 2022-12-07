import MainLayout from '../../../layout/MainLayout';
import styles from '../../../styles/createUser.module.css';

export default function CreateUser() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <a href="index.js">
            <h3>
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
              Beheer
            </h3>
          </a>
          <h1>Nieuwe gebruiker</h1>
        </div>
        <hr className={styles.line}></hr>
        <div className={styles.main}>
          <div className={styles.header}>
            <p>Gebruiker aanmaken</p>
          </div>
          <form className={styles.form}>
            <label>Naam gebruiker</label>
            <input
              type="text"
              name="Naam"
              placeholder="Naam gebruiker"
              className={styles.input}
            />
            <label>Rechten</label>
            <select
              name="role"
              className={styles.input2}
            >
              <option value="admin">Admin</option>
              <option value="user">Gebruiker</option>
            </select>
            <label>Pincode</label>
            <input
              type="password"
              name="pincode"
              placeholder="Pincode"
              className={styles.input}
            />
          </form>
          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.button}
            >
              Voeg gebruiker
            </button>
            <button
              type="button"
              className={styles.button2}
            >
              Annuleren
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
