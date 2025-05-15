import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import {Link} from "react-router-dom";

function Loja() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

 useEffect(() => {
  axios.get("http://localhost:8000/extras/api/produtos/")
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.error("Erro ao buscar produtos:", error.message);
    });
}, []);


  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/extras/api/produtos/");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
    }
  };

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