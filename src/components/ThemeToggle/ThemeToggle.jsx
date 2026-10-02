import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className={darkMode ? "theme-icon active" : "theme-icon"}>
        ☀
      </span>

      <span className={!darkMode ? "theme-icon active" : "theme-icon"}>
        ☾
      </span>
    </button>
  );
}

export default ThemeToggle;