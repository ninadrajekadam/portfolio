import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import "../assets/scss/components/Experience.scss";
import "../assets/scss/components/ExperienceProject.scss";
import { getExperience } from "../app/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

const AllExperiences = () => {
	const [headerHeight, setHeaderHeight] = useState(0);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await getExperience();
        setExperience(res?.data || []);
      } catch (err) {
        toast.error(err.message || "Failed to load data");
      }
    };

    fetchAllData();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Present";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

	const totalExperience = experience.reduce((total, exp) => total + (exp.totalExp || 0), 0).toFixed(1);

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
								experience.map((item, index) => (
									<li key={index} className="experience-item">
										<div className="experience-left">
											<span className="experience-date">
												{formatDate(item.joiningDate)} - {item.isPresent ? "Present" : formatDate(item.exitDate)}
											</span>
										</div>
										<div className="experience-card">
											<div className="experience-header">
												<div>
													<h4 className="experience-title">{item.role}</h4>
													<p className="experience-company">{item.company}</p>
												</div>
												{ (item.isPresent || item.exitDate === null) && (<span className="experience-badge">Current</span>) }
											</div>
											<ul className="experience-responsibilities">
												{ item.responsibilities?.map((resp, i) => (<li key={i} className="responsibility-item">{resp}</li>)) }
											</ul>
										</div>
									</li>
								))
							}
						</ul>
					</div>
				</section>
				<section className="overview">
					<h3 className="overview-title"><FontAwesomeIcon icon={faBarsStaggered} className="overview-icon" /> Experience Overview</h3>
					<Row>
						<Col xl={4} lg={4} md={12}>
							<div className="overview-item">
								<h4 className="overview-value">{totalExperience}</h4>
								<p className="overview-desc">Years of Experience</p>
							</div>
						</Col>
						<Col xl={4} lg={4} md={12}>
							<div className="overview-item">
								<h4 className="overview-value">{experience.length}</h4>
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

export default AllExperiences;