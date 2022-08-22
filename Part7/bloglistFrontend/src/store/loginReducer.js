import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from "./notifyReducer"

const initialState = null

const userSlice = createSlice({
    name: 'loggedUser',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        },
        clearUser: () => {
            return initialState
        }
    }
})

export const Login = (cred) => {
    return async dispatch => {
        try {
            const loggedUser = await loginService.login(cred)
            dispatch(setUser(loggedUser))
            blogService.setToken(loggedUser.token);   
            dispatch(setNotification({message:`Welcome ${loggedUser.name}!`, color:'green', time: 5}))
        }
        catch (err) {
            dispatch(setNotification({message:`${err}`, color:'red', time: 5}))
        }
    }
}

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer