import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [postUser, setPostUser] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/user/${data.userId}`);
        setPostUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [data.userId]);

  // console.log(postUser?.firstname);


  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    
    <div className="Post">
      <div className="detail">
        {postUser? (
          <b>
            <Link to={`/profile/${postUser._id}`}>
              {postUser.firstname} {postUser.lastname}
            </Link>
            <span> {format(postUser.createdAt)}</span>
          </b>
        ):""}
        <p>{data.desc}</p>
      </div>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
    </div>
  );
};

export default Post;
