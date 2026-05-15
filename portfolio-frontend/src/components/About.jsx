import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/About.scss";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { getProfile, getExperience, getProjects } from "../app/api";

const About = () => {
	const [experience, setExperience] = useState([]);
	const [projects, setProjects] = useState([]);
	const [form, setForm] = useState({ profileabout: "" });

	useEffect(() => {
		const fetchAllData = async () => {
			try {
				const [profileRes, experienceRes, projectsRes] = await Promise.all([
					getProfile(),
					getExperience(),
					getProjects()
				]);

				if (profileRes) {
					setForm({
						profileabout: profileRes.about || ""
					});
				}

				setExperience(experienceRes?.data || []);
				setProjects(projectsRes?.data || []);
			} catch (err) {
				err.message;
			}
		};

		fetchAllData();
	}, []);

	const totalExperience = experience.reduce((total, exp) => total + (exp.totalExp || 0), 0).toFixed(1);

	return (
		<section className="about-section">
			<h3 className="section-title"><FontAwesomeIcon icon={faUser} /> About Me</h3>
			<p className="section-description">{form.profileabout}</p>
			<div className="about-options">
				<div className="about-option">
					<h4 className="option-title">{totalExperience}+</h4>
					<p className="option-description">Years of Experience</p>
				</div>
				<div className="about-option">
					<h4 className="option-title">{projects.length}+</h4>
					<p className="option-description">Projects Completed</p>
				</div>
			</div>
		</section>
	);
};
export default About;