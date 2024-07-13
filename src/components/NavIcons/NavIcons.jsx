import React from "react";
import HomeIcon from "../../img/home.png";
import NotificationIcon from "../../img/noti.png";
import CommentIcon from "../../img/comment.png";
import SettingsIcon from "../../img/settings.png";
import { Link } from "react-router-dom";
import "./navicons.css"; // Import your CSS file

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={HomeIcon} alt="Home" />
      </Link>
      <Link to="../settings">
        <img src={SettingsIcon} alt="Settings" />
      </Link>
      <img src={NotificationIcon} alt="Notifications" />
      <Link to="../chat">
        <img src={CommentIcon} alt="Chat" />
      </Link>
    </div>
  );
};

export default NavIcons;
