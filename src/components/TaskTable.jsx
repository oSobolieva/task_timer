import { useContext, useState, useEffect } from 'react';
import '../assets/styles/table.css'
import { TaskContext } from "../contexts/TasksContext";
import TableRow from './TableRow';

export default function TaskTable() {
    const taskContext = useContext(TaskContext);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <>
            {viewportWidth > 799 ? (<table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Task</th>
                        <th>Time start</th>
                        <th>Time end</th>
                        <th>Time spend</th>
                        <th>Info</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {taskContext.tasks.map((el, ind) => (
                        <TableRow ind={ind}
                            id={el.id} title={el.title} startTime={el.startTime} endTime={el.endTime} spendTime={el.spendTime}
                            key={el.id} />
                    ))}
                </tbody>
            </table>) : <p>Please turn your device over to see the table.</p>
            }
        </>        
    )
}



