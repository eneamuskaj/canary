import React, { useState, useEffect } from "react";

import { onSnapshot, getFirestore, collection } from "firebase/firestore";

function Comment(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const colRef2 = collection(db, "feed/" + props.id + "/com");

    onSnapshot(colRef2, (snapshot) => {
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
              <span style={{ fontSize: "12px" }}> By: {item.username} </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Comment;
