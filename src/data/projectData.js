import axisbank from "../assets/images/projects/axis-bank.webp";
import ihh from "../assets/images/projects/ihh-logo.webp";
import hdfcbank from "../assets/images/projects/hdfc-bank.webp";
import skillsignal from "../assets/images/projects/skillsignal.webp";
import aide from "../assets/images/projects/aide.webp";
import sure from "../assets/images/projects/sure.webp";
import docmode from "../assets/images/projects/docmode.webp";
import inutrimon from "../assets/images/projects/inutrimon.webp";
import ekosh from "../assets/images/projects/ekosh-finance.webp";

const projectDetails = [
	{
		title: "Axis Bank Rewamp",
		image: axisbank,
		type: 'Banking',
		tech: ['HTML5', 'SCSS', 'JavaScript', 'Pug', 'Grunt'],
		url: 'https://www.axis.bank.in/',
		description: "Built and maintained Axis Bank's website, supporting banking services and financial products with focus on performance, scalability, usability, and access across devices."
	},
	{
		title: "IHH Websites",
		image: ihh,
		type: 'Healthcare',
		siteCount: 17,
		tech: ['HTML5', 'SCSS', 'JavaScript', 'Deployment'],
		description: 'Supported 17 IHH Singapore healthcare websites, improving performance and responsive experiences for patients across digital platforms.'
	},
	{
		title: "HDFC Bank Rewamp",
		image: hdfcbank,
		type: 'Banking',
		tech: ['HTML5', 'SCSS', 'JavaScript', 'Pug', 'Grunt'],
		url: 'https://www.hdfc.bank.in/',
		description: 'Contributed to the HDFC Bank website revamp, enhancing responsive banking experiences, performance, and cross-device accessibility'
	},
	{
		title: "SkillSignal",
		image: skillsignal,
		type: 'Construction',
		tech: ['HTML5', 'CSS3', 'BootStrap', 'JS / jQuery', 'AJAX', 'API Integration'],
		url: 'https://app.skillsignal.com/SkillSignal/authentication/login',
		description: 'Built a construction safety and compliance platform for worker onboarding, certification tracking, and site safety, with integrated APIs and responsive digital workflows.'
	},
	{
		title: "DocMode AIDE",
		image: aide,
		type: 'Healthcare AI',
		tech: ['HTML5', 'CSS3', 'BootStrap', 'JS / jQuery', 'AJAX', 'API Integration'],
		url: 'https://aide.docmode.org/',
		description: 'Built a healthcare decision-support tool for clinical workflows, helping professionals manage patient care through clear clinical guidance and useful digital information.'
	},
	{
		title: "DocMode SURE",
		image: sure,
		type: 'Healthcare',
		tech: ['HTML5', 'CSS3', 'BootStrap', 'JS / jQuery', 'AJAX', 'API Integration'],
		url: 'https://sure.docmode.org/',
		description: 'Built a healthcare compliance and safety platform to maintain clinical standards, monitor protocols, and drive improvements in care quality across digital care workflows.'
	},
	{
		title: "DocMode Website",
		image: docmode,
		type: 'Healthcare',
		tech: ['HTML5', 'CSS3', 'BootStrap', 'JS / jQuery'],
		url: 'https://docmode.com/',
		description: 'Built a healthcare learning platform with medical courses, webinars, and resources for ongoing professional development among healthcare professionals and clinical teams.'
	},
	{
		title: "iNutriMon",
		image: inutrimon,
		type: 'Healthcare',
		tech: ['HTML5', 'CSS3', 'BootStrap', 'JS / jQuery', 'AJAX', 'API Integration'],
		url: 'https://inutrimon.com/',
		description: 'Built a clinical nutrition platform for hospitals, supporting diet planning, patient monitoring, and workflow improvements with clear, data-informed tools for care teams.'
	},
	{
		title: "eKosh",
		image: ekosh,
		type: 'Finance',
		tech: ['HTML5', 'CSS3', 'BootStrap', 'JS / jQuery', 'AJAX', 'API Integration'],
		url: 'https://ekosh.in/',
		description: 'Built a financial ecosystem enabling small businesses and farmers to access funding, business resources, and digital marketplace services on one unified digital platform.'
	},
];

export const getProjectCounts = () => ({
	healthcare: projectDetails.filter(({ type }) => type.startsWith("Healthcare")).reduce((total, project) => total + (project.siteCount ?? 1), 0),
	bankingAndFinance: projectDetails.filter(({ type }) => type === "Banking" || type === "Finance").length,
});

export default projectDetails;