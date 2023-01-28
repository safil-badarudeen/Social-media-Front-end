import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Explore() {
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
    <div className="ExploreContainer">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <p style={{ marginLeft: "-20px" }}>Explore </p>
        <p style={{ color: "#aaaa", marginLeft: "30px" }}> See All</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {post.map((item) => [
          item.image === "" ? (
            ""
          ) : (
            <div>
              <img
                src={`${item.image}`}
                className="ExploreImage"
                alt="explore"
              />
            </div>
          ),
        ])}
      </div>
    </div>
  );
}

export default Explore;
