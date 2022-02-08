/* eslint-disable no-undef */
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const res = listHelper.dummy(blogs)
  expect(res).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const res = listHelper.totalLikes(helper.listWithOneBlog)
    expect(res).toBe(5)
  })
  test('if list is empty equal 0', () => {
    const res = listHelper.totalLikes(helper.noBlogs)
    expect(res).toBe(null)
  })
  test('is list is greater than 1, sum likes', () => {
    const res = listHelper.totalLikes(helper.blogs)
    expect(res).toBe(36)
  })
})

describe('favorites', () => {
  test('most likes out of all blogs', () => {
    const res = listHelper.favoriteBlog(helper.blogs)
    expect(res).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('top authors', () => {
  test('author with most blogs', () => {
    const res = listHelper.mostBlogs(helper.blogs)
    expect(res).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )
  })
  test('author with most likes', () => {
    const res = listHelper.mostLikes(helper.blogs)
    expect(res).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    )
  })
})

