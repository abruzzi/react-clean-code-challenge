import {useEffect, useMemo, useReducer} from "react";
import { CategoryType, TodoType } from "./types";
import { todoReducer } from "./todoReducer";
import axios, {AxiosResponse} from "axios";

type RemoteTodo = {
  createdAt: string;
  text: string;
  done: boolean;
  id: string;
}

export const useTodos = (providedTodos: TodoType[] = []) => {
  const [{ todos, query, category }, dispatch] = useReducer(todoReducer, {
    todos: providedTodos,
    category: "total",
    query: "",
  });

  useEffect(() => {
    const fetchRemoteTodos = async () => {
      const todos = await axios
        .get("https://5a2f495fa871f00012678d70.mockapi.io/api/todos")
        .then((response: AxiosResponse<RemoteTodo[]>) =>
          response.data.map((item) => {
            return {
              id: item.id,
              content: item.text,
              completed: item.done,
            } as TodoType;
          })
        );

      todos.forEach(todo => addTodo(todo))
    }

    fetchRemoteTodos();
  }, [])

  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE", payload: { id } });
  };

  const addTodo = (todo: TodoType) => {
    dispatch({ type: "ADD", payload: todo });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE", payload: { id: id } });
  };

  const setCategory = (category: CategoryType) => {
    dispatch({ type: "SET_CATEGORY", payload: { category: category } });
  };

  const search = (query: string) => {
    dispatch({ type: "SET_QUERY", payload: { query: query } });
  };

  const total = useMemo(() => {
    return todos;
  }, [todos]);

  const completed = useMemo(() => {
    return todos.filter((todo: TodoType) => todo.completed);
  }, [todos]);

  const active = useMemo(() => {
    return todos.filter((todo: TodoType) => !todo.completed);
  }, [todos]);

  const aggregation = useMemo(
    () => [
      { category: "total", count: todos.length },
      { category: "completed", count: completed.length },
      { category: "active", count: active.length },
    ],
    [todos, completed, active]
  );

  const filteredList = useMemo(() => {
    switch (category) {
      case "total": {
        return total;
      }
      case "completed": {
        return completed;
      }
      case "active": {
        return active;
      }
      default: {
        return total;
      }
    }
  }, [active, completed, category, total]);

  const displayTodos = useMemo(() => {
    return filteredList.filter((todo: TodoType) =>
      todo.content.includes(query)
    );
  }, [filteredList, query]);

  return {
    displayTodos,
    category,
    aggregation,
    search,
    setCategory,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
