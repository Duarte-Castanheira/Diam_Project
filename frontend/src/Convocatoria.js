import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
                        className="jogador-imagem"
                    />
                    <h2 style={{ marginBottom: '10px' }}>{jogador.nome}</h2>
                    <p><strong>Posicao:</strong> {jogador.posicao}</p>
                </div>
            ))}
        </div>
    );
}

export default Convocatoria;