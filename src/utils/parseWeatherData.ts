import { WeatherDto } from '../models/weatherDto';
import { HourlyDataBlock } from '../types';
import { calcNearestHour, average, min, max } from './math';

export const condenseHourlyData = (
    hourly: HourlyDataBlock[],
    start: number,
    end: number
): WeatherDto => {
    const weatherDto = new WeatherDto();
    const startTime = calcNearestHour(start, 'start');
    const endTime = calcNearestHour(end, 'end');
    const blocks = hourly.filter((block) => {
        return block.dt > startTime && block.dt < endTime;
    });

    blocks.forEach((block) => {
        weatherDto.cloudCover = average(weatherDto.cloudCover, block.clouds);
        weatherDto.maxTemp = max(weatherDto.maxTemp, block.temp);
        weatherDto.minTemp = min(weatherDto.minTemp, block.temp);
    });

    return weatherDto;
};
