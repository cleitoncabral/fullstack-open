import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/Login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogsInOrder(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggerBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setBlogsInOrder = (blogs) => {
    // function compareLikes (a, b) {
    //   // console.log(a.likes)
    //   return a.likes < b.likes ? -1 : (a.likes > b.likes) ? 1 : 0
    // }

    // let order = blogs.sort(compareLikes)
    setBlogs(blogs)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggerBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Your are logged in!')
      
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleSubmitNewBlog = async (newBlog) => {
    newBlogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(newBlog, blogService.setToken(user.token))
      setBlogs(prevState => ([
        ...prevState,
        returnedBlog
      ]))

      setSuccessMessage(`A new blog ${returnedBlog.title} by ${user.name} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(expection) {
      setErrorMessage('Something went wrong... Try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLikeBlog = async (updatedBlogLiked) => {
    try {
      const returnedBlog = await blogService.update(updatedBlogLiked)
      console.log('retorna', returnedBlog)
      setBlogs(prevState => ([
        ...prevState
      ]))
    }

    catch(expection) {
      setErrorMessage('Something went wrong... Try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
    {!user ? 
    <>
    <Notification message={errorMessage} classes="notification notification--error" />
    <LoginForm 
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      errorMessage={errorMessage}
      successMessage={successMessage}
    />
    </>
      :
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} classes="notification notification--error" />
      <Notification message={successMessage} classes="notification notification--success" />
      
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>Logout</button>

      <Toggleable buttonLabel="create new blog" buttonCloseLabel="Cancel" ref={newBlogFormRef}>
        <NewBlogForm handleSubmitNewBlog={handleSubmitNewBlog} />
      </Toggleable>

      {blogs.map(blog =>
        <Blog key={blog?.id} blog={blog} handleLikeBlog={handleLikeBlog} />
      )}

    </div>
    }
    </>
  )
}

export default App