import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddBilhetes() {
    const { bilhetesId } = useParams();
    const [bilhetes, setBilhetes] = useState([]);


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
    }, [bilhetesId]);


    const adicionarAoCarrinho = (bilheteId) => {
        axios.post('http://localhost:8000/autenticacao/api/user/carrinho/bilhete', {
            carrinho: [bilheteId]
        }, {
            headers: { 'X-CSRFToken': getCSRFToken() },
            withCredentials: true
        })
        .then(res => {
            alert(res.data.success);
        })
        .catch(err => {
            alert("Erro ao adicionar ao carrinho.");
        });
    };

   return (
        <div className="loja">
            {/* Cabeçalho */}
            <header className="loja-header">
                <div className="logo">
                    <h1>Bilhetes Disponíveis</h1>
                </div>
            </header>

            {/* Lista de Bilhetes */}
            <div className="loja-card-produto">
                {bilhetes.length === 0 ? (
                    <p>Carregando bilhetes...</p>
                ) : (
                    bilhetes.map((bilhete) => (
                        <div
                            key={bilhete.pk}
                            className="card-produto"
                            style={{ textDecoration: "none", color: "inherit", cursor: "default" }}
                        >
                            <h3>Bancada {bilhete.bancada}</h3>
                            <p><strong>Preço:</strong> €{bilhete.preco}</p>
                            <p><strong>Stock:</strong> {bilhete.stock}</p>
                            <button onClick={() => adicionarAoCarrinho(bilhete.pk)}>
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default AddBilhetes;