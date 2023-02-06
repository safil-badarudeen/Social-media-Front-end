import React, { useEffect, useState } from "react";
import profilePicture from "../images/profilePic.jpg";
import commentIcon from "../images/commentIcon.png";
import blackHeart from "../images/heartIcon.png";
import redHeart from "../images/anotherHeart.png";
import shareIcon from "../images/shareIcon.png";
import {Link} from 'react-router-dom'
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
          `http://localhost:5000/api/user/userdetails/${posts?.user}`,
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
    <div  className="bg-white rounded-xl  sm:ml-[100px] md:ml-[300px]  lg:ml-[450px] mt-[10px] md:w-[500px] lg:w-[700px] transition-all duration-200rounded-xl">
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
      <p className="postTitle">{posts?.title}</p>

      {/* diplay image and video alternatively*/}
      <div className="flex justify-center">
      {posts?.image !== "" ? (
        <img src={`${posts?.image}`} className="w-4/5 h-[500px] m-5 rounded-lg object-cover" alt="" />
      ) : posts?.video !== "" ? (
        <video className="PostImage" width="500" height="500" controls>
          <source src={`${posts?.video}`} type="video/mp4" />
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

export default FriendProfilePost;
