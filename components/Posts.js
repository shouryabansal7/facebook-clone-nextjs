import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import Post from "./Post";

function Posts(props) {
  const [realTimePosts, setrealTimePosts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      let posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          data: doc.data(),
        });
      });
      setrealTimePosts(posts);
      console.log("posts", posts);
    });
  }, []);

  console.log(realTimePosts);

  return (
    <div>
      {realTimePosts.map((post) => (
        <Post
          key={post.id}
          name={post.data.name}
          message={post.data.message}
          email={post.data.email}
          timestamp={post.data.timestamp}
          image={post.data.image}
          postImage={post.data.postImage}
        />
      ))}
    </div>
  );
}

export default Posts;
