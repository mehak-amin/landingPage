import React from "react";
import "./Messagebox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTimes } from "@fortawesome/free-solid-svg-icons";

const MessageBox = ({ showMessageBox }) => {
  const messages = [
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
    {
      icon: faUser,
      name: "Basit Bashir",
      msg: "Hello All...!",
      time: "12:37pm",
    },
  ];

  return (
    <div className={`msg-box${showMessageBox ? "-active" : ""}`}>
      <div className="messages">
        <div className="message-heading d-flex align-items-center gap-4">
          <div>
            <p className="msg-heading m-0 p-0">Messages</p>
            <p className="msg-para m-0 p-0">All Team Members</p>
          </div>
          <div className="close-button-holder">
            <FontAwesomeIcon
              icon={faTimes}
              size="sm"
              className="navbar-icons"
            />
          </div>
        </div>
        <div className="chats">
          <div className="chat-slider">
            {messages.map((message, index) => (
              <div key={index} className="msg-part">
                <div className="ind-chat">
                  <div className="user-info">
                    <FontAwesomeIcon
                      icon={message.icon}
                      className="custom-icon"
                    />
                    <div className="message-content">
                      <p className="userName p-0 m-0">{message.name}</p>
                    </div>
                  </div>
                  <div className="chat">
                    <p className="m-0">{message.msg}</p>
                    <p className="msg-time m-0 p-0">{message.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="snd-msg">
          <input type="text" placeholder="Enter Your Message..." />
          <button className="btn-send">Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
