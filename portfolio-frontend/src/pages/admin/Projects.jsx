import { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { faCode, faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "./Search";

const Projects = () => {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    companyName: "",
    usedSkills: "",
    description: "",
  });

  const [projects, setProjects] = useState([
    {
      id: 1,
      projectName: "SkillSignal",
      companyName: "AnalyticsFox Softwares Pvt Ltd",
      usedSkills: [ "React", "Node", "MongoDB" ],
      description: "Developed a construction safety and compliance platform that streamlines worker onboarding and certification tracking.",
    },
  ]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
		const newProject = {
			id: projects.length + 1,
			projectName: formData.projectName,
			companyName: formData.companyName,
			usedSkills: formData.usedSkills.split(",").map((skill) => skill.trim()).filter((skill) => skill !== ""),
			description: formData.description,
		};

		setProjects([...projects, newProject]);

		setFormData({
			projectName: "",
			companyName: "",
			usedSkills: "",
			description: "",
		});

		setShow(false);
	};

  const handleDelete = (id) => {
    setProjects(projects.filter((item) => item.id !== id));
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="heading-btn-wrapper">
        <div className="heading-wrapper">
          <div className="heading-icon"><FontAwesomeIcon icon={faCode} /></div>
          <div className="heading">
            <h2 className="layout-heading">Projects</h2>
            <p className="layout-desc">Real-world projects focused on UI development, performance, and usability.</p>
          </div>
        </div>
        <Button className="btn-primary-custom add-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add Project</Button>
      </div>
      <div className="table-wrapper">
        <Search placeholder="Search Projects..." onSearch={handleSearch} />
        <Table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Company Name</th>
              <th>Used Skills</th>
              <th className="project-description">Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
							projects.map((item, index) => (
								<tr key={item.id}>
									<td>{ index + 1 }</td>
									<td>{ item.projectName }</td>
									<td>{ item.companyName }</td>
									<td>{item.usedSkills?.join(", ")}</td>
									<td>{ item.description }</td>
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
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Enter project name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter company name"/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Used Skills</Form.Label>
              <Form.Control type="text" name="usedSkills" value={formData.usedSkills} onChange={handleChange} placeholder="e.g. React, Node, MongoDB" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} placeholder="Enter project description" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button className="btn-primary-custom" onClick={handleSubmit}>Save Project</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Projects;