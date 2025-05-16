import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { Table } from "reactstrap";

function Noticias() {

    const [noticiaList, setNoticiaList] = useState([]);
    const NOTICIAS_URL= 'http://localhost:8000/extras/api/noticias/';

    useEffect(() => {
            axios.get(NOTICIAS_URL)
            .then(res => setNoticiaList(res.data));
        }, []);

    return (
        <div className="DocLegal">

            <main className="noticias-container">
                <h2>Últimas Notícias</h2>
                {noticiaList.map((noticia, index) => (
                    <article key={index} className="noticia-card">
                        <h3>{noticia.titulo}</h3>
                        <p>{noticia.noticia_texto}</p>
                        <small><em>{noticia.data}</em></small>
                    </article>
                ))}
            </main>

        </div>
    );
}

export default Noticias;