import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getProjects } from "../app/api";
import { toast } from "react-toastify";
import "../assets/scss/components/Projects.scss";
import Header from "./Header";
import Footer from "./Footer";

const BASE_URL = "http://localhost:5000";

const AllProjects = () => {
	const [headerHeight, setHeaderHeight] = useState(0);
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
				toast.error(err.message || "Failed to load data");
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
									<div className="project-image">
										<img src={`${BASE_URL}/${project.image}`} alt={project.projectName} onClick={() => setZoomImage(`${BASE_URL}/${project.image}`)} style={{ cursor: "zoom-in" }} />
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
					<h3 className="overview-title"><FontAwesomeIcon icon={faBarsStaggered} className="overview-icon" /> Experience Overview</h3>
					<Row>
						<Col xl={4} lg={4} md={12}>
							<div className="overview-item">
								<h4 className="overview-value">7.7+</h4>
								<p className="overview-desc">Years of Experience</p>
							</div>
						</Col>
						<Col xl={4} lg={4} md={12}>
							<div className="overview-item">
								<h4 className="overview-value">3</h4>
								<p className="overview-desc">Organizations</p>
							</div>
						</Col>
						<Col xl={4} lg={4} md={12}>
							<div className="overview-item">
								<h4 className="overview-value">7+</h4>
								<p className="overview-desc">Project Delivered</p>
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