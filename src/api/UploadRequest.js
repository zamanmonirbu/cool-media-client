import axios from "axios";

const API = axios.create({ baseURL: "https://cool-media-backend.vercel.app" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const uploadImages = (data) => API.post("/upload/", data);
export const uploadPost = (data) => API.post("/posts", data);

// https://api.imgbb.com/1/upload?key=13c60fa1ef34d09a7e455348d706165b
