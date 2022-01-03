import dayjs from 'dayjs';

export function toFixed(num: number, places: number): number {
    return Math.round(10 ** places * num) / 10 ** places;
}

export function max(a?: number | null, b?: number | undefined) {
    if ((a === null || a === undefined) && (b === null || b === undefined))
        return undefined;
    if (a === null || a === undefined) return b;
    if (b === null || b === undefined) return a;
    return a < b ? b : a;
}

export function min(a?: number | null, b?: number | undefined) {
    if ((a === null || a === undefined) && (b === null || b === undefined))
        return undefined;
    if (a === null || a === undefined) return b;
    if (b === null || b === undefined) return a;
    return a > b ? b : a;
}

export function average(a?: number | null, b?: number | undefined) {
    if ((a === null || a === undefined) && (b === null || b === undefined))
        return undefined;
    if (a === null || a === undefined) return b;
    if (b === null || b === undefined) return a;
    return (a + b) / 2;
}

export const calcNearestHour = (
    time: number,
    type: 'start' | 'end'
): number => {
    const _time = dayjs(time * 1000).set('second', 0);
    if (_time.minute() > 30 && type === 'end') {
        return _time.add(1, 'hour').set('minute', 15).unix();
    } else if (_time.minute() <= 30 && type === 'start') {
        return _time.subtract(1, 'hour').set('minute', 45).unix();
    } else {
        return _time.unix();
    }
};
