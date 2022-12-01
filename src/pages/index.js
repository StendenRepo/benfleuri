import styles from '../styles/createUser.module.css';

export default function CreateUser() {
  return (
    <>
      <div>
        <h1>Nieuwe gebruiker</h1>
      </div>
      <div>
        <div className={styles.header}>
          <h3>Gebruiker aanmaken</h3>
        </div>
        <form>
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
            className={styles.input}
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
        </form>
      </div>
    </>
  );
}
