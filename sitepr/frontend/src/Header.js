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
  <a className="logo-link" href="/" >
    <img src="/logo.png" alt="Logotipo do clube" />
  </a>

  <div className="navbar">
    <a href="/jogos">Jogos</a>
    <a href="/equipa">Equipa</a>
    <a href="/bilhetes">Bilhetes</a>
    <a href="/loja">Loja</a>
    <a href="/informacoes">Informações</a>
    <div className="nav-item-com-botoes">
        <a href="/" onClick={toggleBotoes}>Formulários</a>
        {mostrarBotoes && (
        <div className="botoes-container">
          <a href="/candidatar">Candidatar</a>
          <a href="/inquerito">Inquérito</a>
        </div>
        )}
    </div>
    <a href="/perfil">
        <img src="/perfil.png" alt="Perfil" style={{ width: '30px', height: 'auto' }} />
    </a>
  </div>
</div>
  );
}

export default Header;