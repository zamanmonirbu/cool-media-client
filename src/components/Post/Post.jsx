import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import ThreeDot from "../../img/options.png"; 
import { likePost, deletePost, updatePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { getUser } from "../../api/UserRequests";
import CommentMain from "../Comment/Comment";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [postUser, setPostUser] = useState(null);
  const [comment, setComment] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedDesc, setEditedDesc] = useState(data.desc);

  // console.log(data.userId);
  useEffect(() => {
    let isMounted = true; 
    const fetchUser = async () => {
      try {
        const res = await getUser(data.userId);
        if (isMounted) { 
          setPostUser(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
    return () => {
      isMounted = false; 
    };
  }, [data.userId]);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleDelete = async () => {
    try {
      await deletePost(data._id, user._id);
      window.location.reload(); 

    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async () => {
    try {
      console.log(data._id, { desc: editedDesc,userId:user._id });
      await updatePost(data._id, { desc: editedDesc,userId:user._id });
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

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
              <span className="timeago"> {format(postUser.createdAt)}</span>
            </Link>
          </b>
        ) : (
          ""
        )}
        {user._id === data.userId && (
          <div className="menu-container">
            <img src={ThreeDot} alt="menu" className="three-dot-menu" onClick={() => setShowMenu(!showMenu)} />
            {showMenu && (
              <div className="menu should-under">
                <div className="menu-item" onClick={() => setShowEditModal(true)}>Edit</div>
                <div className="menu-item" onClick={handleDelete}>Delete</div>
              </div>
            )}
          </div>
        )}
        <p>{data.desc}</p>
      </div>
      <img className="postImage"
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
        <img src={Comment} alt="" onClick={() => setComment(true)} style={{ cursor:"pointer" }} />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes {comment && <CommentMain postId={data._id} />}

      </span>


      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
            <h2>Edit Post</h2>
            <textarea value={editedDesc} onChange={(e) => setEditedDesc(e.target.value)} />
            <button onClick={handleEdit}>Save</button>
            <button className="cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
