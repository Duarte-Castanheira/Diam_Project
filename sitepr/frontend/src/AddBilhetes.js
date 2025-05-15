import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddBilhetes() {
  const { id } = useParams();
  const [bilhetes, setBilhetes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/jogos/api/bilhetes_jogo/${id}/`)
      .then(response => setBilhetes(response.data))
      .catch(error => console.error("Erro ao buscar bilhetes:", error.message));
  }, [id]);

  return (
    <div className="bilhetes">
      <h1>Bilhetes Disponíveis</h1>
      <div className="bilhete-lista">
        {bilhetes.length === 0 ? (
          <p>Sem bilhetes disponíveis para este jogo.</p>
        ) : (
          bilhetes.map((bilhete) => (
            <div key={bilhete.pk} className="card-bilhete">
              <h3>Setor: {bilhete.setor}</h3>
              <p><strong>Preço:</strong> €{bilhete.preco}</p>
              <p><strong>Fila:</strong> {bilhete.fila}</p>
              <p><strong>Lugar:</strong> {bilhete.lugar}</p>
              <p><strong>Número:</strong> {bilhete.numero}</p>
              <button className="btn-carrinho">Adicionar ao Carrinho</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AddBilhetes;