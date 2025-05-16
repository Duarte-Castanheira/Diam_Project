import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

function Jogos() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/jogos/api/jogos/")
      .then(response => setJogos(response.data))
      .catch(error => console.error("Erro ao buscar jogos:", error.message));
  }, []);

  return (
    <div className="jogos">
      <h1>Jogos</h1>
      <div className="jogos-lista">
        {jogos.length === 0 ? (
          <p>A carregar jogos...</p>
        ) : (
          jogos.map((jogo) => (
            <div
              key={jogo.pk}
              className="card-jogo"
              style={{ cursor: "default" }}
            >
              <h3>GD Estrela do Minho <br /> vs <br /> {jogo.adversario}</h3>
              <p><strong>Data:</strong> {jogo.data}</p>
              <p><strong>Local:</strong> {jogo.local}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Jogos;