import {useState} from "react";
import {TodoType} from "./types";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const onToggleItem = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed}
      }
      return todo;
    }))
  }

  const onItemAdded = (todo: TodoType) => {
    setTodos([...todos, todo]);
  }

  return {
    todos,
    addTodo: onItemAdded,
    toggleTodo: onToggleItem
  }
}