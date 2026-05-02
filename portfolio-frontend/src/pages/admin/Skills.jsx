import { useState, useEffect } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { faCode, faFolderOpen, faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Search from "./Search";
import { addSkill, deleteSkill, getSkills, updateSkill } from "../../app/api";

const Skills = () => {
  const [show, setShow] = useState(false);
  const [skills, setSkills] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    proficiency: "",
  });

  const fetchSkills = async () => {
    try {
      const res = await getSkills();
      console.log("API Response:", res);
      setSkills(res.data || res);
    } catch (err) {
      console.log("Error fetching skills:", err);
      toast.error("Failed to load skills");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getSkills();
        setSkills(res.data || res);
      } catch (err) {
        toast.error(err);
      }
    })();
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleClose = () => {
		setShow(false);
		setIsEdit(false);
		setEditId(null);

		setFormData({
			name: "",
			image: "",
			category: "",
			proficiency: "",
		});
	};

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const value = e.target.name === "proficiency" ? Number.parseInt(e.target.value, 10) || "" : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async () => {
		try {
			const data = new FormData();
			data.append("skillName", formData.name);
			data.append("category", formData.category);
			data.append("proficiency", formData.proficiency);

			if (formData.image) {
				data.append("skillImage", formData.image);
			}

			if (isEdit) {
				await updateSkill(editId, data);
				toast.success("Skill updated successfully!");
			} else {
				await addSkill(data);
				toast.success("Skill added successfully!");
			}

			fetchSkills();
			handleClose();
			setIsEdit(false);
			setEditId(null);
		} catch (err) {
			console.log(err);
			toast.error(isEdit ? "Failed to update skill" : "Failed to add skill");
		}
	};

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);
			toast.success("Skill deleted successfully!");
			fetchSkills();
		} catch (err) {
			console.log(err);
			toast.error("Failed to delete skill");
    }
  };

  const handleSearch = (value) => {
    console.log(value);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setEditId(item._id);
    setFormData({
      name: item.skillName,
      image: "",
      category: item.category,
      proficiency: item.proficiency,
    });
    setShow(true);
  };

  return (
    <>
      <div className="heading-btn-wrapper">
        <div className="heading-wrapper">
          <div className="heading-icon"><FontAwesomeIcon icon={faCode} /></div>
          <div className="heading">
            <h2 className="layout-heading">Skills</h2>
            <p className="layout-desc">Skills in frontend, backend, and database development for web applications.</p>
          </div>
        </div>
        <Button className="btn-primary-custom add-btn" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlus} /> Add Skill
        </Button>
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
							skills?.length > 0 ? (
								skills.map((item, index) => (
									<tr key={item._id}>
										<td>{index + 1}</td>
										<td>

										<img src={`http://localhost:5000${item.skillImage}`} alt={item.skillName} className="skill-img"/>{" "}
											{item.skillName}
										</td>
										<td>{item.category}</td>
										<td>{item.proficiency}%</td>
										<td>
											<Button className="btn-primary-custom" onClick={() => handleEdit(item)}><FontAwesomeIcon icon={faPencil} /></Button>
											<span className="px-2"></span>
											<Button className="btn-danger-custom" onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrashCan} /></Button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="5" className="text-center">Skills not available</td>
								</tr>
							)
						}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton>
					<Modal.Title>{isEdit ? "Edit Skill" : "Add Skill"}</Modal.Title>
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
							{
								formData.image && (<div className="file-name">{ formData.image ? formData.image.name : "No file selected"}</div>)
							}
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
                <option value="10">Beginner</option>
                <option value="40">Intermediate</option>
                <option value="70">Advanced</option>
                <option value="100">Expert</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button className="btn-primary-custom" onClick={handleSubmit}>{isEdit ? "Update Skill" : "Save Skill"}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Skills;