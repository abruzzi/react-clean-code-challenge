import { TodoInput } from "./TodoInput";
import { useTodos } from "./useTodos";
import { Item } from "./Item";
import { TodoItem } from "./types";

export function Todo({ items = [] }: { items?: TodoItem[] }) {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos(items);

  return (
    <div>
      <TodoInput onItemAdded={addTodo} />
      {todos.map((todo) => (
        <Item
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}
