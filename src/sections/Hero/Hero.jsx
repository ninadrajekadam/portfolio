import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faCircle, faEnvelope, faMobile } from '@fortawesome/free-solid-svg-icons';
import './Hero.scss';
import hero from '../../assets/images/profile/hero.webp';
import Impact from '../Impact/Impact';
import { getTotalExperience } from '../../data/experienceData';
import scrollToSection from '../../utils/scrollToSection';

const Hero = () => {
  const skills = ['React', 'Node.js', 'JavaScript', 'Express.js', 'MongoDB'];
  const { years, months } = getTotalExperience();

  return (
    <section className="hero" id="home">
      <Container>
        <div className="hero__flex">
          <div className="hero__item hero__content">
            <p className="hero__subtitle">Hello, I'm</p>
            <h1 className="hero__title">NINAD KADAM</h1>
            <p className="hero__role">Senior Software Engineer</p>
            <ul className="hero__skill">
              {
                skills.map((skill, index) => (
                  <li className="hero__skill-item" key={skill}>
                    {skill}
                    { index < skills.length - 1 && (<FontAwesomeIcon icon={faCircle} className="hero__skill-separator" aria-hidden="true" />) }
                  </li>
                ))
              }
            </ul>
            <p className="hero__about">{years} years {months > 0 ? ` and ${months} months` : ''} of experience building scalable, high-performance web applications across banking, healthcare, finance, and enterprise domains. I love turning ideas into real-world products with clean code, modern technologies, and a focus on accessibility and performance.</p>
            <div className='hero__buttons'>
              <a href="#projects" className="hero__project" onClick={(event) => scrollToSection(event, 'projects')}>View my Projects <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></a>
              <a href="#contact" className="hero__contact" onClick={(event) => scrollToSection(event, 'contact')}><FontAwesomeIcon icon={faMobile} aria-hidden="true" /> Contact Me</a>
            </div>
            <div className="hero__links">
              <a href="https://github.com/ninadrajekadam" className="hero__link" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
              </a>
              <a href="https://in.linkedin.com/in/ninadrajekadam" className="hero__link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
                <FontAwesomeIcon icon={faLinkedin} aria-hidden="true" />
              </a>
              <a href="mailto:tech.ninadkadam@gmail.com" className="hero__link" aria-label="Send email">
                <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero__item hero__image">
            <span className="hero__image-note">Build Scalable Solutions</span>
            <img src={hero} alt="Ninad Kadam" className="hero__img" width="318" height="318" fetchPriority="high" decoding="async" />
          </div>
        </div>
        <Impact />
      </Container>
    </section>
  );
};
export default Hero;