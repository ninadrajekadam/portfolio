import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faLightbulb, faUsers } from "@fortawesome/free-solid-svg-icons";
import "./About.scss";

const About = () => {
	const aboutContent = [
		{
			icon: faLightbulb,
			title: "Problem Solver",
			desc: "I enjoy solving complex challanges and finding simple, effective solutions.",
		},
		{
			icon: faUsers,
			title: "Team Player",
			desc: "I believe in collaboration, code reviews and continuous learning.",
		},
		{
			icon: faSeedling,
			title: "Growth Mindset",
			desc: "Always exploring new technologies and best practises.",
		}
	];

	const currentExploring = [
		{
			iconName: "react",
			title: "React Native"
		},
		{
			iconName: "nextjs",
			title: "Next.js"
		},
		{
			iconName: "nestjs",
			title: "Nest.js"
		},
	];

	return (
		<>
			<section className="about">
				<Container>
					<div className="section-heading">
							<span className="section-label">About</span>
					</div>
					<div className="about__flex">
						<div className="about__item section-heading">
							<h2 className="section-title">Crafting Digital Experiences with Code & Creativity</h2>
							<p className="section-description">I'm a Senior Software Engineer with a strong foundation in front-end and backend development. I specialize in React.js, Node.js, JavaScript, Express.js & MongoDB, and have worked on enterprise-grade applications in banking, healthcare and finance domains. I focus on clean architecture, performance, accessibility and delivering user-centric solutions.</p>
						</div>
						<div className="about__item">
							{
								aboutContent.map((item, index) => (
									<div className="about__content" key={index}>
										<div className="about__content-icon"><FontAwesomeIcon icon={item.icon} /></div>
										<div className="about__content-text">
											<h3 className="about__content-title">{item.title}</h3>
											<p className="about__content-desc">{item.desc}</p>
										</div>
									</div>
								))
							}
						</div>
						<div className="about__item">
							<div className="about__current">
								<h3 className="about__current-heading">Currently Exploring</h3>
								{
									currentExploring.map((item, index) => (
										<div className="about__current-item" key={index}>
											<div className="about__current-icon">
												<span className={`about__current-img about__current-img--${item.iconName}`} aria-hidden="true" />
											</div>
											<div className="about__current-title">{item.title}</div>
										</div>
									))
								}
							</div>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
};
export default About;