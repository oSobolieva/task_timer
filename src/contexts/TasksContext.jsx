import { createContext, useState, useEffect } from "react";


export const TaskContext = createContext();

export default function TaskContextProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = sessionStorage.getItem('tasks');

        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addNewTask = (task) => setTasks(tasks => [...tasks, task]);

    const removeTask = (id) => setTasks(tasks.filter((el) => el.id !== id));

    const getTask = (ind) => tasks.filter((el, i) => i + 1 == ind);
    
    const fillWithTasks = (tasks) => setTasks(tasks);

    return (
        <TaskContext.Provider value={{ tasks, addNewTask, removeTask, getTask, fillWithTasks }}>
            {children}
        </TaskContext.Provider>
    )
}
