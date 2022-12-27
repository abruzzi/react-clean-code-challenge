import { TodoItem } from "./types";

export const Item = ({
  todo,
  toggleTodo,
  deleteTodo,
}: {
  todo: TodoItem;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}) => {
  return (
    <div className="todo-item" key={todo.id}>
      <span
        onClick={() => toggleTodo(todo.id)}
        data-completed={todo.completed ? true : undefined}
      >
        {todo.content}
      </span>
      <button data-testid="delete" onClick={() => deleteTodo(todo.id)}>
        delete
      </button>
    </div>
  );
};
