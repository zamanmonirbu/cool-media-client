import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState({
    firstname: other.firstname || "",
    lastname: other.lastname || "",
    worksAt: other.worksAt || "",
    livesIn: other.livesIn || "",
    country: other.country || "",
    relationship: other.relationship || ""
  });
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = { ...formData };

    const uploadToImgBB = async (image) => {
      const formData = new FormData();
      formData.append('image', image);
      const imgbbUrl = "https://api.imgbb.com/1/upload?key=13c60fa1ef34d09a7e455348d706165b";

      try {
        const response = await axios.post(imgbbUrl, formData);
        if (response.data.success) {
          return response.data.data.url;
        } else {
          console.error('Image upload failed:', response.data);
          return null;
        }
      } catch (err) {
        console.error('Error uploading image:', err);
        return null;
      }
    };

    if (profileImage) {
      const profileImageUrl = await uploadToImgBB(profileImage);
      if (profileImageUrl) {
        UserData.profilePicture = profileImageUrl;
      }
    }

    if (coverImage) {
      const coverImageUrl = await uploadToImgBB(coverImage);
      if (coverImageUrl) {
        UserData.coverPicture = coverImageUrl;
      }
    }

    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  // console.log(formData,profileImage,coverImage);

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInput"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="worksAt"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesIn"
            className="infoInput"
          />
          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Relationship status"
            name="relationship"
          />
        </div>

        <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
