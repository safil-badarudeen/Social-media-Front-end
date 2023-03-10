import "./App.css";
import Home from "./pages/Home/Home";
import ProfilePage from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Verifyemail from "./pages/verifyEmail/verifyEmail";
import Chat from './pages/Chat/Chat'
import UserProfile from "./pages/UserProfile/UserProfile"
import NotFound from "./component/NotFound/NotFound";
import ExplorePage from "./pages/Explore/Explore"
import Search from "./component/Search/Search"
import Followers from "./pages/FollowData/Followers"
import OnePostPage from "./pages/OnePost/OnePostPage"

import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";

function App() {
  const userDetails = useSelector((state)=>state.user);
  const user = userDetails.user
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/email" element={<Verifyemail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path ="/profile/userprofile/:userId" element={<UserProfile />} />
          <Route path = "/explore" element={<ExplorePage />} />
          <Route path="*" element={<NotFound/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/followers" element={<Followers/>}/>
          <Route path="/onePost" element={<OnePostPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>   //user !== null ? <Navigate to={"/"}/> : 
  );
}

export default App;
