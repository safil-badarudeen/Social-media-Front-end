import React, { useEffect, useState } from "react";
import "./mainPost.css";
import ContentPost from "../contentPostContainer/ContentPost";
import Post from "../postContainer/post";
import axios from "axios";
import { useSelector } from "react-redux";

function MainPost() {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  let id = user?.other?._id;
  const accesstoken = user?.accessToken;


  const [post, setPost] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/user/followingPost/${id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setPost(res.data);
      } catch (error) {}
    };
    getPost();
  }, []);

  return (
    <div >
      <ContentPost />
      {post.map((items) => (
        <Post post={items} />
      ))}
    </div>
  );
}

export default MainPost;
