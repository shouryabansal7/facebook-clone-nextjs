// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMdra6PGSWTMAjY5ZuTlX_J6uaD230DjM",
  authDomain: "facebook-clone-ba1df.firebaseapp.com",
  projectId: "facebook-clone-ba1df",
  storageBucket: "facebook-clone-ba1df.appspot.com",
  messagingSenderId: "240610758391",
  appId: "1:240610758391:web:5feb85a8b1c1f503ec4df2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
