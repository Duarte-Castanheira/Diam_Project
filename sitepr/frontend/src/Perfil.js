import React, { useState } from 'react';
import './styles.css';
import Signup from './Signup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const LOGIN_URL = 'http://localhost:8000/autenticacao/api/login/';
  const navigate = useNavigate();

  const getUser = () => {
    axios.get(USER_URL, { withCredentials: true })
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to get user:', err);
        setUser(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

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
      navigate('/perfil'); // Navega só após login com sucesso
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
        setUser(null);
        navigate('/login');
      })
      .catch(err => console.error('Logout failed:', err));
  };

  if (loading) return <p>A verificar sessão...</p>;  // Exibe enquanto estamos a carregar os dados

  return (
    <div className="perfil">
        <h2>O meu perfil</h2>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email || "não disponível"}</p>
        <p>Telemóvel: {user?.telemovel || "não disponível"}</p>
        <p>Data de nascimento: {user?.nascimento || "não disponível"}</p>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
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