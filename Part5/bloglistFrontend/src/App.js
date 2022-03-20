import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/notification'
import LoginForm from './components/loginForm'
import CreateForm from './components/createForm'
import Blog from './components/blog'
import Toggle from './components/toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({
        text: `Welcome ${user.name}`,
        color: 'green'
      })
    }
    catch (e) {
      setMessage({
        text: 'Wrong credentials',
        color: 'red'
      })
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    setMessage({
      text: `${user.name} has been signed out`,
      color: 'green'
    })
    setUser(null)
  }

  const addBlog = async blogObject => {
    try {
      const newBlog = await blogService.create(blogObject)
      createFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      setMessage({
        text: `a new blog '${newBlog.title}' by ${newBlog.author}`,
        color: 'green'
      })
    }
    catch (e) {
      setMessage({
        text: `${e}`,
        color: 'red'
      })
    }
  }

  const handleLikes = async blog => {
    await blogService.update(blog)
    const updatedBlog = { ...blog }
    setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
  }

  const handleDelete = async deleteBlog => {
    const res = window.confirm(`Removing blog ${deleteBlog.title} by ${deleteBlog.author}`)
    if (res) {
      try {
        await blogService.remove(deleteBlog)
        setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
        setMessage({
          text: `Removed blog'${deleteBlog.title}'`,
          color: 'green'
        })
      }
      catch (e) {
        setMessage({
          text: `${e}`,
          color: 'red'
        })
      }
    }
  }

  return (
    <>
      {user === null
        ?
        <>
          <h1>Log into application</h1>
          <Notification
            message={message}
          />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </>
        :
        <>
          <h2>blogs</h2>
          <Notification
            message={message}
          />
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Toggle
            data-testid="newPost"
            buttonLabel="new post"
            ref={createFormRef}
          >
            <h2>Create New</h2>
            <CreateForm
              createBlog={addBlog}
            />
          </Toggle>
          <div>
            {blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1) && blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLikes={handleLikes}
                deleteBlog={handleDelete}
              />
            )}
          </div>
        </>
      }
    </>
  )
}

export default App