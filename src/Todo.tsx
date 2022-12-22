import {TodoInput} from "./TodoInput";
import {TodoItem} from "./TodoItem";
import {useTodos} from "./useTodos";

export const Todo = () => {
  const {todos, addTodo, toggleTodo} = useTodos();

  return (
    <div className="container">
      <TodoInput onItemAdded={addTodo}/>
      <div className="todos">
        {todos.map(todo => <TodoItem key={todo.id} todo={todo} onToggleItem={toggleTodo}/>)}
      </div>
    </div>
  )
}