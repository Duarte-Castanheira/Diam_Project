import React from "react";
import './styles.css';

function Informacoes() {
  return (
    <div>
      <div>
        <NoticiasComunicados />
      </div>
      <div>
        <ClubeEstrela />
      </div>
    </div>
  );
}

const noticias = [
  {
    titulo: "Estrela do Minho reforça ataque com jovem promessa brasileira",
    data: "06 de maio de 2025",
    conteudo: "O G.D. Estrela do Minho anunciou hoje a contratação de Lucas \"Bola de Ouro\" Mendes, avançado de 20 anos proveniente do Grêmio Novorizontino (Brasil). O jogador assinou por três épocas e já treinou esta manhã em Ponte de Lima."
  },
  {
    titulo: "Obras no Estádio da Ribeira arrancam este verão",
    data: "02 de maio de 2025",
    conteudo: "A direção do Estrela do Minho confirmou o início das obras de requalificação do Estádio Municipal da Ribeira. A empreitada prevê a renovação dos balneários, substituição do relvado sintético por natural híbrido e instalação de iluminação LED."
  },
  {
    titulo: "Equipa sub-17 do Estrela sagra-se campeã distrital",
    data: "27 de abril de 2025",
    conteudo: "A formação sub-17 do Estrela do Minho conquistou o título distrital de Viana do Castelo após vencer o SC Vianense por 3-1. Dois dos atletas foram chamados aos treinos da Seleção Sub-18 do Norte."
  },
  {
    titulo: "Estrela e Universidade do Minho assinam protocolo de formação",
    data: "22 de abril de 2025",
    conteudo: "O clube limiano estabeleceu uma parceria com a Universidade do Minho para partilha de metodologias de treino, fisiologia do esforço e psicologia desportiva."
  },
  {
    titulo: "Capitão Pedro Carvalho: \"Este grupo tem alma e quer vencer\"",
    data: "15 de abril de 2025",
    conteudo: "Em entrevista exclusiva, o capitão da equipa sénior revelou que o balneário está mais unido do que nunca e quer levar o Estrela para a Liga Nacional."
  }
];

const comunicados = [
  {
    id: 15,
    titulo: "Reforço para o Meio-Campo",
    data: "14 de maio de 2025",
    corpo: `O Grupo Desportivo Estrela do Minho informa os seus sócios, adeptos e comunicação social que chegou a acordo com o atleta Tiago Azevedo, médio-centro de 25 anos, que representava o SC Espinho.

Tiago Azevedo assinou contrato válido por duas temporadas, com opção de renovação por mais uma época. O jogador será apresentado oficialmente na próxima sexta-feira, dia 16, às 17h30, na sala de imprensa do Estádio Municipal da Ribeira.

Acreditamos que a sua qualidade técnica, capacidade de liderança e experiência serão mais-valias no objetivo traçado para esta época: a subida à Liga Nacional.

Bem-vindo, Tiago!`,
    assinatura: "Pelo Minho. Pela Estrela."
  },
  {
    id: 14,
    titulo: "Encerramento Temporário da Bancada Nascente",
    data: "20 de maio de 2025",
    corpo: `O Grupo Desportivo Estrela do Minho informa que, devido ao início das obras de requalificação previstas no Estádio Municipal da Ribeira, a Bancada Nascente ficará temporariamente encerrada ao público a partir do próximo sábado, dia 24 de maio.

Esta intervenção faz parte do plano de modernização das infraestruturas do clube, contemplando a instalação de novos assentos, reforço estrutural da cobertura e acessibilidade melhorada para pessoas com mobilidade reduzida.

Durante este período, o acesso dos adeptos será redirecionado para as Bancadas Poente e Sul. Lamentamos o incómodo e agradecemos a compreensão e apoio contínuo dos nossos associados e simpatizantes.

Mais novidades sobre o progresso das obras serão comunicadas nas nossas redes oficiais.`,
    assinatura: "Com a tua força, renovamos o nosso lar."
  }
];

function ClubeEstrela() {
  return (
    <div className="noticias-comunicados-container">

      <section className="sobre-section">
        <h2 style={{fontWeight: 'bold'}}>🏟️ Sobre o Clube</h2>

        <article className="clube-container">
          <h3>📌 Descrição</h3>
          <ul>
            <li><strong>Nome:</strong> Grupo Desportivo Estrela do Minho (G.D. Estrela do Minho)</li>
            <li><strong>Fundação:</strong> 12 de julho de 1934</li>
            <li><strong>Localização:</strong> Ponte de Lima, distrito de Viana do Castelo, região do Minho</li>
            <li><strong>Estádio:</strong> Estádio Municipal da Ribeira – Capacidade: 1.500 lugares</li>
            <li><strong>Cores:</strong> Verde esmeralda e branco</li>
            <li><strong>Mascote:</strong> Um cavalo garrano chamado "Estrelinha"</li>
          </ul>
        </article>

        <article className="clube-container">
          <h3>📖 História</h3>
          <p>
            Fundado por um grupo de agricultores e comerciantes locais, o Estrela do Minho nasceu com o objetivo de promover o desporto e a união da comunidade minhota.
            Inicialmente apenas com futebol, o clube tornou-se conhecido pelas suas festas populares, torneios juvenis e ligação forte ao folclore e à tradição minhota.
            Nos anos 90, o clube chegou a disputar a II Liga durante quatro épocas consecutivas, sendo conhecido pelo seu futebol aguerrido e pelo ambiente fervoroso no estádio, cercado por colinas verdes e o rio Lima.
          </p>
        </article>

        <article className="clube-container">
          <h3>🏃 Modalidades Atuais</h3>
          <ul>
            <li>Futebol (sénior e formação)</li>
            <li>Atletismo</li>
            <li>Canoagem (aproveitando o rio Lima)</li>
            <li>Danças tradicionais (secção cultural)</li>
          </ul>
        </article>

        <article className="clube-container">
          <h3>🎯 Lema</h3>
          <p><em>"Orgulho do Minho, força do povo."</em></p>
        </article>

      </section>
    </div>
  );
}

function NoticiasComunicados() {
  return (
    <div className="noticias-comunicados-container">

      <section className="noticias-section">
        <h2>📰 Últimas Notícias</h2>
        {noticias.map((noticia, index) => (
          <article key={`noticia-${index}`} className="noticia-card">
            <h3>{noticia.titulo}</h3>
            <small><em>{noticia.data}</em></small>
            <p>{noticia.conteudo}</p>
          </article>
        ))}
      </section>

      <section className="comunicados-section">
        <h2>📢 Comunicados Oficiais</h2>
        {comunicados.map((comunicado) => (
          <div className="comunicado-card" key={`comunicado-${comunicado.id}`}>
            <h3>Comunicado Oficial n.º {comunicado.id} – {comunicado.titulo}</h3>
            <small><em>{comunicado.data}</em></small>
            <p style={{ whiteSpace: 'pre-line' }}>{comunicado.corpo}</p>
            <strong>{comunicado.assinatura}</strong>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Informacoes;