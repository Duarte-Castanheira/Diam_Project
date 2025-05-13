import './styles.css';

const noticias = [
    {
        titulo: "Estrela do Minho reforça ataque com jovem promessa brasileira",
        data: "06 de Maio de 2025",
        conteudo: "O G.D. Estrela do Minho anunciou hoje a contratação de Lucas “Bola de Ouro” Mendes, avançado de 20 anos proveniente do Grêmio Novorizontino (Brasil). O jogador assinou por três épocas e já treinou esta manhã em Ponte de Lima."
    },
    {
        titulo: "Obras no Estádio da Ribeira arrancam este verão",
        data: "02 de Maio de 2025",
        conteudo: "A direção do Estrela do Minho confirmou o início das obras de requalificação do Estádio Municipal da Ribeira. A empreitada prevê a renovação dos balneários, substituição do relvado sintético por natural híbrido e instalação de iluminação LED."
    },
    {
        titulo: "Equipa sub-17 do Estrela sagra-se campeã distrital",
        data: "27 de Abril de 2025",
        conteudo: "A formação sub-17 do Estrela do Minho conquistou o título distrital de Viana do Castelo após vencer o SC Vianense por 3-1. Dois dos atletas foram chamados aos treinos da Seleção Sub-18 do Norte."
    },
    {
        titulo: "Estrela e Universidade do Minho assinam protocolo de formação",
        data: "22 de Abril de 2025",
        conteudo: "O clube limiano estabeleceu uma parceria com a Universidade do Minho para partilha de metodologias de treino, fisiologia do esforço e psicologia desportiva."
    },
    {
        titulo: "Capitão Pedro Carvalho: “Este grupo tem alma e quer vencer”",
        data: "15 de Abril de 2025",
        conteudo: "Em entrevista exclusiva, o capitão da equipa sénior revelou que o balneário está mais unido do que nunca e quer levar o Estrela para a Liga Nacional."
    }
];

function Noticias() {
    return (
        <div className="DocLegal">

            <main className="noticias-container">
                <h2>Últimas Notícias</h2>
                {noticias.map((noticia, index) => (
                    <article key={index} className="noticia-card">
                        <h3>{noticia.titulo}</h3>
                        <small><em>{noticia.data}</em></small>
                        <p>{noticia.conteudo}</p>
                    </article>
                ))}
            </main>

        </div>
    );
}

export default Noticias;