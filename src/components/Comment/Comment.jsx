import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { commentPost, getComments } from '../../api/PostsRequests';
import { Link } from 'react-router-dom';
import './Comment.css';

const Comment = ({ postId }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await getComments(postId);
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const comment = { postId, userId: user._id, text: newComment };
      await commentPost(postId, comment);
      setComments([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleCommentSubmit} key={user?._id}>
        <input
        className='inputComment'
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Comment</button>
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>  <Link to={`/profile/${user?._id}`}>{user?.username}</Link>: {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
