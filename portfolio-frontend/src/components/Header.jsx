import { useRef, useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "../assets/scss/components/Header.scss";
import { Link } from "react-router-dom";

const Header = ({ setHeaderHeight }) => {
  const headerRef = useRef(null);
  const [active, setActive] = useState("home");

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Experience", link: "#experience" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];

  const handleClick = (e) => {
    e.preventDefault();

    const link = e.currentTarget.getAttribute("data-link");
    if (!link) return;

    const section = document.querySelector(link);

    if (section) {
      const offset = headerRef.current?.offsetHeight || 80;
      const top = section.offsetTop - offset;

      window.scrollTo({ top, behavior: "smooth" });
      setActive(link.replace("#", ""));
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [setHeaderHeight]);

  return (
    <>
      <Navbar variant="dark" expand="lg" fixed="top" className="navbar-glass" ref={headerRef}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="gradient-text fw-bold">Ninad Kadam</Navbar.Brand>
          <Navbar.Toggle aria-controls="menu" />
          <Navbar.Collapse id="menu">
            <Nav className="ms-auto">
              {
                navItems && navItems.map((item, index) => (
                  <Nav.Link
                    key={index}
                    href={item.link}
                    data-link={item.link}
                    onClick={handleClick}
                    className={`nav-link ${
                      active === item.link.replace("#", "") ? "active" : ""
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