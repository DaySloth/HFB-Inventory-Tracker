import { Dropdown, Menu, Grid } from "semantic-ui-react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header() {
    const options = [
        { key: 1, text: <Link href="/">View Warehouse</Link>, value: 1 },
        {
            key: 2,
            text: <Link href="/parts/add-a-part">Add a Part</Link>,
            value: 2,
        },
        {
            key: 3,
            text: <Link href="/parts/edit-a-part">Edit a Part</Link>,
            value: 3,
        },
    ];

    return (
        <nav className={styles.mainNav}>
            <Grid columns="equal" className={styles.centerText}>
                <Grid.Row>
                    <Grid.Column>
                        <img
                            src="/HomeForeverBaths-Logo-White.PNG"
                            className={styles.headerLogo}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <h2>Inventory Management</h2>
                    </Grid.Column>
                    <Grid.Column>
                        <div className={styles.floatLeft}>
                            <Menu compact>
                                <Dropdown
                                    text="Menu"
                                    options={options}
                                    simple
                                    item
                                />
                            </Menu>
                        </div>
                        <div className={styles.floatRight}>
                            <h3>
                                Hello Paige, <span>Logout</span>
                            </h3>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </nav>
    );
}
