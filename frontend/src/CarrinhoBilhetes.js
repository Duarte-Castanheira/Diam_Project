import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CarrinhoBilhetes() {
    const [bilhetes, setBilhetes] = useState([]);
    const [carrinhoBilhetes, setCarrinhoBilhetes] = useState([]);
    const [user, setUser] = useState(null);

    const BILHETES_URL = 'http://localhost:8000/jogos/api/jogos';
    const USER_URL = 'http://localhost:8000/autenticacao/api/user';
    const UPDATE_CARRINHO_BILHETES_URL = 'http://localhost:8000/autenticacao/api/user/carrinho/bilhete';

    function getCSRFToken() {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    }

    useEffect(() => {
        axios.get(USER_URL, { withCredentials: true })
            .then(res => {
                setUser(res.data);
                const carrinhoBilhetesIds = (res.data.carrinho_bilhete || []).map(b => b.pk);

                axios.get(BILHETES_URL, { withCredentials: true })
                    .then(resBilhetes => {
                        setBilhetes(resBilhetes.data);
                        const bilhetesNoCarrinho = resBilhetes.data.filter(b => carrinhoBilhetesIds.includes(b.pk));
                        setCarrinhoBilhetes(bilhetesNoCarrinho);
                    })
                    .catch(err => console.error('Erro ao buscar bilhetes:', err));
            })
            .catch(err => console.error('Erro ao buscar utilizador:', err));
    }, []);

    const removerDoCarrinhoBilhetes = (bilheteId) => {
        const novoCarrinho = carrinhoBilhetes.filter(b => b.pk !== bilheteId);
        setCarrinhoBilhetes(novoCarrinho);

        axios.delete(UPDATE_CARRINHO_BILHETES_URL, {
            headers: { 'X-CSRFToken': getCSRFToken() },
            data: { bilhete: bilheteId },
            withCredentials: true
        })
        .then(() => console.log('Bilhete removido do carrinho.'))
        .catch(err => console.error('Erro ao remover bilhete:', err));
    };

    return (
        <div>
            <h2>🎟️ O teu Carrinho - Bilhetes</h2>
            {carrinhoBilhetes.length === 0 ? (
                <p>Carrinho de bilhetes vazio.</p>
            ) : (
                <ul>
                    {carrinhoBilhetes.map((bilhete, index) => (
                        <li key={index}>
                            Setor: {bilhete.setor} - Lugar: {bilhete.lugar} - Preço: €{bilhete.preco}
                            <button onClick={() => removerDoCarrinhoBilhetes(bilhete.pk)}>Remover</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
}

export default CarrinhoBilhetes;