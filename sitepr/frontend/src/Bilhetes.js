import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Bilhetes() {
  const [jogos, setJogos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/jogos/api/jogos/")
      .then(response => setJogos(response.data))
      .catch(error => console.error("Erro ao buscar jogos:", error.message));
  }, []);

  const abrirDetalhesBilhetes = (id) => {
    navigate(`/bilhetes/${id}`);
    console.log(id);
  };

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
              onClick={() => abrirDetalhesBilhetes(jogo.pk)}
              style={{ cursor: "pointer" }}
            >
              <h3>GD Estrela do Minho <br /> vs <br /> {jogo.adversario}</h3>
              <p><strong>Data:</strong> {jogo.data}</p>
              <p><strong>Local:</strong> {jogo.local}</p>
            </div>
          ))
        )}
      </div>

      <footer className="loja-footer">
        <p>&copy; Bilhetes Estrela do Minho 2025. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default Bilhetes;