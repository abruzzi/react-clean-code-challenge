import { motion } from "framer-motion";
import { TodoType } from "./types";

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 10,
      duration: 10
    }
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 10,
      duration: 10
    }
  }
}

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
    <motion.div
      initial='visible'
      animate='visible'
      exit='hidden'
      variants={variants}
      layoutId={todo.id}
      className={`todoItem ${todo.completed ? "complete" : "incomplete"}`}
      data-testid="todo-item-container"
    >
      <div className="todoItemContent" onClick={() => onToggleItem(todo.id)}>
        <button>
          <span className="material-symbols-outlined toggleIcon">
            {todo.completed ? "task_alt" : "radio_button_unchecked"}
          </span>
        </button>

        <span
          className="itemContent"
          data-testid="content"
          data-completed={todo.completed ? todo.completed : undefined}
        >
          {todo.content}
        </span>
      </div>

      <button onClick={() => onDeleteItem(todo.id)}>
        <span
          className="material-symbols-outlined delete"
          data-testid="delete"
        >
          delete
        </span>
      </button>
    </motion.div>
  );
};
