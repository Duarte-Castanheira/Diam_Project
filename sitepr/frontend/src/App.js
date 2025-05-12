import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Forms from './Forms';
import Header from './Header';
import Footer from './Footer';
import Sobre from './Sobre';
import Noticias from './Noticias';
import politica_privacidade from './politica_privacidade';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/candidatar" element={<Forms />} />
        <Route path="/politica_privacidade" element={<politica_privacidade />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;