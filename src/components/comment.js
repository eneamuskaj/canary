import React, { useState, useEffect } from "react";

import {
  onSnapshot,
  getFirestore,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

function Comment(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const colRef2 = collection(db, "feed/" + props.id + "/com");
    const q = query(colRef2, orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      let array = [];
      snapshot.docs.forEach((doc) => array.push({ ...doc.data(), id: doc.id }));
      setComments(array);
    });
  }, [props.id]);
  //
  return (
    <div>
      {console.log("render once")}
      {comments.map((item) => {
        return (
          <div>
            <div className="commentCard">
              <p>
                <span style={{ fontWeight: "bold" }}>Comment:</span>
                {" " + item.comment}
              </p>
              <p style={{ fontSize: "12px" }}> By: {item.username} </p>
              <p style={{ fontSize: "12px", float: "" }}>
                <span style={{ color: "#887bb0" }}>Posted on: </span>
                {item.createdAt !== null
                  ? item.createdAt.toDate().toDateString() +
                    " " +
                    item.createdAt.toDate().toLocaleTimeString()
                  : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
