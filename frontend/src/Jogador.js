import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css';


function Jogador() {
const { jogadorId } = useParams();
const [jogador, setJogador] = useState(null);
const [loading, setLoading] = useState(true);
const [estatisticas, setEstatisticas] = useState(null);
const JOGADOR_URL = `http://localhost:8000/jogador/api/jogador/${jogadorId}/`;
const STATS_URL = `http://localhost:8000/jogador/api/jogador/${jogadorId}/estatisticas`;



useEffect(() => {
  axios.get(JOGADOR_URL)
    .then(res => {
      setJogador(res.data);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}, [JOGADOR_URL]);

 useEffect(() => {
    axios.get(STATS_URL)
      .then(response => {
        setEstatisticas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar jogador:', error);
        setLoading(false);
      })

  }, [jogadorId]);


  if (loading) return <p>A carregar jogador...</p>;
  if (!jogador) return <p>Jogador não encontrado.</p>;


  return (
    <div className="jogador-container">
      <img
        src={`http://localhost:8000${jogador.imagem}`}
        alt={jogador.nome}
        className="jogador-imagem"
      />
      <h2 style={{ marginBottom: '10px' }}>{jogador.nome}</h2>
      <p><strong>Idade:</strong> {calcularIdade(jogador.data_nascimento)} anos</p>
      <p><strong>Nascimento:</strong> {formatarData(jogador.data_nascimento)}</p>
      <hr style={{ margin: '20px 0' }} />
      <p><strong>Golos:</strong> {estatisticas.golos}</p>
      <p><strong>Assistências:</strong> {estatisticas.assistencias}</p>
      <p><strong>Amarelos:</strong> {estatisticas.cartoes_amarelos}</p>
      <p><strong>Vermelhos:</strong> {estatisticas.cartoes_vermelhos}</p>
      <p><strong>Jogos:</strong> {estatisticas.numero_jogos}</p>
    </div>
  );
}


export default Jogador;







function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}

function formatarData(data) {
  const dataObj = new Date(data);
  const dia = dataObj.getDate();
  const mes = dataObj.toLocaleString('pt-PT', { month: 'long' });
  const ano = dataObj.getFullYear();

  return `${dia} de ${mes} de ${ano}`;
}