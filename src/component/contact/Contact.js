import React, { useEffect, useState } from "react";
import ChatContainer from "../ChatContainer/ChatContainer";
import "./contact.css";
import profileImage from "../images/profilePic.jpg";
import axios from "axios";
import { useSelector } from "react-redux";

function Contact() {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  const id = user.other._id;
  // console.log(user, id);
  const accessToken = user.accessToken;
  const [users, setUsers] = useState([]);
  const [currentChatUser , setCurrentChatUser] = useState('')

  // console.log("users", users);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/followingusers/${id}`,
          {
            headers: {
              token: accessToken,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {}
    };
    getUsers();
  }, []);

  const handleUser=(item)=>{
    setCurrentChatUser(item)
  }
  return (
    <div className="OpeningContainer">
      <div className="mainContactContainer">
        <div>
          <div className="contactSearchBarContainer">
            <input
              type="search"
              placeholder="Search Your Friends"
              ClassName="searchForcontact"
            />
          </div>
          <div>
            {users.map((item) => {
              return item._id !== id ? 
                <div className="ContactUserContainer" onClick={() =>handleUser(item)}>
                  <img src={item.profile} className="chatUserImage" alt="" />
                  <div className="ContactNameText">
                    <p className="UserNameText">{item.username}</p>
                    <p className="OpenText"> Open Your message</p>
                  </div>
                </div>
              : (
                ""
              );
            })}
          </div>
        </div>
      </div>

     {currentChatUser !== '' ? <div>
        <ChatContainer currentChatUser={currentChatUser}/>
      </div> : <div className = 'openConversation'> <p className ='openConversationText'> open  a conversation </p> </div>} 
      
    </div>
  );
}

export default Contact;
