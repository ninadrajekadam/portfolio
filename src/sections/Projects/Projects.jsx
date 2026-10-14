import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import Carousel from "../../components/ui/Carousel/Carousel";
import "./Projects.scss";
import projectDetails from "../../data/projectData";

const Projects = () => {
	return (
		<section className="projects">
			<Container>
				<div className="header-flex">
					<div className="section-heading">
						<h2 className="section-title">Featured Projects</h2>
						<p className="section-description">Real-world projects build with modern technologies</p>
					</div>
				</div>
				<Carousel ariaLabel="Featured projects" className="projects__carousel">
					{
						projectDetails.map((project, index) => (
							<div className="projects__card" key={`${project.title}-${index}`}>
								<img src={project.image} alt={project.title} className="projects__card__image" loading="lazy" decoding="async" width="600" height="400" />
								<div className="projects__card__content">
									<h3 className="projects__card__title">{project.title}</h3>
									<p className="projects__card__desc">{project.description}</p>
									<p className="projects__card__type">{project.type}</p>
									<p className="projects__card__tech">
										{
											project.tech.map((tech, techIndex) => (<span className="projects__card__tech-item" key={`${tech}-${techIndex}`}>{tech}</span>))
										}
									</p>
									{
										project.url ? (
											<a href={project.url} className="projects__card__link">View Project <FontAwesomeIcon icon={faExternalLink} aria-hidden="true" /></a>
										) : ("")
									}
								</div>
							</div>
						))
					}
				</Carousel>
			</Container>
		</section>
	);
};

export default Projects;