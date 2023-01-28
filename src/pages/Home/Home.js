import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import LeftBar from '../../component/leftSideContainer/Leftbar'
import RightBar from '../../component/rightSideContainer/RightBar'
import MainPost from '../../component/mainPostContainer/MainPost'
import "./Home.css"


const Home = () => {
  return (
    
    <div className='Home'>
      <Navbar/>
      <div className='ComponentContainer'>
        <LeftBar/>
        <MainPost/>
        <RightBar/>
      </div>
     
    </div>
    
    
    
  )
}

export default Home