import { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { faCode, faFolderOpen, faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "./Search";

const Skills = () => {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    proficiency: "",
  });

  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "HTML5",
      image: "https://img.icons8.com/color/48/000000/html-5.png",
      category: "Frontend",
      proficiency: "Expert",
    },
  ]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		setFormData({ ...formData, image: file });
	};

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
		const newSkill = { id: skills.length + 1, ...formData, image: formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image };

		setSkills([...skills, newSkill]);

		setFormData({
			name: "",
			image: "",
			category: "",
			proficiency: "",
		});

		setShow(false);
	};

  const handleDelete = (id) => {
    setSkills(skills.filter((item) => item.id !== id));
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
            <h2 className="layout-heading">Skills</h2>
            <p className="layout-desc">Skills in frontend, backend, and database development for web applications.</p>
          </div>
        </div>
        <Button className="btn-primary-custom add-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add Skill</Button>
      </div>
      <div className="table-wrapper">
        <Search placeholder="Search Skills..." onSearch={handleSearch} />

        <Table className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Skills</th>
              <th>Category</th>
              <th>Proficiency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
							skills.map((item, index) => (
								<tr key={item.id}>
									<td>{index + 1}</td>
									<td><img src={item.image} alt={item.name} className="skill-img" /> {item.name}</td>
									<td>{item.category}</td>
									<td>{item.proficiency}</td>
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
          <Modal.Title>Add Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Skill Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter skill name" value={formData.name} onChange={handleChange} />
            </Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Skill Image</Form.Label>
							<div className="file-upload">
								<input type="file" name="image" accept="image/*" id="skillImageUpload" onChange={handleImageChange} />
								<label htmlFor="skillImageUpload" className="file-upload__label">
									<FontAwesomeIcon icon={faFolderOpen} className="file-upload__icon" />
									<span>Upload Image</span>
								</label>
							</div>
						</Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Proficiency</Form.Label>
              <Form.Select name="proficiency" value={formData.proficiency} onChange={handleChange}>
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button className="btn-primary-custom" onClick={handleSubmit}>Save Skill</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Skills;