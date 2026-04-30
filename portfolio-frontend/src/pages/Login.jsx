import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faArrowRight, faShield, faKey, faAt, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { login,setAuthToken } from "../app/api";
import "../assets/scss/pages/Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    let newErrors = {};
    const { email, password } = values;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&]).+$/.test(password)
    ) {
      newErrors.password = "Must include uppercase, lowercase, number & special character";
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationErrors = validate({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      setLoading(true);

      const data = await login(email, password);
      const token = data.token || data?.data?.token;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));

      setAuthToken(token);

      toast.success("Login successful 🚀");
      navigate("/admin/dashboard");

    } catch (err) {
      const message = err?.message || "Invalid email or password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <>
      <section className="login-section">
        <div className="login-box">
          <div className="login-left">
            <div className="welcome-text">
              <h2 className="brand">N <span className="name">Ninad Kadam</span></h2>
              <h1 className="welcome-title">Welcome <span className="welcome-subtitle">Back!</span></h1>
              <p className="welcome-desc">Sign in to continue to your dashboard and manage your projects seamlessly.</p>
            </div>
            <div className="security-note">
              <span className="icon"><FontAwesomeIcon icon={faShield} /></span>
              <div>
                <h3 className="note-title">Secure. Fast. Reliable.</h3>
                <p className="note-desc">Your data is always protected with top-notch security.</p>
              </div>
            </div>
          </div>
          <div className="login-right">
            <div className="form-wrapper">
              <h3 className="form-title">Login</h3>
              <p className="subtitle">Glad to see you again! Please login to your account.</p>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <div className={`input-group-custom ${errors.email && touched.email ? "error" : ""}`}>
                    <div className="input-group-icon"><FontAwesomeIcon icon={faAt} /></div>
                    <Form.Control type="email" placeholder="Enter your email" name="email" onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);
                      const newErrors = validate({ email: value, password });
                      setErrors(newErrors);
                    }} onBlur={() => handleBlur("email")} isInvalid={errors.email && touched.email} required />
                  </div>
                  { errors.email && touched.email && (<div className="error-text">{errors.email}</div>) }
                </Form.Group>
                <Form.Group className="mb-3">
                  <div className={`input-group-custom ${errors.password && touched.password ? "error" : ""}`}>
                    <div className="input-group-icon"><FontAwesomeIcon icon={faKey} /></div>
                    <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter your password" name="password" onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                      const newErrors = validate({ email, password: value });
                      setErrors(newErrors);
                    }} onBlur={() => handleBlur("password")} isInvalid={errors.password && touched.password} required />
                    <div className="input-group-icon eye-icon" onClick={() => setShowPassword(!showPassword)}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></div>
                  </div>
                  { errors.password && touched.password && (<div className="error-text">{errors.password}</div>) }
                </Form.Group>
                <Form.Group className="form-options justify-content-end">
                  <Button variant="link" className="btn-link-custom" onClick={() => setShowModal(true)}>Forgot password?</Button>
                </Form.Group>
                <Button type="submit" className="btn-primary-custom btn-login w-100" disabled={loading}>
                  { loading ? (<><FontAwesomeIcon icon={faSpinner} spin className="me-2" /> Logging in...</>) : (<>Login <FontAwesomeIcon icon={faArrowRight} /></>) }
                </Button>
                <div className="login-divider">or continue with</div>
                <div className="social-login">
                  <Button variant="outline-custom social-login-icon"><FontAwesomeIcon icon={faGoogle} /></Button>
                  <Button variant="outline-custom social-login-icon"><FontAwesomeIcon icon={faGithub} /></Button>
                  <Button variant="outline-custom social-login-icon"><FontAwesomeIcon icon={faLinkedinIn} /></Button>
                </div>
                <p className="signup">Don't have an account? <span>Sign up</span></p>
              </Form>
            </div>
          </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-3">Enter your email to receive password reset link.</p>
            <Form.Group>
              <Form.Control type="email" placeholder="Enter your email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button className="btn-primary-custom"
              onClick={() => {
                console.log("Send reset link to:", resetEmail);
                setShowModal(false);
              }}>Send Link</Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};
export default Login;