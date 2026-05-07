import { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight, faEnvelope, faEnvelopeOpen, faPaperPlane, faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Search from "./Search";
import { getMessages, markAsRead, deleteMessage, replyToMessage } from "../../app/api";

const Messages = () => {
	const [allMessages, setAllMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [show, setShow] = useState(false);
	const [selectedMessageId, setSelectedMessageId] = useState(null);
	const [replyText, setReplyText] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const totalPages = Math.ceil(allMessages.length / itemsPerPage);
	const currentPageSafe = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
	const indexOfLastMessage = currentPageSafe * itemsPerPage;
	const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
	const currentMessages = allMessages.slice(indexOfFirstMessage, indexOfLastMessage);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				setLoading(true);
				const res = await getMessages();
				setAllMessages(res);
				setLoading(false);
			} catch (err) {
				toast.error(err.message || "Error fetching messages");
			} finally {
				setLoading(false);
			}
		};

		fetchMessages();
	}, []);

	const handleMarkAsRead = async (id) => {
		try {
			await markAsRead(id);

			setAllMessages((prev) =>
				prev.map((msg) =>
					msg._id === id ? { ...msg, isRead: true } : msg
				)
			);
		} catch (err) {
			toast.error(err.message || "Failed to update");
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteMessage(id);

			setAllMessages((prev) =>
				prev.filter((msg) => msg._id !== id)
			);

			if (currentMessages.length === 1 && currentPage > 1) {
				setCurrentPage(currentPage - 1);
			}

			toast.success("Message deleted successfully");
		} catch (err) {
			toast.error(err.message || "Failed to delete message");
		}
	};

	const handleReplyOpen = (id) => {
		setSelectedMessageId(id);
		setShow(true);
		handleMarkAsRead(id);
	};

	const handleClose = () => {
		setShow(false);
		setReplyText("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await replyToMessage(selectedMessageId, replyText);

			setAllMessages((prev) =>
				prev.map((msg) =>
					msg._id === selectedMessageId ? { ...msg, reply: replyText, repliedAt: new Date() } : msg
				)
			);

			toast.success("Reply sent successfully");
			handleClose();
		} catch (err) {
			toast.error(err.message || "Failed to send reply");
		}
	};

	return (
		<>
			<div className="heading-btn-wrapper">
				<div className="heading-wrapper">
					<div className="heading-icon">
						<FontAwesomeIcon icon={faEnvelope} />
					</div>
					<div className="heading">
						<h2 className="layout-heading">Messages</h2>
					</div>
				</div>
			</div>
			<div className="table-wrapper">
				<Search placeholder="Search Messages..." />
				<Table responsive className="custom-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Date</th>
							<th>Sender Name</th>
							<th>Sender Email</th>
							<th>Type</th>
							<th>Message/ Feedback</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							loading ? (
								<tr>
									<td colSpan="7" className="text-center py-4">
										Loading...
									</td>
								</tr>
							) : currentMessages.length > 0 ? (
								currentMessages.map((message, index) => (
									<tr key={message._id || index}>
								<td>{index + 1 + indexOfFirstMessage}</td>
										<td>{new Date(message.createdAt).toLocaleString()}</td>
										<td>{message.name}</td>
										<td>{message.email}</td>
										<td className="text-capitalize">{message.type}</td>
										<td>{message.message}</td>
										<td>
											<Button className="btn-primary-custom"onClick={() => handleReplyOpen(message._id)}><FontAwesomeIcon icon={faReply} /></Button>
											<span className="px-1"></span>
											<Button className="btn-warning" onClick={() => handleMarkAsRead(message._id)} disabled={message.isRead}><FontAwesomeIcon icon={message.isRead ? faEnvelopeOpen : faEnvelope} /></Button>
											<span className="px-1"></span>
											<Button className="btn-danger-custom" onClick={() => handleDelete(message._id)}><FontAwesomeIcon icon={faTrash} /></Button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="7" className="text-center">Messages not available</td>
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
					<Modal.Title>Reply Message</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Reply</Form.Label>
							<Form.Control as="textarea" rows={3} placeholder="Enter your reply" value={replyText} onChange={(e) => setReplyText(e.target.value)} required />
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>Cancel</Button>
						<Button type="submit" className="btn-primary-custom">Send <FontAwesomeIcon icon={faPaperPlane} /></Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};
export default Messages;