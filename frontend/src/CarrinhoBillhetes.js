import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Carrinho() {
    const [bilhete, setBilhetes] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [user, setUser] = useState(null);

    const PRODUTOS_URL = 'http://localhost:8000/extras/api/produtos';
    const USER_URL = 'http://localhost:8000/autenticacao/api/user';
    const UPDATE_CARRINHO_URL = 'http://localhost:8000/autenticacao/api/atualizar_carrinho'; // ajusta conforme o teu backend

    useEffect(() => {
        axios.get(PRODUTOS_URL)
            .then(res => setProdutos(res.data))
            .catch(err => console.error('Erro ao buscar produtos:', err));
    }, []);

    useEffect(() => {
        axios.get(USER_URL)
            .then(res => {
                setUser(res.data);
                setCarrinho(res.data.carrinho || []);
            })
            .catch(err => console.error('Erro ao buscar utilizador:', err));
    }, []);



    const atualizarCarrinhoNoServidor = (novoCarrinho) => {
        if (!user) return;

        axios.put(UPDATE_CARRINHO_URL, {
            userId: user.id,
            carrinho: novoCarrinho
        })
        .then(() => console.log("Carrinho atualizado com sucesso."))
        .catch(err => console.error("Erro ao atualizar carrinho:", err));
    };


    const removerDoCarrinho = (produtoId) => {
    const novoCarrinho = carrinho.filter(p => p.id !== produtoId);
    setCarrinho(novoCarrinho);

    const ids = novoCarrinho.map(p => p.id);
    atualizarCarrinhoNoServidor(ids);
};

    return (
        <div>
            <h2>Produtos Disponíveis</h2>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        {produto.nome} - {produto.preco}€
                        <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar</button>
                    </li>
                ))}
            </ul>

            <h2>O teu Carrinho</h2>
            <ul>
                {carrinho.map((produto, index) => (
                    <li key={index}>
                        {produto.nome} - {produto.preco}€
                        <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Carrinho;