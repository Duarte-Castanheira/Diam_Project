import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Forms from './Forms';
import Header from './Header';
import Footer from './Footer';
import Sobre from './Sobre';
import Noticias from './Noticias';
import Perfil from './Perfil';
import Login from './Login';


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
      </Routes>
      <Footer />
    </>
  );
}

export default App;