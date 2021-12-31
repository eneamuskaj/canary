import React from "react";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

function Navabar(props) {
  const logout = () => {
    signOut(auth).then(() => {
      console.log("user signed out"); // console.log("user signed out");
      window.location.replace("/");
    });
  };
  return (
    <div>
      <ul class="navBar">
        <li href="">
          <a class="" href="#input">
            <img class="navImage" src="images/canary2.svg" />
          </a>
        </li>
        <li className="logoutButton" onClick={logout}>
          Log Out
        </li>
        <p className="logoutStatus">Signed in as: {props.user}</p>
      </ul>
    </div>
  );
}

export default Navabar;
