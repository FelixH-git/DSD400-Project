import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import CreateBook from '../components/createBookComponent'
import CreateUser from '../components/createUserComponent'
import ReserveBook from '../components/reserveBook'
import ViewBook from '../components/ViewBook'
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <CreateBook></CreateBook>
      <ReserveBook></ReserveBook>
      <CreateUser></CreateUser>
      <ViewBook />
    </>
  )
}
