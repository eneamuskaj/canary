import React, { useEffect, useState } from "react";
import "./App.css";
import Feed from "./components/feed";
import Input from "./components/input";
import Navabar from "./components/navbar";
import { colRef } from "./components/firebase";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const q = query(colRef, orderBy("createdAt", "desc"));

function App() {
  const [feed, setFeed] = useState([]);
  const [username, setUsername] = useState("user");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setUsername("anonymous");
      } else {
        setUsername(user.email);
      }
    });
    onSnapshot(q, (snapshot) => {
      let array = [];
      snapshot.docs.forEach((doc) => array.push({ ...doc.data(), id: doc.id }));
      setFeed(array);
    });
  }, []);
  return (
    <div>
      <Navabar user={username} />
      <Input user={username} />
      <Feed feed={feed} user={username} />
    </div>
  );
}

export default App;
