import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { error } = router.query;

  return (
    <>
      <Head>
        <title>HFB Inventory | Signin</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.centerLogo}>
          <img
            src="/HomeForeverBaths-Black-Horz.png"
            alt="Home Forever Baths logo"
            className={styles.centerLogo}
          />
        </div>

        <Form>
          <Form.Input
            icon="user"
            iconPosition="left"
            label="Username"
            type="email"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />

          {error && (
            <>
              <Message color="red">
                <Message.Header>Invalid username or password</Message.Header>
              </Message>
            </>
          )}

          <div className={styles.center}>
            <Button
              content="Sign In"
              onClick={() => {
                setLoading(true);
                signIn("credentials", {
                  username: username,
                  password: password,
                  callbackUrl: "http://localhost:3000",
                });
              }}
              primary
              className={styles.center}
              loading={loading}
            />
            <div className={styles.centerText} style={{ marginTop: "10px" }}>
              <a href="#">Forgot Password?</a>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
