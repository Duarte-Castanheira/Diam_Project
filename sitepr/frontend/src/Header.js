import './styles.css'
import React, { useState } from 'react';

function Header() {
  const [mostrarBotoes, setMostrarBotoes] = useState(false);



  const toggleBotoes = (e) => {
    e.preventDefault(); // Impede o link de redirecionar
    setMostrarBotoes(prev => !prev);
  };

  return (
    <div className="header">
      <a href="/"><img src="/logo.png" alt="Logotipo do clube" style={{ width: '20%', height: 'auto' }} /></a>
      <a href="/jogos" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Jogos</a>
      <a href="/equipa" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Equipa</a>
      <a href="/bilhetes" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Bilhetes</a>
      <a href="/loja" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Loja</a>
      <a href="/noticias" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Noticias</a>

      <div className="nav-item-com-botoes">
        <a href="/" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }} onClick={toggleBotoes}>Formularios</a>

        {mostrarBotoes && (
          <div className="botoes-container">
            <a href="/candidatar" style={{ textDecoration: 'none', color: 'white', fontSize: '18px' }}>Candidatar</a>
            <a href="/inquerito" style={{ textDecoration: 'none', color: 'white', fontSize: '18px' }}>Inquerito</a>

          </div>
        )}
      </div>

      <a href="/sobre" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>Sobre</a>
    </div>
  );
}

export default Header;
