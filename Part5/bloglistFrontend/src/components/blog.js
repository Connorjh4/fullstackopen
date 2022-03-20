import React, { useState } from 'react'

export const Blog = ({ blog, handleLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    handleLikes(updatedBlog)
  }


  const handleDelete = async e => {
    e.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle} data-testid='blog'>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <>
        {visible
          ?
          <div>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button className='like' onClick={addLike}>like</button></p>
            <p>{blog.user.name}</p>
            <button onClick={handleDelete}>remove</button>
          </div>
          :
          null
        }
      </>
    </div>
  )
}

export default Blog