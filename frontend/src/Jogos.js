import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Jogos() {
    const [jogos, setJogos] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
    axios.get("http://localhost:8000/jogos/api/jogos/")
        .then(response => {
            console.log(response.data); // VERIFICA O QUE VEM
            setJogos(response.data);
        })
        .catch(error => {
            console.error("Erro ao buscar jogos:", error.message);
        });
}, []);

    const handleClick = (convocatoriaId) => {
        navigate(`/jogo/${convocatoriaId}`);
      };

    return (
        <div className="body">
            <h1>Jogos</h1>
            <div className="jogos-lista">
                {jogos.length === 0 ? (
                    <p>A carregar jogos...</p>
                ) : (
                    jogos.map((jogo) => (
                        <div key={jogo.pk} className="card-jogo" style={{ cursor: "default" }}>
                            <img src={`http://localhost:8000${jogo.imagem}`} alt={jogo.nome} width="60" />
                            <h3>GD Estrela do Minho <br /> vs <br /> {jogo.adversario.nome}</h3>
                            <img src={`http://localhost:8000${jogo.adversario.imagem}`} alt={jogo.adversario.nome} width="100" />
                            <p><strong>Data:</strong> {jogo.data}</p>
                            <p><strong>Local:</strong> {jogo.local}</p>
                            {jogo.resultado && (
                                <p><strong>Resultado:</strong> {jogo.resultado}</p>
                            )}


                            {jogo.convocatoria ? (
                                <button onClick={() => handleClick(jogo.convocatoria)}>
                                    Convocatória
                                </button>
                            ) : (
                                <p>Convocatória em breve...</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Jogos;