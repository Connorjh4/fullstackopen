import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../service/anecdote'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote: (state, action) => {
      const anecdote = state.find(a => a.id === action.payload.id)
      anecdote.votes += 1
    },
    appendAnecdotes: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const fetchAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const postAnecdotes = (content) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const voted = await anecdoteService.addVote(anecdote)
    dispatch(addVote(voted))
  }
}


export const { addVote, createAnecdote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions
  
export default anecdoteSlice.reducer