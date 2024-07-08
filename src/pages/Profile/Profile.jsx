import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import { useParams } from "react-router-dom";
const Profile = () => {
  const {id}=useParams();
  return (
    <div className="Profile">
      <ProfileLeft id={id}/>
      <div className="Profile-center">
        <ProfileCard location = 'profilePage' id={id}/>
      <PostSide/>
      </div>
      <RightSide/>
    </div>
  );
};

export default Profile;
