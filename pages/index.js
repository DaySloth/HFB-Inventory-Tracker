import Head from "next/head";
import NavHeader from "../components/header.js";
import { Icon, Table, Header, Input, Button } from "semantic-ui-react";
import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";


export default function Home() {
    const [session, loading] = useSession();

    useEffect(() => {
        if (loading) {
            //wait
        } else {
            if (session) {
                console.log(session);
            } else {
                signIn();
            }
        }
    }, [loading]);

    return (
        <>
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
                                            />
                                            <Icon
                                                name="minus"
                                                className={styles.iconHover}
                                                color="red"
                                            />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>
                </>
            )}
        </>
    );
}
