import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "./Experience.scss";
import experiences from "../../data/experienceData";

const Experience = () => {
	return (
		<>
			<section className="experience">
				<Container>
					<div className="section-heading">
						<h2 className="section-title">Professional Experience</h2>
						<p className="section-description">My career journey</p>
					</div>
					<ol className="experience__timeline">
						{
							experiences.map((experience, index) => (
								<li className="experience__timeline-item" key={`${experience.company}-${index}`}>
									<article className="experience__card">
										{
											experience.duration.includes("Present") ? (<div className="experience__marker--present"><FontAwesomeIcon icon={faCircle} /></div>) : ""
										}
										<p className="experience__duration">{experience.duration}</p>
										<h3 className="experience__job-title">{experience.jobTitle}</h3>
										<p className="experience__company">{experience.company}</p>
										<ul className="experience__desc">
											{
												experience.description.map((desc, descriptionIndex) => (
													<li className="experience__desc-item" key={`${desc}-${descriptionIndex}`}>{desc}</li>
												))
											}
										</ul>
									</article>
								</li>
							))
						}
					</ol>
				</Container>
			</section>
		</>
	);
};
export default Experience;