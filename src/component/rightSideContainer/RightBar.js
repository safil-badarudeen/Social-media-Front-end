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
          `http://localhost:5000/api/user/usersuggestions/${id}`
        );
        setSuggestionUser(res.data);
      } catch (error) {}
    };
    getPost();
  }, []);
  return (
    <div className="ml-12 mt-4 rounded-xl overflow-hidden h-[500px] bg-gray-300 hidden  lg:block">
      <div className=" ">
        <h3 className="font-bold" >
          Suggested for you
        </h3>
        <div >
          {SuggestionUser.map((user) => (
            <Follow userdetails={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightBar;
