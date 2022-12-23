import { TodoType } from "./types";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { useCommandAndKey } from "./useCommandAndKey";

export const TodoInput = ({
  onItemAdded,
}: {
  onItemAdded: (todo: TodoType) => void;
}) => {
  const [todo, setTodo] = useState<string>("");

  const inputRef = useCommandAndKey("k");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && todo.length !== 0) {
      const id = uuid();
      onItemAdded({ id: id, content: todo, completed: false });
      setTodo("");
    }
  };

  return (
    <input
      data-testid="add-new-todo"
      ref={inputRef}
      type="text"
      value={todo}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="⌘ + k to start adding"
    />
  );
};
