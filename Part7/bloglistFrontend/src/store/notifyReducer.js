import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notifySlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        setNotification: (state, action) => {
            return action.payload
        },
        resetNotification: () => {
            return initialState
        }
    }
})

export const { setNotification, resetNotification } = notifySlice.actions

export default notifySlice.reducer