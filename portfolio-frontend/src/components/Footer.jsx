import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import "../assets/scss/components/Footer.scss";

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<>
			<footer className="footer">
				<Container>
					<FontAwesomeIcon icon={faCopyright} /> {year} <span className="footer-name">Ninad Kadam</span>. All Rights Reserved.
				</Container>
			</footer>
		</>
	);
};
export default Footer;