import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Carousel.scss";

const Carousel = ({ children, ariaLabel = "Carousel", className = "" }) => {
	const slides = Children.toArray(children);
	const viewportRef = useRef(null);
	const touchStartX = useRef(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visibleSlides, setVisibleSlides] = useState(1);
	const [trackOffset, setTrackOffset] = useState(0);

	const updateVisibleSlides = useCallback(() => {
		const viewport = viewportRef.current;
		const firstSlide = viewport?.querySelector(".carousel__slide");
		if (!viewport || !firstSlide) return;

		const track = firstSlide.parentElement;
		const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
		const slideWidth = firstSlide.getBoundingClientRect().width;
		const visibleCount = Math.max(1, Math.round((viewport.clientWidth + gap) / (slideWidth + gap)));
		setVisibleSlides(visibleCount);
	}, []);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return undefined;

		updateVisibleSlides();
		const resizeObserver = new ResizeObserver(updateVisibleSlides);
		resizeObserver.observe(viewport);

		return () => {
			resizeObserver.disconnect();
		};
	}, [updateVisibleSlides]);

	const maxIndex = Math.max(0, slides.length - visibleSlides);
	const activeIndex = Math.min(currentIndex, maxIndex);

	useLayoutEffect(() => {
		const viewport = viewportRef.current;
		const slide = viewport?.querySelectorAll(".carousel__slide")[activeIndex];
		if (!slide) return;

		setTrackOffset(slide.offsetLeft);
	}, [activeIndex, visibleSlides, slides.length]);

	const goToSlide = (index) => {
		setCurrentIndex(Math.max(0, Math.min(maxIndex, index)));
	};

	const slideStarts = Array.from({ length: maxIndex + 1 }, (_, index) => index);

	return (
		<div className={`carousel ${className}`.trim()}>
			<div
				className="carousel__viewport"
				ref={viewportRef}
				tabIndex={0}
				role="region"
				aria-roledescription="carousel"
				aria-label={ariaLabel}
				onKeyDown={(event) => {
					if (event.key === "ArrowLeft") goToSlide(activeIndex - 1);
					if (event.key === "ArrowRight") goToSlide(activeIndex + 1);
				}}
				onTouchStart={(event) => {
					touchStartX.current = event.touches[0].clientX;
				}}
				onTouchEnd={(event) => {
					if (touchStartX.current === null) return;
					const swipeDistance = touchStartX.current - event.changedTouches[0].clientX;
					if (Math.abs(swipeDistance) > 40) goToSlide(activeIndex + Math.sign(swipeDistance));
					touchStartX.current = null;
				}}
			>
				<div className="carousel__track" style={{ transform: `translate3d(-${trackOffset}px, 0, 0)` }}>
					{
						slides.map((slide, index) => (
							<div className="carousel__slide" key={slide.key ?? index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>
								{slide}
							</div>
						))
					}
				</div>
			</div>
			{
				slides.length > visibleSlides && (
					<div className="carousel__navigation">
						<div className="carousel__pagination" role="group" aria-label={`${ariaLabel} pages`}>
							{
								slideStarts.map((start) => (
									<button type="button" className="carousel__dot" key={start} aria-label={`Go to slide ${start + 1}`} aria-current={activeIndex === start ? "true" : undefined} onClick={() => goToSlide(start)} />
								))
							}
						</div>
						<div className="carousel__controls">
							<button type="button" className="carousel__control" aria-label="Show previous slide" onClick={() => goToSlide(Math.max(0, activeIndex - 1))} disabled={activeIndex <= 0}>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							<button type="button" className="carousel__control" aria-label="Show next slide" onClick={() => goToSlide(Math.min(maxIndex, activeIndex + 1))} disabled={activeIndex >= maxIndex}>
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</div>
					</div>
				)
			}
		</div>
	);
};

export default Carousel;
