const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  // for future comment like feature
  // comment: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Comment',
  // },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

likeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Like', likeSchema)