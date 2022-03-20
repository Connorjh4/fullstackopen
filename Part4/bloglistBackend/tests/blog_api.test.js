/* eslint-disable no-undef */
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


beforeAll(async () => {
  await User.deleteMany({})

  const newUser = await api
    .post('/api/users')
    .send(helper.user)
    .expect('Content-Type', /application\/json/)

  const loginUser = await api
    .post('/api/login')
    .send({ username: helper.user.username, password: helper.user.password })

  token = loginUser.body.token

  helper.blogs.map(b => {
    b.user = `${newUser.body.id}`
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

describe('when there are blogs saved initially', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.blogs.length)
  })
  test('all blogs contain an id', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
  })
})

describe('adding a blog', () => {
  test('blog added correctly', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDB()
    expect(res).toHaveLength(helper.blogs.length +1)

    const title = res.map(b => b.title)
    expect(title).toContainEqual('testing blogs being posted')
  })
  test('blog with missing likes equals 0', async () => {
    const postedBlog =
            await api
              .post('/api/blogs')
              .set('Authorization', `Bearer ${token}`)
              .send(helper.newBlogWithNoLikes)
              .expect(201)
              .expect('Content-Type', /application\/json/)

    expect(postedBlog.body.likes).toBe(0)
  })
  describe('adding blog with missing parts', () => {
    test('Blog with no URL fails with 400 error', async () => {
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(helper.newBlogWithNoURL)
        .expect(400)

      const res = await helper.blogsInDB()
      expect(res).toHaveLength(helper.blogs.length)
    })
    test('Blog with no title fails with 400 error', async () => {
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(helper.newBlogWithNoTitle)
        .expect(400)

      const res = await helper.blogsInDB()
      expect(res).toHaveLength(helper.blogs.length)
    })
  })
})

describe('updating a blog', () => {
  test('updated first blog correctly', async () => {
    const blogs = await helper.blogsInDB()
    const updateBlog = blogs[0]
    await api
      .put(`/api/blogs/${updateBlog.id}`)
      .send(helper.newBlog)
      .expect(200)

    const res = await helper.blogsInDB()
    const title = res.map(b => b.title)
    expect(title).toContainEqual(`${helper.newBlog.title}`)
  })
})

describe('deleting a blog', () => {
  test('deleted first blog correctly', async () => {
    const blogs = await helper.blogsInDB()
    const deleteBlog = blogs[0]
    await api
      .delete(`/api/blogs/${deleteBlog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const res = await helper.blogsInDB()
    expect(res).toHaveLength(helper.blogs.length -1)
  })
})

describe('when there is already a user in the db', () => {
  test('register suceeds with a unique username', async () => {
    const usersAtStart = await helper.usersInDB()

    await api
      .post('/api/users')
      .send(helper.uniqueUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(helper.uniqueUser.username)
  })
  test('register fails with proper status and error message if usernames already taken', async () => {
    const usersAtStart = await helper.usersInDB()

    const res = await api
      .post('/api/users')
      .send(helper.user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
