import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";

function Forms() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Vai buscar todas as perguntas
    axios.get(`http://localhost:8000/forms/api/questions/`)
      .then(async res => {
        const questions = res.data;

        // Vai buscar as opções para cada pergunta
        const questionsData = await Promise.all(
          questions.map(async (q) => {
            const optionsRes = await axios.get(`http://localhost:8000/forms/api/options/${q.pk}`);
            return {
              ...q,
              options: optionsRes.data
            };
          })
        );

        setQuestions(questionsData);
      });
  }, []);

  const vote = async (questionId, optionId) => {
    const question = questions.find(q => q.pk === questionId);
    const option = question.options.find(o => o.pk === optionId);

    const updatedOption = {
      pk: option.pk,
      questao: question.pk,
      opcao_texto: option.opcao_texto,
      votos: option.votos + 1
    };

    try {
      await axios.put(`http://localhost:8000/forms/api/option/${optionId}`, updatedOption);


      // Atualiza o estado para refletir o voto
      setQuestions(prev =>
        prev.map(q => {
          if (q.pk === questionId) {
            return {
              ...q,
              options: q.options.map(o =>
                o.pk === optionId ? { ...o, votos: o.votos + 1 } : o
              )
            };
          }
          return q;
        })
      );
    } catch (err) {
      console.error("Erro ao votar:", err.response?.data || err.message);
      alert("Erro ao votar.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Formulário</h2>
      <p style={{fontFamily:'emoji'}}>
        Queres entrar com a nossa equipa em campo no próximo jogo? Preenche este formulário e habilita-te a uma experiência inesquecivel
      </p> <br />
      {questions.map((q) => (
        <div key={q.pk} style={{ marginBottom: "40px" }}>
          <h4>{q.questao_texto}</h4>
          <ul>
            {q.options.map((option) => (
              <li key={option.pk} style={{ marginBottom: "10px" }}>
                <Button color="success" onClick={() => vote(q.pk, option.pk)}>
                  {option.opcao_texto}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Forms;
