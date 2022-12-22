import {useState} from "react";
import {TodoType} from "./types";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed}
      }
      return todo;
    }))
  }

  const addTodo = (todo: TodoType) => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  }
}