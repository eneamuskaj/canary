import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
const auth = getAuth();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const submitForm = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        // console.log("user created: ", cred.user);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //
  const handleChangeEmail2 = (e) => {
    setEmail2(e.target.value);
  };
  const handleChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };
  const submitForm2 = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email2, password2)
      .then((cred) => {
        // console.log("user logged in: ", cred.user);
        setEmail2("");
        setPassword2("");
        window.location.replace("/homepage");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={submitForm}>
          <div class="container">
            <label for="email">
              <b>E-Mail:</b>
            </label>
            <input
              onChange={handleChangeEmail}
              value={email}
              type="text"
              placeholder="Enter Username"
              name="email"
              required
            />
            <label for="password">
              <b>Password</b>
            </label>
            <input
              onChange={handleChangePassword}
              value={password}
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
            <button type="submit">SignUp!</button>
          </div>
        </form>
      </div>
      <div>
        <form onSubmit={submitForm2}>
          <div class="container">
            <label for="email">
              <b>E-Mail:</b>
            </label>
            <input
              onChange={handleChangeEmail2}
              value={email2}
              type="text"
              placeholder="Enter Username"
              name="email"
              required
            />
            <label for="password">
              <b>Password</b>
            </label>
            <input
              onChange={handleChangePassword2}
              value={password2}
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
            <button type="submit">Log In!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
