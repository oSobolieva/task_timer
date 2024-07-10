import { formatTime, formatSeconds } from "./formatting";

function getRandomTime() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const randomTime = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomTime;
}

function getRandomSeconds() {
    return Math.floor(Math.random() * (60000 - 10 + 1)) + 10;
}

function generateTasks() {
    const tasks = [];
    let previousEndTime = null;

    for (let i = 0; i < (Math.floor(Math.random() * 6) + 10); i++) {
        let startTime;
        if (previousEndTime) {
            startTime = new Date(previousEndTime.getTime() + (Math.floor(Math.random() * 360000) + 100));
            startTime.setSeconds(startTime.getSeconds() + 1); 
        } else {
            startTime = getRandomTime();
        }

        const duration = Math.floor(Math.random() * 31) + 10;
        const endTime = new Date(startTime.getTime() + duration * 60000);

        tasks.push({
            id: i + 1,
            title: `Task ${i + 1}`,
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            spendTime: formatSeconds(duration * 60), 
        });

        previousEndTime = endTime;
    }


    return tasks;
}


export default generateTasks;
