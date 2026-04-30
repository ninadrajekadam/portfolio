import { useRef, useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../assets/scss/components/Header.scss";
import { Link } from "react-router-dom";

const sections = ["home", "about", "skills","experience", "projects", "contact"];
const Header = ({ setHeaderHeight }) => {
	const [active, setActive] = useState("#home");
  const headerRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [setHeaderHeight]);

	useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id) => {
    setActive(id);

    const section = document.querySelector(id);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset - 30;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar variant="light" expand="lg" fixed="top" className="navbar-glass" ref={headerRef}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="gradient-text fw-bold">Ninad Kadam</Navbar.Brand>
          <Navbar.Toggle aria-controls="portfolioNavbar" />
          <Navbar.Collapse id="portfolioNavbar">
            <Nav className="ms-auto align-items-lg-center gap-lg-3">
              {
                sections.map((sec) => (
                  <Nav.Link key={sec} onClick={() => handleClick(`#${sec}`)} className={active === `#${sec}` ? "active" : ""}>
                    { sec.charAt(0).toUpperCase() + sec.slice(1) }
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