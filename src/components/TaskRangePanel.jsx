// TaskRangePanel.jsx
import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import TaskItem from './TaskItem';

const TaskRangePanel = ({ tasks, range, handleToggleTask, handleDeleteTask }) => {
  const [startDate, endDate] = range;

  const filteredTasks = Object.keys(tasks).reduce((acc, date) => {
    const taskDate = new Date(date);
    if (taskDate >= startDate && taskDate <= endDate) {
      acc[date] = tasks[date];
    }
    return acc;
  }, {});

  return (
    <div className="task-range-panel">
      <header className="task-range-panel__header">
        <h2>Задачи с {format(startDate, 'dd MMMM yyyy', { locale: ru })} по {format(endDate, 'dd MMMM yyyy', { locale: ru })}</h2>
      </header>
      <ul className="task-range-panel__task-list">
        {Object.keys(filteredTasks).length > 0 ? (
          Object.entries(filteredTasks).map(([date, taskList]) => (
            <div key={date}>
              <h3>Задачи на {format(new Date(date), 'dd MMMM yyyy года', { locale: ru })}:</h3>
              {taskList.map((task, index) => (
                <TaskItem
                  key={index}
                  task={task}
                  onToggleTask={() => handleToggleTask(new Date(date), index)}
                  onDeleteTask={() => handleDeleteTask(new Date(date), index)}
                />
              ))}
            </div>
          ))
        ) : (
          <p>Задач за выбранный промежуток времени нет.</p>
        )}
      </ul>
    </div>
  );
}

export default TaskRangePanel;
