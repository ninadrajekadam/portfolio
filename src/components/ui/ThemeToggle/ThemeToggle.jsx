import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./theme-toggle.scss";

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      className="theme-switch"
      type="button"
      onClick={onToggle}
      data-theme={theme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
    >
      <FontAwesomeIcon icon={faMoon} className="theme-switch-icon theme-switch-icon-moon" />
      <FontAwesomeIcon icon={faSun} className="theme-switch-icon theme-switch-icon-sun" />
    </button>
  );
};
export default ThemeToggle;