const commentsRouter = require('express').Router({ mergeParams: true })
// const mongoose = require('mongoose')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
// const User = require('../models/user')
const middleware = require('../utils/middleware')

commentsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const { body, user } = req
  const blog = await Blog.findById(req.params.id)

  const comment = new Comment({
    comment: body.comment,
    blog: blog.id,
    user: user.id
  })

  const savedComment = await comment.save()
  user.comments = user.comments.concat(savedComment._id)
  blog.comments = blog.comments.concat(savedComment._id)
  await user.save()
  await blog.save()

  res.status(201).json(savedComment.toJSON())
})

// commentsRouter.get('/', async (req, res) => {
//   const blogs = await Blog
//     .find({})
//     .populate('user', { username: 1, name: 1 })
//   res.json(blogs.map(blog => blog.toJSON()))
// })

// commentsRouter.get('/:id', async (req, res) => {
//   const blog = await Blog.findById(req.params.id)
//   if(blog){
//     res.json(blog.toJSON())
//   }else{
//     res.status(404).end()
//   }
// })

// commentsRouter.post('/', middleware.userExtractor, async (req, res) => {
//   const body = req.body
//   const user = req.user
//   const blog = req.blog

//   const comment = new Comment({
//     content: body.title,
//     likes: body.likes || 0,
//     user: user.id,
//     blog: blog.id
//   })

//   const savedComment = await comment.save()

//   res.status(201).json(savedComment.toJSON())
// })

// blogsRouter.put('/:id', async (req, res) => {
//   const body = req.body

//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   }

//   const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
//   if(updatedBlog) {
//     res.status(200).json(updatedBlog.toJSON())
//   } else {
//     res.status(401).end()
//   }
// })

// blogsRouter.delete('/:id', middleware.userExtractor,async (req, res) => {
//   const blog = await Blog.findById(req.params.id)

//   if (!blog) {
//     res.status(401).json({ error: 'Blog ID does not exist' })
//   }
//   else if (blog.user.toString() === req.user.id) {
//     await Blog.findByIdAndDelete(req.params.id)
//     await User.updateOne(
//       { _id: mongoose.Types.ObjectId(blog.user) },
//       { $pull: { 'blogs': mongoose.Types.ObjectId(blog._id) } }
//     )
//     res.status(204).end()
//   }
//   else {
//     res.status(401).json({ error: 'User does not have authorization' })
//   }
// })

module.exports = commentsRouter