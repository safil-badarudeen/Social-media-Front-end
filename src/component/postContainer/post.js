import React, { useEffect, useState } from "react";
import profilePicture from "../images/profilePic.jpg";
import commentIcon from "../images/commentIcon.png";
import blackHeart from "../images/heartIcon.png";
import redHeart from "../images/anotherHeart.png";
import "./post.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Post({ post }) {
  
  // user logged in from global state
  const userDetails = useSelector((state) => state.user);
  const loggedInUser = userDetails.user;
  const accesstoken = loggedInUser.accessToken;

  const userId = loggedInUser.other._id;

  useEffect(() => {
    const getUser = async () => {
      try {
        //backend userDetails route
        const response = await axios.get(
          `http://localhost:5000/api/user/userdetails/${post.user}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log("error on response", error);
      }
    };
    getUser();
  }, [post.user]);

  const [Like, setLike] = useState(
    post.like.includes(userId) ? redHeart : blackHeart,
  );
  const [Count, setCount] = useState(post?.like?.length);
  const [Comments, setComments] = useState(post?.comments);
  const [CommentWriting, setCommentWriting] = useState("");
  const [CommentCount, setCommentCount] = useState(post?.comments?.length);
  const [ShowComment, setShowComment] = useState(false);
  const [user, setUser] = useState([]);
  

  const handleLike = async () => {
       
    Like === blackHeart ? setLike(redHeart) : setLike(blackHeart);
    Like === blackHeart ? setCount(Count + 1) : setCount(Count - 1);

    await axios.put(
      `http://localhost:5000/api/post/${post._id}/like`,
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

  const addComment = async () => {
    const comment = {
      userId: `${loggedInUser.other._id}`,
      username: `${loggedInUser.other.username}`,
      profile: `${loggedInUser.other.profile}`,
      title: `${CommentWriting}`,
    };

    await axios.put(
      "http://localhost:5000/api/post/user/comment",
      {
        postId: post._id,
        comment: CommentWriting,
      },
      {
        headers: {
          token: accesstoken,
        },
      }
    );
    setComments(Comments.concat(comment));
    setCommentWriting("");
  };

  const handleComment = () => {
    addComment();
  };

  return (
    <div  className="bg-white rounded-xl ml-[60px] sm:ml-[100px] md:ml-[300px]  lg:ml-[350px] mt-[10px] md:w-[500px] lg:w-[700px] transition-all duration-200rounded-xl">
      <div className=''>
        <div className='flex pt-5 mt-5'>
          <img
            src={loggedInUser?.other?.profile}
            className="rounded-full ml-10"
            alt=""
          ></img>
          <div className='font-bold ml-8 mt-3 text-[18px]'>
            <Link to={`/profile/userprofile/${user?._id}`}>
             
                {user.username}
             
            </Link>
          </div>
        </div>
        <p className="postTitle">{post.title}</p>

        {/* diplay image and video alternatively*/}
        <div className="flex justify-center">
        {post.image !== "" ? (
          <img src={`${post.image}`} className="w-4/5 h-[500px] m-5 rounded-lg object-cover" alt="" />
        ) : post.video !== "" ? (
          <video className="PostImage" width="500" height="500" controls>
            <source src={`${post.video}`} type="video/mp4" />
          </video>
        ) : (
          ""
        )}
        </div>

        <div className="flex pb-5 pt-3">
          <div
            style={{ display: "flex", marginLeft: "40px", cursor: "pointer" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={`${Like}`}
                onClick={handleLike}
                className="LikeAndComment"
                alt=""
              />
              <p style={{ marginLeft: "10px" }}> {Count} likes</p>
            </div>
            <div className="commentIconDiv ">
              <img
                src={`${commentIcon}`}
                onClick={() => setShowComment(!ShowComment)}
                className="LikeAndComment"
                alt=""
              />
              <p style={{ marginLeft: "10px" }}>{Comments.length} comments</p>
            </div>
          </div>
        </div>

        {ShowComment === true ? (
          <div className="grid pb-10">
            <div style={{ display: "flex", alignItems:"center" }}>
              <img
                src={loggedInUser?.other?.profile}
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
                  <div className="flex ">
                    <img
                      src={loggedInUser?.data?.profile}
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
                      {items.comment}
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

export default Post;
