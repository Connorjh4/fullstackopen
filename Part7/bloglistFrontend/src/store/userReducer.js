import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/users'

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
  },
});

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    return dispatch(setUsers(users));
  };
};

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;