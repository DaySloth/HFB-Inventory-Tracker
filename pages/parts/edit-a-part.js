import Head from 'next/head'
import NavHeader from '../../components/header.js'
import { Header, Icon } from 'semantic-ui-react'
import styles from '../../styles/Home.module.css'

export default function EditaPart() {
    return (
        <>

            <Head>
                <title>HFB Inventory | Edit a Part</title>
            </Head>

            <NavHeader />

            <div className={styles.center}>
                <Header as='h2' icon>
                    <Icon name='edit outline' />
                    Edit a Part
                </Header>
            </div>
            <hr />

        </>
    )
}