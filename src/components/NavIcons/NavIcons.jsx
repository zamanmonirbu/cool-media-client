import React from "react";
import HomeIcon from "../../img/home.png";
import NotificationIcon from "../../img/noti.png";
import CommentIcon from "../../img/comment.png";
import profile from "../../img/man.png";
import { Link } from "react-router-dom";
import "./navicons.css"; 
import { useSelector } from "react-redux";

const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={HomeIcon} alt="Home" />
      </Link>
      <Link to={`../profile/${user._id}`}>
        <img src={profile} alt="Settings" />
      </Link>
      <img src={NotificationIcon} alt="Notifications" />
      <Link to="../chat">
        <img src={CommentIcon} alt="Chat" />
      </Link>
    </div>
  );
};

export default NavIcons;
