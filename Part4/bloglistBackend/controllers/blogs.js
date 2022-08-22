const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const Like = require('../models/like')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments')
    .populate('likes')
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
    likeCount: 0,
    likes: [],
    comments: [],
    user: user.id
  })

  const savedBlog = await blog.save()
  // user.blogs = user.blogs.concat(savedBlog._id)
  // await user.save()
  await User.updateOne(
    { _id: mongoose.Types.ObjectId(user.id) },
    { $push: { 'blogs': mongoose.Types.ObjectId(savedBlog._id) } }
  )
  res.status(201).json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  if(updatedBlog) {
    await User.updateOne(
      { _id: mongoose.Types.ObjectId(blog.user) },
      { $push: { 'blogs': mongoose.Types.ObjectId(blog._id) } }
    )
    res.status(200).json(updatedBlog.toJSON())
  } else {
    res.status(401).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor,async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(401).json({ error: 'Blog ID does not exist' })
  }
  else if (blog.user.toString() === req.user.id) {
    await Blog.findByIdAndDelete(req.params.id)
    await User.updateMany({},
      { $pullAll: { blogs: [ blog._id ] } }
    )
    res.status(204).end()
  }
  else {
    res.status(401).json({ error: 'User does not have authorization' })
  }
})

blogsRouter.post('/:id/likes', middleware.userExtractor, async (req, res) => {
  const { user } = req
  const blog = await Blog.findById(req.params.id)
  const likeId = await Like.find({ blog: blog.id, user: user.id }).distinct('_id')

  //checks whether a the logged user has already liked the post
  if( likeId.length === 0 ) {
    //creating like object
    const like = new Like({
      blog: blog.id,
      user: user.id
    })
    //saves like object to Like collection
    const savedLike = await like.save()
    //adds like reference to blog.likes array
    blog.likes = blog.likes.concat(savedLike._id)
    await blog.save()
    res.status(201).json(savedLike.toJSON())
  } else {
    //removes like reference in blog
    await Blog.updateMany({},
      { $pullAll: { likes: [{ _id: likeId }] } }
    )
    //removes like from like collection
    await Like.findByIdAndDelete(likeId)
    res.status(204).end()
  }
})

module.exports = blogsRouter