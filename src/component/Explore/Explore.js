import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Explore() {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;

  let id = user?.other?._id;

  const accesstoken = user?.accessToken;

  const [post, setPost] = useState([]);

  // useEffect(() => {
  //   const getPost = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/api/post/user/followingPost/${id}`,
  //         {
  //           headers: {
  //             token: accesstoken,
  //           },
  //         }
  //       );
  //       setPost(res.data);
  //     } catch (error) {}
  //   };
  //   getPost();
  // }, []);

  return (
    <div className="ml-12 sm:ml-[150px] md:ml-[225px] lg:ml-[200px]">
      <div>
      <section class="overflow-hidden text-gray-700">
  <div class="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
    <div class="flex flex-wrap -m-1 md:-m-2">
      <div class="flex flex-wrap w-1/2">
        <div class="w-1/2 p-1 md:p-2">
          <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"/>
        </div>
        <div class="w-1/2 p-1 md:p-2">
          <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"/>
        </div>
        <div class="w-full p-1 md:p-2">
          <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"/>
        </div>
      </div>
      <div class="flex flex-wrap w-1/2">
        <div class="w-full p-1 md:p-2">
          <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"/>
        </div>
        <div class="w-1/2 p-1 md:p-2">
          <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"/>
        </div>
        <div class="w-1/2 p-1 md:p-2">
          <img alt="gallery" class="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"/>
        </div>
      </div>
    </div>
  </div>
</section>
      </div>
      
      {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
        {post.map((item) => [
          item.image === "" ? (
            ""
          ) : (
            <div>
              <img
                src={`${item.image}`}
                className="ExploreImage"
                alt="explore"
              />
            </div>
          ),
        ])}
      </div> */}
    </div>
  );
}

export default Explore;
