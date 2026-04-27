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
						<Col>
							<p className="footer-text">Designed & Developed by <span className="footer-name">Ninad Kadam</span></p>
						</Col>
						<Col className="text-center">
							<FontAwesomeIcon icon={faCopyright} /> {year} <span className="footer-name">Ninad Kadam</span>. All Rights Reserved.
						</Col>
						<Col>
							<div className="footer-social">
								<a className="social-link" href="#"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
								<a className="social-link" href="#"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
								<a className="social-link" href="#"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
								<a className="social-link" href="#"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
							</div>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
};
export default Footer;