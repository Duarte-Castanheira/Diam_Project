import React, { useState, useEffect } from 'react';
import './styles.css';
import Signup from './Signup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const LOGIN_URL = 'http://localhost:8000/autenticacao/api/login/';
  const USER_URL = 'http://localhost:8000/autenticacao/api/user/';
  const LOGOUT_URL = 'http://localhost:8000/autenticacao/api/logout/';
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(USER_URL, { withCredentials: true })
      .then(res => {
        setCurrentUser(res.data);
      })
      .catch(() => {
        setCurrentUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [loading, currentUser, navigate]);

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
        setUser('');
        setPassword('');
        navigate('/perfil');
      })
      .catch(err => console.error('Login failed:', err));
  };

  const handleLogout = () => {
    axios.post(LOGOUT_URL, {}, {
      headers: {
        'X-CSRFToken': getCSRFToken()
      },
      withCredentials: true
    })
      .then(() => {
        setCurrentUser(null);
        navigate('/login');
      })
      .catch(err => console.error('Logout failed:', err));
  };

  if (loading) return <p>A verificar sessão...</p>;

  return currentUser ? (
    <div className="perfil">
      <h2>O meu perfil</h2>
      <p>Username: {currentUser?.username}</p>
      <p>Email: {currentUser?.email || "não disponível"}</p>
      <p>Telemóvel: {currentUser?.telemovel || "não disponível"}</p>
      <p>Data de nascimento: {currentUser?.nascimento || "não disponível"}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
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
        <button type="submit">Login</button><br />
        <h3>Não tens conta?</h3>
        <button type="button" onClick={() => setShowSignup(true)}>SignUp</button>
      </form>
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </div>
  );
}

export default Login;
