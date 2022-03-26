import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    console.log(res.data)
    return res.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const res = await axios.post(baseUrl, object)
    return res.data
}

const addVote = async (anecdote) => {
    const toVote = {...anecdote, votes: anecdote.votes +1}
    const res = await axios.patch(`${baseUrl}/${anecdote.id}`, toVote)
    return res.data
}

const toExport = { getAll, createNew, addVote }

export default toExport