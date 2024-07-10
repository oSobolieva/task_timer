
const calculateTimeSpentPerHour = require('../utils/calculateTimeSpend');

describe('calculateTimeSpentPerHour', () => {
    test(
        'Test is return correct time spent per hour for intervals within the same day.',
        () => {
            const timeIntervals = [{startTime: '17:01:05', endTime: '17:01:35', spendTime: '00:00:30', title: 'test1', id: '000'},
            {startTime: '01:02:05', endTime: '01:05:05', spendTime: '00:03:00', title: 'test1', id: '000'},
            {startTime: '11:00:00', endTime: '11:05:30', spendTime: '00:05:30', title: 'test1', id: '000'}];

            const expected = Array.from({ length: 24 }, (_, i) => ({ time: i, spend: 0 }));

            expected[1].spend = 3;
            expected[17].spend = 0.5;
            expected[11].spend = 5.5;

            expect(calculateTimeSpentPerHour(timeIntervals)).toEqual(expected);
        }
    );

    test('should handle intervals crossing midnight', () => {
        const timeIntervals = [{ startTime: '23:30:00', endTime: '01:10:00', spendTime: '00:20:20', title: 'test2', id: '000' }];
        
        const expected = Array.from({ length: 24 }, (_, i) => ({ time: i, spend: 0 }));

        expected[23].spend = 30;
        expected[0].spend = 60;
        expected[1].spend = 10;

        expect(calculateTimeSpentPerHour(timeIntervals)).toEqual(expected);
    });
    
    test('should return zero time spent for an empty array of intervals', () => {
        const timeIntervals = [];

        const expected = Array.from({ length: 24 }, (_, i) => ({ time: i, spend: 0 }));

        expect(calculateTimeSpentPerHour(timeIntervals)).toEqual(expected);
    });

    test('should handle intervals within a single hour', () => {
        const timeIntervals = [
        { startTime: '15:15:00', endTime: '15:45:00', spendTime: '00:30:00', title: 'test4', id: '000' },
        ];

        const expected = Array.from({ length: 24 }, (_, i) => ({ time: i, spend: 0 }));

        expected[15].spend = 30;

        expect(calculateTimeSpentPerHour(timeIntervals)).toEqual(expected);
    });

})

