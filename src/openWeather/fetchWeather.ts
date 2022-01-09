import { openWeather } from '../services/axios';
import { HourlyDataBlock, IWeatherPeriodParams } from '../types';
import { ServerError } from '../utils/ServerError';

export const fetchWeather = async (
    params: IWeatherPeriodParams
): Promise<HourlyDataBlock[]> => {
    const { lat, lon, dt, dtEnd } = params;
    const hourlyData: HourlyDataBlock[] = [];
    try {
        const response = await openWeather.get('', {
            params: { dt: dtEnd, lat, lon },
        });

        if (response.data.hourly) {
            hourlyData.push(...response.data.hourly);
        }

        if (response.data.current) {
            hourlyData.push(response.data.current);
        }

        const firstHourBlockTime = hourlyData[0].dt;

        if (dt < firstHourBlockTime) {
            const additionalResponse = await openWeather.get('', {
                params: { dt, lat, lon },
            });
            hourlyData.push(...additionalResponse.data.hourly);
            hourlyData.push(additionalResponse.data.current);
        }

        return hourlyData;
    } catch (error) {
        const { response }: any = error;
        if (response && response.data && response.data.message) {
            throw new ServerError(response.data.message);
        } else {
            throw new ServerError('Server Error');
        }
    }
};
