

export default function calculateTimeSpentPerHour(timeIntervals) {
    const timeSpent = Array.from({ length: 24 }, (_, i) => ({ time: i, spend: 0 }));

    const timeToSeconds = (time) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    timeIntervals.forEach(interval => {
        let start = timeToSeconds(interval.startTime);
        let end = timeToSeconds(interval.endTime);

        if (end <= start) {
            end += 24 * 3600; 
        }

        while (start < end) {
            const currentHour = Math.floor((start / 3600) % 24); 
            const startOfNextHour = ((currentHour + 1) * 3600) % (24 * 3600); 
            const nextBoundary = startOfNextHour > start ? startOfNextHour : startOfNextHour + 24 * 3600; 
            const secondsToAdd = Math.min(end, nextBoundary) - start; 

            if (secondsToAdd > 0) {
                timeSpent[currentHour].spend += secondsToAdd; 
                start += secondsToAdd; 
            } else {
                timeSpent[currentHour].spend += end - start;
                break;
            }
        }
    });

    const minutesSpent = timeSpent.map(el => ({
        ...el, 
        spend: el.spend / 60 
    }));

    return minutesSpent;
}
