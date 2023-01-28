import React from "react";
import "./Navbar.css";
import search from "../images/search.png";
import Notification from "../images/notificationIcon.png";
import ProfilePic from "../images/profilePic.jpg";
import Message from "../images/Message.png";
import {logout} from '../ReduxContainer/userReducer'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {

  const userDetails = useSelector((state)=>state.user)
  const user=userDetails.user;
   let id = user?.other?._id;
   let username= user?.other?.username;
   let profilepic = user?.other?.profile
  const dispatch = useDispatch()

   //sending action to global state ("user")
   const handleClick = ()=>{
    dispatch(logout())
   }
  return (
    <div className="MainNavbar">
      <div className="LogoContainer">
        <p>Social</p>
      </div>
      <div>
        <div className="SearchInputContainer">
          <img src={`${search}`} className="SearchIcon" alt=""></img>
          <input
            type="text"
            className="SearchInput"
            placeholder="search your friends"
            name=""
            id=""
          ></input>
        </div>
      </div>
      <div className="IconsContainer">
        <img src={`${Notification}`} className="IconsNav" alt=""></img>
        <img src={`${Message}`} className="IconsNav" alt=""></img>
        <Link to={`profile/${id}`} >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={profilepic} className="ProfileImage" alt=""></img>
            <p style={{ marginLeft: "10px" }}>{username}</p>
          </div>
        </Link>
        <Link to={'/login'}>
        <div className="logout">
        <p  onClick={handleClick}>Logout</p>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
