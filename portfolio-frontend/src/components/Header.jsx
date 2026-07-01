import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "../assets/scss/components/Header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ setHeaderHeight }) => {
  const [active, setActive] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", target: "home", to: "/" },
    { name: "About", target: "about", to: "/" },
    { name: "Skills", target: "skills", to: "/" },
    { name: "Experience", target: "experience", to: "/" },
    { name: "Projects", target: "projects", to: "/" },
    { name: "Contact", target: "contact", to: "/" },
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      const headerElement = document.querySelector(".navbar-glass");
      const offset = (headerElement?.offsetHeight || 80) + 10;
      const top = section.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
      return true;
    }

    return false;
  };

  const handleClick = (e, item) => {
    e.preventDefault();

    if (item.name === "Home") {
      if (location.pathname === "/") {
        scrollToSection("home");
        setActive("home");
        window.history.pushState(null, "", "/");
      } else {
        navigate("/");
      }
      return;
    }

    if (location.pathname === "/") {
      if (scrollToSection(item.target)) {
        setActive(item.target);
        window.history.pushState(null, "", `/#${item.target}`);
      }
      return;
    }

    navigate(`/`, { state: { scrollTo: item.target } });
  };

  useEffect(() => {
    const updateHeight = () => {
      const headerElement = document.querySelector(".navbar-glass");
      if (headerElement) setHeaderHeight(headerElement.offsetHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [setHeaderHeight]);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const sectionId = hash || "home";
      if (document.getElementById(sectionId)) {
        requestAnimationFrame(() => {
          scrollToSection(sectionId);
          setActive(sectionId);
        });
      }
      return;
    }

    if (location.pathname === "/") {
      requestAnimationFrame(() => setActive("home"));
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Navbar variant="dark" expand="lg" fixed="top" className="navbar-glass">
        <Container>
          <Navbar.Brand as={Link} to="/" className="gradient-text fw-bold">Ninad Kadam</Navbar.Brand>
          <Navbar.Toggle aria-controls="menu" />
          <Navbar.Collapse id="menu">
            <Nav className="ms-auto">
              {
                navItems && navItems.map((item, index) => (
                  <Nav.Link
                    key={index}
                    as={Link}
                    to={item.to}
                    onClick={(event) => handleClick(event, item)}
                    className={`${
                      active === item.target ? "active" : ""
                    }`}
                  >
                    {item.name}
                  </Nav.Link>
                ))
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;