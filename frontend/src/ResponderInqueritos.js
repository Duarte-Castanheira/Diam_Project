import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResponderInquerito() {
  const [inquerito, setInquerito] = useState(null);
  const [respostas, setRespostas] = useState({});
  const { id_inquerito } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/forms/${id_inquerito}/responder/`)
      .then(res => {
        setInquerito(res.data);
      })
      .catch(err => {
        console.error("Erro ao carregar o inquérito:", err);
      });
  }, [id_inquerito]);

  const handleChange = (perguntaId, texto) => {
    setRespostas(prev => ({ ...prev, [perguntaId]: texto }));
  };

  const handleSubmit = async () => {
    try {
      const promessas = Object.entries(respostas).map(([perguntaId, resposta_texto]) =>
        axios.post("http://localhost:8000/forms/api/respostas/", {
          pergunta: perguntaId,
          resposta_texto,
        })
      );
      await Promise.all(promessas);
      alert("Respostas enviadas com sucesso!");
    } catch (error) {
      console.error("Erro ao submeter respostas:", error);
      alert("Ocorreu um erro ao enviar as respostas.");
    }
  };

  if (!inquerito) return <p>A carregar...</p>;

  return (
    <div className="container">
      <h2>{inquerito.titulo}</h2>
      <p>{inquerito.descricao}</p>

      {inquerito.perguntas.map(pergunta => (
        <div key={pergunta.id} style={{ marginBottom: "20px" }}>
          <label><strong>{pergunta.texto_pergunta}</strong></label>
          <textarea
            className="form-control"
            rows={3}
            value={respostas[pergunta.id] || ""}
            onChange={e => handleChange(pergunta.id, e.target.value)}
          />
        </div>
      ))}

      <button className="btn btn-primary" onClick={handleSubmit}>
        Submeter Respostas
      </button>
    </div>
  );
}

export default ResponderInquerito;
