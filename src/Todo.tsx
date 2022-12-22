import {KeyboardEvent, ChangeEvent, useState} from "react";
import {v4 as uuid} from 'uuid';

type TodoType = {
  id: string;
  content: string;
  completed: boolean;
}

export const Todo = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoType[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodo(value);
  }

  const handleKeyDown = (e:KeyboardEvent<HTMLElement>) => {
    if(e.key === 'Enter') {
      const id = uuid();
      setTodos([...todos, {id: id, content: todo, completed: false}])
      setTodo('');
    }
  }

  const onClickItem = (id: string) => {
    setTodos(todos.map(todo => {
      if(todo.id === id) {
        return {...todo, completed: !todo.completed}
      }
      return todo;
    }))
  }

  return (
    <div className="container">
      <input type="text" value={todo} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Buy some milk..." />
      <div className="todos">
        {todos.map(todo =>
          <div className={`todoItem ${todo.completed ? "complete" : "incomplete"}`} key={todo.id} onClick={() => onClickItem(todo.id)}>
            {
              todo.completed ?
                (
                  <span className="material-symbols-outlined">
                  check_circle
                  </span>
                ):
                (
                  <span className="material-symbols-outlined">
                  radio_button_unchecked
                  </span>
                )
            }
            
            <span className="itemContent" data-completed={todo.completed ? todo.completed : undefined}>{todo.content}</span>

            <span className="material-symbols-outlined delete">
            delete
            </span>
          </div>)}
      </div>
    </div>
  )
}