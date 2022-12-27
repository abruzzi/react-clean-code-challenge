import {ChangeEvent, KeyboardEvent, useState} from "react";
import {v4 as uuid} from 'uuid';

type TodoItem = {
  id: string;
  content: string;
}

export function Todo() {
  const [content, setContent] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      const id = uuid();
      setTodos([{ id, content }, ...todos]);
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="todo-input"
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {
        todos.map(todo => <div key={todo.id}>{todo.content}</div>)
      }
    </div>
  );
}