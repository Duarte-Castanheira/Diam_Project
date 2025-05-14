import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  return (
    <>
      <Content />
    </>
  );
}

function Content() {
  return (
    <Container style={{ marginTop: "20px", maxWidth: "400px" }}>
      <Row>
        <Col>
          <Slideshow />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col>
          <Games />
        </Col>
      </Row>
    </Container>
  );
}

function Slideshow() {
  const navigate = useNavigate();

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={5000}
      transitionTime={500}
    >
      <div onClick={() => navigate("/Noticias")} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate("/Noticias")}>
        <img
          src="/NoticiaJovem.png"
          alt="Imagem 1"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div onClick={() => navigate("/Noticias")} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate("/Noticias")}>
        <img
          src="/Sub17.png"
          alt="Imagem 2"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div onClick={() => navigate("/Noticias")} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate("/Noticias")}>
        <img
          src="/RenovacaoEstadio.png"
          alt="Imagem 3"
          style={{ cursor: "pointer" }}
        />
      </div>
    </Carousel>
  );
}

function Games() {
  return (
    <>
      <h2>Acompanha os jogos do GD Estrela do Minho</h2>
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

export default Home;