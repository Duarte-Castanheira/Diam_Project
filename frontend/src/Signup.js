import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({ onClose }) {
    const [form, setForm] = useState({
        nome: '',
        nascimento: '',
        telemovel: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const SIGNUP_URL = 'http://127.0.0.1:8000/autenticacao/api/signup/';

    function getCSRFToken() {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== confirmPassword) {
            alert("As passwords não coincidem!");
            return;
        }

        try {
      await axios.post(SIGNUP_URL, {
        username: form.nome,
        password: form.password,
        email: form.email,
        nascimento: form.nascimento,
        telemovel: form.telemovel,
      }, {
        headers: {
          'X-CSRFToken': getCSRFToken()
        },
        withCredentials: true
      });
       alert('Registo realizado com sucesso!');
      setForm({ nome: '', nascimento: '', telemovel: '', email: '', password: '' });
      setConfirmPassword('');
      navigate('/perfil');
      onClose();
    } catch (error) {
      console.error('Erro no signup:', error);
      alert('Falha no registo. Verifica os dados.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Regista-te</h2>
          <div>
            <label>Username:</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
          </div>
          <div style={{ position: 'relative', right: '12px' }}>
            <label>Data de nascimento:</label>
            <input type="date" name="nascimento" value={form.nascimento} onChange={handleChange} required />
          </div>
          <div>
            <label>Telemóvel:</label>
            <input type="tel" name="telemovel" value={form.telemovel} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div>
            <label>Confirmar Password:</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" onClick={handleSubmit}>Registar</button>
        </form>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Signup;
