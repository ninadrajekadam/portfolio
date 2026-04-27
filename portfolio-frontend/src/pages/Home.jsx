import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../assets/scss/pages/Home.scss";

const Home = () => {
	const [headerHeight, setHeaderHeight] = useState(0);

	return (
		<>
			<Header setHeaderHeight={setHeaderHeight} />
      <Hero headerHeight={headerHeight} />
			<Container>
				<div className="home-box">
					<Row className="divider">
						<Col xl={5} lg={5} md={5} sm={12} xs={12}><About /></Col>
						<Col xl={7} lg={7} md={7} sm={12} xs={12}><Skills /></Col>
					</Row>
				</div>
				<div className="home-box">
					<Row className="divider">
						<Col xl={5} lg={5} md={5} sm={12} xs={12}><Experience /></Col>
						<Col xl={7} lg={7} md={7} sm={12} xs={12}><Projects /></Col>
					</Row>
				</div>
				<div className="home-box">
					<Row>
						<Col xl={12} lg={12} md={12} sm={12} xs={12}><Contact /></Col>
					</Row>
				</div>
			</Container>
			<Footer />
		</>
	);
};
export default Home;