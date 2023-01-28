import React, { useEffect, useState } from "react";
import ContentPost from "../contentPostContainer/ContentPost";
import CoverImage from "../../component/images/coverimagejpg.jpg";
import { ProfilePost } from "../ProfilePostContainer/ProfilePost";

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
    <div className="ProfileMainPostContainer">
      <div className="ProfileCoverImageContainer">
        <img src={`${CoverImage}`} className="coverImage" alt="" />
        <h3 className="profilemainh3style">Your Profile</h3>
      </div>
      <ContentPost />
      {post.map((item) => (
        <ProfilePost posts={item} />
      ))}
    </div>
  );
}

export default ProfileMainPost;
