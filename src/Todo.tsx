import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";
import { useTodos } from "./useTodos";

export const Todo = () => {
  const { displayTodos, todos, completed, active, filter, setFilter, addTodo, toggleTodo, deleteTodo } =
    useTodos();

  return (
    <div className="container">
      <TodoInput onItemAdded={addTodo} />

      <div className="aggregation">
        <div role="columnheader">
          Total:{" "}
          <button data-testid="total-filter" onClick={() => setFilter("total")}>
            <span className={`badge ${filter === "total" ? "selected" : ""}`}>{todos.length}</span>
          </button>
        </div>
        <div role="columnheader">
          Completed:{" "}
          <button data-testid="total-completed" onClick={() => setFilter("completed")}>
            <span className={`badge ${filter === "completed" ? "selected" : ""}`}>{completed.length}</span>
          </button>
        </div>
        <div role="columnheader">
          Active:{" "}
          <button data-testid="total-active" onClick={() => setFilter("active")}>
            <span className={`badge ${filter === "active" ? "selected" : ""}`}>{active.length}</span>
          </button>
        </div>
      </div>

      <div className="todos">
        {displayTodos.map((todo) => (
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
