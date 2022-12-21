import {KeyboardEvent, ChangeEvent, useState} from "react";

export const Todo = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
  }

  const handleKeyDown = (e:KeyboardEvent<HTMLElement>) => {
    if(e.key === 'Enter') {
      setTodos([...todos, todo])
    }
  }

  return (
    <div className="container">
      <input type="text" value={todo} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Buy some milk..." />
      {todos.map(todo =>
        <div className="todoItem" key={todo}>
          <span className="material-symbols-outlined">
          check_box
          </span>
          <span className="itemContent">{todo}</span>
        </div>)}
    </div>
  )
}