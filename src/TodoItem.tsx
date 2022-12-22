import {TodoType} from "./types";

export const TodoItem = ({todo, onToggleItem}: { todo: TodoType, onToggleItem: (id: string) => void }) => {
  return (<div className={`todoItem ${todo.completed ? "complete" : "incomplete"}`}
               onClick={() => onToggleItem(todo.id)}>
            <span className="material-symbols-outlined">
              {todo.completed ? "check_circle" : "radio_button_unchecked"}
            </span>

    <span className="itemContent"
          data-completed={todo.completed ? todo.completed : undefined}>{todo.content}</span>

    <span className="material-symbols-outlined delete">
            delete
            </span>
  </div>)
}