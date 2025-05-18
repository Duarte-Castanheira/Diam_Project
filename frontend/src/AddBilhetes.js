import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddBilhetes() {
    const { bilhetesId } = useParams();
    const [bilhetes, setBilhetes] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [user, setUser] = useState(null);



    const USER_URL = 'http://localhost:8000/autenticacao/api/user';
    const UPDATE_CARRINHO_URL = 'http://localhost:8000/autenticacao/api/atualizar_carrinho';

 function getCSRFToken() {
        return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/jogos/api/jogo/${bilhetesId}/bilhetes/`)
            .then(response => {
                console.log("Bilhetes recebidos:", response.data);
                setBilhetes(response.data);
            })
            .catch(error => console.error("Erro ao buscar bilhetes:", error.message));
    }, []);

    useEffect(() => {
        axios.get(USER_URL, { withCredentials: true })
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

    const adicionarAoCarrinho = (bilheteId) => {
  let carrinhoAtual = JSON.parse(localStorage.getItem('carrinho_bilhete')) || [];

  if (!carrinhoAtual.includes(bilheteId)) {
    carrinhoAtual.push(bilheteId);
  }

  localStorage.setItem('carrinho_bilhete', JSON.stringify(carrinhoAtual));

  axios.post('http://localhost:8000/autenticacao/api/user/carrinho/bilhete', {
    carrinho: carrinhoAtual
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

  return (
    <div className="detalhes-produto">
      <h2>Bilhete Disponivel:</h2>
      {bilhetes.map(bilhete => (
  <div key={bilhete.pk} className="detalhes-produto">
    <p><strong>Preço:</strong> €{bilhete.preco}</p>
    <p><strong>Bancada:</strong> {bilhete.bancada}</p>
    <p><strong>Stock:</strong> {bilhete.stock}</p>
    <button onClick={() => adicionarAoCarrinho(bilhete.pk)}>Adicionar ao Carrinho</button>
  </div>
))}
    </div>
  );
}

export default AddBilhetes;