import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/pages/Login.scss";

const Login = () => {
  return (
    <section className="login-section">
      <Container>
        <div className="login-box">
          <Row>
            <Col lg={6} className="login-left">
              <div className="brand">N <span className="name">Ninad Kadam</span></div>
              <div className="welcome-text">
                <h1 className="welcome-title">Welcome <br /><span className="welcome-subtitle">Back!</span></h1>
                <p className="welcome-desc">Sign in to continue to your dashboard and manage your projects seamlessly.</p>
              </div>
              <div className="security-note">
                <span className="icon">🔒</span>
                <div>
                  <strong>Secure. Fast. Reliable.</strong>
                  <p>Your data is always protected.</p>
                </div>
              </div>
            </Col>
            <Col lg={6} className="login-right">
              <div className="form-wrapper">
                <h3>Login</h3>
                <p className="subtitle">Glad to see you again! Please login to your account.</p>
                <Form>
                  <Form.Group className="mb-3">
                    <div className="input-group-custom">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <Form.Control type="email" placeholder="Enter your email" />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <div className="input-group-custom">
                      <FontAwesomeIcon icon={faLock} />
                      <Form.Control type="password" placeholder="Enter your password" />
                      <FontAwesomeIcon icon={faEye} className="eye-icon" />
                    </div>
                  </Form.Group>
                  <div className="form-options">
                    <Form.Check type="checkbox" label="Remember me" />
                    <span className="forgot">Forgot password?</span>
                  </div>
                  <Button className="btn-login w-100">
                    Login <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                  <div className="divider">or continue with</div>
                  <div className="social-login">
                    <Button variant="outline-light">G</Button>
                    <Button variant="outline-light">Git</Button>
                    <Button variant="outline-light">in</Button>
                  </div>
                  <p className="signup">Don't have an account? <span>Sign up</span></p>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};
export default Login;