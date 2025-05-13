import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from './Home';

function App() {
  return (
     <Routes>
      <Route path="/" element={<Home />} />


    </Routes>
  );
}

export default App;
