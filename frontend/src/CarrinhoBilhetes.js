import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CarrinhoBilhetes() {
    const [carrinhoBilhetes, setCarrinhoBilhetes] = useState([]);

    const BILHETES_URL = 'http://localhost:8000/jogos/api/bilhetes';
    const USER_URL = 'http://localhost:8000/autenticacao/api/user';
    const UPDATE_CARRINHO_BILHETES_URL = 'http://localhost:8000/autenticacao/api/user/carrinho/bilhete';

    function getCSRFToken() {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    }

    useEffect(() => {
        axios.get(USER_URL, { withCredentials: true })
            .then(res => {
                const carrinhoBilhetesIds = (res.data.carrinho_bilhete || []).map(b => b.pk);

                axios.get(BILHETES_URL, { withCredentials: true })
                    .then(resBilhetes => {
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
        <div className="detalhes-produto">
            <h1>Os teus Bilhetes:</h1>
            {carrinhoBilhetes.length === 0 ? (
            <>
                <p style={{fontFamily:"emoji"}}><strong>Carrinho de bilhetes vazio.</strong></p>
                <button onClick={() => window.location.href = '/bilhetes'}>
                        Comprar Bilhetes
                    </button>
                    </>
            ) : (
                <ul>
                    {carrinhoBilhetes.map((bilhete, index) => (
                        <div key={index} className="detalhes-produto">
                            <h3>Bancada: {bilhete.bancada}</h3>
                             <p>Preço: €{bilhete.preco}</p>
                            <button onClick={() => removerDoCarrinhoBilhetes(bilhete.pk)}>Remover</button>
                        </div>
                    ))}
                </ul>
            )}
        </div>

    );
}

export default CarrinhoBilhetes;