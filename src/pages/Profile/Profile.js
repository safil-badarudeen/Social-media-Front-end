import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import Profile from '../../component/Profile/Profile'
import ProfileRightBar from '../../component/ProfileRightSideContainer/ProfileRightBar'

import { useSelector } from 'react-redux';

import './profile.css'


function ProfilePage() {
  const userDetails = useSelector ((state)=>state.user)
  const user=userDetails.user;
   let id = user.other._id;

  return (
    <div className='ProfileContainer'>
     <Navbar/>
     <div  className='ComponentContainer'>
      <Profile/>
   
    </div>
    </div>
  )
}

export default ProfilePage