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
    <div className="">
      <div className="bg-slate-50 min-w-[490px] w-3/5 md:ml-[250px] lg:ml-[350px] pt-5 rounded-lg">
        <div className="flex jusfify-evenly">
          <img src={user.profile} className="FriendProfileImage" alt="" />
          <p className="mt-[60px] sm:ml-[30px] md:ml-[70px] lg:ml-[200px] font-bold text-[25px]"> {user?.username}</p>
        </div>

        <div className="FriendProfileFollowDetails">
          <div>
            <p className="text-[23px] font-bold">{user?.followers?.length || 10}</p>
            <p className="text-[17px] font-bold"> Followers </p>
          </div>
          <div>
            <p className="text-[23px] font-bold">{user?.following?.length || 10}</p>
            <p className="text-[17px] font-bold"> following </p>
          </div>
        </div>

        <div>
          <button className="mt-5 mb-6 ml-[170px] text-blue-600 text-[17px] border-dashed border-2 rounded-lg border-blue-600 pl-2 pr-2 pt-1 pb-1"> follow</button>
        </div>
      </div>
    </div>
  );
}

export default FriendProfile;
