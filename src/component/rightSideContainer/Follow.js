import React, { useState, useEffect } from "react";
import addFrnd from "../images/addFriend.png";
import addedFriend from "../images/addedFriendpng.png";
import { Link } from "react-router-dom";

import "./rightBar.css";
import { useSelector } from "react-redux";

function Follow({ userdetails }) {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  let id = user.other._id;
  const accesstoken = user.accessToken;

  const [following, setFollowing]=useState(false)

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
    
    
  };

  return (
    <div key={userdetails._id} className="">
      <div className="h-24 mx-auto border-2 border-opacity-60	bg-white/80 border-black rounded-md w-60">
        <div className="flex flex-row items-center justify-center h-full space-x-5 ">
          <img
            src={userdetails.profile}
            className="w-12 h-12 bg-gray-300 rounded-full"
            alt=""
          />

          <div className="flex flex-col space-y-3">
          <Link to={`/profile/userprofile/${userdetails._id}`}>
            <div className="h-6 rounded-md w-36 ml-[-35px] font-bold text-[19px] hover:scale-105 ">
              {userdetails?.username}
            </div>
            </Link>

            <div className="w-24 h-6  rounded-md ">
            <button type="button" onClick={(e) => [handleRequest(userdetails._id),setFollowing(!following)]} className="inline-block px-6 py-2  text-blue-400 font-medium text-[15px] leading-tight uppercase rounded ml-[-30px]  hover:scale-125 transition duration-300">{following ? "Unfollow" : "follow"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Follow;


