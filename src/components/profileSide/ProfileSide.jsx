import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './ProfileSide.css'
import { useSelector } from 'react-redux'

const ProfileSide = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
// console.log(user._id);
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <ProfileCard location = 'homepage' id={user?._id}/>
        <FollowersCard/>
    </div>
    )
}

export default ProfileSide