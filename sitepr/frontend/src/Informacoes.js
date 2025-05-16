import React from "react";
import './styles.css';

function Informacoes() {
    return (
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

            <div className="Sobre">
                <h3>Descrição:</h3>
                <ul>
                    <li>Nome: Grupo Desportivo Estrela do Minho (G.D. Estrela do Minho)</li>
                    <li>Fundação: 12 de julho de 1934</li>
                    <li>Localização: Ponte de Lima, distrito de Viana do Castelo, região do Minho</li>
                    <li>Estádio: Estádio Municipal da Ribeira – Capacidade: 1.500 lugares</li>
                    <li>Cores: Verde esmeralda e branco</li>
                    <li>Mascote: Um cavalo garrano (raça típica do norte de Portugal), chamado "Estrelinha"</li>
                </ul>

                <h3>História:</h3>
                <p>
                    Fundado por um grupo de agricultores e comerciantes locais, o Estrela do Minho nasceu com o objetivo de
                    promover o desporto e a união da comunidade minhota. Inicialmente apenas com futebol, o clube tornou-se
                    conhecido pelas suas festas populares, torneios juvenis e ligação forte ao folclore e à tradição minhota.
                    Nos anos 90, o clube chegou a disputar a II Liga durante quatro épocas consecutivas, sendo conhecido pelo
                    seu futebol aguerrido e pelo ambiente fervoroso no estádio, cercado por colinas verdes e o rio Lima.
                </p>

                <h3>Modalidades atuais:</h3>
                <ul>
                    <li>Futebol (sénior e formação)</li>
                    <li>Atletismo</li>
                    <li>Canoagem (aproveitando o rio Lima)</li>
                    <li>Danças tradicionais (secção cultural)</li>
                </ul>

                <h3>Lema:</h3>
                <p>"Orgulho do Minho, força do povo."</p>
            </div>
        </div>
    );
}

export default Informacoes;