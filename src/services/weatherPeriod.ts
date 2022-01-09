import { fetchWeather } from '../openWeather/fetchWeather';
import {
    condenseHourlyData,
    filterOWMHourlyData,
} from '../openWeather/parseWeatherData';
import { IWeatherPeriodParams } from '../types';
import { OWM_KEY } from '../config';
import { ServerError } from '../utils/ServerError';

export const weatherPeriod = async (params: IWeatherPeriodParams) => {
    const { dt, dtEnd } = params;
    if (!OWM_KEY || OWM_KEY === 'token') {
        throw new ServerError('Invalid Open Weather Map API Key');
    }
    const hourlyData = await fetchWeather(params);
    const filteredHourlyData = filterOWMHourlyData(hourlyData, dt, dtEnd);
	return condenseHourlyData(filteredHourlyData);
};
