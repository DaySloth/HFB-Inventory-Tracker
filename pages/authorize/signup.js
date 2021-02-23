import Head from "next/head";
import { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

export default function SignIn() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const router = useRouter();
    const { error } = router.query;

    return (
        <>
            <Head>
                <title>HFB Inventory | Signin</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.center}>
                    <img
                        src="/HomeForeverBaths-Black-Horz.png"
                        alt="Home Forever Baths logo"
                        className={styles.center}
                    />
                </div>

                <Form>
                    <Form.Input
                        label="Email"
                        type="email"
                        placeholder="Your@email.com"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        label="Password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    {error && (
                        <>
                            <Message color="red">
                                <Message.Header>{error}</Message.Header>
                            </Message>
                        </>
                    )}

                    <div className={styles.center}>
                        <Button
                            content="Signup"
                            onClick={() => {
                                //call function
                            }}
                            primary
                            className={styles.center}
                        />
                    </div>
                </Form>
            </div>
        </>
    );
}
