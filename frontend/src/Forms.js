import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

function Forms() {
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
    const fetchForm = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/forms/api/formulario/`);
        const form = res.data;

        setQuestions(form.questoes || []);
      } catch (err) {
        console.error("Erro ao carregar formulário:", err);
        alert("Erro ao carregar o formulário.");
      }
    };

    fetchForm();
  }, []);

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      console.log("Respostas enviadas:", selectedOptions);
      alert("Respostas enviadas com sucesso!");
      setSelectedOptions({});
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
      alert("Erro ao enviar respostas.");
    }
  };

    if (!user && !loading) {
        return (
            <div className="detalhes-produto">
            <img src="/perfil_clube.png" alt="Logotipo do clube" className="logo-clube" />
                <h2>Inicie sessão para aceder ao formulário</h2>
                <button onClick={() => window.location.href = '/login'}>
                    Ir para Login
                </button>
            </div>
    );
  }


  return (
  <div className="form-container">
    <h2>Formulário</h2>
    <p>
      Queres entrar com a nossa equipa em campo no próximo jogo? Preenche este formulário e habilita-te a uma experiência inesquecível.
    </p>

    <form onSubmit={handleSubmit} className="formulario">
      {questions.map((q) => (
        <div className="form-group" key={q.pk}>
          <label className="form-label">{q.questao_texto}</label>
          {q.opcoes.map((option) => (
            <div key={option.pk} className="form-check">
              <input
                type="radio"
                id={`q${q.pk}_o${option.pk}`}
                name={`question_${q.pk}`}
                value={option.pk}
                checked={selectedOptions[q.pk] === option.pk}
                onChange={() => handleOptionChange(q.pk, option.pk)}
                className="form-check-input"
                required
              />
              <label htmlFor={`q${q.pk}_o${option.pk}`} className="form-check-label">
                {option.opcao_texto}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit" className="form">
        Enviar
      </button>
    </form>
  </div>
);
}

export default Forms;
