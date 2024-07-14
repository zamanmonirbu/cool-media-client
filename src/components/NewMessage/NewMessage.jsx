import React, { useState } from 'react';
import './NewMessage.css';
import { API } from '../../api/UserRequests';
import newChat from '../../img/conversation.png';
import { useSelector } from 'react-redux';

const NewMessage = ({ onNewChat }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages

  const handleSearch = async () => {
    try {
      const users = await searchUsers(query);
      setResults(users);
      setSearch(true);
    } catch (err) {
      console.error(err);
    }
  };

  const searchUsers = async (query) => {
    try {
      const res = await API.get(`/user/search?query=${query}`);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleUserClick = async (receiverId) => {
    try {
      const senderId = user._id;
      const res = await API.post('/chat', { senderId, receiverId });
      if (res.status === 200) {
        // console.log('Chat created:', res.data);
        onNewChat(res.data); 
        setQuery('');
        setResults([]);
        setSearch(false);
        setErrorMessage(''); 
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setQuery('');
        setResults([]);
        setSearch(false);
        setErrorMessage('User is already your chat member');
      } 
    }
  };
  const handleHideError=()=>{
    setQuery('');
    setResults([]);
    setSearch(false);
    setErrorMessage(''); 
  }

  return (
    <div className="LogoSearchChat" >
      <div className="Search-chat">
        <input
          type="text"
          placeholder="New Chat"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="s-icon-plus" onClick={handleSearch}>
          <img src={newChat} alt="newMessage" />
        </div>
      </div>
      {errorMessage && <div className="ErrorMessage" onClick={handleHideError}>{errorMessage}</div>}
      {search && (
        results.length > 0 ? (
          <div className="SearchResults">
            {results.map((user) => (
              <div 
                key={user._id} 
                className="SearchResultItem" 
                onClick={() => handleUserClick(user._id)}
              >
                <img src={user.profilePicture} alt="profile" className="SearchResultImg" />
                <span>{user.firstname} {user.lastname}</span>
              </div>
            ))}
          </div>
        ) : (
          <div onClick={handleHideError}>
            <p style={{ color:'red' }}>No User Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default NewMessage;
