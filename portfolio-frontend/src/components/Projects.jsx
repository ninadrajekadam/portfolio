import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const Projects = () => {
	return (
		<>
			<section className="projects-section">
				<div className="title-wrapper">
					<h3 className="section-title"><FontAwesomeIcon icon={faFolderClosed} /> Projects</h3>
					<Button className="btn-link-arrow">View All Projects <FontAwesomeIcon icon={faArrowRight} /></Button>
				</div>
			</section>
		</>
	);
};
export default Projects;