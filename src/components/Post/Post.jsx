import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { getUser } from "../../api/UserRequests";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [postUser, setPostUser] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser(data.userId)
        setPostUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [data.userId]);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  // console.log(postUser);

  return (   
    <div className="Post">
      <div className="detail">
      {postUser ? (
        <b>
          <Link to={`/profile/${postUser._id}`} className="user-link">
            <img src={postUser.profilePicture} alt="user_photo" className="user-photo" />
            <span className="user-name">
              {postUser.firstname} {postUser.lastname}
            </span>
            {/* {format(postUser.createdAt)} */}
            <span className="timeago"> {format(postUser.createdAt)}</span>

          </Link>
          {/* <span className="timeago"> {format(postUser.createdAt)}</span> */}
        </b>
      ) : (
        ""
      )}
      <p>{data.desc}</p>
    </div>
      <img
        src={data.image ? data.image : ""}
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
