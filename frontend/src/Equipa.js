import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

export function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}

export function formatarData(data) {
  const dataObj = new Date(data);
  const dia = dataObj.getDate();
  const mes = dataObj.toLocaleString('pt-PT', { month: 'long' });
  const ano = dataObj.getFullYear();

  return `${dia} de ${mes} de ${ano}`;
}

function Equipa() {
  const [playerList, setPlayerList] = useState([]);
  const EQUIPA_URL = 'http://localhost:8000/jogador/api/jogadores/';

  useEffect(() => {
    axios.get(EQUIPA_URL)
      .then(res => setPlayerList(res.data))
      .catch(err => console.error("Erro ao buscar jogadores:", err));
  }, []);

  return (
    <div className="lista-jogadores-container">
      {playerList.map((p) => (
        <div key={p.pk} className="jogador-card">
          <img
            src={`http://localhost:8000${p.imagem}`}
            alt={p.nome}
            className="jogador-imagem jogador-foto"
          />
          <h2 style={{ marginBottom: '10px' }}>{p.nome}</h2>
          <p><strong>Posição:</strong> {p.posicao}</p>
          <p><strong>Idade:</strong> {calcularIdade(p.data_nascimento)} anos</p>
          <p><strong>Nascido:</strong> {formatarData(p.data_nascimento)}</p>
          <hr style={{ margin: '20px 0' }} />
          <img
            src={`http://localhost:8000${p.nacionalidade}`}
            alt={p.nome}
            className="jogador-imagem"
          /><br />
          <a href={`/jogador/${p.pk}`}>Estatísticas</a>
        </div>
      ))}
    </div>
  );
}

export default Equipa;
