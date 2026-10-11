import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const Context = createContext({
  isAuthenticated: false,
});

// eslint-disable-next-line react-refresh/only-export-components
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme-mode") === "dark";
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme-mode", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <Context.Provider
      value={{
        isAuthenticated, setIsAuthenticated, user, setUser, isDark, setIsDark, toggleTheme,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);