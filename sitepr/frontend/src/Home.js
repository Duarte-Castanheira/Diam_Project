import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <Slideshow />
      </div>
      <div>
        <Games />
      </div>
      <div>
        <Video />
      </div>
    </div>
  );
}

function Slideshow() {
  const images = [
    {
      src: "/NoticiaJovem.png",
      alt: "Imagem 1",
      link: "/Noticias",
    },
    {
      src: "/Sub17.png",
      alt: "Imagem 2",
      link: "/Noticias",
    },
    {
      src: "/RenovacaoEstadio.png",
      alt: "Imagem 3",
      link: "/Noticias",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (e, link) => {
    if (e.key === "Enter") {
      navigate(link);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { src, alt, link } = images[currentIndex];

  return (
    <div
      tabIndex={0}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={() => navigate(link)}
    >
      <div>
        <img
          src={src}
          alt={alt}
          style={{
            margin: "20px",
            width: "300px",
            height: "300px",
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}

function Games() {
  return (
    <>
    <h2 style={{ textAlign: "center", fontSize: "18px" }}>Acompanha os jogos do GD Estrela do Minho</h2>


      <div className="match-box">
        <div className="game-container">
          <div className="game">
            <div className="date">
              Terminado
              <br />
              LIGA NORTE 24/25 | MINHO TV
            </div>
            <div className="team" style={{ fontWeight: "bold" }}>
              <img src="/logo.png" alt="Estrela do Minho Logo" /> GD Estrela do Minho
            </div>
            <div className="score">1 - 1</div>
            <div className="team">
              <img src="/SCCaminhense.png" alt="SC Caminhense Logo" /> SC Caminhense
            </div>
            <a>Resumo</a>
          </div>
        </div>

        <div className="game-container">
          <div className="game">
            <div className="date">
              Sáb 2 Fev, 18h00
              <br />
              LIGA NORTE 24/25 | MINHO TV
            </div>
            <div className="team">
              <img src="/Melgaco.png" alt="CDC Melgaço Logo" /> CDC Melgaço
            </div>
            <div className="score">vs</div>
            <div className="team" style={{ fontWeight: "bold" }}>
              <img src="/logo.png" alt="Estrela do Minho Logo" /> GD Estrela do Minho
            </div>
            <a>Antevisão</a> | <a>Comprar Bilhete</a>
          </div>
        </div>

        <div className="game-container">
          <div className="game">
            <div className="date">
              Dom 25 Mai, 17h15
              <br />
              LIGA NORTE 24/25 | MINHO TV
            </div>
            <div className="team" style={{ fontWeight: "bold" }}>
              <img src="/logo.png" alt="Estrela do Minho Logo" /> GD Estrela do Minho
            </div>
            <div className="score">vs</div>
            <div className="team">
              <img src="/ACDLanheses.png" alt="ACD Lanheses Logo" /> ACD Lanheses
            </div>
            <a>Comprar Bilhete</a>
          </div>
        </div>
      </div>
    </>
  );
}

function Video() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/B4IyVkGQNpk?si=qhQES6yHbyqnOx3B"
        title="Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Home;