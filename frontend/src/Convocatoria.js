import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Convocatoria() {
    const JOGADORES_URL = 'http://localhost:8000/jogos/api/jogadores'; // Ajusta isto conforme o endpoint real
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        axios.get(JOGADORES_URL, { withCredentials: true })
            .then(res => {
                setJogadores(res.data);
            })
            .catch(err => {
                console.error("Erro ao buscar jogadores:", err);
            });
    }, []);

    return (
        <div>
            <h2>Lista de Jogadores</h2>
            <ul>
                {jogadores.map((jogador, index) => (
                    <li key={index}>
                        {jogador.nome} - {jogador.posicao}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Convocatoria;