import Head from "next/head";
import NavHeader from "../../components/header.js";
import { Header, Icon, Grid, Input, Select, Button } from "semantic-ui-react";
import { signIn, useSession } from "next-auth/client";
import Loader from "../../components/loader";
import { useEffect } from "react";
import styles from "../../styles/Home.module.css";

export default function EditaPart() {
    const categoryOptions = [
        { key: 1, value: "accessories", text: "Accessories" },
    ];

    const [session, loading] = useSession();

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
                        <title>HFB Inventory | Edit a Part</title>
                    </Head>

                    <NavHeader />

                    <div className={styles.center}>
                        <Header as="h2" icon>
                            <Icon name="edit outline" />
                            Edit a Part
                        </Header>
                    </div>
                    <hr />
                    <div className={styles.container}>
                        <label>Search for part:</label>
                        <br />
                        <Input
                            icon="search"
                            placeholder="Search..."
                            className={styles.halfWidth}
                        />
                        <Button inverted color="blue">
                            Search
                        </Button>
                    </div>

                    {/* <div className={styles.container}>
                        <Grid columns="equal">
                            <Grid.Row>
                                <Grid.Column>
                                    <label>Brand:</label>
                                    <Input className={styles.fullWidth} />
                                </Grid.Column>
                                <Grid.Column>
                                    <label>Part/Model #:</label>
                                    <Input className={styles.fullWidth} />
                                </Grid.Column>
                                <Grid.Column>
                                    <label>Part Name:</label>
                                    <Input className={styles.fullWidth} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <label>Serial:</label>
                                    <Input className={styles.fullWidth} />
                                </Grid.Column>
                                <Grid.Column>
                                    <label>Color:</label>
                                    <Input className={styles.fullWidth} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <label>Category:</label>
                                    <br />
                                    <Select
                                        options={categoryOptions}
                                        className={styles.fullWidth}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <div>
                                        <label>Quantity:</label>
                                        <Input
                                            type="number"
                                            className={styles.fullWidth}
                                        />
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <div className={styles.centerButton}>
                            <Button inverted color="blue">
                                Save Edit
                            </Button>
                        </div>
                    </div> */}
                </>
            )}
        </>
    );
}
