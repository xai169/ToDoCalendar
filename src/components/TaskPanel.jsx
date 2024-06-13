import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

const TaskPanel = ({ selectedDate, tasks, handleAddTask, handleToggleTask, handleDeleteTask }) => {
  const dateKey = selectedDate.toDateString();
  const taskList = tasks[dateKey] || [];

  return (
    <div className="task-panel">
      <header className="task-panel__header">
        <h2>Задачи на {format(selectedDate, 'dd MMMM yyyy года', { locale: ru })}</h2>
      </header>
      <ul className="task-panel__task-list">
        {taskList.length > 0 ? (
          taskList.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              onToggleTask={() => handleToggleTask(selectedDate, index)}
              onDeleteTask={() => handleDeleteTask(selectedDate, index)}
            />
          ))
        ) : (
          <p>На эту дату задач нет.</p>
        )}
      </ul>
      <AddTaskForm onAddTask={handleAddTask} />
    </div>
  );
}

export default TaskPanel;
