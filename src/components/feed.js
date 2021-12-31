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
            <img class="statusImage" alt="" src={item.imageUrl}></img>
            <div className="statusBoard">
              <div>
                <p>
                  <span style={{ color: "#887bb0" }}> Status: </span>
                  {item.status}
                </p>
                <p>
                  <span style={{ color: "#887bb0" }}>By: </span>
                  {item.username}
                </p>
                <p>
                  {" "}
                  <span style={{ color: "#887bb0" }}>{item.likes} </span> Likes
                </p>
                <p>
                  {" "}
                  <span style={{ color: "#887bb0" }}>Posted on: </span>
                  {item.createdAt !== null
                    ? item.createdAt.toDate().toDateString() +
                      " " +
                      item.createdAt.toDate().toLocaleTimeString()
                    : ""}
                </p>
              </div>
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
                  style={
                    props.user === item.username
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  Delete
                </button>
              </div>
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
