import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import styles from "../../styles/Home.module.css";
import axios from "axios";

export default function SignUp() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState();
    const [pageMessage, setPageMessage] = useState();
    const [adminPassword, setAdminPassword] = useState("");

    const [loading, setLoading] = useState(false);

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

    const signup = async (event) => {
        event.preventDefault();
        setPageMessage("");
        setLoading(!loading);
        if (
            !passwordError &&
            first_name &&
            last_name &&
            username &&
            adminPassword
        ) {
            //call to create user
            const user = {
                first_name: first_name,
                last_name: last_name,
                email: username,
                password: password,
                admin_password: adminPassword,
            };

            try {
                const url = `/api/user/create`;
                const { data: newUser } = await axios.post(url, user);
                console.log(newUser);
                setLoading(false);
                if (newUser.status) {
                    if (newUser.status === 400) {
                        //set error message
                        setPageMessage({
                            color: "red",
                            message: newUser.msg,
                        });
                    } else if (newUser.status === 200) {
                        //set success message
                        setPageMessage({
                            color: "green",
                            message: newUser.msg,
                        });
                    }
                }
            } catch (error) {
                console.log(error);
                //set error message
                setLoading(false);
            }
        } else {
            //error
            setPageMessage({
                color: "red",
                message: "Please finish filling out the form",
            });
            setLoading(false);
        }
    };

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setPageMessage("");
        setAdminPassword("");
    };

    return (
        <>
            <Head>
                <title>HFB Inventory | Signup</title>
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
                        placeholder="Your@email.com"
                        onChange={(event) => setUsername(event.target.value)}
                        value={username}
                        required
                    />

                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        label="Password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        className={passwordError && styles.redGlowingBorder}
                        value={password}
                        required
                    />

                    <Form.Input
                        icon="lock"
                        iconPosition="left"
                        label="Confirm Password"
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

                    <Form.Input
                        icon="user secret"
                        iconPosition="left"
                        label="Administrator Password (to create the user)"
                        type="password"
                        onChange={(event) =>
                            setAdminPassword(event.target.value)
                        }
                        value={adminPassword}
                        required
                    />

                    {pageMessage && (
                        <>
                            <Message color={pageMessage.color}>
                                <Message.Header>
                                    {pageMessage.message}
                                </Message.Header>
                            </Message>
                        </>
                    )}

                    <div className={styles.center}>
                        <Button
                            content="Create User"
                            onClick={(e) => {
                                signup(e);
                            }}
                            primary
                            className={styles.center}
                            loading={loading}
                        />
                    </div>
                </Form>
            </div>
        </>
    );
}