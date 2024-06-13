import React, { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task);
      setTask('');
    }
  }

  return (
    <form className="todo-calendar__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-calendar__input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Новая задача"
      />
      <button className="todo-calendar__button" type="submit">Добавить задачу</button>
    </form>
  );
}

export default AddTaskForm;
