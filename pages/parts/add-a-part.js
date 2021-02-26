import Head from "next/head";
import NavHeader from "../../components/header.js";
import { Header, Icon, Grid, Input, Select, Button } from "semantic-ui-react";
import { useSession } from "next-auth/client";
import axios from "axios";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function AddaPart() {
    const categoryOptions = [];

    const [session, loading] = useSession();
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [pageError, setPageError] = useState("");
    const [brand, setBrand] = useState("");
    const [partNum, setPartNum] = useState("");
    const [partName, setPartName] = useState("");
    const [serial, setSerial] = useState("");
    const [color, setColor] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");

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

    const createPart = async () => {
        const data = {};
        try {
            const addedPart = axios.post("/api/parts/create", data);
            console.log(addedPart);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {loading && <Loader />}

            {session && (
                <>
                    <Head>
                        <title>HFB Inventory | Add a Part</title>
                    </Head>

                    <NavHeader />

                    <div className={styles.center}>
                        <Header as="h2" icon>
                            <Icon name="plus" />
                            Add a Part
                        </Header>
                    </div>
                    <hr />

                    <div className={styles.container}>
                        <Grid columns="equal">
                            <Grid.Row>
                                <Grid.Column>
                                    <label>Brand:</label>
                                    <Input
                                        className={styles.fullWidth}
                                        onChange={(e) => {
                                            setBrand(e.target.value);
                                        }}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <label>Part/Model #:</label>
                                    <Input
                                        className={styles.fullWidth}
                                        onChange={(e) => {
                                            setPartNum(e.target.value);
                                        }}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <label>Part Name:</label>
                                    <Input
                                        className={styles.fullWidth}
                                        onChange={(e) => {
                                            setPartName(e.target.value);
                                        }}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <label>Serial:</label>
                                    <Input
                                        className={styles.fullWidth}
                                        onChange={(e) => {
                                            setSerial(e.target.value);
                                        }}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <label>Color:</label>
                                    <Input
                                        className={styles.fullWidth}
                                        onChange={(e) => {
                                            setColor(e.target.value);
                                        }}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div>
                                        <label>Category:</label>
                                        <br />
                                        <Select
                                            options={categoryOptions}
                                            className={styles.fullWidth}
                                            onChange={(e) => {
                                                setCategory(e.target.value);
                                            }}
                                        />
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div>
                                        <label>Quantity:</label>
                                        <Input
                                            type="number"
                                            className={styles.fullWidth}
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                        />
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <div className={styles.centerButton}>
                            <Button
                                inverted
                                color="green"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setWaitingForResponse(true);
                                    createPart();
                                }}
                                loading={waitingForResponse}
                            >
                                Add Part to Warehouse
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
