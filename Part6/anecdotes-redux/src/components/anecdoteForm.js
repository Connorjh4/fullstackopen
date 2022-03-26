import React from 'react'
import { connect } from 'react-redux'
import { postAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''
      props.postAnecdotes(content)
    }

    return(
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default connect(
    null,
    { postAnecdotes }
)(AnecdoteForm)