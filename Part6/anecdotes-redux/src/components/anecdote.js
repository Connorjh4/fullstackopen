import React from 'react'
import { useDispatch } from 'react-redux'
import { voteAnecdote }  from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()
    
    const style = {
        padding: 5,
    }

    return(
        <div key={anecdote.id} style={style}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button 

                    onClick={() => {
                        dispatch(voteAnecdote(anecdote))
                        dispatch(setNotification({message: `you voted '${anecdote.content}'`, time: 5}))
                    }}>vote</button>
            </div>
        </div>
    )
}

export default Anecdote