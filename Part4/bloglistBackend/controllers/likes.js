// const likesRouter = require('express').Router({ mergeParams: true })
// const Blog = require('../models/blog')
// const Like = require('../models/like')
// const middleware = require('../utils/middleware')

// //Like and Dislike functionality
// likesRouter.post('/', middleware.userExtractor, async (req, res) => {
//   const { user } = req
//   const blog = await Blog.findById(req.params.id)
//   const likeId = await Like.find({ blog: blog.id, user: user.id }).distinct('_id')

//   //checks whether a the logged user has already liked the post
//   if( likeId.length === 0 ) {
//     //creating like object
//     const like = new Like({
//       blog: blog.id,
//       user: user.id
//     })
//     //saves like object to Like collection
//     const savedLike = await like.save()
//     //adds like reference to blog.likes array
//     blog.likes = blog.likes.concat(savedLike._id)
//     await blog.save()
//     res.status(201).json(savedLike.toJSON())
//   } else {
//     //removes like reference in blog
//     await Blog.updateMany({},
//       { $pullAll: { likes: [{ _id: likeId }] } }
//     )
//     //removes like from like collection
//     await Like.findByIdAndDelete(likeId)
//     res.status(204).end()
//   }
// })

// module.exports = likesRouter