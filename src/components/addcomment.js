import React, { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function Addcomment(props) {
  const [status, setStatus] = useState("");
  const handleChange = (e) => {
    setStatus(e.target.value);
    console.log(status);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const db = getFirestore();
    const colRef2 = collection(db, "feed/" + props.id + "/com");
    console.log(props.id);
    addDoc(colRef2, {
      username: props.user,
      comment: status,
      createdAt: serverTimestamp(),
    }).then(() => {
      setStatus("");
    });
  };
  return (
    <div>
      <div className="inputField2">
        <form onSubmit={onSubmit} className="add2">
          <input
            onChange={handleChange}
            value={status}
            id="status"
            type="text"
          />
          <button id="submitButton" type="submit">
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addcomment;
