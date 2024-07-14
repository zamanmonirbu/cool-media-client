import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequests";
import { Link } from "react-router-dom";
import './ChatFriend.css'
const ConversationActiveUser = ({ data, currentUser, online }) => {

  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)
    const getUserData = async ()=> {
      try
      {
          const {data} =await getUser(userId)
         setUserData(data)
         dispatch({type:"SAVE_USER", data:data})
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [currentUser,data.members,dispatch])

// console.log("I am running");
  return (
    <>
     {
     online?
      (  <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot-display"></div>}
         
          <img
            src={userData?.profilePicture?userData.profilePicture 
              : "https://i.ibb.co/ryhyt7C/cute-baby-boy-profile-picture-kid-avatar-176411-4644.png"

            }
            alt="Profile"
            className="followerImage"
            style={{ width: "20px", height: "20px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <Link to={`/chat`}>{userData?.firstname} {userData?.lastname}</Link>
          </div>
         
        </div>
      </div>
       </>):("")
       }
    </>
  );
};

export default ConversationActiveUser;
