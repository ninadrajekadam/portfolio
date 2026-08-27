import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { faArrowUpRightFromSquare, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/Experience.scss";
import experiences from "../utils/experience.js";
import formatDate from "../utils/formatDate.js";

const Experience = () => {
	return (
		<>
			<section className="experience-section">
				<div className="title-wrapper">
					<h2 className="section-title"><FontAwesomeIcon icon={faBriefcase} /> Experience</h2>
					{ experiences.length > 3 && (<Button as={Link} to="/experiences" className="btn-link-arrow view-all">View All <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Button>) }
				</div>
				<ul className="experience-list">
					{
						experiences && experiences.slice(0, 3).map((experience, index) => (
							<li key={index} className="experience-item">
								<h4 className="experience-title">
									{ experience.role }
									{ experience.isPresent === true ? <span className="experience-badge current"></span> : "" }
								</h4>
								<p className="experience-company">{experience.company}</p>
								<span className="experience-duration">{formatDate(experience.joiningDate)} - {experience.isPresent ? "Present" : formatDate(experience.exitDate)}</span>
								<p className="responsibilities">{ experience.responsibilities }</p>
							</li>
						))
					}
				</ul>
			</section>
		</>
	);
};
export default Experience; 