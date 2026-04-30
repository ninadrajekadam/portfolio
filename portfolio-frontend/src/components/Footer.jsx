import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import "../assets/scss/components/Footer.scss";
import { faFacebook, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<>
			<footer className="footer">
				<Container>
					<Row className="align-items-center">
						<Col xl={4} lg={4} md={12} sm={12} xs={12}>
							<p className="footer-text">Designed & Developed by <span className="footer-name">Ninad Kadam</span></p>
						</Col>
						<Col xl={4} lg={4} md={12} sm={12} xs={12} className="footer-rights">
							<FontAwesomeIcon icon={faCopyright} /> {year} <span className="footer-name">Ninad Kadam</span>. All Rights Reserved.
						</Col>
						<Col xl={4} lg={4} md={12} sm={12} xs={12}>
							<div className="footer-social">
								<a className="social-link" href="https://github.com/ninadrajekadam" target="_blank"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
								<a className="social-link" href="https://in.linkedin.com/in/ninadrajekadam" target="_blank"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
								<a className="social-link" href="https://www.facebook.com/ninadrajekadam/" target="_blank"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
								<a className="social-link" href="https://www.instagram.com/ninadrajekadam/" target="_blank"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
							</div>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
};
export default Footer; 