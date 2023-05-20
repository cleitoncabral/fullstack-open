const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  console.log(blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.userId)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id
  })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()
  
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogUpdate = {
    title: String,
    author: String,
    url: String,
    likes: Number
  }

  await Blog.findById(request.params.id, blogUpdate)

  response.status(400).end()
})

module.exports = blogsRouter