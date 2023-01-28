import React, { useEffect, useState } from "react";
import profilePicture from "../images/profilePic.jpg";
import commentIcon from "../images/commentIcon.png";
import blackHeart from "../images/heartIcon.png";
import redHeart from "../images/anotherHeart.png";

import "./profilepost.css";
import axios from "axios";
import { useSelector } from "react-redux";


export function ProfilePost({ posts }) {

  const userDetails = useSelector((state) => state.user);
  const loggedInUser = userDetails?.user;
  const username = loggedInUser?.other?.username;
  const userId = loggedInUser?.other?._id
 
  const following = loggedInUser?.other?.following;
  const followers = loggedInUser?.other?.followers;

 const accesstoken = loggedInUser.accessToken;
  
    useEffect(() => {
    const getUser = async () => {
      try {
        //backend userDetails route
        const response = await axios.get(
          `http://localhost:5000/api/user/userdetails/${posts.user}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log("error on response");
      }
    };
    getUser();
  }, [posts.user]);

  const [Like, setLike] = useState(
    [posts.like.includes(userId) ? redHeart : blackHeart]
  );
  const [Count, setCount] = useState(posts?.like?.length);
  const [Comments, setComments] = useState([]);
  const [CommentWriting, setCommentWriting] = useState("");
  const [CommentCount, setCommentCount] = useState();
  const [ShowComment, setShowComment] = useState(false);
  const [user, setUser] = useState([]);
   
  const handleLike = async () => {
       
    Like === blackHeart ? setLike(redHeart) : setLike(blackHeart);
    Like === blackHeart ? setCount(Count + 1) : setCount(Count - 1);
   
    //like will toggle in backend
    await axios.put(
      `http://localhost:5000/api/post/${posts._id}/like`,
      {
        user: userId,
      },
      {
        headers: {
          token: accesstoken,
        },
      }
    )  
  };

  const addComment = () => {
    const comment = {
      id: "154144554da5554",
      username: "Safil",
      title: `${CommentWriting}`,
    };
    setComments(Comments.concat(comment));
    setCommentCount(CommentCount + 1);
  };

  const handleComment = () => {
    addComment();
  };

  const handleShowComment = () => {
    if (ShowComment === true) {
      setShowComment(false);
    } else {
      setShowComment(true);
    }
  };

  return (
    <div className="PostContainer">
      <div className="SubPostContainer">
        <div style={{ display: "flex", marginLeft: "30px" }}>
          <img
            src={`${profilePicture}`}
            className="PostProfileImage"
            alt=""
          ></img>
          <div>
            <p
              style={{
                marginLeft: "15px",
                fontWeight: "bold",
                textAlign: "start",
              }}
            >
              {user.username}
            </p>
            <p
              style={{
                fontSize: 11,
                marginTop: -12,
                marginLeft: 15,
                textAlign: "start",
                color: "#aaa",
              }}
            >
              followed by mubashir
            </p>
          </div>
        </div>
        <p
          style={{
            width: "95%",
            textAlign: "left",
            margin: "auto",
            marginTop: "10px",
            marginLeft: "40px",
          }}
        >
          {posts.title} 
        </p>
        <img src={posts.image} className="PostImage" alt="" />
        <div style={{ display: "flex" }}>
          <div
            style={{ display: "flex", marginLeft: "40px", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={Like}
                onClick={handleLike}
                className="LikeAndComment"
                alt=""
              />
              <p style={{ marginLeft: "10px" }}> {Count} likes</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={`${commentIcon}`}
                onClick={handleShowComment}
                className="LikeAndComment"
                alt=""
              />
              <p style={{ marginLeft: "10px" }}>{posts.comments.length} comments</p>
            </div>
          </div>
          
        </div>

        {ShowComment === true ? (
          <div style={{ display: "grid" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={`${profilePicture}`}
                className="CommentProfileImage"
                alt=""
              ></img>
              {/* <p style={{marginLeft:10}}>Safil</p> */}
              <input
                className="CommentInput"
                placeholder="Write your thoughts.."
                onChange={(e) => setCommentWriting(e.target.value)}
                type="text"
              />
              <button className="AddCommentButton" onClick={handleComment}>
                Comment
              </button>
            </div>

            {Comments.map((items) => {
              return (
                <div>
                  <div style={{ display: "flex" }}>
                    <img
                      src={`${profilePicture}`}
                      className="CommentProfileImage"
                      alt=""
                    ></img>
                    <p style={{ marginLeft: 10, fontWeight: "bold" }}>
                      {items.username}
                    </p>
                  </div>
                  <div style={{ marginLeft: 100, marginTop: -30 }}>
                    <p
                      style={{
                        marginLeft: 10,
                        textAlign: "left",
                        fontSize: 15,
                      }}
                    >
                      {items.title}
                    </p>
                    
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}


