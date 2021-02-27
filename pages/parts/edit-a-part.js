import Head from "next/head";
import NavHeader from "../../components/header.js";
import {
  Header,
  Icon,
  Grid,
  Input,
  Select,
  Button,
  Table,
  Segment,
} from "semantic-ui-react";
import { useSession } from "next-auth/client";
import Loader from "../../components/loader";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Home.module.css";

export default function EditaPart() {
  const [waiting, setWaiting] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [parts, setParts] = useState([]);

  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        window.location.href = "/authorize/signin";
      }
    }
  }, [loading]);

  const searchParts = async (e) => {
    e.preventDefault();
    setError("");
    setWaiting(true);
    const { data: foundParts } = await axios.post(`/api/parts/search/${query}`);

    if (foundParts.status === 200) {
      //display parts
      setParts(foundParts.parts);
      setWaiting(false);
    } else {
      //display error
      setParts([]);
      setWaiting(false);
      setError(foundParts.msg);
    }
  };

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
            <form>
              <label>Search for part:</label>
              <br />
              <Input
                icon="search"
                placeholder="Search..."
                className={styles.halfWidth}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <Button
                inverted
                color="blue"
                loading={waiting}
                onClick={(e) => {
                  searchParts(e);
                }}
              >
                Search
              </Button>
            </form>
          </div>

          {parts[0] ? (
            <>
              <div className={styles.tableContainer}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Brand</Table.HeaderCell>
                      <Table.HeaderCell>Part Name</Table.HeaderCell>
                      <Table.HeaderCell>Part Number</Table.HeaderCell>
                      <Table.HeaderCell>Category</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Edit
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {parts.map((part) => (
                      <>
                        <Table.Row
                          key={part._id}
                          error={parseInt(part.quantity) === 0 ? true : false}
                        >
                          <Table.Cell>{part.brand}</Table.Cell>
                          <Table.Cell>{part.part_name}</Table.Cell>
                          <Table.Cell>{part.part_num}</Table.Cell>
                          <Table.Cell>{part.category}</Table.Cell>
                          <Table.Cell>{part.quantity}</Table.Cell>
                          <Table.Cell>
                            <div className={styles.centerText}>
                              {/* <Icon
                                name="pencil alternate"
                                className={styles.iconHover}
                                onClick={() => {
                                  window.location.href = `/parts/edit/${part._id}`;
                                }}
                              /> */}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      </>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </>
          ) : (
            <>
              <Segment placeholder>
                <Header icon>
                  <Icon name="database" />
                  No parts found
                </Header>
              </Segment>
            </>
          )}
        </>
      )}
    </>
  );
}
