const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(blog){
    res.json(blog.toJSON())
  }else{
    res.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog.toJSON())
})

blogsRouter.put('/:id', middleware.userExtractor, async (req, res) => {
  const body = req.body
  const blog = await Blog.findById(req.params.id)

  const updateBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  if (!req.token) {
    res.status(401).json({ error: 'missing token' })
  } else if (!blog) {
    res.status(401).json({ error: 'invalid blog id' })
  } else if (blog.user.toString() === req.user.id) {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateBlog, { new: true })
    res.status(200).json(updatedBlog.toJSON())
  } else {
    res.status(401).json({
      error: 'User does not have authorization'
    })
  }
})

blogsRouter.delete('/:id', middleware.userExtractor,async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(401).json({ error: 'Blog ID does not exist' })
  }
  else if (blog.user.toString() === req.user.id) {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
  else {
    res.status(401).json({ error: 'User does not have authorization' })
  }
})

module.exports = blogsRouter