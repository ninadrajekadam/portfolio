import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faInstagram, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard, faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import { faLocationArrow, faPhone } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/components/Contact.scss";
import { toast } from "react-toastify";
import { sendMessage, getProfile } from "../app/api";

const Contact = () => {
  const [info, setInfo] = useState({
    email: "",
    mobile: "",
    whatsapp: "",
    city: "",
    github: "",
    linkedin: "",
    facebook: "",
    instagram: ""
  })
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    email: "",
    message: "",
  });
	
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendMessage(formData);

			toast.success(formData.type === "feedback" ? "Thanks for your feedback" : "Message sent successfully");

      setFormData({
        type: "",
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
			err.message;
    }
  };

  useEffect(() => {
    getProfile().then((res) => {
      if (res) {
        setInfo({
          email: res.email || "",
          mobile: res.mobile || "",
          whatsapp: res.whatsapp || "",
          city: res.city || "",
          github: res.github || "",
          linkedin: res.email || "",
          facebook: res.email || "",
          instagram: res.email || ""
        });
      }
    });
  }, []);

  const contactInfo = [
    { icon: faPhone, text: `+91 ${info.mobile}`, url: `tel:+91${info.mobile}` },
    { icon: faWhatsapp, text: `+91 ${info.mobile}`, url: `${info.whatsapp}` },
    { icon: faEnvelopeOpen, text: `${info.email}`, url: `mailto:${info.email}` },
    { icon: faLocationArrow, text: `${info.city}`, url: "https://www.google.com/maps/place/Mumbai,+Maharashtra/@19.0760903,72.8777267,12z/data=!3m1!4b1!4m5!3m4!1s0x3be7c63f6c0f70a1:0x2c3e6b9c0ea5b4a0!8m2!3d19.0760903!4d72.8777267" },
    { icon: faGithub, text: "GitHub", url: `${info.github}` },
    { icon: faLinkedin, text: "LinkedIn", url: `${info.linkedin}` },
    { icon: faFacebook, text: "Facebook", url: `${info.facebook}` },
    { icon: faInstagram, text: "Instagram", url: `${info.instagram}` },
  ];

  return (
    <section className="contact-section" id="contact">
      <h3 className="section-title"><FontAwesomeIcon icon={faAddressCard} /> Get in Touch</h3>
      <div className="contact-wrapper">
        <Row>
          <Col xl={7} lg={9} md={12}>
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
          </Col>
          <Col xl={5} lg={3} md={12}>
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
          </Col>
        </Row>
      </div>
    </section>
  );
};
export default Contact;