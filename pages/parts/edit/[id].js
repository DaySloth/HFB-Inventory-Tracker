import { ObjectId } from "mongodb";
import Head from "next/head";
import NavHeader from "../../../components/header.js";
import Loader from "../../../components/loader.js";
import { useSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import { Icon, Grid, Input, Select, Button, Header } from "semantic-ui-react";
import { useState } from "react";
import styles from "../../../styles/Home.module.css";

export default function EditPartById({ part, categories }) {
  const [session, loading] = useSession();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [brand, setBrand] = useState(part.brand);
  const [partNum, setPartNum] = useState(part.part_num);
  const [partName, setPartName] = useState(part.part_name);
  const [serial, setSerial] = useState(part.serial);
  const [color, setColor] = useState(part.color);
  const [category, setCategory] = useState(part.category);
  const [newCategory, setNewCategory] = useState("");
  const [quantity, setQuantity] = useState(part.quantity);

  const updatePart = async () => {
    if (brand && partNum && partName && category && quantity) {
      const data = {};
    } else {
      setError("Please finish filling out the form");
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
              <Icon name="pencil" />
              Edit part
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
                color="inverted blue"
                onClick={(e) => {
                  e.preventDefault();
                  setWaitingForResponse(true);
                  createPart();
                }}
                loading={waitingForResponse}
              >
                Save Edit
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  let dbPart = await db
    .collection("parts")
    .findOne({ _id: ObjectId(context.params.id) });

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
      part: JSON.parse(JSON.stringify(dbPart)),
      categories: JSON.parse(JSON.stringify(categoryOptions)),
    },
  };
}
