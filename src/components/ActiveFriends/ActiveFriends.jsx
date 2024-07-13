import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { userChats } from "../../api/ChatRequests";
import ConversationActiveUser from "./ConversationActiveUser";

const ActiveFriend = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Get the chat in chat section
  useEffect(() => {
    let isMounted = true;
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        if (isMounted) {
          setChats(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
    return () => { isMounted = false; };
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("https://cool-media-socket.onrender.com");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    
    return () => {
      socket.current.disconnect();
    };
  }, [user._id]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });

    return () => {
      socket.current.off("recieve-message");
    };
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
          <ConversationActiveUser
            data={chat}
            currentUser={user._id}
            online={checkOnlineStatus(chat)}
          />
        </div>
      ))}
    </>
  );
};

export default ActiveFriend;
