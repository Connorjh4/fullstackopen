import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { getUsers } from "./userReducer";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    likeBlog: (state, action) => {
      // const blog = state.find(b => b.id === action.payload.id);
      // blog.likes += 1
      console.log(state)
      return action.payload;
    },
    deleteBlog: (state, action) => {
      return state.filter((b) => b.id !== action.payload.id);
    },
    appendBlogs: (state, action) => {
      state.push(action.payload);
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
  },
});

export const addLike = (blog) => {
  return async (dispatch) => {
    await blogService.likeDislike(blog);
    dispatch(likeBlog(blog));
    getUsers()
  };
};

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    return dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlogs(newBlog));
    getUsers()
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch(deleteBlog(blog));
    getUsers()
  };
};

export const { likeBlog, setBlogs, appendBlogs, deleteBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
