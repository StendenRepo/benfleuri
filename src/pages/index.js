import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar.js';

export default function CreateUser() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BenFleuri</title>
      </Head>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
    </div>
  );
}
