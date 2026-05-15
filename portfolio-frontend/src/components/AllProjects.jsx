import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getExperience, getProjects } from "../app/api";
import "../assets/scss/components/Projects.scss";
import Header from "./Header";
import Footer from "./Footer";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AllProjects = () => {
	const [headerHeight, setHeaderHeight] = useState(0);
	const [zoomImage, setZoomImage] = useState(null);
	const [showTooltip, setShowTooltip] = useState(false);
	const [projects, setProjects] = useState([]);
	const [experience, setExperience] = useState([]);
		
	useEffect(() => {
		const fetchAllExperiences = async () => {
			try {
				const res = await getExperience();
				setExperience(res?.data || []);
			} catch (err) {
				err.message
			}
		};

		fetchAllExperiences();
	}, []);

	useEffect(() => {
		const fetchAllProjects = async () => {
			try {
				const res = await getProjects();
				setProjects(res?.data || []);
			} catch (err) {
				err.message
			}
		};

		fetchAllProjects();
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

	const totalExperience = experience.reduce((total, exp) => total + (exp.totalExp || 0), 0).toFixed(1);
	const completedProjects = projects.filter(project => project.projectStatus === "Completed").length;
	const ongoingProjects = projects.filter(project => project.projectStatus === "Ongoing").length;

	return (
		<>
			<Header setHeaderHeight={setHeaderHeight} />
			<section className="exp-project-hero" style={{ marginTop: `${headerHeight}px` }}>
				<Container>
					<div className="hero-left">
						<p className="hero-top-content">My Work</p>
						<h2 className="hero-heading">All <span className="hero-highlight">Projects</span></h2>
						<p className="hero-description">A collection of projects I've worked on, showcasing my skills, creativity, and problem-solving approach.</p>
					</div>
				</Container>
			</section>
			<Container>
				<section className="projects-section all-exp-proj">
					<div className="projects-list">
						{
							projects && projects.map((project, index) => (
								<div className="project-item" key={index}>
									{
										project.projectStatus === "Completed" ? (<span className="project-status completed">Completed</span>) : 
										project.projectStatus === "Ongoing" ? (<span className="project-status ongoing">Ongoing</span>) : 
										(<span className="project-status unknown">Unknown Status</span>)
									}
									<div className="project-image">
										<img src={`${BASE_URL}/uploads/${project.image}`} alt={project.projectName} onClick={() => setZoomImage(`${BASE_URL}/uploads/${project.image}`)} style={{ cursor: "zoom-in" }} />
									</div>
									<div className="project-details">
										{
											project.projectUrl ? (
												<Link to={project.projectUrl} className="project-title" target="_blank" rel="noopener noreferrer">
													{project.projectName} <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
												</Link>
											) : (
												<span className="project-title">{project.projectName}</span>
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
				<section className="overview">
					<h3 className="overview-title"><FontAwesomeIcon icon={faBarsStaggered} className="overview-icon" /> Overview</h3>
					<Row>
						<Col xl={3} lg={3} md={6} sm={12} xs={12}>
							<div className="overview-item">
								<h4 className="overview-value">{totalExperience}</h4>
								<p className="overview-desc">Years of Experience</p>
							</div>
						</Col>
						<Col xl={3} lg={3} md={6} sm={12} xs={12}>
							<div className="overview-item">
								<h4 className="overview-value">{experience.length}</h4>
								<p className="overview-desc">Organizations</p>
							</div>
						</Col>
						<Col xl={3} lg={3} md={6} sm={12} xs={12}>
							<div className="overview-item">
								<h4 className="overview-value">{completedProjects}</h4>
								<p className="overview-desc">Projects Delivered</p>
							</div>
						</Col>
						<Col xl={3} lg={3} md={6} sm={12} xs={12}>
							<div className="overview-item">
								<h4 className="overview-value">{ongoingProjects}</h4>
								<p className="overview-desc">Projects Ongoing</p>
							</div>
						</Col>
					</Row>
				</section>
			</Container>
			<Footer />
		</>
	);
};
export default AllProjects; 