import React from "react";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

function Logstatus() {
  const logout = () => {
    signOut(auth).then(() => {
      console.log("user signed out"); // console.log("user signed out");
      window.location.replace("/");
    });
  };
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Logstatus;
