import Head from 'next/head'
import Header from '../components/header.js'
import Login from './login.js'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      {true ?
        <>
          <Head>
            <title>HFB Inventory | Warehouse</title>
          </Head>

          <Header />
        </>
        :
        <Login />
      }

    </>
  )
}