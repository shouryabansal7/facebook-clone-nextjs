import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Facebook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Facebook clone</h1>
      {/* header */}
      <Header />
      <main>
        {/* Sidebar */}
        {/* feed */}
        {/* widgets */}
      </main>
    </div>
  );
}
