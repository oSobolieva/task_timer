import React, { createContext, useState, useEffect, useCallback } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setActivity] = useState(false);
    const [buttonTitle, setButtonTitle] = useState("start");

    useEffect(() => {
        const storedStartTime = localStorage.getItem('timerStartTime');
        const storedSeconds = localStorage.getItem('timerSeconds');

        if (storedStartTime && storedSeconds) {
            const elapsed = Math.floor((Date.now() - parseInt(storedStartTime, 10)) / 1000);
            setSeconds(elapsed);
            setButtonTitle("stop");
            setActivity(true);
        }
    }, []);

    const startTimer = useCallback(() => {
        const startTime = Date.now() - (seconds * 1000); 
        localStorage.setItem('timerStartTime', startTime.toString());
        localStorage.setItem('timerSeconds', seconds);
        setButtonTitle("stop");
        setActivity(true);
    }, [seconds]);

    const stopTimer = useCallback(() => {
        setActivity(false);
        setButtonTitle("start");
        setSeconds(0);
        localStorage.removeItem('timerStartTime');
        localStorage.removeItem('timerSeconds');
    }, []);

    useEffect(() => {
        let interval = null;

        if (isActive) {
            const savedStartTime = localStorage.getItem('timerStartTime');
            let startTime = savedStartTime ? parseInt(savedStartTime, 10) : Date.now();

            interval = setInterval(() => {
                const currentTime = Date.now();
                const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
                setSeconds(elapsedSeconds);
                localStorage.setItem('timerSeconds', elapsedSeconds);
            }, 1000);
        } else {
            if (interval) clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <TimerContext.Provider value={{ buttonTitle, seconds, isActive, startTimer, stopTimer, setSeconds }}>
            {children}
        </TimerContext.Provider>
    );
};
