import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const setToken = newToken => {
  return `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: {Authorization: token}
  }
  
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlogLiked) => {
  const baseId = baseUrl + '/' + updatedBlogLiked.id
  const response = await axios.put(baseId, updatedBlogLiked)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken}