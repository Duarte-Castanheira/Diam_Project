import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Perfil() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/autenticacao/api/user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log('Não autenticado:', error);
        navigate('/login');
      });
  }, [navigate]);

  if (!user) {
    return <div>A carregar...</div>;
  }

  return (
    <div>
      <img src={user.foto || '/perfil.png'} alt="Foto de Perfil" className="perfil-foto" />
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Clube: {user.clube}</p>
      <div className="perfil-botoes">
        <button onClick={() => alert('Editar perfil em construção')}>Editar Perfil</button>
        <button onClick={() => alert('Logout')}>Sair</button>
      </div>
    </div>
  );
}

export default Perfil;