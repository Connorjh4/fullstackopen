import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    time: 0
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.message = action.payload.message
            state.time = action.payload.time
        } 
    }
})

export const { setNotification } = notificationSlice.actions
  
export default notificationSlice.reducer