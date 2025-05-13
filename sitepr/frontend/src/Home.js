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
    </Container>
  );
}

function Slideshow() {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={5000}
      transitionTime={500}
    >
      <div>
        <img
          src="/NoticiaJovem.png"
          alt="Imagem 1"
        />
      </div>
      <div>
        <img
          src="/Sub17.png"
          alt="Imagem 2"
        />
      </div>
      <div>
        <img
          src="/RenovacaoEstadio.png"
          alt="Imagem 3"
        />
      </div>
    </Carousel>
  );
}

export default Home;
