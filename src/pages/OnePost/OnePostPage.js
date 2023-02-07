import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import OnePost from '../../component/OnePost/OnePost'

function OnePostPage() {
    const [post , setPost] = useState([])

    useEffect(() => {
        const getPost = async () => {
          try {
            //backend userDetails route
            const response = await axios.get(
              `http://localhost:5000/api/post/user/getOnePost/63d8e65a19c2070da9b0f3c3`);
            setPost(response.data);
          } catch (error) {
            console.log("error on response", error);
          }
        };
        getPost();
      },[]);
    
      

  return (
    <div>
      
          <OnePost post={post}/>
       
    </div>
  )
}

export default OnePostPage