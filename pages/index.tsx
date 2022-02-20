import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Map from "../component/map"
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { ReactElement } from "react";

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <div>Error</div>;
  return <div>Loading</div> ;
};


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Finding your fitness pal</title>
        <meta name="description" content="The best social fitness experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <Wrapper apiKey={"AIzaSyCCjVW2VkxkLyrc2Jp-7BxQMeO3wMDNWrQ"}>
    <Map zoom ={2} center={{lat:10, lng: 10}}/>
  </Wrapper>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
