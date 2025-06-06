import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { calcularIdade, formatarData } from './Equipa';
import './styles.css';

function Convocatoria() {
    const { convocatoriaId } = useParams();
    const [convocatoria, setConvocatoria] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/jogos/api/convocatoria/${convocatoriaId}/`)
            .then(res => {
                setConvocatoria(res.data);
            })
            .catch(err => {
                console.error("Erro ao buscar jogadores:", err);
            });
    }, [convocatoriaId]);

    return (

        <div className="lista-jogadores-container">
            {convocatoria?.jogadores?.map((jogador, index) => (
                <div key={index} className="jogador-card">
                    <img
                        src={`http://localhost:8000${jogador.imagem}`}
                        alt={jogador.nome}
                        className="jogador-imagem jogador-foto"
                    />
                    <h2 style={{ marginBottom: '10px' }}>{jogador.nome}</h2>
                    <p><strong>Posicao:</strong> {jogador.posicao}</p>
                    <p><strong>Idade:</strong> {calcularIdade(jogador.data_nascimento)} anos</p>
                    <p><strong>Nascido:</strong> {formatarData(jogador.data_nascimento)}</p>
                    <hr style={{ margin: '20px 0' }} />
                    <img
                      src={`http://localhost:8000${jogador.nacionalidade}`}
                      alt={jogador.nome}
                      className="jogador-imagem"
                    /><br />
                    <a href={`/jogador/${jogador.pk}`}>Estatísticas</a>
                </div>
            ))}
        </div>
    );
}

export default Convocatoria;