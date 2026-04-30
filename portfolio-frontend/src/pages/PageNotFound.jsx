import { Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/pages/PageNotFound.scss";

const PageNotFound = () => {
	const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const redirectPath = isAdminRoute ? "/admin/dashboard" : "/";
  const buttonText = isAdminRoute ? "Back to Dashboard" : "Back to Home";


  return (
    <main className="pagenotfound">
      <section className="pagenotfound__card">
        <header className="pagenotfound__header">
          <div className="pagenotfound__icon"><FontAwesomeIcon icon={faTriangleExclamation} /></div>
          <h1 className="pagenotfound__code">404</h1>
          <h2 className="pagenotfound__title">Page Not Found</h2>
        </header>
        <p className="pagenotfound__desc">The page you are looking for doesn't exist or has been moved.</p>
        <nav className="pagenotfound__actions">
          <Link to={redirectPath} className="pagenotfound__link">
            <Button className="pagenotfound__btn">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="pagenotfound__btn-text">{buttonText}</span>
            </Button>
          </Link>
        </nav>
      </section>
    </main>
  );
};
export default PageNotFound;