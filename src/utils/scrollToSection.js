const scrollToSection = (event, sectionId) => {
	event.preventDefault();

	if (window.location.hash) {
		window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
	}

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	document.getElementById(sectionId)?.scrollIntoView({
		behavior: prefersReducedMotion ? 'instant' : 'smooth',
		block: 'start',
	});
};
export default scrollToSection;