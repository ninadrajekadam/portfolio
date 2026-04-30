import { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { faCode, faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "./Search";

const Experience = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    duration: "",
    responsibilities: "",
  });

  const [experience, setExperience] = useState([
    {
      id: 1,
      company: "Idealake Information Technologies Pvt Ltd",
      role: "Senior Software Developer",
      duration: "Jun 2024 - Present",
      responsibilities: [
        "Builds responsive, high-performance UIs using modern frontend technologies.",
        "Leads frontend architecture and mentors developers.",
        "Develops scalable web applications with optimized performance.",
      ],
    },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
	};

  const handleSubmit = () => {
    const newExp = { id: experience.length + 1, ...formData, responsibilities: formData.responsibilities.split("\n").filter((item) => item.trim() !== "") };

    setExperience([...experience, newExp]);

    setFormData({
      company: "",
      role: "",
      duration: "",
      responsibilities: "",
    });

    setShow(false);
  };

  const handleDelete = (id) => {
    setExperience(experience.filter((item) => item.id !== id));
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="heading-btn-wrapper">
        <div className="heading-wrapper">
          <div className="heading-icon">
            <FontAwesomeIcon icon={faCode} />
          </div>
          <div className="heading">
            <h2 className="layout-heading">Experience</h2>
            <p className="layout-desc">Professional experience in building scalable and responsive web applications.</p>
          </div>
        </div>
        <Button className="btn-primary-custom add-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add Experience</Button>
      </div>
      <div className="table-wrapper">
        <Search placeholder="Search Experience..." onSearch={handleSearch} />
        <Table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Company Name</th>
              <th>Job Role</th>
              <th>Duration</th>
              <th>Responsibilities</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experience.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.company}</td>
                <td>{item.role}</td>
                <td>{item.duration}</td>
                <td className="experience-resp">
                  <ol className="responsibility-list">
                    { item.responsibilities.map((res, i) => (<li key={i} className="list-item">{res}</li>)) }
                  </ol>
                </td>
                <td>
                  <Button className="btn-primary-custom"><FontAwesomeIcon icon={faPencil} /></Button>
                  <span className="px-2"></span>
                  <Button className="btn-danger-custom" onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrashCan} /></Button>
                </td>
              </tr>
            ))
						}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" name="company" placeholder="Enter company name" value={formData.company} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Role</Form.Label>
              <Form.Control type="text" name="role" placeholder="Enter job role" value={formData.role} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control type="text" name="duration" placeholder="e.g. Jun 2024 - Present" value={formData.duration} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Responsibilities (one per line)</Form.Label>
              <Form.Control as="textarea" rows={4} name="responsibilities" placeholder="Enter each responsibility in new line" value={formData.responsibilities} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button className="btn-primary-custom" onClick={handleSubmit}>Save Experience</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Experience;