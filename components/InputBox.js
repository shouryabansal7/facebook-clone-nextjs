import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { async } from "@firebase/util";

function InputBox(props) {
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const { data: session } = useSession();

  const sendPost = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    const post = await addDoc(collection(db, "posts"), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    });

    if (imageToPost) {
      const storageRef = await ref(storage, `posts/${post.id}`);
      const uploadTask = await uploadString(
        storageRef,
        imageToPost,
        "data_url"
      ).then((snapshot) => {
        console.log("Uploaded a data_url string!");
        const stRef = ref(storage, `posts/${post.id}`);
        console.log(stRef);

        getDownloadURL(stRef).then(async (url) => {
          const postRef = doc(db, "posts", post.id);
          await updateDoc(postRef, {
            postImage: url,
          });
        });
      });

      removeImage();

      //   uploadTask.task.on(
      //     "state_changed",
      //     null,
      //     (error) => console.error(error),
      //     () => {
      //       //when upload completes
      //       const stRef = ref(storage, `posts/${post.id}`);
      //       console.log(stRef);

      //       //   getDownloadURL(stRef).then((url) =>
      //       //     db.collection("post").doc(post.id).set(
      //       //       {
      //       //         postImage: url,
      //       //       },
      //       //       { merge: true }
      //       //     )
      //       //   );
      //     }
      //   );
    }
    inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          className="inputIcon"
          onClick={() => filePickerRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
