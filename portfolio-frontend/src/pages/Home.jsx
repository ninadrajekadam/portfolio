import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home = () => {
	const [headerHeight, setHeaderHeight] = useState(0);

	return (
		<>
			<Header setHeaderHeight={setHeaderHeight} />
      <Hero headerHeight={headerHeight} />
			<About />
			<Skills />
			<Experience />
			<Projects />
			<Contact />
		</>
	);
};
export default Home;