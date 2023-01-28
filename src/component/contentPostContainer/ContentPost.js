import React, { useState } from "react";

import app from "../../firebase";
import imageIcon from "../images/imageIcon.png";
import videoIcon from "../images/videoIcon.png";
import emojiIcon from "../images/emojiIcon.png";
import "./contentPost.css";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function ContentPost() {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  const profileimage = user.other.profile;
  const accessToken = user.accessToken;

  const [file, setFile] = useState("");
  const [file2, setFile2] = useState("");
  const [title, setTitle] = useState("");
  const [imagePre, setImagePre] = useState(null);
  const [videoPre, setVideoPre] = useState(null);
  // console.log("file" ,file)
  // console.log("file2" ,file2)

  const handlePost = (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch("http://localhost:5000/api/post/user/CreatePost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: accessToken,
              },
              body: JSON.stringify({
                title: title,
                image: downloadURL,
                video: "",
              }),
            }).then((data)=> {
              alert("your post was uploaded successfully");
              window.location.reload(true)
            })
          });
        }
      );
    } else if (file2 !== null) {
      const fileName = new Date().getTime() + file2?.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file2);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch("http://localhost:5000/api/post/user/CreatePost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: accessToken,
              },
              body: JSON.stringify({
                title: title,
                video: downloadURL,
                image: "",
              }),
            }).then((data)=> {
              alert("your post was uploaded successfully");
              window.location.reload(true)
            })
          });
        }
      );
    } else if (file == null && file2 == null) {
      fetch("http://localhost:5000/api/post/user/CreatePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: accessToken,
        },
        body: JSON.stringify({ title: title, video: "", image: "" }),
      }).then((data)=> {
        alert("your post was uploaded successfully");
        window.location.reload(true)
      })
    } else {
      console.log("please  select a content to upload");
    }
  };

  return (
    <div>
      <div className="ContentUploadContainer">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={profileimage} className="ProfileImageContentTab" alt="" />
          <input
            type="text"
            className="ContentWritingPart"
            placeholder="Write your real thought"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: "80px" }}>
          {imagePre !== null ? (
            <img className="imagePre" src={imagePre} />
          ) : videoPre !== null ? (
            <video className="imagePre" src={videoPre}></video>
          ) : (
            ""
          )}

          <div>
            <label htmlFor="file">
              <img src={`${imageIcon}`} className="Icons" alt="" />
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => [
                  setFile(e.target.files[0]),
                  setImagePre(URL.createObjectURL(e.target.files[0])),
                ]}
              />
            </label>
            <img src={`${emojiIcon}`} className="Icons" alt="" />
            <label htmlFor="file2">
              <img src={`${videoIcon}`} className="Icons" alt="" />

              <input
                type="file"
                name="file2"
                id="file2"
                style={{ display: "none" }}
                onChange={(e) => [
                  setFile2(e.target.files[0]),
                  setVideoPre(URL.createObjectURL(e.target.files[0])),
                ]}
              />
            </label>
            <button className="post-button" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentPost;
