import Header from "./Header";
import Footer from "./Footer";
import './styles.css';

function Sobre() {
    return (
        <div className ='Sobre'>
            <Header />
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
            <ul>
            <p>
                Fundado por um grupo de agricultores e comerciantes locais, o Estrela do Minho nasceu com o objetivo de
                promover o desporto e a união da comunidade minhota. Inicialmente apenas com futebol, o clube tornou-se
                conhecido pelas suas festas populares, torneios juvenis e ligação forte ao folclore e à tradição minhota.
                Nos anos 90, o clube chegou a disputar a II Liga durante quatro épocas consecutivas, sendo conhecido pelo
                seu futebol aguerrido e pelo ambiente fervoroso no estádio, cercado por colinas verdes e o rio Lima.
            </p>
            </ul>

            <h3>Modalidades atuais:</h3>
            <ul>
                <li>Futebol (sénior e formação)</li>
                <li>Atletismo</li>
                <li>Canoagem (aproveitando o rio Lima)</li>
                <li>Danças tradicionais (secção cultural)</li>
            </ul>

            <h3>Lema:</h3>
            <ul>
            <p>"Orgulho do Minho, força do povo."</p>
            </ul>
            <Footer />
        </div>
    );
}

export default Sobre;