import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

function Noticias() {
    const [noticiaList, setNoticiaList] = useState([]);
    const [noticiaExpandida, setNoticiaExpandida] = useState(null);

    const NOTICIAS_URL = 'http://localhost:8000/extras/api/noticias/';

    useEffect(() => {
        axios.get(NOTICIAS_URL)
            .then(res => setNoticiaList(res.data));
    }, []);

    const toggleNoticia = (index) => {
        setNoticiaExpandida(noticiaExpandida === index ? null : index);
    };

    return (
        <div style={{backgroundColor:'#f9f7d7'}}>
            <h2>Últimas Notícias</h2>
            {noticiaList.map((noticia, index) => (
                <article
                    key={index}
                    className="noticia-card"
                    onClick={() => toggleNoticia(index)}
                >
                    <div className="noticia-content">
                        <img
                            src={`http://localhost:8000${noticia.imagem}`}
                            alt=""
                            className="noticia-imagem"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="noticia-info">
                            <h3>{noticia.titulo}</h3>
                            <small><em>{noticia.data}</em></small>
                        </div>
                    </div>
                    {noticiaExpandida === index && (
                        <p className="noticia-texto">{noticia.noticia_texto}</p>
                    )}
                </article>
            ))}
        </div>
    );
}

export default Noticias;
