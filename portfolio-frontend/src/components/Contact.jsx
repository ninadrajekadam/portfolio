import { Row, Col, Form, Button } from "react-bootstrap";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/Contact.scss";

const Contact = () => {
	return (
		<>
			<section className="contact-section">
					<h3 className="section-title"><FontAwesomeIcon icon={faAddressCard} /> Get in Touch</h3>
					<div className="contact-wrapper">
						<Row className="contact-divider">
							<Col xl={6} lg={3} md={3} sm={12} xs={12}>
								<div className="map-wrapper">
									<iframe src="https://www.google.com/maps?q=Mumbai&output=embed" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Map"></iframe>
								</div>
							</Col>
							<Col xl={6} lg={9} md={9} sm={12} xs={12}>
								<Form>
									<Form.Group className="mb-2" controlId="contactRadio">
										<Form.Check inline label="Feedback" name="feedMsg" type="radio" required />
										<Form.Check inline label="Message" name="feedMsg" type="radio" required />
									</Form.Group>
									<Row>
										<Col>
											<Form.Group className="mb-3" controlId="contactName">
												<Form.Control type="text" placeholder="Enter your name" required />
											</Form.Group>
										</Col>
										<Col>
											<Form.Group className="mb-3" controlId="contactEmail">
												<Form.Control type="email" placeholder="Enter your email" required />
											</Form.Group>
										</Col>
									</Row>
									<Form.Group className="mb-3" controlId="contactMessage">
										<Form.Control as="textarea" rows={3} placeholder="Enter your message / feedback" required  />
									</Form.Group>
									<Form.Group>
										<Button type="submit" className="btn-primary-custom w-100">Submit</Button>
									</Form.Group>
								</Form>
							</Col>
						</Row>
					</div>
			</section>
		</>
	);
};
export default Contact;