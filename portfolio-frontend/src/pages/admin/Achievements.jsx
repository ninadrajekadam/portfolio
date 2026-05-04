import { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import { faPencil, faPlus, faTrashCan, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { toast } from "react-toastify";
import Search from "./Search";

const Achievements = () => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	// toast.configure();

	return (
		<>
			<div className="heading-btn-wrapper">
				<div className="heading-wrapper">
					<div className="heading-icon">
						<FontAwesomeIcon icon={faTrophy} />
					</div>
					<div className="heading">
						<h2 className="layout-heading">Achievements</h2>
					</div>
				</div>
				<Button className="btn-primary-custom add-btn" onClick={handleShow}><FontAwesomeIcon icon={faPlus} /> Add Achievements</Button>
			</div>
			<div className="table-wrapper">
				<Search placeholder="Search Experience..." />
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
						<tr>
							<td>1</td>
							<td>Award</td>
							<td>AnalyticsFox</td>
							<td>2019</td>
							<td>
								<Button className="btn-primary-custom"><FontAwesomeIcon icon={faPencil} /></Button>
								<span className="px-2"></span>
								<Button className="btn-danger-custom"><FontAwesomeIcon icon={faTrashCan} /></Button>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
			<Modal show={show} centered className="custom-modal">
				<Modal.Header closeButton>
					<Modal.Title>Add Experience</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Job Role</Form.Label>
							<Form.Control type="text" name="role" placeholder="Enter job role" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Company Name</Form.Label>
							<Form.Control type="text" name="company" placeholder="Enter company name" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Joining Date</Form.Label>
							<Form.Control type="date" name="joiningDate" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Exit Date</Form.Label>
							<Form.Control type="date" name="exitDate" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Check type="checkbox" id="present-checkbox" name="present" label="Present" />
						</Form.Group>
						<Form.Group>
							<Form.Label>Responsibilities (one per line)</Form.Label>
							<Form.Control as="textarea" rows={7} name="responsibilities" placeholder="Enter each responsibility in new line" />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary">Cancel</Button>
					<Button className="btn-primary-custom">Save Experience</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default Achievements;