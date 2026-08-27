import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import "../assets/scss/components/Skills.scss";
import skillImages from "../utils/skillImages.js";


const Skills = () => {
	const skills = [
		{ name: "React", img: skillImages.react, },
		{ name: "NodeJs", img: skillImages.nodejs },
		{ name: "Vite", img: skillImages.vite },
		{ name: "ExpressJs", img: skillImages.express },
		{ name: "MongoDB", img: skillImages.mongodb },
		{ name: "JavaScript", img: skillImages.javascript },
		{ name: "SCSS", img: skillImages.scss },
		{ name: "Bootstrap", img: skillImages.bootstrap },
		{ name: "HTML5", img: skillImages.html },
		{ name: "CSS3", img: skillImages.css },
		{ name: "GitHub", img: skillImages.github },
		{ name: "Git", img: skillImages.git },
	];

	return (
		<>
			<section className="skills-section">
				<h2 className="section-title"><FontAwesomeIcon icon={faCode} /> Tech Stacks</h2>
				<ul className="skills-list">
					{
						skills.map((skill, index) => (
							<li className="skill-item" key={index}>
								<span className="skill-img">
									<img src={skill.img} alt={skill.name} className={skill.name === "ExpressJs" ? "filter" : ""} />
								</span>
								<span className="skill-name">{skill.name}</span>
							</li>
						))
					}
				</ul>
			</section>
		</>
	);
};
export default Skills; 