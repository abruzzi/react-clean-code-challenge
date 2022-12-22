import { TodoType } from "./types";

export const TodoItem = ({
  todo,
  onToggleItem,
  onDeleteItem,
}: {
  todo: TodoType;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}) => {
  return (
    <div
      className={`todoItem ${todo.completed ? "complete" : "incomplete"}`}
      data-testid="todo-item-container"
    >
      <div className="todoItemContent" onClick={() => onToggleItem(todo.id)}>
        <span className="material-symbols-outlined">
          {todo.completed ? "check_circle" : "radio_button_unchecked"}
        </span>

        <span
          className="itemContent"
          data-testid="content"
          data-completed={todo.completed ? todo.completed : undefined}
        >
          {todo.content}
        </span>
      </div>

      <span
        className="material-symbols-outlined delete"
        data-testid="delete"
        onClick={() => onDeleteItem(todo.id)}
      >
        delete
      </span>
    </div>
  );
};
