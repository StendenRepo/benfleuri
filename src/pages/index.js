import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar.js';
import MainLayout from '../layout/mainLayout';
import CreateUser from './/admin/createUser';

export default function Home() {
  return (
    <>
      <MainLayout>
        <CreateUser />
      </MainLayout>
    </>
  );
}
