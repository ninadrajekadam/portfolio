import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import "./LazySection.scss";

const LoadedSection = ({ Component, onLoaded }) => {
	useEffect(() => {
		onLoaded();
	}, [onLoaded]);

	return <Component />;
};

const LazySection = ({ id, className = "", Component }) => {
	const sectionRef = useRef(null);
	const [isNearViewport, setIsNearViewport] = useState(typeof IntersectionObserver === "undefined");
	const [isLoaded, setIsLoaded] = useState(false);
	const markLoaded = useCallback(() => setIsLoaded(true), []);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section || isNearViewport) return undefined;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsNearViewport(true);
				observer.disconnect();
			}
		}, {
			rootMargin: "200px 0px",
		});

		observer.observe(section);
		return () => observer.disconnect();
	}, [isNearViewport]);

	return (
		<div className={`lazy-section ${className} ${isLoaded ? "lazy-section--revealed" : ""}`.trim()} id={id} ref={sectionRef} aria-busy={!isLoaded}>
			{
				isNearViewport ? (
					<Suspense fallback={<div className="lazy-section__placeholder" aria-hidden="true" />}>
						<LoadedSection Component={Component} onLoaded={markLoaded} />
					</Suspense>
				) : (
					<div className="lazy-section__placeholder" aria-hidden="true" />
				)
			}
		</div>
	);
};
export default LazySection;