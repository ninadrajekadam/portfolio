import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/Skills.scss";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const Skills = () => {
	const skills = [
		{ name: "HTML5", img: "https://img.icons8.com/color/48/000000/html-5.png" },
		{ name: "CSS3", img: "https://img.icons8.com/color/48/000000/css3.png" },
		{ name: "SCSS", img: "https://img.icons8.com/color/48/000000/sass.png" },
		{ name: "Bootstrap", img: "https://img.icons8.com/color/48/000000/bootstrap.png" },
		{ name: "JavaScript", img: "https://img.icons8.com/color/48/000000/javascript.png" },
		{ name: "ReactJs", img: "https://img.icons8.com/color/48/000000/react-native.png" },
		{ name: "Vite", img: "https://img.icons8.com/color/48/000000/vite.png" },
		{ name: "NodeJs", img: "https://img.icons8.com/color/48/000000/nodejs.png" },
		{ name: "ExpressJs", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", className: "filter" },
		{ name: "MongoDB", img: "https://img.icons8.com/color/48/000000/mongodb.png" },
		{ name: "NPM", img: "https://img.icons8.com/color/48/000000/npm.png" },
		{ name: "Git", img: "https://img.icons8.com/color/48/000000/git.png" },
	];

	return (
		<>
			<section className="skills-section">
				<h3 className="section-title"><FontAwesomeIcon icon={faCode} /> Skills</h3>
				<ul className="skills-list">
					{
						skills.map((skill, index) => (
							<li className="skill-item" key={index}>
								<span className="skill-img"><img src={skill.img} alt={skill.name} className={skill.className} /></span>
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