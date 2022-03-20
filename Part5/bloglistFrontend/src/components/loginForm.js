import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          data-testid='username-input'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        Password
        <input
          data-testid='password-input'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button data-testid='login-btn' type="submit">login</button>
    </form>
  )
}

export default LoginForm