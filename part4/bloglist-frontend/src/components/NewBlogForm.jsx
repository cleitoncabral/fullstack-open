import { useState } from 'react'

const NewBlogForm = ({handleSubmitNewBlog}) => {
  const [newBlog, setNewBlog] = useState({title: '', url: ''})

  const handleInputChange = (e) => {
    const {value, name} = e.target
    setNewBlog(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const addBlog = event => {
    event.preventDefault()
    handleSubmitNewBlog(newBlog)
    setNewBlog({title: '', url: ''})
  }

  return (
    <section>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name='title'
            type='text'
            value={newBlog.title}
            onChange={handleInputChange}
            id="title"
          ></input>
        </div>

        <div>
          <label htmlFor="url">url:</label>
          <input 
            type="text" 
            name="url"
            value={newBlog.url}
            onChange={handleInputChange}
            id="url"
          />
        </div>
        <input type='submit' value="Create"></input>
      </form>
    </section>
  )
}

export default NewBlogForm