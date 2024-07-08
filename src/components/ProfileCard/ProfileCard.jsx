import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../api/UserRequests";
const ProfileCard = ({location,id}) => {
  // const { user } = useSelector((state) => state.authReducer.authData);
  const [user,setUserData]=useState(null);
  const posts = useSelector((state)=>state.postReducer.posts)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUser(id);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

  getUserData();
  }, [id]);

  // console.log(userData)

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
            user?.coverPicture
              ?  user.coverPicture
              :  "https://i.ibb.co/Hzh2G6N/Avatar-Profile-PNG-Picture.png"
          } alt="CoverImage" />
       <img
  src={
    user?.profilePicture
      ? user.profilePicture
      : "https://i.ibb.co/ryhyt7C/cute-baby-boy-profile-picture-kid-avatar-176411-4644.png"
  }
  alt="Profile"
/>

      </div>
      <div className="ProfileName">
        <span>{user?.firstname} {user?.lastname}</span>
        <span>{user?.worksAt? user?.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.following.length}</span>
            <span>Following</span>
          </div>

          {/* for profilepage */}
          
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts?.filter((post)=>post.userId === user?._id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user?._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
