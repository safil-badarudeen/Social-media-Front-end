import React, { useState, useEffect } from "react";
import addFrnd from "../images/addFriend.png";
import addedFriend from "../images/addedFriendpng.png";
import {Link} from 'react-router-dom'

import "./rightBar.css";
import { useSelector } from "react-redux";

function Follow({ userdetails }) {
  
  
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  let id = user.other._id;
  const accesstoken = user.accessToken
  

  const [Requestimage, setRequestimage] = useState(addFrnd);
  
 
    const handleRequest = async (e) => {
    await fetch(
      `http://localhost:5000/api/post/user/following/${userdetails._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/JSON",
          token: accesstoken,
        },
        body: JSON.stringify({ user: `${id}` }),
      }
    );
    setRequestimage(addedFriend);
  };

  return (
    <div
      key={userdetails._id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={userdetails.profile} className="ProfileImage" alt="" />
        <Link to={`/profile/userprofile/${userdetails._id}`}>
        <div>
          <p style={{ marginLeft: "20px" }}>{userdetails?.username}</p>
        </div>
        </Link>
      </div>
      <div
        style={{
          borderRadius: 35,
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        <img
          src={Requestimage}
          className="AddFrndImage"
          onClick={(e) => handleRequest(userdetails._id)}
          alt=""
        />
      </div>
    </div>
  );
}

export default Follow;
