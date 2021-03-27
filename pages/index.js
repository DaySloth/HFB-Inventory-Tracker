import Head from "next/head";
import Router from "next/router";
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
  console.log(Object.keys(users));
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
  const [error, setError] = useState("");

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
                          <Table.Cell>
                            {"**********"}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            <Icon name="edit" className={styles.iconHover} />
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
              <Button primary href="/parts/add-a-part">
                Add a User
              </Button>
            </Segment>
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
          <div>
            <strong>Part/Model #:</strong>
            {modalActions.part}
          </div>
          <br />
          <label>
            {modalActions.action === "add"
              ? "Amount to Add: "
              : "Amount to Subtract: "}
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
          {error && (
            <Message color="red">
              <Message.Header>{error}</Message.Header>
            </Message>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            onClick={() => {
              //call the db
              setError("");
              editInventory();
            }}
          >
            Confirm
          </Button>
          <Button
            negative
            onClick={() => {
              setError("");
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
  let users = await db.ref(`/users/`).once("value");

  return {
    props: {
      users: users.val(),
    },
  };
}
