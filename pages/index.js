import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import CreateBook from '../components/createBook'
import CreateUser from '../components/createUser'
import Login from '../components/login'
import ReserveBook from '../components/reserveBook'
import ViewBook from '../components/ViewBook'
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <CreateBook></CreateBook>
      <ReserveBook></ReserveBook>
      <CreateUser></CreateUser>
      <Login></Login>
      <ViewBook />
    </>
  )
}
