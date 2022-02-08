var _ = require('lodash')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

function totalLikes(blogs) {
  if (blogs.length === 0) {
    return null
  } else {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
  }
}

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map(blog => blog.likes),0)
  const topBlog = blogs.find(blog => blog.likes === max)

  const blog = {
    title: topBlog.title,
    author: topBlog.author,
    likes: topBlog.likes
  }
  return blog
}

const mostBlogs = (blogs) => {
  var blog = _(blogs)
    .groupBy('author')
    .map((blogs, author) => {
      return {
        author: author,
        blogs: blogs.length
      }
    })
  const maxBlogs = Math.max(...blog.map(b => b.blogs))
  const maxBlogAuthor = blog.find( b => b.blogs === maxBlogs)
  return maxBlogAuthor
}

const mostLikes = (blogs) => {
  var blog = _(blogs)
    .groupBy('author')
    .map( (blogs, author) => {
      return {
        author: author,
        likes: _.sumBy(blogs, 'likes')
      }
    })
  const maxLikes = Math.max(...blog.map( b => b.likes ))
  const maxLikeAuthor = blog.find( b => b.likes === maxLikes)
  return maxLikeAuthor
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}