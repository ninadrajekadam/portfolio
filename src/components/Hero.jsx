import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../assets/scss/components/Hero.scss";
import cv from "../assets/images/Ninad-Kadam-CV.pdf";
import profile from "../assets/images/ninad-kadam.png";
import totalExperience from "../utils/totalExperience.js";

const Hero = ({ headerHeight }) => {
	return (
		<>
			<section className="hero-section" style={{ marginTop: `${headerHeight}px` }} id="home">
				<Container>
					<div className="hero-text">
						<h1 className="name">NINAD KADAM</h1>
						<h2 className="role">Senior Software Developer</h2>
					</div>
					<Row className="align-items-center">
						<Col xl={6} lg={6} md={6} sm={6} xs={12}>
							<p className="hero-subtitle">HELLO, I'M</p>
							<h1 className="hero-title gradient-text">NINAD KADAM</h1>
							<h2 className="hero-role typing">Senior Software Developer</h2>
							<p className="hero-desc">Results-driven Senior Software Developer with {totalExperience.formatted} years of experience building scalable web applications and delivering high-quality UI solutions.</p>
							<div className="hero-actions">
								<a href={cv} rel="noreferrer" className="btn-primary-custom" download>Download CV <FontAwesomeIcon icon={faDownload} /></a>
							</div>
							<div className="hero-social">
								<a className="social-link" href="https://github.com/ninadrajekadam" target="_blank"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
								<a className="social-link" href="https://in.linkedin.com/in/ninadrajekadam" target="_blank"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
								<a className="social-link" href="https://www.facebook.com/ninadrajekadam/" target="_blank"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
								<a className="social-link" href="https://www.instagram.com/ninadrajekadam/" target="_blank"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
							</div>
						</Col>
						<Col xl={6} lg={6} md={6} sm={6} xs={12} className="hero-image-wrapper">
							<img src={profile} alt="hero" className="hero-img" />
							<div className="experience-badge">
								<span className="exp-number">{totalExperience.formatted}</span>
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