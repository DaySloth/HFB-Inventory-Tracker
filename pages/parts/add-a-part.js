import Head from "next/head";
import NavHeader from "../../components/header.js";
import {
  Header,
  Icon,
  Grid,
  Input,
  Select,
  Button,
  Message,
  Dropdown,
} from "semantic-ui-react";
import { useSession } from "next-auth/client";
import axios from "axios";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import { connectToDatabase } from "../../util/mongodb";
import styles from "../../styles/Home.module.css";

export default function AddaPart({ categories }) {
  const [session, loading] = useSession();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [brand, setBrand] = useState("");
  const [partNum, setPartNum] = useState("");
  const [partName, setPartName] = useState("");
  const [serial, setSerial] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (!loading) {
      if (!session) {
        window.location.href = "/authorize/signin";
      }
    }
  }, [loading]);

  const createPart = async () => {
    setError("");
    setSuccess("");
    if (brand && partNum && partName && color && quantity) {
      const data = {
        brand: brand,
        part_num: partNum,
        part_name: partName,
        color: color,
        quantity: parseInt(quantity),
      };

      if (newCategory) {
        data.category = newCategory;
      } else {
        data.category = category;
      }

      if (serial) {
        data.serial = serial;
      } else {
        data.serial = undefined;
      }

      try {
        const addedPart = await axios.post("/api/parts/create", data);
        if (addedPart.data.status === 200) {
          //success
          setWaitingForResponse(false);
          setSuccess("Successfully added part");
        } else {
          setWaitingForResponse(false);
          setError("An error occured, please try again");
        }
      } catch (error) {
        setWaitingForResponse(false);
        setError("An error occured, please try again");
      }
    } else {
      setWaitingForResponse(false);
      setError("Please finish filling out form");
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
                    value={brand}
                  />
                </Grid.Column>
                <Grid.Column>
                  <label>Part/Model #:</label>
                  <Input
                    className={styles.fullWidth}
                    onChange={(e) => {
                      setPartNum(e.target.value);
                    }}
                    value={partNum}
                  />
                </Grid.Column>
                <Grid.Column>
                  <label>Part Name:</label>
                  <Input
                    className={styles.fullWidth}
                    onChange={(e) => {
                      setPartName(e.target.value);
                    }}
                    value={partName}
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
                    value={serial}
                  />
                </Grid.Column>
                <Grid.Column>
                  <label>Color:</label>
                  <Input
                    className={styles.fullWidth}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                    value={color}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  {category === "Add Category" ||
                  categories[0] === undefined ? (
                    <>
                      <label>Add a category:</label>
                      <Input
                        className={styles.fullWidth}
                        onChange={(e) => {
                          setNewCategory(e.target.value);
                        }}
                        value={newCategory}
                      />
                    </>
                  ) : (
                    <div>
                      <label>Category:</label>
                      <br />
                      <Select
                        options={categories}
                        className={styles.fullWidth}
                        onChange={(e) => {
                          setCategory(e.target.textContent);
                        }}
                        value={category}
                      />
                    </div>
                  )}
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
                      value={quantity}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {error && (
              <>
                <Message color="red">
                  <Message.Header>
                    Please finish filling out the form
                  </Message.Header>
                </Message>
              </>
            )}
            {success && (
              <>
                <Message color="green">
                  <Message.Header>
                    Successfully added part to warehouse
                  </Message.Header>
                </Message>
              </>
            )}
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

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  let dbCategories = await db
    .collection("parts")
    .find({})
    .project({ _id: 0, category: true })
    .toArray();

  let uniqueCategories = [
    ...new Set(
      dbCategories.map((el) => {
        return el.category;
      })
    ),
  ];

  let categoryOptions = [];

  if (uniqueCategories[0]) {
    categoryOptions = [{ value: "add category", text: "Add Category" }];

    uniqueCategories.forEach((element) => {
      categoryOptions.unshift({ value: element, text: element });
    });
  }

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categoryOptions)),
    },
  };
}
