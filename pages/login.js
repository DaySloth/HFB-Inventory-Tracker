import Head from "next/head";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import styles from "../styles/Home.module.css";
import { signIn, signOut } from "next-auth/client";

export default function Login() {
    return (
        <>
            <Head>
                <title>HFB Inventory | Login</title>
            </Head>

            <div className={styles.container}>
                <Button content="Login" onClick={() => signIn()} primary />
            </div>
        </>
    );
}
