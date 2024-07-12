// src/api/UserAPI.js
import axios from 'axios';

export const API = axios.create({ baseURL: 'https://cool-media-backend.onrender.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});



export const searchUsers = async (query) => {
  try {
    const res = await API.get(`/user/search?query=${query}`);
    console.log("My data",res.data)
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const getUser = (userId) => API.get(`/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get('/user');
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
// export const searchUsersAPI = (query) => API.get(`/user/search?query=${query}`);
