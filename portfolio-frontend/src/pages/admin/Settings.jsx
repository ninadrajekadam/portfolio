import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { faDownload, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileDropzone from "../../components/FileDropzone";
import { getProfile, updateProfile } from "../../app/api";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000";

const Settings = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		role: "",
		about: ""
	});

	const [profileImage, setProfileImage] = useState(null);
	const [cvFile, setCvFile] = useState(null);

	const [previewImage, setPreviewImage] = useState(null);
	const [existingImage, setExistingImage] = useState("");
	const [existingCV, setExistingCV] = useState("");

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await getProfile();

				if (res) {
					setForm({
						name: res.name || "",
						email: res.email || "",
						role: res.role || "",
						about: res.about || ""
					});

					setExistingImage(res.profileImage);
					setExistingCV(res.cvFile);
				}
			} catch (err) {
				console.log("Profile load failed", err);
			}
		};

		fetchProfile();
	}, []);

	const saveProfileInfo = async (e) => {
		e.preventDefault();

		const data = new FormData();

		Object.keys(form).forEach((key) => {
			data.append(key, form[key]);
		});

		if (profileImage) data.append("profileImage", profileImage);
		if (cvFile) data.append("cvFile", cvFile);

		try {
			await updateProfile(data);

			toast.success("Profile updated successfully");

			const res = await getProfile();

			if (res) {
				setForm({
					name: res.name || "",
					email: res.email || "",
					role: res.role || "",
					about: res.about || ""
				});

				setExistingImage(res.profileImage);
				setExistingCV(res.cvFile);
			}

			setProfileImage(null);
			setCvFile(null);
			setPreviewImage(null);

		} catch (err) {
			toast.error(err.message || "Failed to save profile");
		}
	};

	return (
		<>
			<div className="heading-btn-wrapper">
				<div className="heading-wrapper">
					<div className="heading-icon">
						<FontAwesomeIcon icon={faGear} />
					</div>
					<div className="heading">
						<h2 className="layout-heading">Settings</h2>
					</div>
				</div>
			</div>
			<Row>
				<Col xl={6} lg={6} md={12} sm={12} xs={12}>
					<div className="setting-wrapper">
						<h3 className="title">Personal Information</h3>
						<div className="info-wrapper">
							<Form onSubmit={saveProfileInfo}>
								<Form.Group className="form-group profile-image">
									<Row>
										<Col xl={4} lg={4} md={12} sm={12} xs={12}>
											<img className="img" src={existingImage ? `${BASE_URL}/uploads/profile/${existingImage}` : null} alt="Profile Image" />
										</Col>
										<Col xl={8} lg={6} md={12} sm={12} xs={12}>
											<FileDropzone label="Drop Profile Image" accept={{ "image/*": [] }} preview={ previewImage ? previewImage : existingImage ? `${BASE_URL}/uploads/profile/${existingImage}` : "" }
												onFileSelect={(file) => {
													setProfileImage(file);
													setPreviewImage(URL.createObjectURL(file));
												}}
											/>
										</Col>
									</Row>
								</Form.Group>
								<Form.Group className="form-group">
									<Form.Control type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mb-3" />
								</Form.Group>
								<Form.Group className="form-group">
									<Form.Control type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value }) } className="mb-3" />
								</Form.Group>
								<Form.Group className="form-group">
									<Form.Control as="textarea" rows={6} placeholder="Enter about" value={form.about} onChange={(e) =>setForm({ ...form, about: e.target.value })} className="mb-3" />
								</Form.Group>
								<Form.Group className="form-group">
									<Form.Control type="text" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mb-3" />
								</Form.Group>
								<Form.Group className="form-group">
									<FileDropzone label="Drop CV (PDF)" accept={{ "application/pdf": [] }} preview={null} onFileSelect={(file) => setCvFile(file)} />
									{ cvFile && (<p className="mt-2">{cvFile.name}</p>) }
									{
										existingCV && !cvFile && (
											<a className="btn-primary-custom" href={`${BASE_URL}/uploads/pdf/${existingCV}`} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDownload}/> Download Current CV</a>
										)
									}
								</Form.Group>
								<Button type="submit" className="btn-primary-custom w-100 mt-2">Save Profile</Button>
							</Form>
						</div>
					</div>
				</Col>
				<Col xl={6} lg={6} md={12} sm={12} xs={12}>
					<div className="setting-wrapper">
						<h3 className="title">Change password</h3>
					</div>
				</Col>
			</Row>
		</>
	);
};
export default Settings;