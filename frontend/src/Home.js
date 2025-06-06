import SlideShow from './SlideShow';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Home() {

    const [proximosJogos, setproximosJogos] = useState([]);
    const [ultimosJogos, setultimosJogos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/jogos/api/jogos/proximos/')
            .then(res => setproximosJogos(res.data))
            .catch(err => console.error('Erro ao buscar jogos:', err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/jogos/api/jogos/ultimos/')
            .then(res => setultimosJogos(res.data))
            .catch(err => console.error('Erro ao buscar jogos:', err));
    }, []);

    const handleClick = (convocatoriaId) => {
        navigate(`/jogo/${convocatoriaId}`);
      };

    return (
        <div className= "body">
            <h1>Bem-vindo ao site do G.D. Estrela do minho</h1><br />
        <div>
             <h2 style={{color:'#23590f'}}>Últimas Notícias:</h2>
            <SlideShow />
        </div>

        <h2 style={{color:'#23590f'}}>Próximos Jogos:</h2>
        <div className="jogos-lista">
            {proximosJogos.length === 0 && <p>Não há jogos por jogar.</p>}

                {proximosJogos.map(jogo => (
                    <div key={jogo.pk} className="card-jogo" style={{ cursor: "default" }}>
                        <img src={`http://localhost:8000${jogo.imagem}`} alt={jogo.nome} width="50" />
                        <h3>GD Estrela do Minho <br /> vs <br /> {jogo.adversario.nome}</h3>
                        <img src={`http://localhost:8000${jogo.adversario.imagem}`} alt={jogo.adversario.nome} width="100" />
                        <p><strong>Data:</strong> {jogo.data}</p>
                        <p><strong>Local:</strong> {jogo.local}</p>
                        {jogo.convocatoria ? (
                                <button onClick={() => handleClick(jogo.convocatoria)}>
                                    Convocatória
                                </button>
                            ) : (
                                <p>Convocatória em breve...</p>
                            )}
                    </div>
                ))}


        </div>
        <h2 style={{color:'#23590f'}}>Últimos Jogos:</h2>
        <div className="jogos-lista">
            {ultimosJogos.length === 0 ? (
                <p>A carregar jogos...</p>
            ) : (
                ultimosJogos.map((jogo) => (
                    <div key={jogo.pk} className="card-jogo" style={{ cursor: "default" }}>
                    <img src={`http://localhost:8000${jogo.imagem}`} alt={jogo.nome} width="70" />
                        <h3>GD Estrela do Minho <br /> vs <br /> {jogo.adversario.nome} </h3>
                        <img src={`http://localhost:8000${jogo.adversario.imagem}`} alt={jogo.adversario.nome} width="100" />
                        <p><strong>Data:</strong> {jogo.data}</p>
                        <p><strong>Local:</strong> {jogo.local}</p>
                        <p><strong>Resultado:</strong> {jogo.resultado}</p>
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



        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2 style={{color:'#23590f'}}>Vem conhecer o novo relvado do nosso estádio</h2>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/B4IyVkGQNpk?si=qhQES6yHbyqnOx3B"
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />

        </div>
    </div>
  );
}







export default Home;
