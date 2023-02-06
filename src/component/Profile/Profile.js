import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePost from "./ProfilePost"

function Profile() {
    const userDetails = useSelector((state) => state?.user);
    const loggedInUser = userDetails?.user;
    const userId = loggedInUser?.other?._id;
    const accesstoken = loggedInUser?.accesstoken;

    const [post, setPost] = useState([]);

    useEffect(() => {
        const getPost = async () => {
          try {
            const res = await axios.get(
              `http://localhost:5000/api/post/user/getMypost/${userId}`
            );
            setPost(res.data);
          } catch (error) {}
        };
        getPost();
      }, []);


  useEffect(() => {
    const getUser = async () => {
      try {
        //backend userDetails route
        const response = await axios.get(
          `http://localhost:5000/api/user/userdetails/${userId}`,
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
  }, [userId]);

  





  const [user,setUser]= useState('')

  
   
  return (
    <div className="">
      <div className="bg-slate-50 min-w-[490px] w-3/5 md:ml-[250px] lg:ml-[350px] pt-5 rounded-lg pb-3">
        <div className="flex jusfify-evenly">
          <img src={user.profile} className="FriendProfileImage" alt="" />
          <p className="mt-[60px] sm:ml-[30px] md:ml-[70px] lg:ml-[200px] font-bold text-[25px]">
            
            {user?.username}
          </p>
        </div>

        <div className="FriendProfileFollowDetails">
          <div>
            <p className="text-[23px] font-bold">
              {user?.followers?.length || 10}
            </p>
            <p className="text-[17px] font-bold"> Followers </p>
          </div>
          <div>
            <p className="text-[23px] font-bold">
              {user?.following?.length || 10}
            </p>
            <p className="text-[17px] "> following </p>
          </div>
        </div>

     
      </div>
      {post.map((item)=> (
          <ProfilePost post={item}/>
      ))} 
     

    </div>
  );
}

export default Profile;
