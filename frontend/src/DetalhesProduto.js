import React, { useEffect, useState } from "react";
import './styles.css';
import { useParams } from "react-router-dom";
import axios from "axios";

function DetalhesProduto() {
  const { produtoId } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const PRODUTO_URL = `http://localhost:8000/extras/api/produto/${produtoId}/`;


    function getCSRFToken() {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    }

    useEffect(() => {
        axios.get(PRODUTO_URL)
            .then(res => {
            setProduto(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [PRODUTO_URL]);

    const adicionarAoCarrinho = () => {

    console.log("A adicionar ao carrinho o produto:", produto);
    console.log("ID do produto:", produto?.id);
    axios.post('http://localhost:8000/autenticacao/api/user/carrinho', {
        carrinho: [produto.pk]
    }, {
        headers: {
            'X-CSRFToken': getCSRFToken()
        },
        withCredentials: true
    })
    .then(res => {
        alert(res.data.success);
    })
    .catch(err => {
        console.error(err.response?.data || err);
        alert("Erro ao adicionar ao carrinho.");
    });
};


   if (loading)
        return <p>A carregar detalhes do produto...</p>;
    if (!produto)
        return <p>A carregar detalhes de nada...</p>;

  return (
    <div className="detalhes-produto">
      <h2>{produto.nome}</h2>
      <img src={`http://localhost:8000${produto.imagem}`} alt={produto.nome} />
      <p><strong>Preço:</strong> €{produto.preco}</p>
      <p><strong>Descrição:</strong> {produto.descricao}</p>
      <p><strong>Stock:</strong> {produto.stock}</p>
    <button onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</button>
    </div>
  );
}

export default DetalhesProduto;