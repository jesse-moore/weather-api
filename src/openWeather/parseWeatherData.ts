import { WeatherDto } from '../models/weatherDto';
import { HourlyDataBlock } from '../types';
import { calcNearestHour, average, min, max } from '../utils/math';

export const filterOWMHourlyData = (
    hourly: HourlyDataBlock[],
    start: number,
    end: number
): HourlyDataBlock[] => {
    const startTime = calcNearestHour(start, 'start');
    return hourly.filter((block) => {
        return block.dt > startTime && block.dt <= end;
    });
};

export const condenseHourlyData = (hourlyBlocks: HourlyDataBlock[]): WeatherDto => {
    const weatherDto = new WeatherDto();
    const conditions = new Set<string>();
    const icons = new Set<number>();

    hourlyBlocks.forEach((block) => {
        block.weather.forEach(({ description, id }) => {
            conditions.add(description);
            icons.add(id);
        });
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

    weatherDto.conditions = Array.from(conditions);
    weatherDto.icons = Array.from(icons);

    return weatherDto;
};
