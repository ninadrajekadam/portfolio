import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./BackToTop.scss";

const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const updateVisibility = () => setIsVisible(window.scrollY > 400);
		updateVisibility();
		window.addEventListener("scroll", updateVisibility, { passive: true });

		return () => window.removeEventListener("scroll", updateVisibility);
	}, []);

	const scrollToTop = () => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({
			top: 0,
			behavior: prefersReducedMotion ? "instant" : "smooth",
		});
	};

	return (
		<button type="button" className={`back-to-top${isVisible ? " back-to-top--visible" : ""}`} onClick={scrollToTop} aria-label="Back to top" tabIndex={isVisible ? 0 : -1} aria-hidden={!isVisible}>
			<FontAwesomeIcon className="back-to-top__icon" icon={faArrowUp} aria-hidden="true" />
		</button>
	);
};
export default BackToTop;