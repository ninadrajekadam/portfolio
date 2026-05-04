import { useState, useEffect } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { faFolder, faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileDropzone from "../../components/FileDropzone";
import { toast } from "react-toastify";
import Search from "./Search";
import { addProject, deleteProject, getProjects, updateProject } from "../../app/api";

const BASE_URL = "http://localhost:5000";
const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const Projects = () => {
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [projectImage, setProjectImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
	const [existingImage, setExistingImage] = useState("");

  const [formData, setFormData] = useState({
    projectName: "",
    companyName: "",
    usedSkills: "",
    description: "",
    projectUrl: ""
  });

  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchProjects();
    })();
  }, []);

  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
    setEditId(null);

    setFormData({
      projectName: "",
      companyName: "",
      usedSkills: "",
      description: "",
      projectUrl: "",
    });

    setProjectImage(null);
    setPreviewImage(null);
    setExistingImage("");
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (
        !formData.projectName ||
        !formData.companyName ||
        !formData.description ||
        !formData.usedSkills
      ) {
        toast.error("Please fill out all fields");
        return;
      }

      if (formData.projectUrl && !isValidURL(formData.projectUrl)) {
        toast.error("Please enter a valid project URL");
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("projectName", formData.projectName);
      formDataToSend.append("companyName", formData.companyName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("usedSkills", formData.usedSkills);

      if (formData.projectUrl) {
        formDataToSend.append("projectUrl", formData.projectUrl);
      }

      if (projectImage) {
        formDataToSend.append("projectImage", projectImage);
      }

      if (isEdit) {
        await updateProject(editId, formDataToSend);
        toast.success("Project updated successfully!");
      } else {
        await addProject(formDataToSend);
        toast.success("Project added successfully!");
      }

      fetchProjects();
      handleClose();
    } catch (err) {
      toast.error(err.message || (isEdit ? "Failed to update project" : "Failed to add project"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete project");
    }
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setEditId(item._id);

    setFormData({
      projectName: item.projectName,
      companyName: item.companyName,
      usedSkills: item.usedSkills.join(", "),
      description: item.description,
      projectUrl: item.projectUrl || ""
    });
    
    setExistingImage(item.image);
    setPreviewImage(null);
    setShow(true);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredProjects = projects.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.projectName.toLowerCase().includes(query) ||
      item.companyName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.usedSkills.some(skill => skill.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <div className="heading-btn-wrapper">
        <div className="heading-wrapper">
          <div className="heading-icon"><FontAwesomeIcon icon={faFolder} /></div>
          <div className="heading">
            <h2 className="layout-heading">Projects</h2>
            <p className="layout-desc">Real-world projects focused on UI development, performance, and usability.</p>
          </div>
        </div>
        <Button className="btn-primary-custom add-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add Project</Button>
      </div>
      <div className="table-wrapper">
        <Search placeholder="Search Projects..." onSearch={handleSearch} />
        <Table className="custom-table" responsive>
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
							filteredProjects.length > 0 ? (
								filteredProjects.map((item, index) => (
									<tr key={item._id || item.id}>
										<td>{ index + 1 }</td>
										<td>{ item.projectName }</td>
										<td>{ item.companyName }</td>
										<td>{ item.usedSkills?.join(", ") }</td>
										<td>{ item.description }</td>
										<td>
											<Button className="btn-primary-custom" onClick={() => handleEdit(item)}><FontAwesomeIcon icon={faPencil} /></Button>
											<span className="px-2"></span>
											<Button className="btn-danger-custom" onClick={() => handleDelete(item._id || item.id)}><FontAwesomeIcon icon={faTrashCan} /></Button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="6" className="text-center">Project not available</td>
								</tr>
							)
						}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Project" : "Add Project"}</Modal.Title>
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
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} placeholder="Enter project description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project URL</Form.Label>
              <Form.Control type="text" name="projectUrl" value={formData.projectUrl} onChange={handleChange} placeholder="https://your-project-link.com" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project Screenshot</Form.Label>
              <FileDropzone label="Drop Project Image" accept={{ "image/*": [] }} preview={ previewImage ? previewImage : existingImage ? `${BASE_URL}/${existingImage}` : null }
                onFileSelect={(file) => {
                  setProjectImage(file);
                  setPreviewImage(URL.createObjectURL(file));
                }}
              />
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