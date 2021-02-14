import Head from 'next/head'
import { Dropdown, Menu, Grid } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'

export default function Home() {

  const options = [
    { key: 1, text: <a href="/">View Warehouse</a>, value: 1 },
    { key: 2, text: <a href="/add-a-part">Add a Part</a>, value: 2 },
    { key: 3, text: <a href="/edit-a-part">Edit a Part</a>, value: 3 },
  ]

  return (
    <>
      <Head>
        <title>HFB Inventory</title>
      </Head>
      <nav className={styles.mainNav}>
        <Grid columns='equal' className={styles.centerText}>
          <Grid.Row>
            <Grid.Column>
              <h2>Logo</h2>
            </Grid.Column>
            <Grid.Column>
              <h2>Inventory Management</h2>
            </Grid.Column>
            <Grid.Column>
              <div className={styles.floatLeft}>
                <Menu compact>
                  <Dropdown text='Menu' options={options} simple item />
                </Menu>
              </div>
              <div className={styles.floatRight}>
                <p>Hello Paige, <span>Logout</span></p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </nav>
    </>
  )
}
