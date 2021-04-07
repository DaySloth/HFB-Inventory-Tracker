import Head from "next/head";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Message,
  Checkbox,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import styles from "../../../styles/Home.module.css";
import axios from "axios";
import NavHeader from "../../../components/header";
import { useSession } from "next-auth/client";
import Loader from "../../../components/loader";
import db from "../../../util/firebase.config";
import { useRouter } from "next/router";

export default function EditUser({ dbUser }) {
  const Router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        window.location.href = "/authorize/signin";
      }
    }
  }, [loading]);

  const user = dbUser || {};

  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [resetPassword, setResetPassword] = useState(user.tempPassword);
  const [webAccess, setWebAccess] = useState(user.hasManagerAccess);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [pageMessage, setPageMessage] = useState();
  const [isDifferent, setIsDifferent] = useState(false);

  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (
      first_name !== user.first_name ||
      last_name !== user.last_name ||
      email !== user.email ||
      webAccess !== user.hasManagerAccess ||
      resetPassword
    ) {
      setIsDifferent(true);
    } else {
      setIsDifferent(false);
    }
  }, [first_name, last_name, email, webAccess, resetPassword]);

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword !== password) {
        setPasswordError("Passwords do not match");
      } else if (confirmPassword === password) {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [confirmPassword]);

  async function saveEdit(e) {
    e.preventDefault();
    setButtonLoading(true);
    setPageMessage("");
    setPasswordError("");

    const updatedUser = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      hasManagerAccess: webAccess,
      tempPassword: resetPassword,
    };

    if (resetPassword) {
      if (!passwordError) {
        if (password.trim()) {
          updatedUser.password = password;
        } else {
          setPasswordError("Password cannot be blank");
          setButtonLoading(false);
          return;
        }
      } else {
        setButtonLoading(false);
        return;
      }
    }

    if (
      `${first_name.toLowerCase()}${last_name.toLowerCase()}` !==
      `${user.first_name.toLowerCase()}${user.last_name.toLowerCase()}`
    ) {
      updatedUser.oldUsername = `${user.first_name.toLowerCase()}${user.last_name.toLowerCase()}`;
    }
    const { data } = await axios.post(
      `/api/mobile/users/update/${first_name.toLowerCase()}${last_name.toLowerCase()}`,
      updatedUser
    );
    if (data.status) {
      if (data.status === 400) {
        //set error message
        setPageMessage({
          color: "red",
          message: data.message,
        });
        setButtonLoading(false);
      } else if (data.status === 200) {
        //set success message
        setPageMessage({
          color: "green",
          message: data.message,
        });
        setButtonLoading(false);
      }
    }
  }

  async function removeUser(e) {
    e.preventDefault();
    const { data } = await axios.get(
      `/api/mobile/users/delete/${first_name.toLowerCase()}${last_name.toLowerCase()}`
    );
    if (data.status) {
      if (data.status === 400) {
        //set error message
        setPageMessage({
          color: "red",
          message: data.message,
        });
        setButtonLoading(false);
      } else if (data.status === 200) {
        //set success message
        setPageMessage({
          color: "green",
          message: data.message,
        });
        setButtonLoading(false);
        window.location.href = "/";
      }
    }
  }

  return (
    <>
      {loading && <Loader />}
      {session && (
        <>
          <Head>
            <title>HFB Mobile Manager</title>
          </Head>

          <NavHeader />

          <div className={styles.center}>
            <Header as="h2" icon>
              <Icon name="edit outline" />
              Edit User
            </Header>
          </div>

          <hr />

          <div className={styles.container}>
            {user.first_name ? (
              <Form>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="First Name"
                  type="text"
                  placeholder="First name"
                  onChange={(event) => setFirstName(event.target.value)}
                  value={first_name}
                  required
                />

                <Form.Input
                  label="Last Name"
                  type="text"
                  placeholder="Last name"
                  onChange={(event) => setLastName(event.target.value)}
                  value={last_name}
                  required
                />

                <Form.Input
                  label="Email"
                  type="email"
                  placeholder="User@email.com"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  required
                />

                <div className={styles.block}>
                  <Checkbox
                    label="Has Web Manager Access"
                    className={styles.topBottomSpacing}
                    onChange={() => setWebAccess(!webAccess)}
                    checked={webAccess}
                  />
                </div>
                {resetPassword && (
                  <>
                    <Form.Input
                      icon="lock"
                      iconPosition="left"
                      label="New Temporary Password"
                      type="password"
                      onChange={(event) => setPassword(event.target.value)}
                      className={passwordError && styles.redGlowingBorder}
                      value={password}
                      required
                    />

                    <Form.Input
                      icon="lock"
                      iconPosition="left"
                      label="Confirm Temporary Password"
                      type="password"
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      value={confirmPassword}
                      className={passwordError && styles.redGlowingBorder}
                      required
                    />

                    {passwordError && (
                      <>
                        <h5 className={styles.redText}>{passwordError}</h5>
                      </>
                    )}
                  </>
                )}

                {pageMessage && (
                  <>
                    <Message color={pageMessage.color}>
                      <Message.Header>{pageMessage.message}</Message.Header>
                    </Message>
                  </>
                )}

                <div className={styles.center} style={{ width: "400px" }}>
                  <Button.Group>
                    <Button
                      icon="trash"
                      content="Delete User"
                      color="red"
                      onClick={(e) => {
                        removeUser(e);
                      }}
                    />
                    <Button
                      content={
                        resetPassword ? "Cancel Reset" : "Reset Password"
                      }
                      onClick={(e) => {
                        setResetPassword(!resetPassword);
                      }}
                      color={resetPassword ? "blue" : "orange"}
                    />

                    {isDifferent && (
                      <Button
                        icon="save"
                        color="green"
                        content="Save Edit"
                        onClick={(e) => {
                          saveEdit(e);
                        }}
                        loading={buttonLoading}
                      />
                    )}
                  </Button.Group>
                </div>
              </Form>
            ) : (
              <Segment placeholder>
                <Header icon>
                  <Icon name="user" />
                  No user found
                </Header>
                <Button
                  primary
                  onClick={() => {
                    window.location.href = "/users/add-a-user";
                  }}
                >
                  Add User
                </Button>
              </Segment>
            )}
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ params }) {
  let user = await db.ref(`/users/${params.user}`).once("value");

  return {
    props: {
      dbUser: user.val(),
    },
  };
}
