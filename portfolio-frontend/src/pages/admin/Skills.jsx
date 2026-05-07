import { useState, useEffect } from "react";
import { Button, Modal, Table, Form, Pagination } from "react-bootstrap";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight, faCode, faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileDropzone from "../../components/FileDropzone";
import { toast } from "react-toastify";
import Search from "./Search";
import { addSkill, deleteSkill, getSkills, updateSkill } from "../../app/api";

const BASE_URL = "http://localhost:5000";

const Skills = () => {
  const [show, setShow] = useState(false);
  const [skills, setSkills] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    proficiency: "",
  });

  const fetchSkills = async () => {
    try {
      const res = await getSkills();
      setSkills(res.data || res);
    } catch (err) {
      toast.error(err.message);
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

    setPreviewImage(null);
    setExistingImage("");
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
    } catch (err) {
      toast.error(isEdit ? err.message || "Failed to update skill" : err.message || "Failed to add skill");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);
			toast.success("Skill deleted successfully!");
			fetchSkills();
		} catch (err) {
			toast.error(err.message || "Failed to delete skill");
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
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

    setExistingImage(item.skillImage);
    setPreviewImage(null);

    setShow(true);
  };

  const filteredSkills = skills.filter((item) => {
    const query = searchQuery.toLowerCase();

    return (
      item.skillName?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      String(item.proficiency)?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const currentPageSafe = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const indexOfLastSkill = currentPageSafe * itemsPerPage;
  const indexOfFirstSkill = indexOfLastSkill - itemsPerPage;
  const currentSkills = filteredSkills.slice(indexOfFirstSkill, indexOfLastSkill);

  return (
    <>
      <div className="heading-btn-wrapper">
        <div className="heading-wrapper">
          <div className="heading-icon"><FontAwesomeIcon icon={faCode} /></div>
          <div className="heading"><h2 className="layout-heading">Tech Stacks</h2></div>
        </div>
        <Button className="btn-primary-custom add-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add</Button>
      </div>
      <div className="table-wrapper">
        <Search placeholder="Search Skills..." onSearch={handleSearch} />
        <Table responsive>
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
							currentSkills?.length > 0 ? (
								currentSkills.map((item, index) => (
									<tr key={item._id}>
										<td>{index + 1 + indexOfFirstSkill}</td>
										<td><img src={`${BASE_URL}${item.skillImage}`} alt={item.skillName} className={`skill-img ${item.skillName === "ExpressJs" ? "filter" : ""}`} />{" "}{item.skillName}</td>
										<td>{item.category}</td>
										<td>{item.proficiency}%</td>
										<td>
											<Button className="btn-primary-custom" onClick={() => handleEdit(item)}><FontAwesomeIcon icon={faPencil} /></Button>
											<span className="px-1"></span>
											<Button className="btn-danger-custom" onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrashCan} /></Button>
										</td>
									</tr>
								))
							) : (
								<tr><td colSpan="5" className="text-center">Skills not available</td></tr>
							)
						}
          </tbody>
        </Table>
        {
          totalPages > 1 && (
            <Pagination className="justify-content-center">
              <Pagination.First disabled={currentPageSafe === 1} onClick={() => setCurrentPage(1)}><FontAwesomeIcon icon={faAnglesLeft} /></Pagination.First>
              <Pagination.Prev disabled={currentPageSafe === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}><FontAwesomeIcon icon={faAngleLeft} /></Pagination.Prev>
              {
                Array.from({ length: totalPages }, (_, idx) => (
                  <Pagination.Item key={idx + 1} active={currentPageSafe === idx + 1} onClick={() => setCurrentPage(idx + 1)}>
                    {idx + 1}
                  </Pagination.Item>
                ))
              }
              <Pagination.Next disabled={currentPageSafe === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}><FontAwesomeIcon icon={faAngleRight} /></Pagination.Next>
              <Pagination.Last disabled={currentPageSafe === totalPages} onClick={() => setCurrentPage(totalPages)}><FontAwesomeIcon icon={faAnglesRight} /></Pagination.Last>
            </Pagination>
          )
        }
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
              <FileDropzone label="Drop Skill Image" accept={{ "image/*": [] }} preview={previewImage ? previewImage : existingImage ? `${BASE_URL}${existingImage}` : null}
                onFileSelect={(file) => {
                  setFormData({ ...formData, image: file });
                  setPreviewImage(URL.createObjectURL(file));
                }}
              />
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
                <option value="15">Beginner</option>
                <option value="50">Intermediate</option>
                <option value="75">Advanced</option>
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