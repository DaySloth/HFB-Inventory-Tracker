import Head from 'next/head'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import styles from '../../styles/Home.module.css'
import { signIn, signOut, useSession } from "next-auth/client";


export default function SignIn() {
    return (
        <>
            <Head>
                <title>HFB Inventory | Signin</title>
            </Head>

            <div className={styles.container}>
                <Button content="Sign In" onClick={() => signIn('credentials', {username: 'testuser', password: '12345'})} primary />
            </div>
        </>
    );
}
