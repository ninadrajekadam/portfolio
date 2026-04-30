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
import { useEffect } from "react";
import { useState } from "react";

const Projects = () => {
	const [showTooltip, setShowTooltip] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setShowTooltip(window.innerWidth <= 1366 && window.innerWidth >= 786);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const projects = [
		{
			title: "IHH Websites",
			image: ihhLogo,
			stack: ["HTML5", "SCSS", "JavaScript", "Pug", "Grunt"],
			description: "Managed maintenance and support for 17 IHH Singapore healthcare websites, ensuring high performance, consistent content structure, and optimized responsive experiences across the entire digital ecosystem."
		},
		{
			title: "Axis Bank Website",
			image: axisBank,
			stack: ["HTML5", "SCSS", "JavaScript", "Pug", "Grunt"],
			description: "Developed and maintained Axis Bank’s digital platform, enabling seamless access to banking services and financial products with a strong focus on performance, scalability, and usability.",
			link: "https://www.axis.bank.in/"
		},
		{
			title: "SkillSignal",
			image: skillsignal,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "Developed a construction safety and compliance platform that streamlines worker onboarding, certification tracking, and site safety management through API-driven architecture.",
			link: "https://app.skillsignal.com/SkillSignal/authentication/login"
		},
		{
			title: "DocMode AIDE",
			image: docmodeAide,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "Developed a healthcare decision-support system that enhances clinical workflows, supports medical professionals, and improves patient management through structured digital processes.",
			link: "https://aide.docmode.org/"
		},
		{
			title: "DocMode SURE",
			image: docmodeSure,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "Developed a healthcare compliance and safety platform focused on maintaining clinical standards, monitoring protocols, and improving overall healthcare quality outcomes.",
			link: "https://sure.docmode.org/"
		},
		{
			title: "DocMode Website",
			image: docmode,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "Developed a healthcare learning platform providing access to medical courses, webinars, and educational resources to support continuous professional development for medical professionals.",
			link: "https://docmode.com/"
		},
		{
			title: "iNutriMon",
			image: inutrimon,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "Developed a clinical nutrition management platform for hospitals, enabling structured diet planning, patient monitoring, and workflow optimization using data-driven insights.",
			link: "https://inutrimon.com/"
		},
		{
			title: "eKosh",
			image: ekosh,
			stack: ["HTML5", "CSS3", "jQuery", "Bootstrap", "Rest API"],
			description: "Developed a financial ecosystem platform supporting small businesses and farmers by enabling access to funding, resources, and digital marketplace services.",
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
										{ showTooltip && (<span className="tooltip-text">{project.description}</span>) }
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