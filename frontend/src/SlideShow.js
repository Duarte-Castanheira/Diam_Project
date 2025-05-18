import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';

function Slideshow() {
  const [noticias, setNoticias] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/extras/api/noticias')
      .then((res) => setNoticias(res.data))
      .catch((err) => console.error("Erro ao carregar notícias:", err));
  }, []);

  useEffect(() => {
    if (noticias.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === noticias.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [noticias]);

    if (noticias.length === 0)
        return (
            <div className="slideshow-wrapper">
                <p>Não existem notícias disponíveis.</p>
            </div>
        );

  const noticia = noticias[currentIndex];
  const imagemUrl = noticia.imagem.startsWith("http")
    ? noticia.imagem
    : `http://localhost:8000${noticia.imagem}`;

  return (
    <div className="slideshow-wrapper">
      <div
        className="slideshow-container"
        onClick={() => navigate('/Noticias/')}
      >
        <h4 className="slideshow-title">{noticia.titulo}</h4>
        <img
          src={imagemUrl}
          alt={noticia.titulo}
          className="slideshow-image"
        />
      </div>
    </div>
  );
}

export default Slideshow;
