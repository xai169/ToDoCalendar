import React from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const TaskItem = ({ task, onToggleTask, onDeleteTask }) => (
  <li className={`todo-calendar__task ${task.done ? 'todo-calendar__task--done' : ''}`}>
    {task.text}
    <div>
      <button className="todo-calendar__button" onClick={() => onToggleTask(task)}>
        <FaCheck />
      </button>
      <button className="todo-calendar__button" onClick={() => onDeleteTask(task)}>
        <FaTrash />
      </button>
    </div>
  </li>
);

export default TaskItem;