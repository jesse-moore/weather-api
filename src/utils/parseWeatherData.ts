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
        weatherDto.dewPoint = average(weatherDto.dewPoint, block.dew_point);
        weatherDto.heatIndex =
            block.temp > 27
                ? max(weatherDto.heatIndex, block.feels_like)
                : undefined;
        weatherDto.humidity = average(weatherDto.humidity, block.humidity);
        weatherDto.maxTemp = max(weatherDto.maxTemp, block.temp);
        weatherDto.minTemp = min(weatherDto.minTemp, block.temp);
        weatherDto.maxPressure = max(weatherDto.maxPressure, block.pressure);
        weatherDto.minPressure = min(weatherDto.minPressure, block.pressure);
        weatherDto.uvi = max(weatherDto.uvi, block.uvi);
        weatherDto.visibility = min(weatherDto.visibility, block.visibility);
        weatherDto.windChill =
            block.temp < 5
                ? min(weatherDto.windChill, block.feels_like)
                : undefined;
        weatherDto.windDirection = average(
            weatherDto.windDirection,
            block.wind_deg
        );
        weatherDto.windGust = max(weatherDto.windGust, block.wind_gust);
        weatherDto.windSpeed = max(weatherDto.windSpeed, block.wind_speed);
    });

    return weatherDto;
};
