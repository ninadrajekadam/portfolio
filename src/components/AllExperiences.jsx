import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/components/Experience.scss";
import "../assets/scss/components/ExperienceProject.scss";
import Header from "./Header";
import Footer from "./Footer";
import projects from "../utils/projects.js";
import experiences from "../utils/experience.js";
import formatDate from "../utils/formatDate.js";
import totalExperience from "../utils/totalExperience.js";

const AllExperiences = () => {
	const [headerHeight, setHeaderHeight] = useState(0);
	
	const completedProjects = projects.filter(project => project.projectStatus === "Completed").length;
	const ongoingProjects = projects.filter(project => project.projectStatus === "Ongoing").length;

  return (
		<>
			<Header setHeaderHeight={setHeaderHeight} />
			<section className="exp-project-hero" style={{ marginTop: `${headerHeight}px` }}>
				<Container>
					<div className="hero-left">
						<p className="hero-top-content">My Journey</p>
						<h2 className="hero-heading">All <span className="hero-highlight">Experiences</span></h2>
						<p className="hero-description">A timeline of my professional journey, roles, and the impact I've made across different organizations.</p>
					</div>
				</Container>
			</section>
			<Container>
				<section className="experience-section all-exp-proj">
					<div className="experience-wrapper">
						<ul className="experience-list">
							{
								experiences.map((experience, index) => (
									<li key={index} className="experience-item">
										<div className="experience-left">
											<span className="experience-date">
												{formatDate(experience.joiningDate)} - {experience.isPresent ? "Present" : formatDate(experience.exitDate)}
											</span>
										</div>
										<div className="experience-card">
											<div className="experience-header">
												<div>
													<h4 className="experience-title">
														{ experience.role }
														{ experience.exitDate === null && (<span className="experience-badge current"></span>) }
													</h4>
													<p className="experience-company">{experience.company}</p>
												</div>
											</div>
											<p className="responsibilities">{ experience.responsibilities }</p>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</section>
				<section className="overview">
					<h3 className="overview-title"><FontAwesomeIcon icon={faBarsStaggered} className="overview-icon" /> Overview</h3>
					<Row>
						<Col xl={3} lg={3} md={6} sm={12} xs={12}>
							<div className="overview-item">
								<h4 className="overview-value">{totalExperience.formatted}</h4>
								<p className="overview-desc">Years of Experience</p>
							</div>
						</Col>
						<Col xl={3} lg={3} md={6} sm={12} xs={12}>
							<div className="overview-item">
								<h4 className="overview-value">{experiences.length}</h4>
								<p className="overview-desc">Organizations Worked With</p>
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
								<p className="overview-desc">Active Projects</p>
							</div>
						</Col>
					</Row>
				</section>
			</Container>
			<Footer />
		</>
  );
};
export default AllExperiences;