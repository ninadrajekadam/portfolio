import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { faArrowUpRightFromSquare, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getExperience } from "../app/api";
import "../assets/scss/components/Experience.scss";

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
						experience && experience.map((item, index) => (
							<li key={index} className="experience-item">
								<h4 className="experience-title">
									{ item.role }
									{ item.exitDate === null && (<span className="experience-badge current"></span>) }
								</h4>
								<p className="experience-company">{item.company}</p>
								<span className="experience-duration">{formatDate(item.joiningDate)} - {item.isPresent ? "Present" : formatDate(item.exitDate)}</span>
								<p className="responsibilities">{ item.responsibilities }</p>
							</li>
						))
					}
				</ul>
			</section>
		</>
	);
};
export default Experience; 