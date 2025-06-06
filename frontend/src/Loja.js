import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import {Link} from "react-router-dom";

function Loja() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    const USER_URL = 'http://localhost:8000/autenticacao/api/user';


    useEffect(() => {
    axios.get(USER_URL, { withCredentials: true })
    .then(res => {
      setUser(res.data);
      setLoading(false);
    })
    .catch(err => {
        console.error('Failed to get user:', err);
        setUser(null);
        setLoading(false);
        });
    }, []);

 useEffect(() => {
  axios.get("http://localhost:8000/extras/api/produtos/")
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.error("Erro ao buscar produtos:", error.message);
    });
}, []);

    if (!user && !loading) {
        return (
            <div className="detalhes-produto">
                <img src="/perfil_clube.png" alt="Logotipo do clube" className="logo-clube" />
                <h2>Inicie sessão para aceder aos bilhetes</h2>
                <button onClick={() => window.location.href = '/login'}>
                    Ir para Login
                </button>
            </div>
    );
  }


 return (
    <div className="loja">
      {/* Cabeçalho */}
      <header className="loja-header">
        <div className="logo">
          <h1>Loja Oficial</h1>
        </div>
      </header>

      {/* Produtos */}
      <div className="loja-card-produto">
        {products.length === 0 ? (
          <p>Carregando produtos...</p>
        ) : (
          products.map((product) => (
            <Link
              to={`/produto/${product.pk}`}
              key={product.pk}
              className="card-produto"
              style={{textDecoration: "none", color: "inherit", cursor: "pointer" }}
            >
              <img
                src={`http://localhost:8000${product.imagem}`}
                alt={product.nome}
                className="card-img-top"
              />
              <h3>{product.nome}</h3>
              <p>Preço: €{product.preco}</p>
            </Link>
          ))
        )}
      </div>


    </div>
  );
}

export default Loja;