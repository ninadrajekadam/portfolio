import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/About.scss";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const About = () => {
	return (
		<>
			<section className="about-section">
				<h3 className="section-title"><FontAwesomeIcon icon={faUser} /> About Me</h3>
				<p className="section-description">
					Hello! I'm a passionate software developer with a love for creating innovative solutions. I have experience in various programming languages and frameworks. I enjoy working on both front-end and back-end development, and I'm always eager to learn new technologies. In my free time, I like to contribute to open-source projects and explore the latest trends in the tech industry.
				</p>
				<div className="about-options">
					<div className="about-option">
						<h4 className="option-title">6+</h4>
						<p className="option-description">Years of Experience</p>
					</div>
					<div className="about-option">
						<h4 className="option-title">10+</h4>
						<p className="option-description">Projects Completed</p>
					</div>
				</div>
			</section>
		</>
	);
}; 
export default About;