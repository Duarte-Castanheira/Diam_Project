import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './styles.css';

const EditarPerfil = () => {
  const [userData, setUserData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    telemovel: '',
    nascimento: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/autenticacao/api/user/', { withCredentials: true })
      .then(res => setUserData(res.data))
      .catch(err => {
        console.error(err);
        navigate('/login');
      });
  }, [navigate]);

  const handleChange = e => {
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getCSRFToken = () => {
    return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/autenticacao/api/user/', userData, {
      headers: {
        'X-CSRFToken': getCSRFToken(),
      },
      withCredentials: true,
    })
    .then(() => navigate('/perfil'))
    .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Perfil</h2>
      <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username" />
      <input type="text" name="first_name" value={userData.first_name} onChange={handleChange} placeholder="Primeiro Nome" />
      <input type="text" name="last_name" value={userData.last_name} onChange={handleChange} placeholder="Último Nome" />
      <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="telemovel" value={userData.telemovel} onChange={handleChange} placeholder="Telemóvel" />
      <input type="date" name="nascimento" value={userData.nascimento || ''} onChange={handleChange} placeholder="Nascimento" />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default EditarPerfil;