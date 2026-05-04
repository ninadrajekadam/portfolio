import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/About.scss";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { getProfile } from "../app/api";

const About = () => {
	const [form, setForm] = useState({
		profileabout: ""
	});

	useEffect(() => {
		getProfile().then((res) => {
			if (res) {
				setForm({
					profileabout: res.about || ""
				});
			}
		});
	}, []);

	return (
		<>
			<section className="about-section">
				<h3 className="section-title"><FontAwesomeIcon icon={faUser} /> About Me</h3>
				<p className="section-description">{form.profileabout}</p>
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