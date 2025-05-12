import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Mantém o loading a true enquanto não sabemos o estado
  const USER_URL = 'http://localhost:8000/autenticacao/api/user/';
  const LOGOUT_URL = 'http://localhost:8000/autenticacao/api/logout/';
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

  const handleLogout = () => {
    axios.get(LOGOUT_URL, {}, {
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

export default Profile;
