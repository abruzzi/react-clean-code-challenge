import React, { useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./Todo";
import {TodoType} from "./types";

const todos: TodoType[] = [
  {
    id: 'id-1',
    content: "buy some milk",
    completed: false
  },
  {
    id: 'id-2',
    content: "buy some orange",
    completed: true
  },
  {
    id: 'id-3',
    content: "rewrite react code",
    completed: true
  },
  {
    id: 'id-4',
    content: "rewrite react network request article",
    completed: false
  }
]

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

        <button className="themeSwitch" onClick={toggleTheme}>
          <span
            className="material-symbols-outlined themeControl"
          >
            {theme === "light" ? "dark_mode" : "light_mode"}
          </span>
        </button>
      </div>
      <Todo todos={todos} />
    </div>
  );
}

export default App;
