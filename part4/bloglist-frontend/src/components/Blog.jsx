import Toggleable from './Toggleable'

const blogStyle = {
  marginTop: 50,  
  border: 'solid',
  borderWidth: 1,
  marginBottom: 10,
  padding: 10,
  width: 'auto'
}

const Blog = ({blog, handleLikeBlog}) => {

  const likingBlog = () => {
    blog.likes = blog.likes + 1
    handleLikeBlog(blog)
  }

  return (
  <div style={blogStyle}>
    <p>{blog.title}</p>
    <Toggleable buttonLabel='view' buttonCloseLabel='hide'>
      <div>
        <p>Likes: {blog.likes} <button onClick={likingBlog}>like</button></p> 
      </div>
      <p>{blog.author}</p>
      <button>delete</button>
    </Toggleable>
  </div>  
  )
}

export default Blog