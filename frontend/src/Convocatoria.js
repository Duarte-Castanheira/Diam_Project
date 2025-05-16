import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Convocatoria() {
    const { convocatoriaId } = useParams();
    const CONVOCATORIA_URL = `http://localhost:8000/jogador/api/jogador/${convocatoriaId}/`; // Ajusta isto conforme o endpoint real
    const [convocatoria, setConvocatoria] = useState([]);

    useEffect(() => {
        axios.get(CONVOCATORIA_URL, { withCredentials: true })
            .then(res => {
                setConvocatoria(res.data);
            })
            .catch(err => {
                console.error("Erro ao buscar jogadores:", err);
            });
    }, []);

    return (
        <div>
            <h2>Lista de Jogadores</h2>
            <ul>
                {convocatoria.map((jogador, index) => (
                    <li key={index}>
                        {jogador.nome} - {jogador.posicao}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Convocatoria;