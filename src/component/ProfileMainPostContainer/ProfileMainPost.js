import React, { useEffect, useState } from "react";
import ContentPost from "../contentPostContainer/ContentPost";
import CoverImage from "../../component/images/coverimagejpg.jpg";


import "./profilemainPost.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ProfileMainPost() {
  const [post, setPost] = useState([]);

  let location = useLocation();
  let id = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/user/getMypost/${id}`
        );
        setPost(res.data);
      } catch (error) {}
    };
    getPost();
  }, []);

  return (
    
     <div>
     
    </div>
  );
}

export default ProfileMainPost;
