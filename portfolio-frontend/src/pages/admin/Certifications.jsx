import { useState, useEffect } from "react";
import { Button, Modal, Table, Form, Pagination } from "react-bootstrap";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight, faAward, faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCertifications, addCertification, updateCertification, deleteCertification } from "../../app/api";
import { toast } from "react-toastify";
import Search from "./Search";

const Certification = () => {
  const [certifications, setCertifications] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    certificateName: "",
    instituteName: "",
    date: "",
    grade: ""
  });

	const loadCertifications = async () => {
		try {
			const res = await getCertifications();
			setCertifications(res.data || []);
		} catch (err) {
			toast.error(err.message || "Failed to load certifications");
		}
	};

  useEffect(() => {
		let isMounted = true;

		const init = async () => {
			setLoading(true);
			const res = await getCertifications();

			if (isMounted) {
				setCertifications(res.data || []);
				setLoading(false);
			}
		};

		init();

		return () => {
			isMounted = false;
		};
	}, []);

  const filteredData = (certifications || []).filter((item) =>
    item.certificateName?.toLowerCase().includes(search.toLowerCase()) ||
    item.instituteName?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentPageSafe = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const indexOfLastCertification = currentPageSafe * itemsPerPage;
  const indexOfFirstCertification = indexOfLastCertification - itemsPerPage;
  const currentCertifications = filteredData.slice(indexOfFirstCertification, indexOfLastCertification);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      if (!formData.certificateName || !formData.instituteName || !formData.date) {
        setSaving(false);
        return toast.error("Please fill required fields");
      }

      if (editId) {
        await updateCertification(editId, formData);
        toast.success("Updated successfully");
      } else {
        await addCertification(formData);
        toast.success("Added successfully");
      }

      handleClose();
			await loadCertifications();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      certificateName: item.certificateName || "",
      instituteName: item.instituteName || "",
      date: item.date || "",
      grade: item.grade || "",
    });
    setEditId(item._id);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCertification(id);
      toast.success("Deleted successfully");
			await loadCertifications();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setFormData({
      certificateName: "",
      instituteName: "",
      date: "",
      grade: ""
    });
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="heading-btn-wrapper">
        <div className="heading-wrapper">
          <div className="heading-icon"><FontAwesomeIcon icon={faAward} /></div>
          <div className="heading"><h2 className="layout-heading">Certifications</h2></div>
        </div>
        <Button className="btn-primary-custom add-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add</Button>
      </div>
      <div className="table-wrapper">
        <Search placeholder="Search Certificate..." onChange={(e) => setSearch(e.target.value)} />
        <Table responsive className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Certificate Name</th>
              <th>Institute Name</th>
              <th>Date</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
							loading ? (
								<tr><td colSpan="6" className="text-center">Loading...</td></tr>
							) : filteredData.length === 0 ? (
								<tr><td colSpan="6" className="text-center">Certificates not available</td></tr>
							) : (
								currentCertifications.map((item, index) => (
									<tr key={item._id}>
										<td>{index + 1 + indexOfFirstCertification}</td>
										<td>{item.certificateName}</td>
										<td>{item.instituteName}</td>
										<td>{item.date}</td>
										<td>{item.grade}</td>
										<td>
											<Button className="btn-primary-custom" onClick={() => handleEdit(item)}><FontAwesomeIcon icon={faPencil} /></Button>
											<span className="px-2"></span>
											<Button className="btn-danger-custom" onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrashCan} /></Button>
										</td>
									</tr>
								))
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
          <Modal.Title>{editId ? "Edit Certificate" : "Add Certificate"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Certification Name</Form.Label>
              <Form.Control type="text" name="certificateName" value={formData.certificateName} onChange={handleChange} placeholder="Enter certificate name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Institute Name</Form.Label>
              <Form.Control type="text" name="instituteName" value={formData.instituteName} onChange={handleChange} placeholder="Enter institute name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Select name="date" value={formData.date} onChange={handleChange}>
                <option value="">Select Year</option>
                {
									Array.from({ length: 50 }, (_, i) => {
										const year = new Date().getFullYear() - i;
										return (<option key={year} value={year}>{year}</option>);
									})
								}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control type="text" name="grade" value={formData.grade} onChange={handleChange} placeholder="Enter grade" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button className="btn-primary-custom" onClick={handleSubmit} disabled={saving}>{saving ? "Saving..." : editId ? "Update" : "Save"}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Certification;