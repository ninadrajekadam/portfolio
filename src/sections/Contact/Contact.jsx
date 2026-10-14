import { Col, Container, Row } from "react-bootstrap";
import "./Contact.scss";
import hero from "../../assets/images/code-laptop-icon.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocation } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
	return (
		<>
			<section className="contact">
				<Container>
					<div className="section-heading">
						<h2 className="section-title">Let's Build Something Great Together</h2>
						<p className="section-description">Have a product, platform, or engineering challange?</p>
						<p className="section-description">I'm intrested in building scalable, accessible and high-performance web applications.</p>
					</div>
					<Row className="contact__flex">
						<Col xl={9} lg={9} md={12} sm={12} xs={12} className="contact__flex-item">
							<div className="contact__grid">
								<div className="contact__grid-item">
									<div className="icon"><FontAwesomeIcon icon={faLinkedin} /></div>
									<div className="info">
										<h3 className="info-title">LinkedIn</h3>
										<a className="info-text" href="https://www.linkedin.com/in/ninad-kadam/" target="_blank" rel="noopener noreferrer">linkedin.com/in/ninad-kadam/</a>
									</div>
								</div>
								<div className="contact__grid-item">
									<div className="icon"><FontAwesomeIcon icon={faGithub} /></div>
									<div className="info">
										<h3 className="info-title">GitHub</h3>
										<a className="info-text" href="https://github.com/ninad-kadam" target="_blank" rel="noopener noreferrer">github.com/ninad-kadam</a>
									</div>
								</div>
								<div className="contact__grid-item">
									<div className="icon"><FontAwesomeIcon icon={faEnvelope} /></div>
									<div className="info">
										<h3 className="info-title">Email</h3>
										<a className="info-text" href="mailto:tech.ninadkadam@gmail.com">tech.ninadkadam@gmail.com</a>
									</div>
								</div>
								<div className="contact__grid-item">
									<div className="icon"><FontAwesomeIcon icon={faLocation} /></div>
									<div className="info">
										<h3 className="info-title">Location</h3>
										<p className="info-text">Mumbai, Maharashtra, India</p>
									</div>
								</div>
							</div>
						</Col>
						<Col xl={3} lg={3} md={12} sm={12} xs={12} className="contact__flex-item">
							<img className="contact__image" src={hero} alt="Laptop displaying code" loading="lazy" decoding="async" />
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};
export default Contact;