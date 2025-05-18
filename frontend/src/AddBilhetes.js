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

    const adicionarAoCarrinho = (bilhete) => {
    // Verifica se já está no carrinho para não duplicar
    if (carrinho.some(b => b.id === bilhete.id)) return;

    const novoCarrinho = [...carrinho, bilhete];
    setCarrinho(novoCarrinho);

    const ids = novoCarrinho.map(b => b.id);
    atualizarCarrinhoNoServidor(ids);
};

  return (
    <div className="addBilhetes">
      <h1>Bilhetes Disponíveis</h1>
      <div className="bilhete-lista">
        {bilhetes.length === 0 ? (
          <p>Sem bilhetes disponíveis para este jogo.</p>
        ) : (
          bilhetes.map((bilhete) => (
            <div key={bilhete.pk} className="card-bilhete">
              <h3>Setor: {bilhete.setor}</h3>
              <p><strong>Preço:</strong> €{bilhete.preco}</p>
              <p><strong>Bancada:</strong> {bilhete.bancada}</p>
              <p><strong>Bilhtes disponiveis:</strong> {bilhete.stock}</p>
              <button onClick={() => adicionarAoCarrinho(bilhete)}>Adicionar ao carrinho</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AddBilhetes;