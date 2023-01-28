import "./App.css";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Verifyemail from "./pages/verifyEmail/verifyEmail";
import Chat from './pages/Chat/Chat'
import UserProfile from "./pages/UserProfile/UserProfile"
import NotFound from "./component/NotFound/NotFound";
import Explore from "./component/Explore/Explore"


import { BrowserRouter, Routes, Route ,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const userDetails = useSelector((state)=>state.user);
  const user = userDetails.user
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/email" element={<Verifyemail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path ="/profile/userprofile/:userId" element={<UserProfile />} />
          <Route path = "/explore" element={<Explore />} />
          <Route path="*" element={<NotFound/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>   //user !== null ? <Navigate to={"/"}/> : 
  );
}

export default App;
