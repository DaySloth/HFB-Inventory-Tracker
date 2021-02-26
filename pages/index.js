import Head from "next/head";
import NavHeader from "../components/header.js";
import { Icon, Table, Header, Input, Button, Modal } from "semantic-ui-react";
import { signIn, useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Loader from "../components/loader";

export default function Home() {
    const [session, loading] = useSession();
    const [modalActions, setModalActions] = useState({
        action: "",
        message: "",
        count: 0,
    });

    function exampleReducer(state, action) {
        switch (action.type) {
            case "close":
                return { open: false };
            case "open":
                return { open: true, size: action.size };
            default:
                throw new Error("Unsupported action...");
        }
    }

    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    });
    const { open, size } = state;

    useEffect(() => {
        if (loading) {
            //wait
        } else {
            if (session) {
                console.log(session);
            } else {
                window.location.href = "/authorize/signin";
            }
        }
    }, [loading]);

    return (
        <>
            {loading && <Loader />}

            {session && (
                <>
                    <Head>
                        <title>HFB Inventory | Warehouse</title>
                    </Head>

                    <NavHeader />

                    <div className={styles.center}>
                        <Header as="h2" icon>
                            <Icon name="warehouse" />
                            Warehouse
                        </Header>
                    </div>

                    <hr />
                    <div className={styles.container}>
                        <Input
                            icon="search"
                            placeholder="Search..."
                            className={styles.fullWidth}
                        />
                    </div>

                    <div className={styles.tableContainer}>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Brand</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Part Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Part Number
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Category
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Quantity
                                    </Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">
                                        Edit
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Kohler</Table.Cell>
                                    <Table.Cell>Shower Head</Table.Cell>
                                    <Table.Cell>KH-SH-7936</Table.Cell>
                                    <Table.Cell>Shower Accessories</Table.Cell>
                                    <Table.Cell>10</Table.Cell>
                                    <Table.Cell>
                                        <div className={styles.centerText}>
                                            <Icon
                                                name="plus"
                                                className={styles.iconHover}
                                                color="green"
                                                onClick={() => {
                                                    setModalActions({
                                                        ...modalActions,
                                                        action: "add",
                                                        message:
                                                            "How many would you like to add?",
                                                    });
                                                    dispatch({
                                                        type: "open",
                                                        size: "mini",
                                                    });
                                                }}
                                            />
                                            <Icon
                                                name="minus"
                                                className={styles.iconHover}
                                                color="red"
                                                onClick={() => {
                                                    setModalActions({
                                                        ...modalActions,
                                                        action: "subtract",
                                                        message:
                                                            "How many would you like to subtract?",
                                                    });
                                                    dispatch({
                                                        type: "open",
                                                        size: "mini",
                                                    });
                                                }}
                                            />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </>
            )}

            <Modal
                size={size}
                open={open}
                onClose={() => dispatch({ type: "close" })}
            >
                <Modal.Header>{modalActions.message}</Modal.Header>
                <Modal.Content className={styles.centerText}>
                    <label>
                        {modalActions.action === "add"
                            ? "Parts to add: "
                            : "Parts to subtract: "}
                    </label>
                    <Input
                        type="number"
                        onChange={(e) =>
                            setModalActions({
                                ...modalActions,
                                count: e.target.value,
                            })
                        }
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        positive
                        onClick={() => {
                            //call the db
                            dispatch({ type: "close" });
                            setModalActions({
                                action: "",
                                message: "",
                                count: 0,
                            });
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        negative
                        onClick={() => {
                            dispatch({ type: "close" });
                            setModalActions({
                                action: "",
                                message: "",
                                count: 0,
                            });
                        }}
                    >
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
