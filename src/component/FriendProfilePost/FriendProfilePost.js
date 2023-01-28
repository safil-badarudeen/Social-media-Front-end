import React, { useEffect, useState } from "react";
import profilePicture from "../images/profilePic.jpg";
import commentIcon from "../images/commentIcon.png";
import blackHeart from "../images/heartIcon.png";
import redHeart from "../images/anotherHeart.png";
import shareIcon from "../images/shareIcon.png";
import axios from "axios";
import './friendprofilepost.css'
import { useSelector } from "react-redux";

function FriendProfilePost({posts}) {
   
    const userDetails = useSelector((state) => state.user);
    const loggedInUser = userDetails.user;
    let id = loggedInUser?.other?._id;
    const accesstoken = loggedInUser?.accessToken;
    
 
 
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
    posts?.like?.includes(id) ? redHeart : blackHeart,
  );
  
  const [Count, setCount] = useState(posts?.like?.length);
  const [Comments, setComments] = useState(posts?.comments);
  const [CommentWriting, setCommentWriting] = useState("");
  const [ShowComment, setShowComment] = useState(false);
  const [user, setUser] = useState([]);

  const handleLike = async () => {
       
    Like === blackHeart ? setLike(redHeart) : setLike(blackHeart);
    Like === blackHeart ? setCount(Count + 1) : setCount(Count - 1);
   
    //like will toggle in backend
    await axios.put(
      `http://localhost:5000/api/post/${posts._id}/like`,
      {
        user: id,
      },
      {
        headers: {
          token: accesstoken,
        },
      }
    )  
  };


  const addComment = async() => {
    const comment = {
      userId: `${loggedInUser.other._id}`,
      username: `${loggedInUser.other.username}`,
      profile: `${loggedInUser.other.profile}` ,
      title: `${CommentWriting}`,
    };

    await axios.put('http://localhost:5000/api/post/user/comment',{
        postId: posts._id,
        comment: CommentWriting
    },{
        headers:{
            token: accesstoken,
          },
    })
    setComments(Comments.concat(comment));
    setCommentWriting("")
    
  };

  const handleComment = () => {
    addComment();
  };

  

  return (
    <div className="FriendProfilePostContainer">
      <div className="FriendProfilePostSubPostContainer">
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
              {user?.username}
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
        <img src={posts?.image} className="PostImage" alt="" />
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
                onClick={()=>setShowComment(!ShowComment)}
                className="LikeAndComment"
                alt=""
              />
              <p style={{ marginLeft: "10px" }}>
                {posts?.comments?.length} comments
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "150px",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img src={`${shareIcon}`} className="LikeAndComment" alt="" />
            <p style={{ marginLeft: "10px" }}>share</p>
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
                      src={loggedInUser?.data?.profile}
                      className="CommentProfileImage"
                      alt=""
                    ></img>
                    <p style={{ marginLeft: 10, fontWeight: "bold" }}>
                      {items?.username}
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
                      {items?.comment}
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

export default FriendProfilePost;
