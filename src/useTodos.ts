import {useState} from "react";
import {TodoItem} from "./types";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (todo: TodoItem) => {
    setTodos([todo, ...todos]);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos);
  }

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed};
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo
  };
};