import Head from "next/head";
import { useRouter } from "next/router";
import NavHeader from "../../components/header.js";
import {
  Icon,
  Dropdown,
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

export default function AddAProduct({ products, categories }) {
  const Router = useRouter();
  const [session, loading] = useSession();
  const selectCategories = categories.map((category) => {
    return { key: category[0], text: category, value: category };
  });
  selectCategories.push({
    key: 123,
    text: "Add new category",
    value: "create category",
  });

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    quantity: "",
    category: "",
    sub_category: "",
    finish: "",
    length: "",
    width: "",
    height: "",
    image: "",
  });

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

          {products ? (
            <>
              <div className={styles.tableContainer}>
                <Form>
                  <Form.Group widths="equal">
                    {newProduct.category === "create category" ? (
                      <Form.Input fluid label="New Category" />
                    ) : (
                      <Form.Select
                        fluid
                        label="Category"
                        options={selectCategories}
                        onChange={(e, { value }) =>
                          setNewProduct({ ...newProduct, category: value })
                        }
                      />
                    )}
                    <Form.Input fluid label="Title" />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input fluid label="Finish" />
                    <Form.Input fluid label="Length" type="number" />
                    <Form.Input fluid label="Width" type="number" />
                    <Form.Input fluid label="Height" type="number" />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input fluid label="Part #" />
                    <Form.Input fluid label="Price" type="number" />
                    <Form.Input fluid label="Quantity" type="number" />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Button type="submit" color="green">Submit</Button>
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

export async function getServerSideProps() {
  const { data: products } = await axios.get(
    "http://localhost:3001/api/products"
  );

  console.log(products);

  return {
    props: {
      products: products,
      categories: ["Doors", "Wall Systems"],
    },
  };
}
