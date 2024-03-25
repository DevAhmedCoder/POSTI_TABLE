import axios from "axios";

const serverHost = process.env.REACT_APP_SERVER_HOST;
export const getPosts = () => {
  return axios.get(`${serverHost}/posts`).then((res) => res.data);
};
export const editPost = (data) => {
  return axios
    .put(`${serverHost}/posts/${data.id}`, data)
    .then((res) => res.data);
};
export const addPost = (data) => {
  return axios.post(`${serverHost}/posts`, data);
};
export const removePost = (data) => {
  return axios.delete(`${serverHost}/posts/${data}`);
};
