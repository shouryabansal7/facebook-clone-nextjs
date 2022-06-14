import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import { db } from "../firebase";

export default function Home({ session, posts }) {
  if (!session) {
    return <Login />;
  }
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* header */}
      <Header />
      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* feed */}
        <Feed posts={posts} />
        {/* widgets */}
        <Widget />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const q = await query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const posts = await getDocs(q);

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: {
      session,
      posts: docs,
    },
  };
}
