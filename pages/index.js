import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";
import { useState } from "react";

export default function Home(minerDetails, myId) {
  console.log(minerDetails);

  const [minerId, setMinerId] = useState("");

  const initialState = minerDetails;
  const [personalInfo, setPersonalInfo] = useState(initialState.personalInfo);

  const updateMiner = () => {
    setMinerId(myId);
    console.log(myId);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>LocalHost:3000</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://nextjs.org">Filecoin</a> Miner
        </h1>

        <p className={styles.description}></p>

        <div className={styles.grid}>
          {/* {minerDetails.map((miner) => {
            return <h3>{miner.personalInfo.name}</h3>;
          })} */}
          {/* <h3>{updateMiner()}</h3>
          <h3>{myId}</h3> */}
          <h3>{minerDetails.data}</h3>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://miner-marketplace-backend.onrender.com/query",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        miner(id: "f02770") {
          id
          owner {
            address
          }
          personalInfo {
            name
            bio
          }
        }
      }
    `,
  });
  // setMinerId(data.miner.id);

  return {
    props: {
      minerDetails: data,
      // myId: data.miner.id,
    },
  };
}
