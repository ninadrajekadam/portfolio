import { useEffect, useState } from "react";
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
import { incrementProfileView } from "../app/api";

const Home = () => {
	const [headerHeight, setHeaderHeight] = useState(0);

	 useEffect(() => {
    incrementProfileView();
  }, []);

	return (
		<>
			<Header setHeaderHeight={setHeaderHeight} />
      <Hero headerHeight={headerHeight} />
			<Container className="main-content">
				<Row>
					<Col xl={5} lg={12} md={12} sm={12} xs={12}>
						<div className="home-box" id="about"><About /></div>
					</Col>
					<Col xl={7} lg={12} md={12} sm={12} xs={12}>
						<div className="home-box" id="skills"><Skills /></div>
					</Col>
				</Row>
				<Row>
					<Col xl={5} lg={12} md={12} sm={12} xs={12}>
						<div className="home-box" id="experience"><Experience /></div>
					</Col>
					<Col xl={7} lg={12} md={12} sm={12} xs={12}>
						<div className="home-box" id="projects"><Projects /></div>
					</Col>
				</Row>
				<Row>
					<Col xl={12} lg={12} md={12} sm={12} xs={12}>
						<div className="home-box" id="contact"><Contact /></div>
					</Col>
				</Row>
			</Container>
			<Footer />
		</>
	);
};
export default Home; 