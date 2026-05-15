import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { faArrowUpRightFromSquare, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/Experience.scss";
import { getExperience } from "../app/api";
import { Link } from "react-router-dom";

const Experience = () => {
	const [experience, setExperience] = useState([]);
	
	useEffect(() => {
		const fetchAllData = async () => {
			try {
				const [experienceRes] = await Promise.all([
					getExperience()
				]);
				setExperience(experienceRes?.data || []);
			} catch (err) {
				err.message
			}
		};

		fetchAllData();
	}, []);

	const formatDate = (date) => {
		if (!date) return "Present";

		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			year: "numeric"
		});
	};

	return (
		<>
			<section className="experience-section">
				<div className="title-wrapper">
					<h3 className="section-title"><FontAwesomeIcon icon={faBriefcase} /> Experience</h3>
					{ experience.length > 3 && (<Button as={Link} to="/experiences" className="btn-link-arrow view-all">View All <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></Button>) }
				</div>
				<ul className="experience-list">
					{
						experience && experience.slice(0, 3).map((item, index) => (
							<li key={index} className="experience-item">
								{ item.exitDate === null && (<span className="experience-badge">Current</span>) }
								<h4 className="experience-title">{item.role}</h4>
								<p className="experience-company">{item.company}</p>
								<span className="experience-duration">{formatDate(item.joiningDate)} - {item.isPresent ? "Present" : formatDate(item.exitDate)}</span>
								<ul className="experience-responsibilities">
									{ item.responsibilities.map((resp, respIndex) => (<li className="responsibility-item" key={respIndex}>{resp}</li>)) }
								</ul>
							</li>
						))
					}
				</ul>
			</section>
		</>
	);
};
export default Experience; 