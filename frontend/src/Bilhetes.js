import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Bilhetes() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const USER_URL = 'http://localhost:8000/autenticacao/api/user';


    useEffect(() => {
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
    }, []);




  useEffect(() => {
    axios.get("http://localhost:8000/jogos/api/jogos/proximos")
      .then(response => setJogos(response.data))
      .catch(error => console.error("Erro ao buscar jogos:", error.message));
  }, []);

  const abrirDetalhesBilhetes = (jogo) => {
  if (jogo.resultado) {
    alert("O jogo já acabou!");
    return;
  }
  navigate(`/jogo/${jogo.pk}/bilhetes`);
};


if (!user && !loading) {
        return (
            <div className="detalhes-produto">
                <img src="/perfil_clube.png" alt="Logotipo do clube" className="logo-clube" />
                <h2>Inicie sessão para aceder aos bilhetes</h2>
                <button onClick={() => window.location.href = '/login'}>
                    Ir para Login
                </button>
            </div>
    );
  }

  return (
    <div className="bilhetes">
      <h1>Próximos Jogos</h1>
      <div className="jogos-lista">
        {jogos.length === 0 ? (
          <p>Carregando jogos...</p>
        ) : (
          jogos.map((jogo) => (
            <div
              key={jogo.pk}
              className="card-jogo"
              onClick={() => abrirDetalhesBilhetes(jogo)}
              style={{ cursor: "pointer" }}
            >
              <h3>GD Estrela do Minho <br /> vs <br /> {jogo.adversario.nome}</h3>
              <p><strong>Data:</strong> {jogo.data}</p>
              <p><strong>Local:</strong> {jogo.local}</p>
            </div>
          ))
        )}
      </div>


    </div>
  );
}

export default Bilhetes;