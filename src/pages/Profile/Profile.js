import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import ProfileLeftbar from '../../component/ProfileLeftSideContainer/ProfileLeftbar'
import ProfileRightBar from '../../component/ProfileRightSideContainer/ProfileRightBar'
import ProfileMainPost from '../../component/ProfileMainPostContainer/ProfileMainPost'
import { useSelector } from 'react-redux';

import './profile.css'


function Profile() {
  const userDetails = useSelector ((state)=>state.user)
  const user=userDetails.user;
   let id = user.other._id;

  return (
    <div className='ProfileContainer'>
     <Navbar/>
     <div  className='ComponentContainer'>
    <ProfileLeftbar/>
    <ProfileMainPost/>
    <ProfileRightBar/>
    </div>

    </div>
  )
}

export default Profile