import { faArrowRight, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/scss/components/Experience.scss";
import { Button } from "react-bootstrap";

const Experience = () => {
	const experienceData = [
		{
			title: "Senior Software Developer",
			company: "Idealake Information Technologies Pvt Ltd",
			duration: "Jun 2024 - Present",
			responsibilities: [
				"Builds responsive, high-performance UIs using modern frontend technologies.",
				"Leads frontend architecture, enforces best practices, and mentors developers.",
				"Develops scalable, optimized web apps with seamless user experience."
			]
		},
		{
			title: "Web Developer",
			company: "DocMode Health Technologies Ltd",
			duration: "Jul 2021 - May 2024",
			responsibilities: [
				"Builds responsive, high-performance UIs using modern frontend technologies.",
				"Leads frontend architecture, enforces best practices, and mentors developers.",
				"Develops scalable, optimized web apps with seamless user experience."
			]
		},
		{
			title: "Front End Developer",
			company: "AnalyticsFox Softwares Pvt Ltd",
			duration: "Feb 2018 - Jan 2021",
			responsibilities: [
				"Builds responsive, high-performance UIs using modern frontend technologies.",
				"Leads frontend architecture, enforces best practices, and mentors developers.",
				"Develops scalable, optimized web apps with seamless user experience."
			]
		},
	];

	return (
		<>
			<section className="experience-section">
				<div className="title-wrapper">
					<h3 className="section-title"><FontAwesomeIcon icon={faBriefcase} /> Experience</h3>
					{ experienceData.length > 3 && (<Button className="btn-link-arrow view-all">View All Experience <FontAwesomeIcon icon={faArrowRight} /></Button>) }
				</div>
				<ul className="experience-list">
					{
						experienceData && experienceData.slice(0, 3).map((item, index) => (
							<li key={index} className="experience-item">
								<h4 className="experience-title">{item.title}</h4>
								<p className="experience-company">{item.company}</p>
								<span className="experience-duration">{item.duration}</span>
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