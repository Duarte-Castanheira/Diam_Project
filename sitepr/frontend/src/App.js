import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sobre from './Sobre';
import Noticias from './Noticias';

function App() {
  return (
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogo" element={<Home />} />
        <Route path="/Sobre" element={<Sobre />} />
        <Route path="/Noticias" element={<Noticias />} />

    </Routes>
  );
}

export default App;
