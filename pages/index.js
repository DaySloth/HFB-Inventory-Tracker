import Head from "next/head";
import { useRouter } from "next/router";
import NavHeader from "../components/header.js";
import {
  Icon,
  Table,
  Header,
  Input,
  Button,
  Modal,
  Message,
  Segment,
  Label,
  List,
} from "semantic-ui-react";
import { useSession } from "next-auth/client";
import db from "../util/firebase.config";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Loader from "../components/loader";
import axios from "axios";

export default function Home({ users }) {
  const Router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        window.location.href = "/authorize/signin";
      }
    }
  }, [loading]);

  const css = `
    .hidden {
      display: none;
    }
  `;

  return (
    <>
      <style>{css}</style>
      {loading && <Loader />}

      {session && (
        <>
          <Head>
            <title>HFB Mobile Manager</title>
          </Head>

          <NavHeader />

          <div className={styles.center}>
            <Header as="h2" icon>
              <Icon name="mobile alternate" />
              Users
            </Header>
          </div>

          <hr />
          {users ? (
            <>
              {/* <div className={styles.container}>
                <Input
                  icon="search"
                  placeholder="Search..."
                  className={styles.fullWidth}
                />
              </div> */}

              <div className={styles.tableContainer}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>First Name</Table.HeaderCell>
                      <Table.HeaderCell>Last Name</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Username</Table.HeaderCell>
                      <Table.HeaderCell>Password</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Web Access
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Edit
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {Object.keys(users).map((user) => (
                      <>
                        <Table.Row key={users[user].email}>
                          <Table.Cell>{users[user].first_name}</Table.Cell>
                          <Table.Cell>{users[user].last_name}</Table.Cell>
                          <Table.Cell>{users[user].email}</Table.Cell>
                          <Table.Cell>{user}</Table.Cell>
                          <Table.Cell>{"**********"}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {users[user].hasManagerAccess ? "Yes" : "No"}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            <Icon
                              name="edit"
                              className={styles.iconHover}
                              onClick={() => {
                                Router.push(
                                  `/users/edit/${users[
                                    user
                                  ].first_name.toLowerCase()}${users[
                                    user
                                  ].last_name.toLowerCase()}`
                                );
                              }}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </>
          ) : (
            <Segment placeholder>
              <Header icon>
                <Icon name="bath" />
                No users in the database
              </Header>
              <Button primary href="/users/add-a-user">
                Add a User
              </Button>
            </Segment>
          )}
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  let users = await db.ref(`/users/`).once("value");

  return {
    props: {
      users: users.val(),
    },
  };
}
