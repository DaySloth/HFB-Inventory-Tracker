import Head from "next/head";
import NavHeader from "../components/header.js";
import { Icon, Table, Header, Input, Button, Modal } from "semantic-ui-react";
import { useSession } from "next-auth/client";
import { connectToDatabase } from "../util/mongodb";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Loader from "../components/loader";

export default function Home({ parts }) {
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
        if (!loading) {
            if (!session) {
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
                    {parts[0] ? (
                        <>
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
                                            <Table.HeaderCell>
                                                Brand
                                            </Table.HeaderCell>
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
                                        {parts.map((part) => (
                                            <>
                                                <Table.Row key={1}>
                                                    <Table.Cell>
                                                        {part.brand}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {part.part_name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {part.part_num}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {part.category}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {part.quantity}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div
                                                            className={
                                                                styles.centerText
                                                            }
                                                        >
                                                            <Icon
                                                                name="plus"
                                                                className={
                                                                    styles.iconHover
                                                                }
                                                                color="green"
                                                                onClick={() => {
                                                                    setModalActions(
                                                                        {
                                                                            ...modalActions,
                                                                            action:
                                                                                "add",
                                                                            message:
                                                                                "How many would you like to add?",
                                                                        }
                                                                    );
                                                                    dispatch({
                                                                        type:
                                                                            "open",
                                                                        size:
                                                                            "mini",
                                                                    });
                                                                }}
                                                            />
                                                            <Icon
                                                                name="minus"
                                                                className={
                                                                    styles.iconHover
                                                                }
                                                                color="red"
                                                                onClick={() => {
                                                                    setModalActions(
                                                                        {
                                                                            ...modalActions,
                                                                            action:
                                                                                "subtract",
                                                                            message:
                                                                                "How many would you like to subtract?",
                                                                        }
                                                                    );
                                                                    dispatch({
                                                                        type:
                                                                            "open",
                                                                        size:
                                                                            "mini",
                                                                    });
                                                                }}
                                                            />
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            </>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        </>
                    ) : (
                        <h2>no parts</h2>
                    )}
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

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    let parts = await db.collection("parts").find({}).toArray();

    return {
        props: {
            parts: JSON.parse(JSON.stringify(parts)),
        },
    };
}
