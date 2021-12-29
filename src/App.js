import React, { useEffect, useState } from "react";
import "./App.css";
import Feed from "./components/feed";
import Input from "./components/input";
import Logstatus from "./components/logstatus";
import { colRef } from "./components/firebase";
import { onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function App() {
  const [feed, setFeed] = useState([]);
  const [username, setUsername] = useState("user");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setUsername("user");
      } else {
        setUsername(user.email);
      }
    });
    onSnapshot(colRef, (snapshot) => {
      let array = [];
      snapshot.docs.forEach((doc) => array.push({ ...doc.data(), id: doc.id }));
      setFeed(array);
    });
  }, []);
  return (
    <div>
      <Logstatus />
      {/* <Login auth={auth} /> */}
      <Input user={username} />
      <Feed feed={feed} user={username} />
    </div>
  );
}

export default App;
