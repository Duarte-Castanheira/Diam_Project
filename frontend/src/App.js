import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Forms from './Forms';
import Header from './Header';
import Footer from './Footer';
import Sobre from './Sobre';
import Noticias from './Noticias';
import Perfil from './Perfil';
import Login from './Login';
import Equipa from './Equipa';
import Jogador from './Jogador';
import EditarPerfil from './EditarPerfil';
import PoliticaPrivacidade from './PoliticaPrivacidade';
import TermosUso from './TermosUso';
import AvisoCookies from './AvisoCookies';
import DetalhesProduto from "./DetalhesProduto";
import Bilhetes from "./Bilhetes";
import AddBilhetes from "./AddBilhetes";
import Loja from "./Loja";
import Carrinho from "./Carrinho";
import Jogos from "./Jogos";
import Convocatoria from "./Convocatoria";
import Estatisticas from "./Estatisticas";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidatar" element={<Forms />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/editar" element={<EditarPerfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jogadores" element={<Equipa />} />
        <Route path="/PoliticaPrivacidade" element={<PoliticaPrivacidade />} />
        <Route path="/TermosUso" element={<TermosUso />} />
        <Route path="/AvisoCookies" element={<AvisoCookies />} />
        <Route path="/loja" element={<Loja />} />
        <Route path= "/jogador/:jogadorId" element={<Jogador />} />
        <Route path="/estatisticas" element={<Estatisticas/>} />
        <Route path="/produto/:produtoId" element={<DetalhesProduto />} />
        <Route path="/bilhetes" element={<Bilhetes/>} />
        <Route path="/jogo/:bilhetesId/bilhetes" element={<AddBilhetes />} />
        <Route path= "/perfil/carrinho" element={<Carrinho />} />
        <Route path="/jogos" element={<Jogos/>} />
        <Route path="/jogo/:convocatoriaId" element={<Convocatoria/>} />
        <Route path="/carrinho" element={<Carrinho/>} />
        <Route path="/bilhetes/:bilheteId" element={<AddBilhetes/>} />


      </Routes>
      <Footer />
    </>
  );
}

export default App;