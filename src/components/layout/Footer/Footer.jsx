import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import footerLogo from '../../../assets/images/profile/Ninad_Kadam_Tech_Brand_logo.webp';
import "./Footer.scss";

const Footer = () => {
	const footerLinks = [
		{ icon: faGithub, url: "https://github.com/ninad-kadam", label: "GitHub profile" },
		{ icon: faLinkedin, url: "https://www.linkedin.com/in/ninad-kadam/", label: "LinkedIn profile" },
		{ icon: faEnvelope, url: "mailto:tech.ninadkadam@gmail.com", label: "Send email" },
	];
	return (
		<>
			<section className="footer">
				<Container>
					<Row className="footer__flex">
						<Col xl={3} lg={3} md={3} sm={6} xs={6} className="footer__logo">
							<img src={footerLogo} alt="Ninad Kadam" className="footer__logo-img" loading="lazy" decoding="async" />
						</Col>
						<Col xl={6} lg={6} md={6} sm={12} xs={12} className="footer__contents">
							<p className="footer__content">
								<FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} Ninad Kadam. All rights reserved.
							</p>
						</Col>
						<Col xl={3} lg={3} md={3} sm={6} xs={6} className="footer__social">
							<ul className="footer__social-list">
								{
									footerLinks.map((link, index) => (
										<li className="footer__social-item" key={index}>
											<a href={link.url} className="footer__social-link" aria-label={link.label}><FontAwesomeIcon icon={link.icon} aria-hidden="true" /></a>
										</li>
									))
								}
							</ul>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};
export default Footer;