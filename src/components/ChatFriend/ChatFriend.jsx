import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { userChats } from "../../api/ChatRequests";
import Conversation from "../Coversation/Conversation";
import "./ChatFriend.css";


const ChatFriend = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [ setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [setReceivedMessage] = useState(null);

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("https://cool-media-socket.onrender.com");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                setCurrentChat(chat);
              }}
            >
              <Conversation
                data={chat}
                currentUser={user._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
           </> 
  );
};

export default ChatFriend;
