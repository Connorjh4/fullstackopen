import React, { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogPost = async e => {
    e.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
  }

  return (
    <form onSubmit={handleBlogPost} data-testid="createForm" >
      <div>
                    title:
        <input
          type="text"
          name="title"
          data-testid="title-input"
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
                    author:
        <input
          type="text"
          name="author"
          data-testid="author-input"
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
                    url:
        <input
          type="text"
          name="url"
          data-testid="url-input"
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">Post</button>
    </form>
  )
}


export default CreateForm