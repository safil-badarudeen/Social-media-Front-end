import React, { useState, useEffect } from "react";
import Image from "../images/friendprofile.jpg";

import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./profileleftbar.css";
import axios from "axios";
import { useSelector } from "react-redux";

function ProfileLeftbar() {
  // using uselocation to get id from req.params
  // we have  alreaday got id of logined user in Navbar check Navabar if confused

  let location = useLocation();
  let id = location.pathname.split("/")[2];

  //action to get userdetails from global state
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  // let id = user.data.userId;
  const username = user.other.username;
  const profileimage = user.other.profile;
  const following = user.other.following;
  const followers = user.other.followers;

 const accessToken = user.accessToken;

 const [data, setData] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        //backend userDetails route
        const response = await axios.get(
          `http://localhost:5000/api/user/userdetails/${id}`,
          {
            headers: {
              token: accessToken,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.log("error on response");
      }
    };
    getUser();
  }, []);

  //state to get value of user currently using account
  //get user from loged in and send data to profile tab
  const [followinguser, setFollowinguser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/followingusers/${id}`
        );
        setFollowinguser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="ProfileLeftbar">
      {/* Left User Profile tab */}
      {/* --------------------------------- */}
      <div className="ProfileLeftContainer">
        <img src={`${Image}`} className="CoverImage" alt></img>
        <div className="profileImage-proffession">
          <img
            src={profileimage}
            className="ProfileContainerProfilePic"
            alt=""
          ></img>
          <div>
            <p className="profileUsername">{username}</p>
            <p classaName="profession">Software developer</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ marginLeft: 15, marginTop: 9, fontSize: 16 }}>
            Followers
          </p>
          <p className="following-followers">{followers.length || 5}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ marginLeft: 15, marginTop: 9, fontSize: 16 }}>
            Following
          </p>
          <p className="following-followers">{following.length}</p>
        </div>
        <div style={{}}>
          <p className="BioButton">Bio</p>
          <p className="Biodescription">
            software developer who never lacks hunger for growth
          </p>
          {user.other._id !== id ? (
            <div>
              <button className="editOrFollowButton">Follow</button>
            </div>
          ) : (
            <div>
              <button className="editOrFollowButton">Edit Bio</button>
            </div>
          )}
        </div>
      </div>

      {/* Left profile ->following*/}
      {/* -------------------------------------------- */}

      <div className="YourFriendscontainer">
        <h4 style={{ marginTop: "2px" }}>following</h4>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ marginLeft: 18, marginTop: -12 }}>Friends</p>
          <p style={{ marginRight: 18, marginTop: -12, color: "#aaa" }}>
            See all
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {followinguser.map((data) => (
            <Link to={`/profile/userprofile/${data._id}`}>
              <div style={{ cursor: "pointer" }} key={data._id}>
                <img src={data.profile} className="FriendProfilePic" alt="" />
                <p className="FriendsName">{data.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileLeftbar;
