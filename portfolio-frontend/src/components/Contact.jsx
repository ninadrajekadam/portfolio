import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/Contact.scss";
import { toast } from "react-toastify";
import { sendMessage } from "../app/api";

const Contact = () => {
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
			toast.error(err.message);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h3 className="section-title"><FontAwesomeIcon icon={faAddressCard} /> Get in Touch</h3>
      <div className="contact-wrapper">
        <Row className="contact-divider">
          <Col xl={6} lg={3} md={12}>
            
          </Col>
          <Col xl={6} lg={9} md={12}>
            <Form className="contact-form" onSubmit={handleSubmit}>
              <Row>
                <Col lg={12}>
                  <Form.Group className="form-group">
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
        </Row>
      </div>
    </section>
  );
};
export default Contact;