import React, { useState } from 'react';
import './styles.css';

function Signup({ onClose }) {
  const [form, setForm] = useState({
    nome: '',
    nascimento: '',
    telemovel: '',
    email: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      alert("As passwords não coincidem!");
      return;
    } else {
        alert("Conta criada com sucesso!");
    }

    // Aqui podes meter um axios/post para enviar para o backend
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
        <h2>Regista-te</h2>
          <div>
            <label>Nome:</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
          </div>
          <div style={{position:'relative', right:'12px'}}>
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
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit">Registar</button>
        </form>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default Signup;
