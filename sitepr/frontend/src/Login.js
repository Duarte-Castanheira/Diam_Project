import React, { useState } from 'react';
import './styles.css';
import Signup from './Signup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const LOGIN_URL = 'http://localhost:8000/autenticacao/api/login/';
  const navigate = useNavigate();

  function getCSRFToken() {
    return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
  }

  const handleLogin = (e) => {
  e.preventDefault();
  axios.post(LOGIN_URL, {
    username: user,
    password: password
  }, {
    headers: {
      'X-CSRFToken': getCSRFToken()
    },
    withCredentials: true
  })
    .then(() => {
      setUser(''); // Limpa os campos
      setPassword('');
      console.log("autenticado com sucesso");
      navigate('/perfil'); // Navega só após login com sucesso
    })
    .catch(err => console.error('Login failed:', err));
};

  return (
    <div className="login">
      <img src="/perfil_clube.png" alt="Logotipo do clube" className="logo-clube" />

      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleLogin}>Login</button><br />
        <h3>Não tens conta?</h3>
        <button type="button" onClick={() => setShowSignup(true)}>SignUp</button>
      </form>

      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>
  );
}

export default Login;
