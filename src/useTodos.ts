import { useMemo, useState } from "react";
import { FilterType, TodoType } from "./types";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState<FilterType>("total");

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const addTodo = (todo: TodoType) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completed = useMemo(() => {
    return todos.filter((todo) => todo.completed);
  }, [todos]);

  const active = useMemo(() => {
    return todos.filter((todo) => !todo.completed);
  }, [todos]);

  const displayTodos = useMemo(() => {
    switch (filter) {
      case "total": {
        return todos;
      }
      case "completed": {
        return completed;
      }
      case "active": {
        return active;
      }
      default: {
        return todos;
      }
    }
  }, [active, completed, filter, todos]);

  const aggregation = useMemo(
    () => [
      { filter: "total", count: todos.length },
      { filter: "completed", count: completed.length },
      { filter: "active", count: active.length },
    ],
    [todos, completed, active]
  );

  return {
    displayTodos,
    filter,
    aggregation,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
