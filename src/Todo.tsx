import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";
import { useTodos } from "./useTodos";
import {FilterType, TodoType} from "./types";

const capitalise = (s: string) => s[0].toUpperCase() + s.substring(1, s.length).toLowerCase();

const createTab = (filter: string, selected: string, count: number, setFilter: () => void) => {
  return (
    <div role="columnheader" key={filter}>
      <label>{capitalise(filter)}: </label>
      <button data-testid={`${filter}-count`} onClick={setFilter}>
        <span className={`badge ${filter === selected ? "selected" : ""}`}>{count}</span>
      </button>
    </div>
  )
}

export const Todo = ({todos}: {todos?: TodoType[]}) => {
  const { displayTodos, filter, aggregation, setFilter, addTodo, toggleTodo, deleteTodo } =
    useTodos(todos);

  return (
    <div className="container">
      <TodoInput onItemAdded={addTodo} />
      <div className="aggregation">
        {
          aggregation.map(agg => {
            return createTab(agg.filter, filter, agg.count, () => setFilter(agg.filter as FilterType))
          })
        }
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
