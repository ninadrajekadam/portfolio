import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/components/Projects.scss";
import skillsignal from "../assets/images/project-thumbnails/skillsignal.png";
import ekosh from "../assets/images/project-thumbnails/ekosh-finance.jpg";
import inutrimon from "../assets/images/project-thumbnails/inutrimon.jpg";
import docmode from "../assets/images/project-thumbnails/docmode.jpg";
import docmodeSure from "../assets/images/project-thumbnails/docmode-sure.jpg";
import docmodeAide from "../assets/images/project-thumbnails/docmode-aide.jpg";
import axisBank from "../assets/images/project-thumbnails/axis-bank.jpg";
import ihhLogo from "../assets/images/project-thumbnails/ihh-logo.png";

const Projects = () => {
	const projects = [
		{
			title: "IHH Websites",
			image: ihhLogo,
			stack: ["HTML5", "SCSS", "JavaScript / jQuery", "Pug", "Grunt"],
			description: "SkillSignal is a construction-focused safety and compliance platform that helps organizations manage worker onboarding, certifications, and job-site safety through a centralized web and mobile application."
		},
		{
			title: "Axis Bank Website",
			image: axisBank,
			stack: ["HTML5", "SCSS", "JavaScript / jQuery", "Pug", "Grunt"],
			description: "SkillSignal is a construction-focused safety and compliance platform that helps organizations manage worker onboarding, certifications, and job-site safety through a centralized web and mobile application.",
			link: "https://www.axis.bank.in/"
		},
		{
			title: "SkillSignal",
			image: skillsignal,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "SkillSignal is a construction-focused safety and compliance platform that helps organizations manage worker onboarding, certifications, and job-site safety through a centralized web and mobile application.",
			link: "https://app.skillsignal.com/SkillSignal/authentication/login"
		},
		{
			title: "DocMode AIDE",
			image: docmodeAide,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "DocMode AIDE is a specialized module within the DocMode platform designed to enhance patient safety and compliance management.",
			link: "https://aide.docmode.org/"
		},
		{
			title: "DocMode SURE",
			image: docmodeSure,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "DocMode SURE is a specialized module within the DocMode platform designed to enhance patient safety and compliance management.",
			link: "https://sure.docmode.org/"
		},
		{
			title: "DocMode Website",
			image: docmode,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "DocMode is a comprehensive healthcare management platform that streamlines patient care and administrative tasks for medical professionals.",
			link: "https://docmode.com/"
		},
		{
			title: "iNutriMon",
			image: inutrimon,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "iNutriMon is a nutrition tracking application that helps users monitor their dietary intake and achieve their health goals. It provides personalized meal plans, nutrient analysis, and progress tracking features.",
			link: "https://inutrimon.com/"
		},
		{
			title: "eKosh",
			image: ekosh,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "eKosh is a financial + marketplace platform focused on helping small businesses, farmers, and retailers grow their income and operations.",
			link: "https://ekosh.in/"
		}
	];

	return (
		<>
			<section className="projects-section">
				<div className="title-wrapper">
					<h3 className="section-title"><FontAwesomeIcon icon={faFolderClosed} /> Projects</h3>
					{ projects.length > 4 && (<Button className="btn-link-arrow view-all mt-2">View All Projects <FontAwesomeIcon icon={faArrowRight} /></Button>) }
				</div>
				<div className="projects-list">
					{
						projects && projects.slice(0, 4).map((project, index) => (
							<div className="project-item" key={index}>
								<div className="project-image">
									<img src={project.image} alt={project.title} />
								</div>
								<div className="project-details">
									{
										project.link ? (
											<Link to={project.link} className="project-title" target="_blank" rel="noopener noreferrer">
												{project.title} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
											</Link>
										) : (
											<span className="project-title">{project.title}</span>
										)
									}
									<div className="project-stack">
										{ project.stack.map((tech, techIndex) => (<span className="stack-item" key={techIndex}>{tech}</span>)) }
									</div>
									<div className="project-description-wrapper">
										<p className="project-description">{project.description}</p>
										<span className="tooltip-text">{project.description}</span>
									</div>
								</div>
							</div>
						))
					}
				</div>
			</section>
		</>
	);
};
export default Projects;