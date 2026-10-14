import { faCalendarCheck, faBuildingColumns, faHeartPulse, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Impact.scss';
import { getTotalExperience } from '../../data/experienceData';
import { getProjectCounts } from '../../data/projectData';

const Impact = () => {
	const { years } = getTotalExperience();
	const { healthcare, bankingAndFinance } = getProjectCounts();
	const impactData = [
		{
			icon: faCalendarCheck,
			title: `${years}+`,
			text: "Years of Experience"
		},
		{
			icon: faHeartPulse,
			title: `${healthcare}+`,
			text: "Healthcare Websites"
		},
		{
			icon: faBuildingColumns,
			title: `${bankingAndFinance}+`,
			text: "Banking & Finance Projects"
		},
		{
			icon: faShieldHalved,
			title: "Enterprise",
			text: "Support & Maintenance"
		}
	];
	
	return (
		<div className="impact">
			<div className="impact__flex">
				{
					impactData.map((item) => (
						<div className="impact__item" key={item.text}>
							<div className="impact__item-icon">
								<FontAwesomeIcon icon={item.icon} />
							</div>
							<div className="impact__item-content">
								<p className="impact__item-title">{item.title}</p>
								<p className="impact__item-text">{item.text}</p>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
};
export default Impact;