import Head from "next/head";
import { useRouter } from "next/router";
import NavHeader from "../../components/header.js";
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
  Form,
  Checkbox,
  Grid,
} from "semantic-ui-react";
import { useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Loader from "../../components/loader";
import axios from "axios";

export default function AddAProduct({ products }) {
  const Router = useRouter();
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
            <title>HFB Mobile Manager</title>
          </Head>

          <NavHeader />

          <div className={styles.center}>
            <Header as="h2" icon>
              <Icon name="warehouse" />
              Add A Product
            </Header>
          </div>

          <hr />
          {true ? (
            <>
              <div className={styles.tableContainer}>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="First name"
                      placeholder="First name"
                    />
                    <Form.Input
                      fluid
                      label="Last name"
                      placeholder="Last name"
                    />
                  </Form.Group>
                </Form>
              </div>
            </>
          ) : (
            <Segment placeholder>
              <Header icon>
                <Icon name="user secret" />
                Sneaky sneaks..
              </Header>
              {/* <Button primary href="/users/add-a-user">
                Add a User
              </Button> */}
            </Segment>
          )}
        </>
      )}
    </>
  );
}
