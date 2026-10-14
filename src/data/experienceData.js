const experiences = [
	{
		company: "Idealake Information Technologies Pvt Ltd",
		jobTitle: "Senior Software Developer",
		duration: "Jun 2024 - Present",
		description: [
			"Lead end-to-end frontend development for enterprise-grade web applications",
			"Contribute to system architecture discussions and scalable UI design decisions.",
			"Mentor junior developers and enforce clean coding standards and best practices.",
			"Conduct code reviews and reduce production defects through structured testing.",
			"Resolve complex technical issues to ensure system stability and performance",
			"Collaborate cross-functionally with backend, QA, and design teams to deliver optimized solutions."
		]
	},
	{
		company: "DocMode Health Technologies Ltd",
		jobTitle: "Web Developer",
		duration: "Jul 2021 - May 2024",
		description: [
			"Developed responsive healthcare web applications serving large user bases.",
			"Integrated REST APIs using AJAX/JSON for seamless frontend-backend communication.",
			"Built scalable UI modules improving maintainability and performance",
			"Optimized front-end rendering and reduced UI inconsistencies across devices.",
			"Participated in full lifecycle development including design, development, testing, and deployment.",
			"Ensured applications were bug-free and performance-optimized before release."
		]
	},
	{
		company: "AnalyticsFox Softwares Pvt Ltd",
		jobTitle: "Front-end Developer",
		duration: "Feb 2018 - Jan 2021",
		description: [
			"Built responsive and user-friendly web applications for finance and construction domains",
			"Translated UI/UX designs into high-quality production-ready code.",
			" Collaborated with cross-functional teams during all phases of development.",
			"Identified and resolved bugs before deployment, ensuring application stability.",
			"Maintained structured Git workflows and version control best practices."
		]
	}
];

const monthNumbers = {
	Jan: 0,
	Feb: 1,
	Mar: 2,
	Apr: 3,
	May: 4,
	Jun: 5,
	Jul: 6,
	Aug: 7,
	Sep: 8,
	Oct: 9,
	Nov: 10,
	Dec: 11
};

export const getTotalExperience = () => {
	const totalMonths = experiences.reduce((total, experience) => {
		const match = experience.duration.match(/^([A-Z][a-z]{2}) (\d{4}) - (Present|[A-Z][a-z]{2} \d{4})$/);
		if (!match) {
			throw new Error(`Unsupported experience duration: ${experience.duration}`);
		}

		const [, startMonth, startYear, end] = match;
		const [endMonth, endYear] = end === "Present" ? [new Date().toLocaleString("en-US", { month: "short" }), new Date().getFullYear()] : end.split(" ");
		const startIndex = Number(startYear) * 12 + monthNumbers[startMonth];
		const endIndex = Number(endYear) * 12 + monthNumbers[endMonth];

		return total + endIndex - startIndex + 1;
	}, 0);

	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
export default experiences;