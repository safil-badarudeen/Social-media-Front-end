import React, { useEffect, useState } from "react";
import frndImage from "../images/friendImage.jpg";

import AdImage from "../images/adimage.webp";

import "./rightBar.css";
import axios from "axios";
import Follow from "./Follow";
import { useSelector } from "react-redux";

function RightBar() {
 
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  let id = user.other._id;
  
  const [SuggestionUser, setSuggestionUser] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/usersuggestions/${id}`,
         
        );
        setSuggestionUser(res.data);
      } catch (error) {}
    };
    getPost();
  }, []);
  return (
    <div className="Rightbar">
      <div className="RightContainer">
        <div className="AdsContainer">
          <div>
            <img src={`${AdImage}`} className="AdsImage" alt=""></img>
          </div>
          <div className>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                marginTop: "-40px",
              }}
            >
              buy udemy course
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-20px",
              }}
            >
              offer will end soon
            </p>
          </div>
        </div>
        <div className="AdsContainer">
          <div>
            <img src={`${AdImage}`} className="AdsImage" alt=""></img>
          </div>
          <div className>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                marginTop: "-40px",
              }}
            >
              buy udemy course
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-20px",
              }}
            >
              offer will end soon
            </p>
          </div>
        </div>
      </div>

      {/* container at right bottom
      -------------------------------------------------------- */}

      <div className="RightContainer2">
        <h3 style={{ textAlign: "start", marginLeft: "20px" }}>
          Suggested for you
        </h3>
        <div style={{ marginTop: "10px " }}>

          {SuggestionUser.map((user) => (
            <Follow userdetails={user}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightBar;
