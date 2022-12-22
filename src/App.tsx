import React, { useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./Todo";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app">
      <div className="headingContainer">
        <h1>todos</h1>

        <button onClick={toggleTheme}>
          <span
            className="material-symbols-outlined themeControl"
          >
            {theme === "light" ? "dark_mode" : "light_mode"}
          </span>
        </button>
      </div>
      <Todo />
    </div>
  );
}

export default App;
