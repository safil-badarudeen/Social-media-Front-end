import React from "react";

function Search() {
  return (
    <div className="relative h-full bg-opacity-80">
      {/* //overlay */}
      <div className="bg-black/40 z-8 w-screen h-screen absolute"></div>
      {/* search main component */}
      <div className=" bg-slate-50 h-[500px] w-fit absolute z-10 left-[50px] sm:left-[130px] md:left-[300px] top-[100px] lg:left-[500px] duration-300 rounded-xl">
        {/* search box */}
        <div className="flex justify-center">
          <div class="input-group relative mt-5 ml-5 pr-10 flex items-stretch w-full mb-4">
            <input
              type="search"
              class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
            />
            <button
              class="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              type="button"
              id="button-addon3"
            >
              Search
            </button>
          </div>
        </div>
          {/* search result box */}
        <div className="grid">
        <div class="h-24 mx-auto border-2 rounded-md w-60">
          <div class="flex flex-row items-center justify-center h-full space-x-5">
            <img  src="" class="w-12 h-12 bg-gray-300 rounded-full "/>
            <div class="flex flex-col space-y-3">
              <div class="h-6 bg-gray-300 rounded-md w-36 "></div>
              <div class="w-24 h-6 bg-gray-300 rounded-md "></div>
            </div>
          </div>
        </div>
      </div>

      </div>
      
      
    </div>
  );
}

export default Search;
