import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequests";
const Conversation = ({ data, currentUser, online }) => {

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

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
         
          <img
            src={userData?.profilePicture?userData.profilePicture 
              : "https://i.ibb.co/ryhyt7C/cute-baby-boy-profile-picture-kid-avatar-176411-4644.png"

            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
         
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </>
      
  );
};

export default Conversation;
