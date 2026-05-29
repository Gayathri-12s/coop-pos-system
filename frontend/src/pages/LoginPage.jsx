import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../api/api'

function LoginPage() {
    const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {

  try {

    const response = await api.post(
      'token/',
      {
        username,
        password,
      }
    )

    localStorage.setItem(
      'access_token',
      response.data.access
    )

    navigate('/pos')

  } catch (error) {

    alert('Invalid username or password')

    console.error(error)
  }
}

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '350px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        <h2>COOP POS Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
          }}
        />

        <button
         onClick={handleLogin}
          style={{
            width: '100%',
            padding: '10px',
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default LoginPage