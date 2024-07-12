import React, { useState } from 'react';
import Logo from '../../img/logo.png';
import './LogoSearch.css';
import { UilSearch } from '@iconscout/react-unicons';
import { API } from '../../api/UserRequests';

const LogoSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState(false);

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

  return (
    <div className="LogoSearch">
      <img src={Logo} alt="Logo" className="logoImg" />
      <div className="Search">
        <input
          type="text"
          placeholder="Find Buddy"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="s-icon" onClick={handleSearch}>
          <UilSearch />
        </div>
      </div>
      {search && (
        results.length > 0 ? (
          <div className="SearchResults">
            {results.map((user) => (
              <div key={user._id} className="SearchResultItem">
                <img src={user.profilePicture} alt="profile" className="SearchResultImg" />
                <span>{user.firstname} {user.lastname}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="SearchResults">
            <p className="SearchResultItem">No User Found</p>
          </div>
        )
      )}
    </div>
  );
};

export default LogoSearch;
