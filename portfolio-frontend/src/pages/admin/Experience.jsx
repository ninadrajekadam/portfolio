import { useState, useEffect } from "react";
import { Button, Modal, Table, Form, Pagination } from "react-bootstrap";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight, faBriefcase, faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Search from "./Search";
import { addExperience, deleteExperience, getExperience, updateExperience } from "../../app/api";
import { calculateTotalExperience, calculateSingleExp } from "../../utils/totalExperiene";

const formatDateRange = (item) => {
  const { joiningDate, exitDate, duration } = item;

  if (joiningDate) {
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      if (isNaN(d.getTime())) return String(date);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    };

    const startDisplay = formatDate(joiningDate);
    if (!exitDate) {
      return `${startDisplay} - Present`;
    }

    const endDisplay = formatDate(exitDate);
    return `${startDisplay} - ${endDisplay}`;
  }

  if (duration) {
    if (!duration || typeof duration !== "string") return "";

    const parts = duration.split("-").map((part) => part.trim());
    if (parts.length < 2) return duration;

    const formatDatePart = (dateStr) => {
      if (dateStr.includes('-') && dateStr.split('-').length === 3) {
        const [year, month] = dateStr.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
      }
      return dateStr;
    };

    const startDisplay = formatDatePart(parts[0]);
    const endText = parts.slice(1).join("-").trim();

    if (!endText || endText.toLowerCase() === "present") {
      return `${startDisplay} - Present`;
    }

    const endDisplay = formatDatePart(endText);
    return `${startDisplay} - ${endDisplay}`;
  }

  return "No date information";
};

const Experience = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    joiningDate: "",
    exitDate: "",
    present: false,
    responsibilities: ""
  });

  const [experience, setExperience] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchExperience = async () => {
    try {
      const res = await getExperience();
      setExperience(res.data || []);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchExperience();
    })();
  }, []);

  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
    setEditId(null);
    setFormData({
      company: "",
      role: "",
      joiningDate: "",
      exitDate: "",
      present: false,
      responsibilities: ""
    });
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "present" && checked ? { exitDate: "" } : {})
    });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.company || !formData.role || !formData.joiningDate || !formData.responsibilities.length) {
        toast.error("Please fill out all fields and responsibilities");
        return;
      }

      const payload = {
        company: formData.company,
        role: formData.role,
        joiningDate: formData.joiningDate,
        exitDate: formData.present ? null : formData.exitDate,
        responsibilities: formData.responsibilities,
        totalExp: calculateSingleExp(formData.joiningDate, formData.present ? null : formData.exitDate),
      };

      if (isEdit) {
        await updateExperience(editId, payload);
        toast.success("Experience updated successfully!");
      } else {
        await addExperience(payload);
        toast.success("Experience added successfully!");
      }

      fetchExperience();
      handleClose();
    } catch (err) {
      toast.error(isEdit ? err.message || "Failed to update experience" : err.message || "Failed to add experience");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      toast.success("Experience deleted successfully!");
      fetchExperience();
    } catch (err) {
      toast.error(err.message || "Failed to delete experience");
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleEdit = (item) => {
    let joiningDate = "";
    let exitDate = "";
    let present = false;

    if (item.joiningDate) {
      joiningDate = item.joiningDate ? new Date(item.joiningDate).toISOString().split('T')[0] : "";
      exitDate = item.exitDate ? new Date(item.exitDate).toISOString().split('T')[0] : "";
      present = !item.exitDate;
    } else if (item.duration) {
      const duration = item.duration;
      if (duration && typeof duration === "string") {
        const parts = duration.split("-").map((part) => part.trim());
        if (parts.length >= 2) {
          const parseDate = (text) => {
            if (text.includes('-') && text.split('-').length === 3) {
              return text;
            }
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const [monthStr, yearStr] = text.split(' ');
            const monthIndex = monthNames.findIndex(m => m.toLowerCase() === monthStr.toLowerCase());
            if (monthIndex === -1 || !yearStr) return "";
            return `${yearStr}-${String(monthIndex + 1).padStart(2, '0')}-01`;
          };

          joiningDate = parseDate(parts[0]);
          const endText = parts.slice(1).join("-").trim();
          if (!endText || endText.toLowerCase() === "present") {
            present = true;
          } else {
            exitDate = parseDate(endText);
          }
        }
      }
    }

    setIsEdit(true);
    setEditId(item._id);
    setFormData({
      company: item.company,
      role: item.role,
      joiningDate,
      exitDate,
      present,
      responsibilities: item.responsibilities
    });
    setShow(true);
  };

  const filteredExperience = experience.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.company.toLowerCase().includes(query) ||
      item.role.toLowerCase().includes(query) ||
      formatDateRange(item).toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredExperience.length / itemsPerPage);
  const currentPageSafe = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const indexOfLastExperience = currentPageSafe * itemsPerPage;
  const indexOfFirstExperience = indexOfLastExperience - itemsPerPage;
  const currentExperience = filteredExperience.slice(indexOfFirstExperience, indexOfLastExperience);


  const totalExperience = calculateTotalExperience(experience).formatted;

  return (
    <>
      <div className="heading-btn-wrapper">
        <div className="heading-wrapper">
          <div className="heading-icon"><FontAwesomeIcon icon={faBriefcase} /></div>
          <div className="heading"><h2 className="layout-heading">Experience</h2></div>
        </div>
        <Button className="btn-primary-custom add-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add</Button>
      </div>
      <div className="table-wrapper">
        <Search placeholder="Search Experience..." onSearch={handleSearch} />
        <Table responsive className="custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Role</th>
              <th>Company Name</th>
              <th>Start - End</th>
              <th>Total Exp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              currentExperience.length > 0 && currentExperience.map((item, index) => (
                <tr key={item._id || item.id}>
                  <td>{index + 1 + indexOfFirstExperience}</td>
                  <td>{item.role}</td>
                  <td>{item.company}</td>
                  <td>{formatDateRange(item)}</td>
                  <td>{calculateSingleExp(item.joiningDate, item.exitDate)}</td>
                  <td>
                    <Button className="btn-primary-custom" onClick={() => handleEdit(item)}><FontAwesomeIcon icon={faPencil} /></Button>
                    <span className="px-2"></span>
                    <Button className="btn-danger-custom" onClick={() => handleDelete(item._id || item.id)}><FontAwesomeIcon icon={faTrashCan} /></Button>
                  </td>
                </tr>
              ))
            }
            {
              filteredExperience.length > 0 && (
                <tr>
                  <td colSpan="4" className="text-end"><strong>Total Experience:</strong></td>
                  <td><strong>{totalExperience} yrs</strong></td>
                  <td></td>
                </tr>
              )
            }
            {
              filteredExperience.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">Experience not available</td>
                </tr>
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
          <Modal.Title>{isEdit ? "Edit Experience" : "Add Experience"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Job Role</Form.Label>
              <Form.Control type="text" name="role" placeholder="Enter job role" value={formData.role} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" name="company" placeholder="Enter company name" value={formData.company} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
            </Form.Group>
            {
              !formData.present && (
                <Form.Group className="mb-3">
                  <Form.Label>Exit Date</Form.Label>
                  <Form.Control type="date" name="exitDate" value={formData.exitDate} onChange={handleChange} disabled={formData.present} />
                </Form.Group>
              )
            }
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" id="present-checkbox" name="present" label="Present" checked={formData.present} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Responsibilities</Form.Label>
              <Form.Control as="textarea" rows={7} name="responsibilities" placeholder="Enter each responsibility in new line" value={formData.responsibilities} onChange={handleChange} />
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