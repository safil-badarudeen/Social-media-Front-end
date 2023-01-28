import React, { useEffect } from "react";
import "./chatContainer.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRef } from "react";
import {io} from 'socket.io-client';


function ChatContainer({ currentChatUser }) {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails.user;
  const id = user.other._id;
  // console.log(user, id);
  const accessToken = user.accessToken;

  const [chat, setChat] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [arrivalMessage, setArrivalMessage]=useState(null)

  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    const getChat = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chat/message/recieve/${id}/${currentChatUser._id}`,
          {
            headers: {
              token: accessToken,
            },
          }
        );
        setChat(res.data);
      } catch (error) {}
    };
    getChat();
  }, [currentChatUser._id]);

  //
  useEffect(() => {
    console.log(scrollRef.current)
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage =  () => {
    try {
     socket.current.emit("send-msg",{
      to:currentChatUser._id,
      from:id,
      message:messageInput
     })

      fetch(`http://localhost:5000/api/chat/message/create`, {
        method: "POST",
        headers: { "Content-Type": "application/JSON", token: accessToken },
        body: JSON.stringify({
          from: id,
          to: currentChatUser._id,
          message: messageInput,
        }),
      });

      const newChat = {
        myself: true,
        message: messageInput,
      };
      //show message while we send
      setChat([...chat, newChat]);
      setMessageInput("");
    } catch (error) {
      console.log({ msg: error.message });
    }
  };

  
  useEffect(()=>{
    if(currentChatUser !== null){
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser",id)
    }
  },[id])

  useEffect(()=>{
    if(socket.current ){
   socket.current.on("msg-receive",(msg)=>{
    // console.log(msg);
    setArrivalMessage({myself:false , message:msg})
   },[arrivalMessage])
    }
  })

  useEffect(()=>{
    arrivalMessage && setMessageInput((pre)=>[...pre, arrivalMessage])
  },[arrivalMessage])

  

  return (
    <div className="ChatContainerMainContainer">
      <div className="imageNameChatContainer">
        <img
          src={currentChatUser.profile}
          className="ChatContainerProfilePic"
          alt=""
        />
        <p className="chatContainerName">{currentChatUser?.username}</p>
      </div>
      <div className="conversationContainer">
        {chat.map((item) => (
           item.myself === false ? (
            <div className="messageContainer">
              <img
                src={currentChatUser.profile}
                className="messageProfielPic"
                alt=""
              />
              <div>
                <p className="message">{item.message}</p>
              </div>
            </div>
          ) : (
            <div  ref={scrollRef}  className="sendingMessageContainer">
              <p className="message">{item.message}</p>
            </div>
          )
        ))}
      </div>

      <div className="messageInputContainer">
        <input
          type="text"
          placeholder="Type a message"
          value={messageInput}
          name="message"
          id="message"
          onChange={(e) => setMessageInput(e.target.value)}
          className="messageInput"
        />

        <button className="sendButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
