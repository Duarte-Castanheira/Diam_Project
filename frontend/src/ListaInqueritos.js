import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaInqueritos() {
  const [inqueritos, setInqueritos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/forms/inqueritos/')
      .then(res => {
        setInqueritos(res.data);
      })
      .catch(err => {
        console.error('Erro ao buscar inquéritos:', err);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Inquéritos</h2>
      <ul>
        {inqueritos.map(inq => (
          <li key={inq.id}>
            <a href={`/${inq.id}/responder/`}>{inq.titulo}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaInqueritos;