import { openWeather } from './axios';
import { condenseHourlyData } from '../openWeather/parseWeatherData';
import { IWeatherPeriodParams } from '../types';
import { OWM_KEY } from '../config';
import { ServerError } from '../utils/ServerError';

export const weatherPeriod = async (params: IWeatherPeriodParams) => {
    if (!OWM_KEY || OWM_KEY === 'token') {
        throw new ServerError('Invalid Open Weather Map API Key');
    }
    try {
        const response = await openWeather.get('', { params });

		if (response.data.hourly)
		
        // const parsedData = condenseHourlyData(response.data);
        return response.data;
    } catch (error: any) {
        console.log(error);
        return error;
    }
};
