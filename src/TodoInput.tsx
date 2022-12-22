import { TodoType } from "./types";
import { ChangeEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

export const TodoInput = ({
  onItemAdded,
}: {
  onItemAdded: (todo: TodoType) => void;
}) => {
  const [todo, setTodo] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && todo.length !== 0) {
      const id = uuid();
      onItemAdded({ id: id, content: todo, completed: false });
      setTodo("");
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={todo}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="⌘ + k to start adding"
    />
  );
};
