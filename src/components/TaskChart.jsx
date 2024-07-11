import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../contexts/TasksContext";
import calculateTimeSpentPerHour from "../utils/calculateTimeSpend";
import generateTasks from "../utils/generateTasks";
import "../assets/styles/chart.css"

export default function TaskChart() {
    const taskContext = useContext(TaskContext);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    
    const timerFormattedData = calculateTimeSpentPerHour(taskContext.tasks);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function handlegenerateTasks() {
        taskContext.fillWithTasks(generateTasks());
    }

    return (
        <>
        { viewportWidth > 799 ? (<div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={timerFormattedData}>
                            <CartesianGrid strokeLinecap="3 2" />
                            <XAxis dataKey="time" />
                            <YAxis ticks={[0, 15, 30, 45, 60]} />
                            <Tooltip content={(props) => (
                                <div>
                                    {props.payload?.map((item) => {
                                        const spend = item.payload.spend;
                                        
                                        const formattedSpend = spend < 1 ? spend * 60 + " sec" : spend.toFixed(1) + " min";

                                        return (
                                            <div className="chart_tip" key = {item.payload.time}>
                                                <p> spend: {formattedSpend} </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )} />
                            <Legend />
                            <Bar dataKey="spend" fill="#2626E2" name="Minutes in this hours" />
                        </BarChart>
                </ResponsiveContainer>
                <button className = "generate_btn" onClick={handlegenerateTasks}>generate</button>
            </div>) : <p>Please turn your device over to see the chart.</p>
        }  
        </>
        
    )
}
