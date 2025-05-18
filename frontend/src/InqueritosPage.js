import { useEffect, useState } from 'react';
import axios from 'axios';
import ListInqueritos from '../ListInqueritos';

function InqueritosPage() {
    const [inqueritos, setInqueritos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/forms/inqueritos/')
            .then(res => setInqueritos(res.data))
            .catch(err => console.error('Erro:', err));
    }, []);

    return (
        <div>
            <h1>Inquéritos Disponíveis</h1>
            <ul>
                {inqueritos.map((item) => (
                    <li key={item.id}>{item.titulo}</li>
                ))}
            </ul>
        </div>
    );
}

export default InqueritosPage;
