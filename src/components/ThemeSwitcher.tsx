import { useState, useEffect } from "react";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const themeLink = document.getElementById("theme-link") as HTMLLinkElement;
    if (themeLink) {
      const themePath =
        theme === "light"
          ? "/node_modules/primereact/resources/themes/lara-light-cyan/theme.css"
          : "/node_modules/primereact/resources/themes/lara-dark-cyan/theme.css";
      themeLink.href = themePath;
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      style={{ marginLeft: "10px" }}
      data-testid="theme-switcher"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};
