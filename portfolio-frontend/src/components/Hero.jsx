import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../assets/scss/components/Hero.scss";
import heroImg from "../assets/images/ninad.png";

const Hero = ({ headerHeight }) => {
	return (
		<>
			<section id="home" className="hero-section" style={{ marginTop: `${headerHeight}px` }}>
				<Container>
					<Row className="align-items-center">
						<Col lg={6}>
							<p className="hero-subtitle">HELLO, I'M</p>
							<h1 className="hero-title gradient-text">Ninad Kadam</h1>
							<h2 className="hero-role typing">Senior Software Developer</h2>
							<p className="hero-desc">Results-driven Senior Software Developer with 6+ years of experience building scalable web applications and delivering high-quality UI solutions.</p>
							<div className="hero-actions">
								<Button className="btn-primary-custom">View My Work <FontAwesomeIcon icon={faArrowRight} /></Button>
								<Button className="btn-outline-custom">Download CV <FontAwesomeIcon icon={faDownload} /></Button>
							</div>
							<div className="hero-social">
								<a className="social-link" href="#"><FontAwesomeIcon icon={faGithub} /></a>
								<a className="social-link" href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
								<a className="social-link" href="#"><FontAwesomeIcon icon={faFacebook} /></a>
								<a className="social-link" href="#"><FontAwesomeIcon icon={faInstagram} /></a>
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
					<div className="scroll-indicator" onClick={() => {
						const next = document.getElementById("about");
						if (next) {
							window.scrollTo({ top: next.offsetTop - 80, behavior: "smooth" });
						}
					}}>
						<span></span>
					</div>
				</Container>
			</section>
		</>
	);
};
export default Hero;