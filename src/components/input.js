import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { colRef } from "./firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, "images");

function Input(props) {
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (image == null) {
      addDoc(colRef, {
        status: status,
        username: props.user,
        likes: 0,
        imageUrl: "",
      }).then(() => {
        setStatus("");
      });
    } else if (image !== null) {
      let imageUrl = "";
      const imageRef = ref(storage, `images/${image.name}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(ref(storage, `images/${image.name}`)).then((url) => {
          console.log(url);
          imageUrl = url;
          addDoc(colRef, {
            status: status,
            username: props.user,
            likes: 0,
            imageUrl: imageUrl,
          }).then(() => {
            setStatus("");
          });
        });
      });
    }
  };
  return (
    <div className="inputField">
      <form onSubmit={onSubmit} className="add">
        <label htmlFor="status">What's on your mind: </label>
        <input onChange={handleChange} value={status} type="text" id="status" />
        <label htmlFor="status">Add Photo: </label>
        <input class="uploadButton" type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Input;
