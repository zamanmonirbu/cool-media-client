import axios from 'axios';

const API = axios.create({ baseURL: 'https://cool-media-backend.onrender.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const deletePost = (id, userId) => API.delete(`/posts/${id}`, { data: { userId } });
export const updatePost = (id, updatedPost) => API.put(`/posts/${id}`, updatedPost);
export const likePost = (id, userId) => API.put(`/posts/${id}/like`, { userId });
export const commentPost = (id, comment) => API.post(`/comments`, comment);  // updated request
export const getComments = (postId) => API.get(`/comments/${postId}`);  // new request
