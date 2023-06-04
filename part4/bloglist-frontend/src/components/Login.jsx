const LoginForm = ({username, setUsername, password, setPassword, handleLogin, successMessage}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <h4>Username</h4>
          <input
            type="text"
            value={username}
            name='Username'
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          <h4>Password</h4>
          <input 
            type='password'
            value={password}
            name='Password'
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default LoginForm