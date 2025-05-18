import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import "./styles.css";
import { useNavigate } from 'react-router-dom'

function InqueritosPage() {
    const [inqueritos, setInqueritos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/forms/inqueritos/')
            .then(res => setInqueritos(res.data))
            .catch(err => console.error('Erro ao carregar inqueritos:', err));
    }, []);

     const responder = (idInquerito) => {
    // Podes redirecionar para o formulário do inquérito, por exemplo
    navigate(`/forms/${idInquerito}/responder/`);
  };

  return (
    <div className="container">
      <h2>Inquéritos Disponíveis</h2>
      <p style={{fontFamily:'emoji'}}>
      Escolhe um inquérito para responder:
      </p>
      <ul>
        {inqueritos.map((inquerito) => (
          <li key={inquerito.id} style={{ marginBottom: "15px", display: "flex",
        alignItems: "center",
        justifyContent: "space-between"  }}>
            <strong>{inquerito.titulo}</strong><br />
            <button className= "btn btn-primary"
  onClick={() => responder(inquerito.id)}
>
  Responder
</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InqueritosPage;
