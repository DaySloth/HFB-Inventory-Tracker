import Head from 'next/head'
import NavHeader from '../../components/header.js'
import { Header, Icon } from 'semantic-ui-react'
import styles from '../../styles/Home.module.css'

export default function AddaPart() {
    return (
        <>

            <Head>
                <title>HFB Inventory | Add a Part</title>
            </Head>

            <NavHeader />

            <div className={styles.center}>
                <Header as='h2' icon>
                    <Icon name='plus' />
                    Add a Part
                </Header>
            </div>

        </>
    )
}