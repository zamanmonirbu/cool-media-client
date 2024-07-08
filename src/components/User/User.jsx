import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { Link } from "react-router-dom";
const User = ({ person }) => {
  // console.log(person);
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
             person.profilePicture
              ?  person.profilePicture
              : "https://i.ibb.co/ryhyt7C/cute-baby-boy-profile-picture-kid-avatar-176411-4644.png"
            }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span><Link to={`/profile/${person._id}`} style={{ textDecoration: "none", color: "inherit" }}>{person.firstname}</Link> </span>
          <span><Link to={`/profile/${person._id}`} style={{ textDecoration: "none", color: "inherit" }}>@{person.username}</Link> </span>
          
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
