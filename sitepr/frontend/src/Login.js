import React, { useState } from 'react';
import './styles.css';
import Signup from './Signup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/autenticacao/api/login/', {
        username: user,
        password: password,
      },
       { withCredentials: true });

      console.log('Login bem-sucedido:', response.data);

      // Redireciona para /perfil
      navigate('/perfil');
    } catch (error) {
      if (error.response) {
        console.error('Erro no login:', error.response.data.message);
      } else {
        console.error('Erro de rede:', error.message);
      }
    }
  };

  return (
    <div className="login">
      <img src="/perfil_clube.png" alt="Logotipo do clube" className="logo-clube" />

      <form onSubmit={handleSubmit}>
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
