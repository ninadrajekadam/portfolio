import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import scrollToSection from '../../../utils/scrollToSection';
import './Header.scss';
import cv from '../../../assets/cv/Ninad-Kadam-CV.pdf';
import logo190 from '../../../assets/images/profile/Ninad_Kadam_Tech_Brand_logo-190.webp';
import logo380 from '../../../assets/images/profile/Ninad_Kadam_Tech_Brand_logo-380.webp';

const Header = () => {
	const [activeTab, setActiveTab] = useState('#home');
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'dark' || savedTheme === 'light') {
			return savedTheme;
		}

		return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
	});

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem('theme', theme);
	}, [theme]);

	useEffect(() => {
		const sectionIds = ['home', 'about', 'expertise', 'projects', 'experience', 'contact'];
		const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
		if (!sections.length) return undefined;

		let animationFrame = 0;
		const updateActiveSection = () => {
			animationFrame = 0;
			if (window.scrollY < 8) {
				setActiveTab('#home');
				return;
			}

			const isAtPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
			if (isAtPageBottom) {
				setActiveTab(`#${sections[sections.length - 1].id}`);
				return;
			}

			const activeSection = sections.reduce((current, section) => (
				section.getBoundingClientRect().top <= window.innerHeight * 0.35 ? section : current
			), sections[0]);
			setActiveTab(`#${activeSection.id}`);
		};
		const scheduleUpdate = () => {
			if (!animationFrame) animationFrame = window.requestAnimationFrame(updateActiveSection);
		};

		updateActiveSection();
		window.addEventListener('scroll', scheduleUpdate, { passive: true });
		window.addEventListener('resize', scheduleUpdate);
		return () => {
			window.removeEventListener('scroll', scheduleUpdate);
			window.removeEventListener('resize', scheduleUpdate);
			if (animationFrame) window.cancelAnimationFrame(animationFrame);
		};
	}, []);

	const toggleTheme = () => {
		setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
	};

	const navigateToSection = (event, sectionId) => {
		setActiveTab(`#${sectionId}`);
		scrollToSection(event, sectionId);
	};

	return (
		<Navbar expand="lg" variant={theme} fixed="top" collapseOnSelect>
			<Container className="header-container">
				<Navbar.Brand href="#home" onClick={(event) => navigateToSection(event, 'home')}>
					<img src={logo190} srcSet={`${logo190} 190w, ${logo380} 380w`} sizes="190px" alt="Ninad Kadam" className="header-logo" width="190" height="40" fetchPriority="high" />
				</Navbar.Brand>
				<Navbar.Collapse id="menubar">
					<Nav activeKey={activeTab} onSelect={(key) => key && setActiveTab(key)} aria-label="Primary navigation">
						<Nav.Link eventKey="#home" href="#home" onClick={(event) => navigateToSection(event, 'home')} aria-current={activeTab === '#home' ? 'location' : undefined}>Home</Nav.Link>
						<Nav.Link eventKey="#about" href="#about" onClick={(event) => navigateToSection(event, 'about')} aria-current={activeTab === '#about' ? 'location' : undefined}>About</Nav.Link>
						<Nav.Link eventKey="#expertise" href="#expertise" onClick={(event) => navigateToSection(event, 'expertise')} aria-current={activeTab === '#expertise' ? 'location' : undefined}>Expertise</Nav.Link>
						<Nav.Link eventKey="#projects" href="#projects" onClick={(event) => navigateToSection(event, 'projects')} aria-current={activeTab === '#projects' ? 'location' : undefined}>Projects</Nav.Link>
						<Nav.Link eventKey="#experience" href="#experience" onClick={(event) => navigateToSection(event, 'experience')} aria-current={activeTab === '#experience' ? 'location' : undefined}>Experience</Nav.Link>
						<Nav.Link eventKey="#contact" href="#contact" onClick={(event) => navigateToSection(event, 'contact')} aria-current={activeTab === '#contact' ? 'location' : undefined}>Contact</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<div className="header-controls">
					<ThemeToggle theme={theme} onToggle={toggleTheme} />
					<a href={cv} className="btn-cv" download aria-label="Download CV">
						<FontAwesomeIcon icon={faDownload} aria-hidden="true" />
						<span className="btn-cv-label">Download CV</span>
					</a>
					<Navbar.Toggle aria-controls="menubar" aria-label="Toggle navigation" />
				</div>
			</Container>
		</Navbar>
	);
};
export default Header;