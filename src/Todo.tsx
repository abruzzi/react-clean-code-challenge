import { TodoInput } from "./TodoInput";
import { useTodos } from "./useTodos";

export function Todo() {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos();

  return (
    <div>
      <TodoInput onItemAdded={addTodo} />
      {todos.map((todo) => (
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
      ))}
    </div>
  );
}
