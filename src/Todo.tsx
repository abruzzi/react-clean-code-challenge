import { TodoInput } from "./TodoInput";
import { useTodos } from "./useTodos";

export function Todo() {
  const { todos, addTodo, toggleTodo } = useTodos();

  return (
    <div>
      <TodoInput onItemAdded={addTodo} />
      {todos.map((todo) => (
        <div
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
          data-completed={todo.completed ? true : undefined}
        >
          {todo.content}
        </div>
      ))}
    </div>
  );
}
