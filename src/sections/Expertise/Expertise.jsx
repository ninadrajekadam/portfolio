import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom, faBriefcase, faCode, faServer } from "@fortawesome/free-solid-svg-icons";
import "./Expertise.scss";

const Expertise = () => {
	const expertise = [
		{
			icon: faAtom,
			title: "Frontend",
			list: ["React.js", "JavaScript (ES6+)", "HTML5, CSS3, SCSS", "Bootstrap", "Responsive UI", "Accessibility"]
		},
		{
			icon: faServer,
			title: "Backend",
			list: ["Node.js", "Express.js", "REST APIs", "MongoDB", "JWT/ Authetication", "API Integration"]
		},
		{
			icon: faCode,
			title: "Development Practices",
			list: ["Clean Architecture", "Reuseble Components", "Performance Optimization", "Code Reviews", "Git / GitHub", "Debugging"]
		},
		{
			icon: faBriefcase,
			title: "Enterprise & Tools",
			list: ["JIRA / Redmine", "Bug Tracking", "UAT/ Producation", "Cross Broweser Testing", "Agile Development"]
		}
	];
	return (
		<>
			<section className="expertise">
				<Container>
					<div className="section-heading">
						<h2 className="section-title">Techinical Expertise</h2>
						<p className="section-description">Technologies & tools I work with</p>
					</div>
					<Row className="expertise__flex">
						{
							expertise.map((item, index) => (
								<Col xl={3} lg={3} md={6} sm={12} xs={12} key={index}>
									<div className="expertise__item">
										<div className="expertise__heading">
											<div className="expertise__icon"><FontAwesomeIcon icon={item.icon} /></div>
											<h3 className="expertise__title">{item.title}</h3>
										</div>
										<div className="expertise__content">
											<ul className="expertise__list">
												{
													item.list.map((listItem, index) => (
														<li className="expertise__list-item" key={index}>{listItem}</li>
													))
												}
											</ul>
										</div>
									</div>
								</Col>
							))
						}
					</Row>
				</Container>
			</section>
		</>
	);
};
export default Expertise;