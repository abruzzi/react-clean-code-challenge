import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";
import { useTodos } from "./useTodos";

export const Todo = () => {
  const { todos, completed, active, addTodo, toggleTodo, deleteTodo } =
    useTodos();

  return (
    <div className="container">
      <TodoInput onItemAdded={addTodo} />

      <div className="aggregation">
        <div role="columnheader">
          Total: <span className="badge">{todos.length}</span>
        </div>
        <div role="columnheader">
          Completed: <span className="badge">{completed.length}</span>
        </div>
        <div role="columnheader">
          Active: <span className="badge">{active.length}</span>
        </div>
      </div>

      <div className="todos">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleItem={toggleTodo}
            onDeleteItem={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};
