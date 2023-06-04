const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author ? request.body.author : request.user.username,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
  })
  
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'Token inválido' });
  }

  blog.user = user._id
  
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()
  
  response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  
  if (!request.userId) {
    return response.status(401).json({ error: 'Token inválido' });
  }

  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!(user._id.toString() === blog.user.toString()) || !blog.user || !user._id) {
    return response.status(401).json({error: "this blog doesn't belongs to currently user"})
  }
  
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogUpdate = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blogUpdate)

  response.status(200).end()
})

module.exports = blogsRouter