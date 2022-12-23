import {useCallback, useEffect, useMemo, useState} from "react";
import { FilterType, TodoType } from "./types";

export const useTodos = (providedTodos: TodoType[] = []) => {
  const [todos, setTodos] = useState<TodoType[]>(providedTodos);
  const [filter, setFilter] = useState<FilterType>("total");
  const [term, setTerm] = useState<string>('');
  const [displayTodos, setDisplayTodos] = useState<TodoType[]>(providedTodos);

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

  const aggregation = useMemo(
    () => [
      { filter: "total", count: todos.length },
      { filter: "completed", count: completed.length },
      { filter: "active", count: active.length },
    ],
    [todos, completed, active]
  );

  const search = useCallback((term: string) => {
    let list;
    switch (filter) {
      case "total": {
        list = todos;
        break;
      }
      case "completed": {
        list = completed;
        break;
      }
      case "active": {
        list = active;
        break;
      }
      default: {
        list = todos;
      }
    }

    return list.filter(todo => todo.content.includes(term))
  }, [active, completed, filter, todos])


  useEffect(() => {
    setDisplayTodos(search(term))
  }, [search, term])

  return {
    displayTodos,
    filter,
    aggregation,
    search,
    setFilter,
    setTerm,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
