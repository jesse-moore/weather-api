import { condenseHourlyData } from '../../src/openWeather/parseWeatherData';
import data from '../data/owmHistSample.json';
import data2 from '../data/owmHeatIndex.json';
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
        weather: [
            {
                id: 600,
                main: 'Snow',
                description: 'light snow',
                icon: '13n',
            },
        ],
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
        weather: [
            {
                id: 600,
                main: 'Snow',
                description: 'light snow',
                icon: '13d',
            },
            {
                id: 701,
                main: 'Mist',
                description: 'mist',
                icon: '50d',
            },
        ],
    },
];

describe('parseWeatherData', function () {
    it('should a WeatherDto', function () {
        const hourlyData = data.hourly as HourlyDataBlock[];
        const result = condenseHourlyData(hourlyData);
        expect(result).to.be.instanceOf(WeatherDto);
    });
    it('should format correctly', () => {
        const hourlyData = data.hourly as HourlyDataBlock[];
        const result = condenseHourlyData(hourlyData);
        expect(result.cloudCover).to.be.equal(90);
        expect(result.dewPoint).to.be.equal(-11.84);
        expect(result.heatIndex).to.be.undefined;
        expect(result.humidity).to.be.equal(88);
        expect(result.maxPressure).to.be.equal(1022);
        expect(result.minPressure).to.be.equal(1021);
        expect(result.maxTemp).to.be.equal(-10.39);
        expect(result.minTemp).to.be.equal(-10.43);
        expect(result.precip).to.be.undefined;
        expect(result.windChill).to.be.equal(-17.43);
        expect(result.windDirection).to.be.equal(335);
        expect(result.windGust).to.be.equal(10.28);
        expect(result.windSpeed).to.be.equal(6.71);
        expect(result.uvi).to.be.equal(0.09);
        expect(result.visibility).to.be.equal(4828);
        expect(result.conditions).to.contain('light snow');
        expect(result.conditions).to.contain('mist');
        expect(result.icons).to.contain(600);
        expect(result.icons).to.contain(701);
    });
    it('should return correct heat index', () => {
        const hourlyData = data2 as HourlyDataBlock[];
        const result = condenseHourlyData(hourlyData);
        expect(result.heatIndex).to.be.equal(101);
    });
});
