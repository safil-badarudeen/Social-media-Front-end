import React, { useState } from "react";

import app from "../../firebase";
import profileimage from "../images/profilePic.jpg";
import imageIcon from "../images/imageIcon.png";
import videoIcon from "../images/videoIcon.png";
import emojiIcon from "../images/emojiIcon.png";
import { BsFillImageFill } from "react-icons/bs";
import { RiVideoFill } from "react-icons/ri";
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
  // const profileimage = user.other.profile;
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
            }).then((data) => {
              alert("your post was uploaded successfully");
              window.location.reload(true);
            });
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
            }).then((data) => {
              alert("your post was uploaded successfully");
              window.location.reload(true);
            });
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
        body: JSON.stringify({ title: title, video: "",image: "" }),
      }).then((data) => {
        alert("your post was uploaded successfully");
        window.location.reload(true);
      });
    } else {
      console.log("please  select a content to upload");
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl ml-[60px] sm:ml-[100px] md:ml-[300px]  lg:ml-[350px] mt-[10px] md:w-[500px] lg:w-[700px] transition-all duration-200">
      <div className="flex pt-5 pl-10">
        <div className="flex-none">
          <img
            src={profileimage}
            className="h-[50px] w-[50px] rounded-full "
            alt=""
          />
        </div>
        <div className="ml-3 flex-auto mt-3">
          <input
            type="text"
            className="bg-transparent w-3/4"
            // focus:outline-none
            placeholder="Write your real thought"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="py-10 ml-12">
        {imagePre !== null ? (
          <img className="imagePre" src={imagePre} />
        ) : videoPre !== null ? (
          <video className="imagePre" src={videoPre}></video>
        ) : (
          ""
        )}

        <div className="flex relative cursor-pointer ">
        
            <label htmlFor="file">
              <BsFillImageFill size={30} className="mt-8" />
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

            <label htmlFor="file2">
              <RiVideoFill className="mt-7 ml-9" size={35} />

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
          

          
            <button className="absolute right-3 mt-8 bg-black text-white px-6 py-2 border-solid border-black border-2 rounded-lg hover:bg-transparent hover:text-black" onClick={handlePost}>
              Post
            </button>
          
        </div>
      </div>
    </div>
  );
}

export default ContentPost;
