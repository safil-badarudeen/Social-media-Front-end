import React from 'react'
import Explore from "../../component/Explore/Explore"
import Leftbar from '../../component/leftSideContainer/Leftbar'
function ExplorePage() {
  return (
    <div className="flex ">
        <Leftbar/>
        <Explore/>
    </div>
  )
}

export default ExplorePage