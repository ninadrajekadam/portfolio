import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faArrowRight, faShield, faKey, faAt } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "../assets/scss/pages/Login.scss";

const Login = () => {
  return (
    <section className="login-section">
      <div className="login-box">
        <div className="login-left">
          <h2 className="brand">N <span className="name">Ninad Kadam</span></h2>
          <div className="welcome-text">
            <h1 className="welcome-title">Welcome <br /><span className="welcome-subtitle">Back!</span></h1>
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
            <Form>
              <Form.Group className="mb-3">
                <div className="input-group-custom">
                  <span className="input-group-icon"><FontAwesomeIcon icon={faAt} /></span>
                  <Form.Control type="email" placeholder="Enter your email" />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="input-group-custom">
                  <span className="input-group-icon"><FontAwesomeIcon icon={faKey} /></span>
                  <Form.Control type="password" placeholder="Enter your password" />
                  <span className="input-group-icon eye-icon"><FontAwesomeIcon icon={faEye} /></span>
                </div>
              </Form.Group>
              <Form.Group className="form-options">
                  <Form.Check type="checkbox" label="Remember me" />
                  <Button variant="link" className="btn-link-custom">Forgot password?</Button>
              </Form.Group>
              <Button className="btn-primary-custom btn-login w-100">Login <FontAwesomeIcon icon={faArrowRight} /></Button>
              <div className="divider">or continue with</div>
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
    </section>
  );
};
export default Login;