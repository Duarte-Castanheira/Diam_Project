import './styles.css'
import React, { useState } from 'react';

function Header() {
    const [mostrarBotoesForm, setMostrarBotoesForm] = useState(false);
    const [mostrarBotoesEquipa, setMostrarBotoesEquipa] = useState(false);

    const toggleBotoesEquipa = (e) => {
        e.preventDefault();
        setMostrarBotoesEquipa(prev => !prev);
    };

    const toggleBotoesForm = (e) => {
        e.preventDefault();
        setMostrarBotoesForm(prev => !prev);
    };

    return (
        <div className="header">
            <a className="logo-link" href="/" >
                <img src="/logo.png" alt="Logotipo do clube" />
            </a>

            <div className="navbar">
                <a href="/jogos">Jogos</a>

                <div className="nav-item-com-botoes">
                    <a href="/" onClick={toggleBotoesEquipa}>Equipa</a>
                    {mostrarBotoesEquipa && (
                        <div className="botoes-container">
                            <a href="/jogadores">Jogadores</a>
                            <a href="/estatisticas">Estatisticas</a>
                        </div>
                    )}
                </div>

                <a href="/bilhetes">Bilhetes</a>
                <a href="/loja">Loja</a>
                <a href="/noticias">Notícias</a>
                <a href="/sobre">Sobre</a>

                <div className="nav-item-com-botoes">
                    <a href="/" onClick={toggleBotoesForm}>Formulários</a>
                    {mostrarBotoesForm && (
                        <div className="botoes-container">
                            <a href="/candidatar">Candidatar</a>
                            <a href="/inquerito">Inquérito</a>
                        </div>
                    )}
                </div>

                <a href="/carrinho" >
                    <img src="/carrinho.png" alt="Carrinho" style={{ width: '30px', height: 'auto' }} />
                </a>

                <a href="/perfil">
                    <img src="/perfil.png" alt="Perfil" style={{ width: '30px', height: 'auto' }} />
                </a>
            </div>
        </div>
    );
}

export default Header;