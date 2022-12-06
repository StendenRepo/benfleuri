import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Layout.module.css';
import Sidebar from '../components/Sidebar.js';

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Head>
        <title>BenFleuri</title>
      </Head>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
