import axios from "axios";

const baseUrl = "/api/blogs";

let token
let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  }
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (newObject) => {
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async (blog) => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return res.data;
};

const remove = async (blog) => {
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return res.data;
};

const likeDislike = async (blog) => {
  const res = await axios.post(`${baseUrl}/${blog.id}/likes`, blog, config);
  return res.data;
};

const exportedObject = {
  getAll,
  create,
  setToken,
  update,
  remove,
  likeDislike,
};

export default exportedObject;
