import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './App.css';
import TaskItem from './components/TaskItem';
import AddTaskForm from './components/AddTaskForm';
import { FaTimes } from 'react-icons/fa';


Modal.setAppElement('#root');

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState({});
  
  const openModal = (date) => {
    setSelectedDate(date);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

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
      const updatedTasks = [...prevTasks[dateKey]]; // Копируем массив задач для изменения
      updatedTasks[index] = { ...updatedTasks[index], done: !updatedTasks[index].done }; // Обновляем задачу с новым состоянием выполнения
      return { ...prevTasks, [dateKey]: updatedTasks }; // Возвращаем новый объект состояния
    });
  }

  return (
    <div className="todo-calendar">
      <header className="todo-calendar__header">
        <h1>Календарь задач</h1>
      </header>
      <main>
        <Calendar
          onClickDay={(value) => openModal(value)}
          locale="ru-RU"
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Task Modal"
          className="todo-calendar__modal"
          overlayClassName="Overlay"
        >
          <header className="todo-calendar__modal-header">
            <h2>Задачи на {format(selectedDate, 'dd MMMM yyyy года', { locale: ru })}</h2>
            <button className="todo-calendar__close-button" onClick={closeModal}>
              <FaTimes />
            </button>
          </header>
          <ul className="todo-calendar__task-list">
            {(tasks[selectedDate.toDateString()] || []).map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                onToggleTask={() => handleToggleTask(selectedDate, index)}
                onDeleteTask={() => handleDeleteTask(selectedDate, index)}
              />
            ))}
          </ul>
          <AddTaskForm onAddTask={handleAddTask} />
        </Modal>
      </main>
    </div>
  );
}

export default App;
