import { openWeather } from '../services/axios';
import { HourlyDataBlock, IWeatherPeriodParams } from '../types';

export const fetchWeather = async (
    params: IWeatherPeriodParams
): Promise<HourlyDataBlock[]> => {
    const { lat, lon, dt, dtEnd } = params;
    const hourlyData: HourlyDataBlock[] = [];
    try {
        const response = await openWeather.get('', {
            params: { dt, lat, lon },
        });

        if (response.data.hourly) {
            hourlyData.push(response.data.hourly);
        }

        const lastHourBlockTime = hourlyData[hourlyData.length - 1].dt;

        if (dtEnd - 1800 > lastHourBlockTime) {
            const additionalResponse = await openWeather.get('', {
                params: { dt: lastHourBlockTime + 3600, lat, lon },
            });
            hourlyData.push(additionalResponse.data.hourly);
        }

        return hourlyData;
    } catch (error) {
        return [];
    }
};
