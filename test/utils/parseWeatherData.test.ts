import { condenseHourlyData } from '../../src/utils/parseWeatherData';
import data from '../data/owmHistSample.json';
import { HourlyDataBlock } from '../../src/types';
import { expect } from 'chai';
import { WeatherDto } from '../../src/models/weatherDto';

const start = 1641129323;
const end = 1641133403;

const test = [
    {
        dt: 1641128400,
        temp: -10.39,
        feels_like: -17.39,
        pressure: 1021,
        humidity: 88,
        dew_point: -11.82,
        uvi: 0,
        clouds: 90,
        visibility: 10000,
        wind_speed: 6.71,
        wind_deg: 330,
        weather: [[Object]],
    },
    {
        dt: 1641132000,
        temp: -10.43,
        feels_like: -17.43,
        pressure: 1022,
        humidity: 88,
        dew_point: -11.86,
        uvi: 0.09,
        clouds: 90,
        visibility: 4828,
        wind_speed: 4.92,
        wind_deg: 340,
        wind_gust: 10.28,
        weather: [[Object], [Object]],
    },
];

describe('parseWeatherData', function () {
    it('should a WeatherDto', function () {
        const hourlyData = data.hourly as HourlyDataBlock[];
        const result = condenseHourlyData(hourlyData, start, end);
        expect(result).to.be.instanceOf(WeatherDto);
    });
    it('should format correctly', () => {
        const hourlyData = data.hourly as HourlyDataBlock[];
        const result = condenseHourlyData(hourlyData, start, end);
        expect(result.cloudCover).to.be.equal(90);
        expect(result.maxTemp).to.be.equal(-10.39);
        expect(result.minTemp).to.be.equal(-10.43);
    });
});
