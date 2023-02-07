import React from 'react'

function Followers() {
  return (
    <div className="bg-black/50 min-h-screen flex">
        <div className="w-[350px] bg-white h-[600px]  mt-10 lg:ml-[600px] md:ml-[320px] sm:ml-[162px] ml-[90px] overflow-y-auto ">
         <p className="text-[17px] mt-5 font-bold">Followers</p>
         <div className="flex  border mx-5 rounded-lg hover:scale-105 transition py-2">
           <div >
              <img className="rounded-full h-[50px] w-[50px] object-cover ml-10" src="https://cdn.pixabay.com/photo/2022/06/08/05/43/motorbike-7249769_960_720.jpg" alt="image" />
            </div> 
            <div className=" ml-14">
              <p className="mt-3 font-semibold">Name</p>
            </div>
        </div>

        </div>


    </div>
  )
}

export default Followers