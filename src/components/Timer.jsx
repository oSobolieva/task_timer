import { useContext } from "react";
import { TaskContext } from "../contexts/TasksContext";
import { formatSeconds, formatTime } from '../utils/formatting';
import { TimerContext } from '../contexts/TimerContext';

export default function Timer({ inputValue, showWarning, resetInput }) {
    const { buttonTitle, startTimer, stopTimer, seconds } = useContext(TimerContext);
    const taskContext = useContext(TaskContext);

    const handleButtonClick = () => {
        if (buttonTitle === "start") {
            startTimer();
        } else {
            if (inputValue.current.value.trim()) {
                const task = {
                    startTime: formatTime(new Date(parseInt(localStorage.getItem('timerStartTime'), 10))),
                    endTime: formatTime(new Date()),
                    spendTime: formatSeconds(seconds),
                    title: inputValue.current.value,
                    id: generateId(),
                };

                taskContext.addNewTask(task);
                stopTimer();
                resetInput();
            } else {
                showWarning();
            }
        }
    };
    
    return (
        <>
            <div className="timer_container">
                <p>{formatSeconds(seconds)}</p>
            </div>
            <button className="timer_button" onClick={handleButtonClick}>{buttonTitle}</button>
        </>
    );
}

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
