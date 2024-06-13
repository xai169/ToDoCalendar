import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import TaskPanel from './components/TaskPanel';
import TaskRangePanel from './components/TaskRangePanel';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [range, setRange] = useState([null, null]);
  const [isRangeMode, setIsRangeMode] = useState(false);

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

  const handleRangeChange = (value) => {
    if (!range[0] || (range[0] && range[1])) {
      setRange([value, null]);
    } else {
      setRange([range[0], value]);
    }
  }

  const handleDateClick = (value) => {
    if (isRangeMode) {
      handleRangeChange(value);
    } else {
      setSelectedDate(value);
    }
  }

  return (
    <div className="todo-calendar">
      <header className="todo-calendar__header">
        <h1>Календарь задач</h1>
        <div className="switch-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={isRangeMode}
              onChange={() => setIsRangeMode(!isRangeMode)}
            />
            <span className="slider round"></span>
          </label>
          <span className="switch-label">Режим выбора диапазона</span>
        </div>
      </header>
      <main className="todo-calendar__main">
        <Calendar
          onClickDay={handleDateClick}
          locale="ru-RU"
          selectRange={isRangeMode}
        />
        {isRangeMode && range[0] && range[1] ? (
          <TaskRangePanel
            tasks={tasks}
            range={range}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
          />
        ) : (
          <TaskPanel
            selectedDate={selectedDate}
            tasks={tasks}
            handleAddTask={handleAddTask}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
