import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faInstagram, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard, faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { faLocationArrow, faPhone } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/components/Contact.scss";

const Contact = () => {
  const contactInfo = [
    { icon: faPhone, text: "+91 9167470545", url: "tel:+919167470545" },
    { icon: faWhatsapp, text: "+91 9167470545", url: "https://wa.me/919167470545" },
    { icon: faEnvelopeOpen, text: "tech.ninadkadam@gmail.com", url: "mailto:tech.ninadkadam@gmail.com" },
    { icon: faLocationArrow, text: "Mumbai, Maharashtra, India", url: "https://www.google.com/maps/place/Mumbai,+Maharashtra/@19.0760903,72.8777267,12z/data=!3m1!4b1!4m5!3m4!1s0x3be7c63f6c0f70a1:0x2c3e6b9c0ea5b4a0!8m2!3d19.0760903!4d72.8777267" },
    { icon: faGithub, text: "GitHub", url: "https://github.com/ninadrajekadam" },
    { icon: faLinkedin, text: "LinkedIn", url: "https://in.linkedin.com/in/ninadrajekadam" },
    { icon: faFacebook, text: "Facebook", url: "https://www.facebook.com/ninadrajekadam/" },
    { icon: faInstagram, text: "Instagram", url: "https://www.instagram.com/ninadrajekadam/" },
  ];

  return (
    <section className="contact-section" id="contact">
      <h3 className="section-title"><FontAwesomeIcon icon={faAddressCard} /> Get in Touch</h3>
      <div className="contact-wrapper">
        <Row>
          {/* <Col xl={6} lg={6} md={12}>
            <Form className="contact-form" onSubmit={handleSubmit}>
              <Row>
                <Col lg={12}>
                  <Form.Group className="form-check-group">
                    <Form.Check inline label="Feedback" id="feedback" name="contactType" type="radio" value="feedback" checked={formData.type === "feedback"} onChange={() =>setFormData((prev) => ({ ...prev, type: "feedback" }))} />
                    <Form.Check inline label="Message" id="message" name="contactType" type="radio" value="message" checked={formData.type === "message"} onChange={() =>setFormData((prev) => ({ ...prev, type: "message" }))} />
                  </Form.Group>
                </Col>
                <Col lg={6}>
									<Form.Group className="form-group">
                  	<Form.Control type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
									</Form.Group>
                </Col>
                <Col lg={6}>
									<Form.Group className="form-group">
                  	<Form.Control type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
									</Form.Group>
                </Col>
                <Col lg={12}>
									<Form.Group className="form-group">
                  	<Form.Control as="textarea" rows={3} name="message" placeholder="Enter your message / feedback" value={formData.message} onChange={handleChange} required />
									</Form.Group>
                </Col>
                <Col lg={12}>
									<Form.Group className="form-group">
                  	<Button type="submit" className="btn-primary-custom w-100">Submit</Button>
									</Form.Group>
                </Col>
              </Row>
            </Form>
          </Col> */}
          {/* <Col xl={6} lg={6} md={12}>
            <div className="contact-info">
              {
                contactInfo && contactInfo.map((item, index) => (
                  <a href={item.url} className="info-item" target="_blank" key={index}>
                    <div className="info-icon">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <p className="info-text">{item.text}</p>
                  </a>
                ))
              }
            </div>
          </Col> */}
          {
            contactInfo && contactInfo.map((item, index) => (
              <Col xl={3} lg={3} md={12} key={index}>
                <div className="contact-info">
                  <a href={item.url} className="info-item" target="_blank" key={index}>
                    <div className="info-icon">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <p className="info-text">{item.text}</p>
                  </a>
                </div>
              </Col>
            ))
          }
        </Row>
      </div>
    </section>
  );
};
export default Contact;