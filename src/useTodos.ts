import { useMemo, useReducer } from "react";
import { CategoryType, TodoType } from "./types";

type StateType = {
  todos: TodoType[];
  category: CategoryType;
  query: string;
};

type Action = {
  type: string;
  payload: any;
};

const todoReducer = (state: StateType, action: Action) => {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case "DELETE": {
      return {
        ...state,
        todos: state.todos.filter(
          (todo: TodoType) => todo.id !== action.payload.id
        ),
      };
    }
    case "TOGGLE": {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };
    }
    case "SET_CATEGORY": {
      return {
        ...state,
        category: action.payload.category,
      };
    }
    case "SET_QUERY": {
      return {
        ...state,
        query: action.payload.query,
      };
    }
    default:
      return state;
  }
};

export const useTodos = (providedTodos: TodoType[] = []) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: providedTodos,
    category: "total",
    query: "",
  });

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

  const total = useMemo(() => {
    return state.todos;
  }, [state.todos]);

  const completed = useMemo(() => {
    return state.todos.filter((todo: TodoType) => todo.completed);
  }, [state.todos]);

  const active = useMemo(() => {
    return state.todos.filter((todo: TodoType) => !todo.completed);
  }, [state.todos]);

  const category = useMemo(() => {
    return state.category;
  }, [state.category]);

  const aggregation = useMemo(
    () => [
      { category: "total", count: total.length },
      { category: "completed", count: completed.length },
      { category: "active", count: active.length },
    ],
    [total, completed, active]
  );

  const filteredList = useMemo(() => {
    switch (state.category) {
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
  }, [active, completed, state.category, total]);

  const search = (query: string) => {
    dispatch({ type: "SET_QUERY", payload: { query: query } });
  };

  const displayTodos = useMemo(() => {
    return filteredList.filter((todo: TodoType) => todo.content.includes(state.query));
  }, [filteredList, state.query]);

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
