import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { faDownload, faEye, faEyeSlash, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileDropzone from "../../components/FileDropzone";
import { getProfile, updateProfile, changePassword } from "../../app/api";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Settings = () => {
	const [form, setForm] = useState({ 
		name: "", 
		role: "", 
		email: "", 
		mobile: "", 
		whatsapp: "", 
		city: "", 
		github: "", 
		linkedin: "", 
		facebook: "", 
		instagram: "", 
		about: "" 
	});
	
	const [passwordForm, setPasswordForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	});
	
	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false
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
						role: res.role || "",
						email: res.email || "",
						mobile: res.mobile || "",
						whatsapp: res.whatsapp || "",
						city: res.city || "",
						github: res.github || "",
						linkedin: res.linkedin || "",
						facebook: res.facebook || "",
						instagram: res.instagram || "",
						about: res.about || ""
					});

					setExistingImage(res.profileImage);
					setExistingCV(res.cvFile);
				}
			} catch (err) {
				toast.error(err.message || "Failed to load profile");
			}
		};

		fetchProfile();
	}, []);

	const saveProfileInfo = async (e) => {
		e.preventDefault();

		const data = new FormData();
		Object.keys(form).forEach((key) => data.append(key, form[key]));

		if (profileImage) data.append("profileImage", profileImage);
		if (cvFile) data.append("cvFile", cvFile);

		if (form.mobile && form.mobile.length !== 10) {
			return toast.error("Mobile number must be 10 digits");
		}

		try {
			await updateProfile(data);

			toast.success("Profile updated successfully");

			const res = await getProfile();

			if (res) {
				setForm({
					name: res.name || "",
					role: res.role || "",
					email: res.email || "",
					mobile: res.mobile || "",
					whatsapp: res.whatsapp || "",
					city: res.city || "",
					github: res.github || "",
					linkedin: res.linkedin || "",
					facebook: res.facebook || "",
					instagram: res.instagram || "",
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

	const handlePasswordChange = (e) => {
		setPasswordForm({
			...passwordForm,
			[e.target.name]: e.target.value
		});
	};

	const handleChangePasswordSubmit = async (e) => {
		e.preventDefault();

		const { currentPassword, newPassword, confirmPassword } = passwordForm;

		if (!currentPassword || !newPassword || !confirmPassword) {
			return toast.error("All fields are required");
		}

		if (newPassword !== confirmPassword) {
			return toast.error("Passwords do not match");
		}

		if (newPassword.length < 6) {
			return toast.error("Password must be at least 6 characters");
		}

		try {
			await changePassword(passwordForm);
			toast.success("Password changed successfully");

			setPasswordForm({
				currentPassword: "",
				newPassword: "",
				confirmPassword: ""
			});
		} catch (err) {
			toast.error(err.message);
		}
	};

	const togglePassword = (field) => {
		setShowPassword((prev) => ({
			...prev,
			[field]: !prev[field]
		}));
	};

	const getPasswordStrength = (password) => {
		let strength = 0;

		if (password.length >= 6) strength++;
		if (/[A-Z]/.test(password)) strength++;
		if (/[a-z]/.test(password)) strength++;
		if (/\d/.test(password)) strength++;
		if (/[@$!%*?&]/.test(password)) strength++;

		switch (strength) {
			case 0:
			case 1:
				return { label: "Weak", width: "25%", color: "red" };
			case 2:
			case 3:
				return { label: "Medium", width: "60%", color: "orange" };
			case 4:
			case 5:
				return { label: "Strong", width: "100%", color: "green" };
			default:
				return { label: "", width: "0%" };
		}
	};

	const strength = getPasswordStrength(passwordForm.newPassword);
	const isMatch = passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword;
	const isNotMatch = passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword;

	return (
		<>
			<div className="heading-btn-wrapper">
				<div className="heading-wrapper">
					<div className="heading-icon"><FontAwesomeIcon icon={faGear} /></div>
					<div className="heading"><h2 className="layout-heading">Settings</h2></div>
				</div>
			</div>
			<Row>
				<Col xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className="setting-wrapper">
						<h3 className="title">Personal Information</h3>
						<div className="info-wrapper">
							<Form onSubmit={saveProfileInfo}>
								<Form.Group className="form-group profile-image">
									<Row>
										<Col xl={4} lg={6} md={6} sm={6} xs={6}>
											<img className="img" src={existingImage ? `${BASE_URL}/uploads/profile/${existingImage}` : null} alt="Profile Image" />
										</Col>
										<Col xl={8} lg={6} md={6} sm={6} xs={6}>
											<FileDropzone label="Drop Profile Image" accept={{ "image/*": [] }} 
												preview={ previewImage ? previewImage : existingImage ? `${BASE_URL}/uploads/profile/${existingImage}` : "" }
												onFileSelect={(file) => {
													setProfileImage(file);
													setPreviewImage(URL.createObjectURL(file));
												}}
											/>
										</Col>
									</Row>
								</Form.Group>
								<Row>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
										</Form.Group>
									</Col>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="text" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value }) } />
										</Form.Group>
									</Col>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="text" placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value }) } />
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="text" placeholder="Mobile number" value={form.mobile} maxLength={10} onChange={(e) => {
												const value = e.target.value;
												if (/^\d*$/.test(value)) {
													setForm({ ...form, mobile: value });
												}
											}} />
										</Form.Group>
									</Col>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="url" placeholder="Whatsapp URL" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value }) } />
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="url" placeholder="Github" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value }) } />
										</Form.Group>
									</Col>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="url" placeholder="LinkedIn" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value }) } />
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="url" placeholder="Facebook" value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value }) } />
										</Form.Group>
									</Col>
									<Col xl={6} lg={6} md={6} sm={12} xs={12}>
										<Form.Group className="form-group">
											<Form.Control type="url" placeholder="Instagram" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value }) } />
										</Form.Group>
									</Col>
								</Row>
								<Form.Group className="form-group">
									<Form.Control as="textarea" rows={6} placeholder="Enter about" value={form.about} onChange={(e) =>setForm({ ...form, about: e.target.value })} />
								</Form.Group>
								<Form.Group className="form-group">
									<FileDropzone label="Drop CV (PDF)" accept={{ "application/pdf": [] }} preview={null} onFileSelect={(file) => setCvFile(file)} />
									{ cvFile && (<p className="mt-2">{cvFile.name}</p>) }
									{
										existingCV && !cvFile && (
											<a className="btn-primary-custom" href={`${BASE_URL}/uploads/pdf/${existingCV}`} target="_blank" rel="noreferrer">
												<FontAwesomeIcon icon={faDownload}/> View CV
											</a>
										)
									}
								</Form.Group>
								<Button type="submit" className="btn-primary-custom w-100 mt-2">Save Profile</Button>
							</Form>
						</div>
					</div>
				</Col>
				<Col xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className="setting-wrapper">
						<h3 className="title">Change Password</h3>
						<Form onSubmit={handleChangePasswordSubmit}>
							<Form.Group className="form-group">
								<InputGroup className="input-group-custom">
									<Form.Control type={showPassword.current ? "text" : "password"} name="currentPassword" placeholder="Enter your current password" value={passwordForm.currentPassword} onChange={handlePasswordChange} />
									<div className="input-group-icon" onClick={() => togglePassword("current")}>
										<FontAwesomeIcon icon={showPassword.current ? faEyeSlash : faEye} />
									</div>
								</InputGroup>
							</Form.Group>
							<Form.Group className="form-group">
								<InputGroup className="input-group-custom">
									<Form.Control type={showPassword.new ? "text" : "password"} name="newPassword" placeholder="Enter your new Password" value={passwordForm.newPassword} onChange={handlePasswordChange} />
									<div className="input-group-icon" onClick={() => togglePassword("new")}>
										<FontAwesomeIcon icon={showPassword.new ? faEyeSlash : faEye} />
									</div>
								</InputGroup>
								{
									passwordForm.newPassword && (
										<>
											<div style={{ width: strength.width, background: strength.color, height: 3,borderRadius: 3 }} />
											<small>{strength.label}</small>
										</>
									)
								}
							</Form.Group>
							<Form.Group className="form-group">
								<InputGroup className="input-group-custom">
									<Form.Control type={showPassword.confirm ? "text" : "password"} name="confirmPassword" placeholder="Enter your confirm new Password" value={passwordForm.confirmPassword} onChange={handlePasswordChange} style={{ borderColor: isNotMatch ? "red" : isMatch ? "green" : "" }} />
									<div className="input-group-icon" onClick={() => togglePassword("confirm")}>
										<FontAwesomeIcon icon={showPassword.confirm ? faEyeSlash : faEye} />
									</div>
								</InputGroup>
								{ passwordForm.confirmPassword && (<small style={{ color: isMatch ? "green" : "red" }}>{ isMatch ? "✅ Passwords match" : "❌ Passwords do not match" }</small>)}
							</Form.Group>
							<Button type="submit" className="btn-primary-custom w-100" disabled={strength.label !== "Strong" || !isMatch} >Change Password</Button>
						</Form>
					</div>
				</Col>
			</Row>
		</>
	);
};
export default Settings;