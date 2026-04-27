import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../assets/scss/components/Hero.scss";
import heroImg from "../assets/images/ninad.png";
import cv from "../assets/files/Ninad Kadam CV.pdf";

const Hero = ({ headerHeight }) => {
	return (
		<>
			<section id="home" className="hero-section" style={{ marginTop: `${headerHeight}px` }}>
				<Container>
					<div className="hero-text">
						<h4 className="name">NINAD KADAM</h4>
						<p className="role">Senior Software Developer</p>
					</div>
					<Row className="align-items-center">
						<Col lg={6}>
							<p className="hero-subtitle">HELLO, I'M</p>
							<h1 className="hero-title gradient-text">Ninad Kadam</h1>
							<h2 className="hero-role typing">Senior Software Developer</h2>
							<p className="hero-desc">Results-driven Senior Software Developer with 6+ years of experience building scalable web applications and delivering high-quality UI solutions.</p>
							<div className="hero-actions">
								<Link to={cv} target="_blank" className="btn-primary-custom">Download CV <FontAwesomeIcon icon={faDownload} /></Link>
							</div>
							<div className="hero-social">
								<a className="social-link" href="#"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
								<a className="social-link" href="#"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
								<a className="social-link" href="#"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
								<a className="social-link" href="#"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
							</div>
						</Col>
						<Col lg={6} className="hero-image-wrapper">
							<img src={heroImg} alt="hero" className="hero-img" />
							<div className="experience-badge">
								<span className="exp-number">6+</span>
								<span className="exp-text">Years of Experience</span>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};
export default Hero;