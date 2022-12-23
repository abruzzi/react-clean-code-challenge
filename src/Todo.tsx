import { TodoInput } from "./TodoInput";
import { TodoItem } from "./TodoItem";
import { useTodos } from "./useTodos";
import {CategoryType, TodoType} from "./types";
import {ChangeEvent} from "react";

const capitalise = (s: string) => s[0].toUpperCase() + s.substring(1, s.length).toLowerCase();

const createCategoryTab = (category: string, selected: string, count: number, setCategory: () => void) => {
  return (
    <div role="columnheader" key={category}>
      <label>{capitalise(category)}: </label>
      <button data-testid={`${category}-count`} onClick={setCategory}>
        <span className={`badge ${category === selected ? "selected" : ""}`}>{count}</span>
      </button>
    </div>
  )
}

export const Todo = ({todos}: {todos?: TodoType[]}) => {
  const { displayTodos, category, aggregation, search, setCategory, addTodo, toggleTodo, deleteTodo } =
    useTodos(todos);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    search(term);
  }

  return (
    <div className="container">
      <input type="text" data-testid="search-box" onChange={onSearch} placeholder="Type to search..." />
      <div className="aggregation">
        {
          aggregation.map(agg => {
            return createCategoryTab(agg.category, category, agg.count, () => setCategory(agg.category as CategoryType))
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

      <TodoInput onItemAdded={addTodo} />
    </div>
  );
};
