import React from "react";
import ChatContainer from "../../component/ChatContainer/ChatContainer";
import Contact from "../../component/contact/Contact";
import Navbar from "../../component/Navbar/Navbar";

function Chat() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{display: "flex"}}>
      <Contact />
      
       
      </div>
    </div>
  );
}

export default Chat;
