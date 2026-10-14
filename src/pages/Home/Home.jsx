import { lazy, useEffect } from "react";
import Header from "../../components/layout/Header/Header";
import Hero from "../../sections/Hero/Hero";
import LazySection from "../../components/ui/LazySection/LazySection";
import BackToTop from "../../components/ui/BackToTop/BackToTop";

const About = lazy(() => import("../../sections/About/About"));
const Expertise = lazy(() => import("../../sections/Expertise/Expertise"));
const Projects = lazy(() => import("../../sections/Projects/Projects"));
const Experience = lazy(() => import("../../sections/Experience/Experience"));
const Contact = lazy(() => import("../../sections/Contact/Contact"));
const Footer = lazy(() => import("../../components/layout/Footer/Footer"));

const Home = () => {
	useEffect(() => {
		const sectionId = window.location.hash.slice(1);
		if (!sectionId) return undefined;

		const frame = window.requestAnimationFrame(() => {
			document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
		});

		return () => window.cancelAnimationFrame(frame);
	}, []);

	return (
		<>
			<Header />
			<main tabIndex="-1">
				<Hero />
				<LazySection id="about" className="lazy-section--about" Component={About} />
				<LazySection id="expertise" className="lazy-section--expertise" Component={Expertise} />
				<LazySection id="projects" className="lazy-section--projects" Component={Projects} />
				<LazySection id="experience" className="lazy-section--experience" Component={Experience} />
				<LazySection id="contact" className="lazy-section--contact" Component={Contact} />
			</main>
			<LazySection className="lazy-section--footer" Component={Footer} />
			<BackToTop />
		</>
	);
};
export default Home