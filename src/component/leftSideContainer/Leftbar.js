import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SlHome } from "react-icons/sl";
import { BiSearchAlt, BiLogOut } from "react-icons/bi";
import { FaWpexplorer } from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { CgDetailsMore } from "react-icons/cg";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect } from "react";

function Leftbar() {
  const [showMore, setShowMore] = useState(false);
 

 

  return (
    <div className="flex flex-col max-h-full sm:h-full md:h-full fixed bg-slate-50 rounded-lg md:min-w-[200px] lg:min-w-[300px]">
      <div className="mt-10">
        <Link to="/">
          <p className=" font-bold font-mono text-3xl text-indigo-500 hidden md:block lg:block">
            Sphere
          </p>
        </Link>
      </div>

      <Link to="/">
        <div className="ml-5 mt-5 py-8 overflow-hidden  rounded-xl flex  hover:scale-110 duration-300 hover:bg-slate-200">
          <div className=" mt-2 px-2">
            <SlHome className="scale-150" />
          </div>
          <div className="hidden md:block lg:block ">
            <h1 className="text-xl pl-20">Home</h1>
          </div>
        </div>
      </Link>

      <div className="ml-5  py-8   rounded-xl flex   hover:scale-110 duration-300 hover:bg-slate-200">
        <div className="px-2 mt-2">
          <BiSearchAlt className="scale-150" />
        </div>
        <div className="hidden md:block lg:block">
          <h1 className="text-xl pl-20">Search</h1>
        </div>
      </div>

      <div className="ml-5  py-8 rounded-xl flex hover:scale-110 duration-300 hover:bg-slate-200">
        <div className=" px-2 mt-2">
          <FaWpexplorer className="scale-150" />
        </div>
        <div className="hidden md:block lg:block">
          <h1 className="text-xl  pl-20">Explore</h1>
        </div>
      </div>

      <div className="ml-5  py-8 rounded-xl flex hover:scale-110 duration-300 hover:bg-slate-200">
        <div className="px-2 mt-2">
          <CgProfile className="scale-150" />
        </div>
        <div className="hidden md:block lg:block">
          <h1 className="text-xl  pl-20">Notification</h1>
        </div>
      </div>

      <div className="ml-5  py-8  rounded-xl flex  hover:scale-110 duration-300 hover:bg-slate-200">
        <div className="px-2 mt-2">
          <BsChatSquareText className="scale-150" />
        </div>
        <div className="hidden md:block lg:block">
          <h1 className="text-xl pl-20 ">Chat</h1>
        </div>
      </div>

      <div className="ml-5  py-8   rounded-xl flex  hover:scale-110 duration-300 hover:bg-slate-200">
        <div className="px-2 mt-2">
          <CgProfile className="scale-150" />
        </div>
        <div className="hidden md:block lg:block">
          <h1 className="text-xl  pl-20">Profile</h1>
        </div>
      </div>

      <div className="ml-5 screen-container py-6 sm:mt-10 md:mt-0 lg:mt-0 rounded-xl flex  hover:scale-110 duration-300 hover:bg-slate-200" onClick={()=>setShowMore(!showMore)}>
        <div className="px-2">
          <CgDetailsMore className="scale-150 text-gray-500" />
        </div>
        <div className="hidden md:block lg:block">
          <p className="pl-20 text-gray-500">more</p>
        </div>
      </div>
      {/* overlay */}
      {showMore ? <div className="duration-300 h-screen bg-black/50 w-screen z-10 absolute"></div> : <div>  </div>}
     

      {/* moreContainer */}
      {showMore ? <div className=" screen-container flex flex-col absolute z-10 bg-slate-50 rounded-xl  bottom-16 left-4 lg:w-[300px] ">
         <div className='h-6 cursor-pointer ' onClick={()=>setShowMore(!showMore)}>
         <div className="flex pl-6 mt-2 hover:scale-105 duration-300">
            <IoMdArrowRoundBack className="scale-125" />
            <p className="pl-20 text-gray-500 hidden lg:block ">Go back</p>
          </div>
          
          </div>


        <div className="ml-5 mt-2  py-8  rounded-xl flex   hover:scale-110 duration-300 hover:bg-slate-200">
          <div className="px-2 mt-2">
            <FiSettings className="scale-150" />
          </div>
          <div>
            <h1 className="text-xl md:pl-10 lg:pl-20 md:pr-5">Settings</h1>
          </div>
        </div>

        <div className="ml-5  py-8  rounded-xl flex   hover:scale-110 duration-300 hover:bg-slate-200">
          <div className="px-2 mt-2">
            <BiLogOut className="scale-150" />
          </div>
          <div>
            <h1 className="text-xl md:pl-10 lg:pl-20 text-red-500 md:pr-5">Log Out</h1>
          </div>
        </div>
      </div>:<div></div>}
      
    </div>
  );
}

export default Leftbar;
