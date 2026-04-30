import { Navbar, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

const AdminTopbar = ({ collapsed, setCollapsed, setShowSidebar }) => {
  const username = JSON.parse(localStorage.getItem("user")).name;

  return (
    <Navbar className="admin-topbar">
      <Container fluid className="admin-topbar__container">
        <div className="admin-topbar__left">
          <Button className="admin-topbar__toggle" onClick={() => setCollapsed(!collapsed)}><FontAwesomeIcon icon={faBars} /></Button>
          <Button className="admin-topbar__mobile-toggle" onClick={() => setShowSidebar(true)}><FontAwesomeIcon icon={faBars} /></Button>
          <span className="admin-topbar__title">{ `Welcome, ${username}` }</span>
        </div>
        <div className="admin-topbar__right">
          <div className="admin-topbar__profile">
            <FontAwesomeIcon icon={faUser} /><span className="admin-topbar__name">Admin</span>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};
export default AdminTopbar;