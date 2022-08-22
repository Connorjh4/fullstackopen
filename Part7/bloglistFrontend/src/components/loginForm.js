import { useState } from "react";
import { useDispatch } from "react-redux";
import { Login } from '../store/loginReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    await dispatch(Login({ username, password }))
    navigate("/")
  }

  return (
    <>
    <h1>Log into application</h1>
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          data-testid="username-input"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          data-testid="password-input"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button data-testid="login-btn" type="submit">
        login
      </button>
    </form>
    </>
  );
};

export default LoginForm;
