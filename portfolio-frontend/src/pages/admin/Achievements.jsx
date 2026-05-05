import { useState, useEffect } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { faPencil, faPlus, faTrashCan, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAchievements, addAchievement, updateAchievement, deleteAchievement } from "../../app/api";
import { toast } from "react-toastify";
import Search from "./Search";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    achievement: "",
    companyName: "",
    year: ""
  });

  const loadAchievements = async () => {
    try {
      const res = await getAchievements();
      setAchievements(res.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load achievements");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        setLoading(true);
        const res = await getAchievements();

        if (isMounted) {
          setAchievements(res.data || []);
        }
      } catch (err) {
        toast.error(err.message || "Failed to load achievements");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredData = (achievements || []).filter((item) =>
    item.achievement?.toLowerCase().includes(search.toLowerCase()) ||
    item.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);

      if (!formData.achievement || !formData.companyName || !formData.year) {
        setSaving(false);
        return toast.error("Please fill required fields");
      }

      if (editId) {
        await updateAchievement(editId, formData);
        toast.success("Updated successfully");
      } else {
        await addAchievement(formData);
        toast.success("Added successfully");
      }

      handleClose();
      await loadAchievements();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      achievement: item.achievement || "",
      companyName: item.companyName || "",
      year: item.year || "",
    });
    setEditId(item._id);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAchievement(id);
      toast.success("Deleted successfully");
      await loadAchievements();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setFormData({
      achievement: "",
      companyName: "",
      year: ""
    });
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="heading-btn-wrapper">
        <div className="heading-wrapper">
          <div className="heading-icon"><FontAwesomeIcon icon={faTrophy} /></div>
          <div className="heading"><h2 className="layout-heading">Achievements</h2></div>
        </div>
        <Button className="btn-primary-custom add-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add</Button>
      </div>
      <div className="table-wrapper">
        <Search placeholder="Search Achievement..." onChange={(e) => setSearch(e.target.value)} />
        <Table responsive className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Achievement</th>
              <th>Company Name</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
							loading ? (
								<tr><td colSpan="5" className="text-center">Loading...</td></tr>
							) : filteredData.length === 0 ? (
								<tr><td colSpan="5" className="text-center">Achievement not available</td></tr>
							) : (
								filteredData.map((item, index) => (
									<tr key={item._id}>
										<td>{index + 1}</td>
										<td>{item.achievement}</td>
										<td>{item.companyName}</td>
										<td>{item.year}</td>
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
      </div>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Achievement" : "Add Achievement"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Achievement</Form.Label>
              <Form.Control type="text" name="achievement" value={formData.achievement} onChange={handleChange} placeholder="Enter achievement" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter company name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Select name="year" value={formData.year} onChange={handleChange}>
                <option value="">Select Year</option>
                {
									Array.from({ length: 50 }, (_, i) => {
										const year = new Date().getFullYear() - i;
										return (<option key={year} value={year}>{year}</option>);
									})
								}
              </Form.Select>
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
export default Achievements;