import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body"
import {Container, Row, Col} from "reactstrap";

function Home() {
    return (
        <>
            <Header />
            <Content />
            <Footer />
        </>
       );
    }

function Content() {
    return (
        <Container style={{marginTop: "20px", maxWidth: "800px"}}>
            <Row>
                <Col>

                </Col>
            </Row>
        </Container>
    );
}

    export default Home;