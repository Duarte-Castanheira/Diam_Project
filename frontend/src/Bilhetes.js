import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Bilhetes() {
  const [jogos, setJogos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/jogos/api/jogos/proximos")
      .then(response => setJogos(response.data))
      .catch(error => console.error("Erro ao buscar jogos:", error.message));
  }, []);

  const abrirDetalhesBilhetes = (jogo) => {
  if (jogo.resultado) {
    alert("O jogo já acabou!");
    return; // Sai da função, não redireciona
  }
  navigate(`/jogo/${jogo.pk}/bilhetes`);
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