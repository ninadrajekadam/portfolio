import { useRef, useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/components/Header.scss";

const sections = ["home", "about", "experience", "projects", "contact"];
const Header = ({ setHeaderHeight }) => {
  // const { theme, toggleTheme } = useState("light");
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
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar variant="light" expand="lg" fixed="top" className="navbar-glass" ref={headerRef}>
        <Container>
          <Navbar.Brand className="gradient-text fw-bold">Ninad Kadam</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-lg-center gap-lg-3">
              {
                sections.map((sec) => (
                  <Nav.Link key={sec} onClick={() => handleClick(`#${sec}`)} className={active === `#${sec}` ? "active" : ""}>
                    { sec.charAt(0).toUpperCase() + sec.slice(1) }
                  </Nav.Link>
                ))
              }
              <Button>Download CV <FontAwesomeIcon icon={faDownload} /></Button>
              {/* <Button className="theme-btn ms-lg-3" onClick={toggleTheme}>
                <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
              </Button> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;