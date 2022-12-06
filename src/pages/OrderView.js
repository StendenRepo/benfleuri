import styles from '../styles/OrderView.module.css';

export default function OrderView() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.backtext}>Dashboard</p>
            <p className={styles.title}>Bestellingen</p>
          </div>
          <div>
            <button className={styles.newOrder}>Nieuwe Bestelling</button>
            <button className={styles.importOrder}>Importeer Bestelling</button>
            <button className={styles.exportOrder}>
              Exporteer Bestellingen
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
