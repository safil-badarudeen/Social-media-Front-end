import React, { useEffect, useState } from "react";
import commentIcon from "../../component/images/commentIcon.png";
import blackHeart from "../../component/images/heartIcon.png";
import redHeart from "../../component/images/anotherHeart.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function OnePost( ) {
  const userDetails = useSelector((state) => state?.user);
  const loggedInUser = userDetails?.user;
  const userId = loggedInUser?.other?._id;
  const accesstoken = loggedInUser?.accesstoken;


  
  const postId="63d8e65a19c2070da9b0f3c3"
  useEffect(() => {
    const getPost = async () => {
      try {
        //backend userDetails route
        const response = await axios.get(
          `http://localhost:5000/api/post/user/getOnePost/${postId}`
        );
        
        // if (response.data[0]) {
        //   setPost(response[0].user?._id);
        // } else {
        //   setUserId(null);
        // }
      
        // console.log(response)
        setPost(response.data);
       console.log(response.data)
      } catch (error) {
        console.log("error on response", error);
      }
    };
    getPost();
  }, [postId]);

  const [post, setPost] = useState();
  const [postUser,setPostUser] = useState(post?.user);
   
  // console.log(post)
  // console.log("post Like ",post?.like?.length)
  // console.log("postcommet" ,typeof post?.comments)

  const [CommentWriting, setCommentWriting] = useState("");

  const [ShowComment, setShowComment] = useState(false);
  const [user, setUser] = useState([]);
  

  const [Like, setLike] = useState(
    post?.like?.includes(userId) ? redHeart : blackHeart
  );
  const [Count, setCount] = useState(post?.like?.length);
  //  console.log("Count", Count)
  const [Comments, setComments] = useState(post?.comments);
 post?.comments.map((item)=>(
  console.log(item)
 ))
  const [CommentCount, setCommentCount] = useState(post?.comments?.length);
  // console.log(post?.comments) 
  // console.log(typeof Comments)
  // console.log("postlike",post?.like?.length)

  const commentArray = Comments ? Object?.values(Comments):[]
  console.log("commentArray",typeof commentArray)
  // console.log(typeof commentArray)
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       console.log("before", post.user);
  //       //backend userDetails route
  //       if (post?.user !== undefined) {
  //         const response = await axios.get(
  //           `http://localhost:5000/api/user/userdetails/${post?.user}`
  //         );
  //         console.log("after", post.user);
  //         setUser(response.data);
  //       }else {

  //         console.log("waiting for data inside post?.user")
  //       }
  //     } catch (error) {
  //       console.log("error on response", error);
  //     }
  //   };
  //   setTimeout(() => {
  //     getUser();
  //   }, 1000);

  //   return () => {
  //     clearTimeout();
  //   };
  // }, [post?.user]);

  // console.log(post._id);
  // console.log("userId for liek", typeof userId);

  const handleLike = async () => {
    Like === blackHeart ? setLike(redHeart) : setLike(blackHeart);
    Like === blackHeart ? setCount(Count + 1) : setCount(Count -1);

    await axios.put(
      `http://localhost:5000/api/post/${post?._id}/like`,
      {
        user: userId,
      },
      {
        headers: {
          token: accesstoken,
        },
      }
    );
  };

  const addComment = async () => {
    const comment = {
      userId: `${loggedInUser?.other?._id}`,
      username: `${loggedInUser?.other?.username}`,
      profile: `${loggedInUser?.other?.profile}`,
      title: `${CommentWriting}`,
    };

    await axios.put(
      "http://localhost:5000/api/post/user/comment",
      {
        postId: post?._id,
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
    <div className="bg-black/50 min-h-screen flex ">
      <div className="bg-white min-h-[615px]  ml-[60px] sm:ml-[100px] md:ml-[300px]  lg:ml-[350px] mt-[10px] md:w-[500px] lg:w-[700px] transition-all duration-200 rounded-xl">
        <div className="">
          <div className="flex  mt-2">
            <img
              src={post?.user?.profile}
              className="rounded-full ml-10 h-[50px] w-[50px]"
              alt=""
            ></img>
            <div className="font-semibold ml-8 mt-3 text-[18px]">
              <Link to={`/profile/userprofile/${post?.user?._id}`}>
                {post?.user?.username}
              </Link>
            </div>
          </div>
          <p className="postTitle">{post?.title}</p>

          {/* diplay image and video alternatively*/}
          <div className="flex justify-center">
            {post?.image !== "" ? (
              <img
                src={`${post?.image}`}
                className="w-4/5 h-[450px] m-5 rounded-lg object-cover"
                alt=""
              />
            ) : post?.video !== "" ? (
              <video className="PostImage" width="500" height="500" controls>
                <source src={`${post?.video}`} type="video/mp4" />
              </video>
            ) : (
              ""
            )}
          </div>

          <div className="flex ">
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
                <p style={{ marginLeft: "10px" }}>{post?.comments?.length} comments</p>
              </div>
            </div>
          </div>

          {ShowComment === true ? (
            <div className="grid pb-10">
              <div style={{ display: "flex", alignItems: "center" }}>
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

              {post?.comments?.map((items) => {
                console.log("items",items)
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
    </div>
  );
}

export default OnePost;
