import {CategoryType, TodoType} from "./types";

type StateType = {
  todos: TodoType[];
  category: CategoryType;
  query: string;
};

type Action = {
  type: string;
  payload: any;
};

export const todoReducer = (state: StateType, action: Action) => {
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
            return {...todo, completed: !todo.completed};
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