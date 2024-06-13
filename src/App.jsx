import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import TaskPanel from './components/TaskPanel'; // Импортируем новый компонент

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});

  const handleAddTask = (task) => {
    const dateKey = selectedDate.toDateString();
    setTasks(prevTasks => ({
      ...prevTasks,
      [dateKey]: [...(prevTasks[dateKey] || []), { text: task, done: false }]
    }));
  }

  const handleDeleteTask = (date, index) => {
    const dateKey = date.toDateString();
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks[dateKey]];
      updatedTasks.splice(index, 1);
      return { ...prevTasks, [dateKey]: updatedTasks };
    });
  }

  const handleToggleTask = (date, index) => {
    const dateKey = date.toDateString();
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks[dateKey]];
      updatedTasks[index] = { ...updatedTasks[index], done: !updatedTasks[index].done };
      return { ...prevTasks, [dateKey]: updatedTasks };
    });
  }

  return (
    <div className="todo-calendar">
      <header className="todo-calendar__header">
        <h1>Календарь задач</h1>
      </header>
      <main className="todo-calendar__main">
        <Calendar
          onClickDay={(value) => setSelectedDate(value)}
          locale="ru-RU"
        />
        <TaskPanel
          selectedDate={selectedDate}
          tasks={tasks}
          handleAddTask={handleAddTask}
          handleToggleTask={handleToggleTask}
          handleDeleteTask={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
