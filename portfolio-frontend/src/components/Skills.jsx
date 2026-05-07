import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/components/Skills.scss";
import { getSkills } from "../app/api";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Skills = () => {
	const [skills, setSkills] = useState([]);
			
	useEffect(() => {
		const fetchAllData = async () => {
			try {
				const [skillsRes] = await Promise.all([
					getSkills()
				]);
				setSkills(skillsRes?.data || []);
			} catch (err) {
				toast.error(err.message || "Failed to load data");
			}
		};

		fetchAllData();
	}, []);

	return (
		<>
			<section className="skills-section">
				<h3 className="section-title"><FontAwesomeIcon icon={faCode} /> Tech Stacks</h3>
				<ul className="skills-list">
					{
						skills.map((skill, index) => (
							<li className="skill-item" key={index}>
								<span className="skill-img">
									<img src={`${BASE_URL}/uploads/${skill.skillImage}`} alt={skill.skillName} className={skill.skillName === "ExpressJs" ? "filter" : ""} />
								</span>
								<span className="skill-name">{skill.skillName}</span>
							</li>
						))
					}
				</ul>
			</section>
		</>
	);
};
export default Skills; 