import { IWeatherPeriodParams } from '../types';
import { RequestError } from '../utils/RequestError';

export const parseWeatherPeriodParams = (
    params: unknown
): IWeatherPeriodParams => {
    if (typeof params !== 'object' || params === null) {
        throw new RequestError('Invalid Request Body');
    }
    const result = {
        lat: 0,
        lon: 0,
        dt: 0,
        dtEnd: 0,
    };
    const errors: string[] = [];
    const lat = Object.getOwnPropertyDescriptor(params, 'lat');
    const lon = Object.getOwnPropertyDescriptor(params, 'lon');
    const dt = Object.getOwnPropertyDescriptor(params, 'dt');
    const dtEnd = Object.getOwnPropertyDescriptor(params, 'dtEnd');

    if (lat?.value === undefined || isNaN(Number(lat.value))) {
        errors.push('property lat of type number required');
    } else {
        result.lat = Number(lat.value);
    }
    if (lon?.value === undefined || isNaN(Number(lon.value))) {
        errors.push('property lon of type number required');
    } else {
        result.lon = Number(lon.value);
    }
    if (dt?.value === undefined || isNaN(Number(dt.value))) {
        errors.push('property dt of type number required');
    } else {
        result.dt = Number(dt.value);
    }
    if (dtEnd?.value === undefined || isNaN(Number(dtEnd.value))) {
        errors.push('property dtEnd of type number required');
    } else {
        result.dtEnd = Number(dtEnd.value);
    }

    if (result.dt === 0 && result.dtEnd === 0) {
        throw new RequestError(errors.join(', '));
    }

    if (result.dt > result.dtEnd) {
        errors.push(`dt ${result.dt} is greater than dtEnd ${result.dtEnd}`);
    } else if (result.dtEnd - result.dt >= 86400) {
        errors.push(`period is greater than 24 hours`);
    }

    if (errors.length > 0) {
        throw new RequestError(errors.join(', '));
    } else {
        return result;
    }
};
