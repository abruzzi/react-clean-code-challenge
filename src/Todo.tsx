import { ChangeEvent, KeyboardEvent, useState } from "react";
import { v4 as uuid } from "uuid";

type TodoItem = {
  id: string;
  content: string;
};

const TodoInput = ({
  onItemAdded,
}: {
  onItemAdded: (todo: TodoItem) => void;
}) => {
  const [content, setContent] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      const id = uuid();
      onItemAdded({ id, content });
    }
  };

  return (
    <input
      type="text"
      data-testid="todo-input"
      value={content}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const onItemAdded = (todo: TodoItem) => {
    setTodos([todo, ...todos])
  }

  return (
    <div>
      <TodoInput onItemAdded={onItemAdded} />
      {todos.map((todo) => (
        <div key={todo.id}>{todo.content}</div>
      ))}
    </div>
  );
}
