import React from 'react'
import { useSelector } from 'react-redux'
import Anecdote from './anecdote'

const AnecdoteList = () => {
    const byLikes = (a, b) => (a.votes < b.votes) ? 1 : -1
    const anecdotes = useSelector( state => 
        state.anecdotes
            .filter(a => a.content.toLowerCase().includes(state.filter.searchText.toLowerCase()))
            .sort(byLikes)
    )

    return(
        <>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote}/>
                )
            }
        </>
    )
}

export default AnecdoteList