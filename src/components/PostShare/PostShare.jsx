import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../actions/UploadAction";
import axios from 'axios';
import Location from "../Location/Location";
import StyledCalendar from "../TimeShare/TimeShare";

const   PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [locationShare, setLocationShare] = useState(false);
  const [timeShare, setTimeShare] = useState(false);
  const desc = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();
  const handleUpload = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      const imgbbUrl = "https://api.imgbb.com/1/upload?key=13c60fa1ef34d09a7e455348d706165b";

      try {
        const response = await axios.post(imgbbUrl, formData);
        if (response.data.success) {
          newPost.image = response.data.data.url;
        } else {
          console.error('Image upload failed:', response.data);
        }
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }

    dispatch(uploadPost(newPost));
    resetShare();
  };

  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
    setLocationShare(false);
    setTimeShare(false);
  };

  return (
    <div className="PostShare">
      <img
        src={user.profilePicture ? user.profilePicture : "https://i.ibb.co/ryhyt7C/cute-baby-boy-profile-picture-kid-avatar-176411-4644.png"}
        alt="Profile"
      />

      <div>
        <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }} onClick={() => setLocationShare(!locationShare)}>
            <UilLocationPoint />
            Location
          </div>

          <div className="option" style={{ color: "var(--schedule)" }} onClick={() => setTimeShare(!timeShare)}>
            <UilSchedule />
            Schedule
          </div>
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}

        {locationShare && <Location />}
        {timeShare && <StyledCalendar />}
      </div>
    </div>
  );
};

export default PostShare;
