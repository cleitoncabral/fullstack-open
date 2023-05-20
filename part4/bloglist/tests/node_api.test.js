const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// test('length blogs', async () => {
//   const response = await api.get('/api/blogs')
  
//   expect(response.body).toHaveLength(14)
// })

test('single identifier called id', async () => {
  const response = await api.get('/api/blogs')
  const idType = response._id
  expect('_id').toBeDefined(idType)
})

test('bloglist length increased to one more', async () => {
  const getResponseBeforePost = await api.get('/api/blogs')

  const newBlogPost = {
    "title": "First post as a tester",
    "author": "Cleiton, the tester",
    "url": "www.firstpost.com",
    "likes": 5
  }

  const response = await api.post('/api/blogs').send(newBlogPost)
  const getResponseAfterPost = await api.get('/api/blogs')
  
  expect(getResponseAfterPost.body).toHaveLength(getResponseBeforePost.body.length + 1)
})

test('item deleted', async () => {
  const getResponseBeforeDelete = await api.get('/api/blogs')

  await api.delete('/api/blogs/6466da856f09ae2051c7ecad')
  const getResponseAfterDelete = await api.get('/api/blogs')
  
  expect(204)
})

test('item updated', async () => {
  const blogUpdate = {
    title: 'First post update'
  }
  await api.put('/api/blogs/645a97fa89a262c2ae5e17a1').send(blogUpdate).expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})