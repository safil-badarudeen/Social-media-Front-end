

import React from 'react'
import FriendProfile from '../FriendProfile/FriendProfile'
import FriendProfilePost from '../FriendProfilePost/FriendProfilePost'
import {useParams} from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import './friendmainprofile.css'
 
function FriendMainProfile() {
   const {userId} = useParams()
   useEffect(()=>{
    const getUser = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/post/user/getMypost/${userId}`
          );
          setPost(response.data);
          console.log('posts',posts)
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
   },[])

   const [posts, setPost] = useState([])
    
  return (
    <div className='FriendMainProfile'>
      <FriendProfile/>

      {posts.map((item)=>{

        return   <FriendProfilePost posts={item} />
      })}
    
    </div>
  )
}

export default FriendMainProfile