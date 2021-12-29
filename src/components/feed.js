import React from "react";
import Comment from "./comment";
import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import Addcomment from "./addcomment";

function Feed(props) {
  const deleteItem = (e) => {
    e.preventDefault();
    const docRef = doc(getFirestore(), "feed", e.target.id);
    deleteDoc(docRef).then(() => {});
  };
  const likeItem = (e) => {
    const doThis = document.getElementById(e.target.id);
    doThis.disabled = true;
    const doThat = document.getElementById(
      e.target.id.substring(0, e.target.id.length - 1) + "-"
    );
    doThat.disabled = false;

    const docRef = doc(
      getFirestore(),
      "feed",
      e.target.id.substring(0, e.target.id.length - 1)
    );
    getDoc(docRef).then((doc) => {
      updateDoc(docRef, {
        likes: doc.data().likes + 1,
      });
    });
  };

  const dislikeItem = (e) => {
    const doThis = document.getElementById(e.target.id);
    doThis.disabled = true;
    const doThat = document.getElementById(
      e.target.id.substring(0, e.target.id.length - 1) + "+"
    );
    doThat.disabled = false;

    const docRef = doc(
      getFirestore(),
      "feed",
      e.target.id.substring(0, e.target.id.length - 1)
    );
    getDoc(docRef).then((doc) => {
      updateDoc(docRef, {
        likes: doc.data().likes - 1,
      });
    });
  };
  return (
    <div className="feed">
      {props.feed.map((item) => {
        return (
          <div className="card">
            <img alt="" src={item.imageUrl}></img>
            <p>
              <span style={{ color: "red" }}> Status: </span>
              {item.status}
            </p>
            <p>
              <span style={{ color: "red" }}>By: </span>
              {item.username}
            </p>
            <p>{item.likes} Likes</p>
            <div className="socials">
              <button
                className="socialButton"
                id={item.id + "+"}
                onClick={likeItem}
                disabled={false}
              >
                Like!
              </button>
              <button
                className="socialButton"
                id={item.id + "-"}
                onClick={dislikeItem}
                disabled={false}
              >
                DisLike!
              </button>
              <button
                className="socialButton"
                id={item.id}
                onClick={deleteItem}
              >
                Delete
              </button>
            </div>
            <Comment id={item.id} />
            <Addcomment id={item.id} user={props.user} />
          </div>
        );
      })}
    </div>
  );
}

export default Feed;
