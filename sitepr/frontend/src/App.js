import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Forms from './Forms';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidatar" element={<Forms />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;