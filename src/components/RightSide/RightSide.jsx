import React, { useState } from "react";
// import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
import ActiveFriend from "../ActiveFriends/ActiveFriends";
import "./RightSide.css";

const RightSide = () => {
  // const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      <NavIcons />
      <div className="makeSureActive">
      <b>Active friend list...</b>
      <ActiveFriend/>  
      {/* <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} /> */}
      </div>
    </div>
  );
};

export default RightSide;
