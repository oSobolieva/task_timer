import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext } from "../contexts/TasksContext"
import { useContext } from 'react';

import "../assets/styles/taskDetail.css"

export default function TaskDetailPage() {
    const { ind } = useParams();

    const navigate = useNavigate();
    const taskContext = useContext(TaskContext);
    const [task] = taskContext.getTask(ind);

    return (
        <>
            <button className = "detail_home_button" onClick={() => navigate('/')}>&#8617;</button>
            <div className = "detail_header">
                <h1>{task.title}</h1>
                <p>id: {task.id}</p>
                <p>№ {ind}</p>
            </div>
            <div className = "detail_info">
                <p>Start Time: <span>{task.startTime}</span></p>
                <p>End Time: <span>{task.endTime}</span></p>
                <p>Spend Time: <span>{task.spendTime}</span></p>
            </div>
        </>
    )
}