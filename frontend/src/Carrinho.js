import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarrinhoBilhetes from './CarrinhoBilhetes';
function Carrinho() {
    const [carrinho, setCarrinho] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const PRODUTOS_URL = 'http://localhost:8000/extras/api/produtos';
    const USER_URL = 'http://localhost:8000/autenticacao/api/user';
    const UPDATE_CARRINHO_URL = 'http://localhost:8000/autenticacao/api/user/carrinho';

    function getCSRFToken() {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    }



    useEffect(() => {
  axios.get(USER_URL, { withCredentials: true })
    .then(res => {
      setUser(res.data);
      setLoading(false);
      const carrinhoIds = (res.data.carrinho || []).map(produto => produto.pk);

      axios.get(PRODUTOS_URL, { withCredentials: true })
        .then(resProdutos => {
          const produtosNoCarrinho = resProdutos.data.filter(p => carrinhoIds.includes(p.pk));
          setCarrinho(produtosNoCarrinho);
        })
    })
    .catch(err => {
        console.error('Failed to get user:', err);
        setUser(null);
        setLoading(false);
        });
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


    if (!user && !loading) {
        return (
            <div className="detalhes-produto">
            <img src="/perfil_clube.png" alt="Logotipo do clube" className="logo-clube" />
                <h2>Inicie sessão para aceder ao carrinho</h2>
                <button onClick={() => window.location.href = '/login'}>
                    Ir para Login
                </button>
            </div>
    );
  }

    return (
    <div>
        <div className="detalhes-produto">
            <h1>O teu Carrinho</h1>

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
                        <div key={produto.pk} className="detalhes-produto">
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
        <div className="detalhes-produto">
         <CarrinhoBilhetes />
         </div>
    </div >
    );
}

export default Carrinho;