import { ChangeEvent, KeyboardEvent, useState } from "react";
import { v4 as uuid } from "uuid";

type TodoItem = {
  id: string;
  content: string;
  completed: boolean;
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
      onItemAdded({ id, content, completed: false });
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
    setTodos([todo, ...todos]);
  };

  const handleClick = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div>
      <TodoInput onItemAdded={onItemAdded} />
      {todos.map((todo) => (
        <div
          key={todo.id}
          onClick={() => handleClick(todo.id)}
          data-completed={todo.completed ? true : undefined}
        >
          {todo.content}
        </div>
      ))}
    </div>
  );
}
