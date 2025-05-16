import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Carrinho() {
    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [user, setUser] = useState(null);

    const PRODUTOS_URL = 'http://localhost:8000/extras/api/produtos';
    const USER_URL = 'http://localhost:8000/autenticacao/api/user';
    const UPDATE_CARRINHO_URL = 'http://localhost:8000/autenticacao/api/user/carrinho'; // ajusta conforme o teu backend

    function getCSRFToken() {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    }

    useEffect(() => {
    axios.get(USER_URL, { withCredentials: true })
        .then(res => {
            console.log("USER DATA:", res.data);
            setUser(res.data);

            const carrinhoIds = (res.data.carrinho || []).map(produto => produto.pk);
            console.log("Carrinho IDs:", carrinhoIds);

            axios.get(PRODUTOS_URL, { withCredentials: true })
                .then(resProdutos => {
                    console.log("PRODUTOS DATA:", resProdutos.data);

                    const produtosNoCarrinho = resProdutos.data.filter(p =>
                        carrinhoIds.includes(p.pk)
                    );
                    console.log("PRODUTOS NO CARRINHO:", produtosNoCarrinho);

                    setCarrinho(produtosNoCarrinho);
                })
                .catch(err => console.error('Erro ao buscar produtos:', err));
        })
        .catch(err => console.error('Erro ao buscar utilizador:', err));
}, []);



    const atualizarCarrinhoNoServidor = (ids) => {
        if (!user) return;

        axios.post(UPDATE_CARRINHO_URL, {
            carrinho: ids   // envia o array de IDs correto
        }, {
            headers: {
                'X-CSRFToken': getCSRFToken()
            },
            withCredentials: true
        })
        .then(() => console.log("Carrinho atualizado com sucesso."))
        .catch(err => console.error("Erro ao atualizar carrinho:", err));
    };


    const removerDoCarrinho = (produtoId) => {
        const novoCarrinho = carrinho.filter(p => p.pk !== produtoId);
        setCarrinho(novoCarrinho);

        const ids = novoCarrinho.map(p => p.pk);
        atualizarCarrinhoNoServidor(ids);
    };

    return (
        <div>


            <h2>O teu Carrinho</h2>
            <ul>
                {carrinho.map((produto, index) => (
                    <li key={index}>
                        {produto.nome} - {produto.preco}€
                        <button onClick={() => removerDoCarrinho(produto.pk)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Carrinho;