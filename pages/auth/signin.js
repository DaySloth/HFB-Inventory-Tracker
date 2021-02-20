import Head from 'next/head'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import styles from '../../styles/Home.module.css'

export default function SignIn() {
    return (
        <>
            <Head>
                <title>HFB Inventory | Signin</title>
            </Head>

            <div className={styles.container}>
                <Button content="Login" onClick={() => signIn()} primary />
            </div>
        </>
    );
}
