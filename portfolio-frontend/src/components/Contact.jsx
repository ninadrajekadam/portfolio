import { Row, Col, Form, Button } from "react-bootstrap";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/Contact.scss";

const Contact = () => {
	return (
		<>
			<section className="contact-section" id="contact">
					<h3 className="section-title"><FontAwesomeIcon icon={faAddressCard} /> Get in Touch</h3>
					<div className="contact-wrapper">
						<Row className="contact-divider">
							<Col xl={6} lg={3} md={12} sm={12} xs={12}>
								<div className="map-wrapper">
									<iframe src="https://www.google.com/maps?q=Mumbai&output=embed" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Map"></iframe>
								</div>
							</Col>
							<Col xl={6} lg={9} md={12} sm={12} xs={12}>
								<Form className="contact-form">
									<Row>
										<Col lg={12}>
											<Form.Group className="form-group" controlId="contactRadio">
												<Form.Check inline label="Feedback" name="feedMsg" type="radio" required />
												<Form.Check inline label="Message" name="feedMsg" type="radio" required />
											</Form.Group>
										</Col>
										<Col lg={6}>
											<Form.Group className="form-group" controlId="contactName">
												<Form.Control type="text" placeholder="Enter your name" required />
											</Form.Group>
										</Col>
										<Col lg={6}>
											<Form.Group className="form-group" controlId="contactEmail">
												<Form.Control type="email" placeholder="Enter your email" required />
											</Form.Group>
										</Col>
										<Col lg={12}>
											<Form.Group className="form-group" controlId="contactMessage">
												<Form.Control as="textarea" rows={3} placeholder="Enter your message / feedback" required  />
											</Form.Group>
										</Col>
										<Col lg={12}>
											<Form.Group className="form-group">
												<Button type="submit" className="btn-primary-custom w-100">Submit</Button>
											</Form.Group>
										</Col>
									</Row>
								</Form>
							</Col>
						</Row>
					</div>
			</section>
		</>
	);
};
export default Contact; 