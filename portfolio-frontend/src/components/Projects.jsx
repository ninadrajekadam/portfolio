import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getProjects } from "../app/api";
import "../assets/scss/components/Projects.scss";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Projects = () => {
	const [zoomImage, setZoomImage] = useState(null);
	const [showTooltip, setShowTooltip] = useState(false);
	const [projects, setProjects] = useState([]);
		
	useEffect(() => {
		const fetchAllData = async () => {
			try {
				const [projectsRes] = await Promise.all([
					getProjects()
				]);
				setProjects(projectsRes?.data || []);
			} catch (err) {
				err.message
			}
		};

		fetchAllData();
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setShowTooltip(window.innerWidth <= 1366 && window.innerWidth >= 786);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (zoomImage) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "auto";

		return () => document.body.style.overflow = "auto";
	}, [zoomImage]);

	return (
		<>
			<section className="projects-section">
				<div className="title-wrapper">
					<h3 className="section-title"><FontAwesomeIcon icon={faFolderClosed} /> Projects</h3>
					{ projects.length > 5 && (<Button as={Link} to="/projects" className="btn-link-arrow view-all mt-2">View All <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Button>) }
				</div>
				<div className="projects-list">
					{
						projects && projects.slice(0, 5).map((project, index) => (
							<div className="project-item" key={index}>
								<div className="project-image">
									<img src={`${BASE_URL}/uploads/${project.image}`} alt={project.projectName} onClick={() => setZoomImage(`${BASE_URL}/uploads/${project.image}`)} style={{ cursor: "zoom-in" }} />
								</div>
								<div className="project-details">
									{
										project.projectUrl ? (
											<Link to={project.projectUrl} className="project-title" target="_blank" rel="noopener noreferrer">
												{project.projectName} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
												{ project.projectStatus === "Completed" && (<span className="project-status completed"></span>) }
												{ project.projectStatus === "Ongoing" && (<span className="project-status ongoing"></span>) }
											</Link>
										) : (
											<>
												<span className="project-title">{project.projectName}</span>
												{ project.projectStatus === "Completed" && (<span className="project-status completed"></span>) }
												{ project.projectStatus === "Ongoing" && (<span className="project-status ongoing"></span>) }
											</>
										)
									}
									<div className="project-stack">
										{ project.usedSkills.map((tech, techIndex) => (<span className="stack-item" key={techIndex}>{tech}</span>)) }
									</div>
									<div className="project-description-wrapper">
										<p className="project-description">{project.description}</p>
										{ showTooltip && (<span className="tooltip-text">{project.description}</span>) }
									</div>
								</div>
							</div>
						))
					}
				</div>
				{ zoomImage && (<div className="image-zoom-overlay" onClick={() => setZoomImage(null)}><img src={zoomImage} alt="Zoomed Project" /></div>) }
			</section>
		</>
	);
};
export default Projects; 