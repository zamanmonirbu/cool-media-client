import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'

const ProfileLeft = ({id}) => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <InfoCard id={id} />
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft