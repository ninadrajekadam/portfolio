import { useRef, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import "../assets/scss/components/Header.scss";
import { Link } from "react-router-dom";

const Header = ({ setHeaderHeight }) => {
  const headerRef = useRef(null);

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
      <Navbar variant="light" expand="lg" fixed="top" className="navbar-glass" ref={headerRef}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="gradient-text fw-bold">Ninad Kadam</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
export default Header; 