import React from "react";
import './styles.css';

function Informacoes() {
    return(
        <div className="resumo-container">
            <section>
                <h2 className="title">📰 Notícias</h2>
                <div className="cards-wrapper">
                    <div className="card imagem-card">
                        <div className="imagem-wrapper">
                            <img src="PedroCarvalho.png" alt="Pedro Carvalho" />
                            <div className="tituloImagem">Capitão Pedro Carvalho: "Este grupo tem alma e quer vencer"</div>
                        </div>
                    </div>

                    <div className="card imagem-card">
                        <div className="imagem-wrapper">
                            <img src="ProtocoloMinho.png" alt="Protocolo UMinho" />
                            <div className="tituloImagem">Protocolo com Universidade do Minho</div>
                        </div>
                    </div>

                    <div className="card imagem-card">
                        <div className="imagem-wrapper">
                            <img src="Sub17.png" alt="Sub-17 campeã" />
                            <div className="tituloImagem">Sub-17 campeã distrital</div>
                        </div>
                    </div>

                    <div className="card imagem-card">
                        <div className="imagem-wrapper">
                            <img src="RenovacaoEstadio.png" alt="Estádio da Ribeira" />
                            <div className="tituloImagem">Requalificação do Estádio da Ribeira</div>
                        </div>
                    </div>

                    <div className="card imagem-card">
                        <div className="imagem-wrapper">
                            <img src="NoticiaJovem.png" alt="Lucas Mendes" />
                            <div className="tituloImagem">Lucas Mendes reforça o ataque</div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="title">📢 Comunicados</h2>
                <div className="cards-wrapper">
                    <div className="card imagem-card">
                        <div className="imagem-wrapper">
                            <img src="ContratacaoMA.png" alt="Tiago Azevedo" />
                            <div className="tituloImagem">Tiago Azevedo contratado para o meio-campo</div>
                        </div>
                    </div>

                    <div className="card imagem-card">
                        <div className="imagem-wrapper">
                            <img src="EncerramentoBancada.png" alt="Bancada Nascente" />
                            <div className="tituloImagem">Encerramento da Bancada Nascente</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Informacoes;