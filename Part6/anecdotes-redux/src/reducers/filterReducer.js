import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchText: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
                state.searchText = action.payload
        }
    }
})

export const { setFilter } = filterSlice.actions
  
export default filterSlice.reducer