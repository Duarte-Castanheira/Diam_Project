import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from './Home';
import Forms from './Forms';
import Header from './Header';
import Footer from './Footer';
import Sobre from './Sobre';
import Noticias from './Noticias';
import PoliticaPrivacidade from './PoliticaPrivacidade';
import TermosUso from './TermosUso';
import AvisoCookies from './AvisoCookies';
import Perfil from './Perfil';
import Login from './Login';
import Equipa from './Equipa';

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
        <Route path="/login" element={<Login />} />
        <Route path="/PoliticaPrivacidade" element={<PoliticaPrivacidade />} />
        <Route path="/TermosUso" element={<TermosUso />} />
        <Route path="/AvisoCookies" element={<AvisoCookies />} />
        <Route path="/Equipa" element={<Equipa />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;