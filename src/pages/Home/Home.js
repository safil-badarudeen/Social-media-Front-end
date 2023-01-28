import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import LeftBar from "../../component/leftSideContainer/Leftbar";
import RightBar from "../../component/rightSideContainer/RightBar";
import MainPost from "../../component/mainPostContainer/MainPost";
import "./Home.css";

const Home = () => {
  return (
    
      <div className="flex h-fit bg-gray-300">
        <div className='bg-gray-300 '>
        <LeftBar />
        </div>
        <div className='bg-gray-300'>
          <MainPost />
        </div>
        <div className='bg-gray-300'>
          <RightBar />
        </div>
      </div>
    
  );
};

export default Home;
