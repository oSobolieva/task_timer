import '../assets/styles/main.css'
import { useEffect, useRef, useState } from 'react';

import Timer from './Timer';
import Modal from './Modal';
import { NavLink, Outlet } from 'react-router-dom';
import { TimerProvider } from '../contexts/TimerContext';

export default function HomePage() {
  const inputValue = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function showWarning() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    const savedInputValue = localStorage.getItem('inputValue');
    if (savedInputValue) {
      inputValue.current.value = savedInputValue;
    }
  }, []);

  function handleInputChange() {
    localStorage.setItem('inputValue', inputValue.current.value);
  }

  function resetInput() {
    inputValue.current.value = "";
    localStorage.removeItem('inputValue');
  }

  return (
    <TimerProvider>
      <input placeholder='Name of your task' ref={inputValue}  onChange={handleInputChange}/>
      <Timer inputValue={inputValue} showWarning={showWarning} resetInput={resetInput} />
      <div className = "menu_container">
        <NavLink to="/log" className={({ isActive }) => isActive ? 'menu_button_checked' : undefined}>tasks log</NavLink>
        <NavLink to="/chart" className={({ isActive }) => isActive ? 'menu_button_checked' : undefined}>tasks chart</NavLink>
      </div>
      
      <Outlet/>
      
      {isModalOpen && (
        <Modal title="Empty task name"
          message="You are trying close your task without name, enter the title and try again!"
          onClose={closeModal}
          isOpen={isModalOpen} />
      )}
    </TimerProvider>
  );
}

