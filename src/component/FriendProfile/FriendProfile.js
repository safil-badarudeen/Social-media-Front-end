import React, { useEffect, useState } from "react";
import profileimage from "../images/profilePic.jpg";
import {useParams} from 'react-router-dom'


import "./friendprofile.css";
import axios from "axios";


function FriendProfile() {

    const {userId}= useParams()
    const [user,SetUser]=useState('')
    
    useEffect(() => {
        const getUser = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/user/userdetails/${userId}`
            );
            SetUser(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        getUser();
      }, []);

    

  return (
    <div>
      <div className="FriendProfileMainContainer">
        <div className="FriendProfileDetailContainer">
          <img src={user.profile} className="FriendProfileImage" alt="" />
          <p className="FriendProfileName"> {user?.username}</p>
        </div>

        <div className="FriendProfileFollowDetails">
          <div>
            <p>{user?.followers?.length || 10}</p>
            <p> followers </p>
          </div>
          <div>
            <p>{user?.following?.length || 10}</p>
            <p> following </p>
          </div>
        </div>

        <div>
          <button> follow</button>
        </div>
      </div>
    </div>
  );
}

export default FriendProfile;
