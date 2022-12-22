import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";
import { useTodos } from "./useTodos";

export const Todo = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="container">
      <TodoInput onItemAdded={addTodo} />
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
