import Head from 'next/head'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'

export default function Login() {
    return (
        <>
            <Head>
                <title>HFB Inventory | Login</title>
            </Head>

            <div className={styles.container}>
                <Form>
                    <Form.Input
                        icon='user'
                        iconPosition='left'
                        label='Username'
                        placeholder='Username'
                    />
                    <Form.Input
                        icon='lock'
                        iconPosition='left'
                        label='Password'
                        type='password'
                    />

                    <Button content='Login' primary />
                </Form>

            </div>
        </>
    )
}