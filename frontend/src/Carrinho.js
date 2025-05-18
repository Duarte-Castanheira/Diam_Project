import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Carrinho() {
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
      setUser(res.data);

      const carrinhoIds = (res.data.carrinho || []).map(produto => produto.pk);

      axios.get(PRODUTOS_URL, { withCredentials: true })
        .then(resProdutos => {
          const produtosNoCarrinho = resProdutos.data.filter(p => carrinhoIds.includes(p.pk));
          setCarrinho(produtosNoCarrinho);
        })
    })
    }, []);

    const atualizarCarrinhoNoServidor = (ids) => {
        if (!user) return;

        axios.post(UPDATE_CARRINHO_URL, {
            carrinho: ids
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
      const novoCarrinho = carrinho.filter(produto => produto.pk !== produtoId);

      const idsCarrinho = novoCarrinho.map(produto => produto.pk);
      localStorage.setItem('carrinho', JSON.stringify(idsCarrinho));

      atualizarCarrinhoNoServidor(idsCarrinho);
      setCarrinho(novoCarrinho);
    };

    return (
        <div className="detalhes-produto">
            <h2>O teu Carrinho</h2>

            {carrinho.length === 0 ? (
                <>
                    <p style={{fontFamily:"emoji"}}><strong>Ainda não adicionou produtos no carrinho</strong></p>
                    <button onClick={() => window.location.href = '/loja'}>
                        Ir para a Loja
                    </button>
                </>
            ) : (
                <div>
                    {carrinho.map((produto) => (
                        <div key={produto.pk} style={{ marginBottom: '20px' }}>
                            <h3>{produto.nome}</h3>
                            <img src={`http://localhost:8000${produto.imagem}`} alt={produto.nome} />
                            <p><strong>Preço:</strong> €{produto.preco}</p>
                            <p><strong>Descrição:</strong> {produto.descricao}</p>
                            <button onClick={() => removerDoCarrinho(produto.pk)}>Remover</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Carrinho;