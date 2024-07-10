import { useContext } from "react"
import { TaskContext } from "../contexts/TasksContext"
import { NavLink } from "react-router-dom";

export default function TableRow({ ind, id, title, startTime, endTime, spendTime }) {
    const taskContext = useContext(TaskContext);

    const deleteTask = () => taskContext.removeTask(id);

    const formatTitle = (title) => title.length > 15 ? title.substring(0, 15) + "..." : title;
    
    return (
        <tr>
            <td>{ind+1}</td>
            <td>{formatTitle(title)}</td>
            <td>{startTime}</td>
            <td>{endTime}</td>
            <td>{spendTime}</td>
            <td>
                <div className="table_button">
                    <NavLink to={`/tasks/${ind+1}`}>info</NavLink>
                </div>
                
            </td>
            <td>
                <button onClick={deleteTask}>delete</button>
            </td>
        </tr>    
    )
}

//<button>info</button>
