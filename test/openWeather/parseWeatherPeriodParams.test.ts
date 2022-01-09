import { expect } from 'chai';
import { parseWeatherPeriodParams } from '../../src/openWeather/parseWeatherPeriodParams';
describe('parseWeatherPeriodParams', () => {
    it('should return value in correct format', () => {
        const result = parseWeatherPeriodParams({
            lat: '11',
            lon: 22, 
            dt: 33,
            dtEnd: 44,
        });
        expect(result).to.have.property('lat');
        expect(result).to.have.property('lon');
        expect(result).to.have.property('dt');
        expect(result).to.have.property('dtEnd');
        expect(result.lat).to.equal(11);
        expect(result.lon).to.equal(22);
        expect(result.dt).to.equal(33);
        expect(result.dtEnd).to.equal(44);
    });

    it('should throw error if no params', () => {
        const params = undefined;
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params)
        ).to.throw('Invalid Request Body');

        const params2 = { lon: 22, dt: 33 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params2)
        ).to.throw('property lat of type number required');
    });
    it('should throw error for invalid lat param', () => {
        const params = { lat: 'invalid', lon: 22, dt: 33 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params)
        ).to.throw('property lat of type number required');

        const params2 = { lon: 22, dt: 33 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params2)
        ).to.throw('property lat of type number required');
    });
    it('should throw error for invalid lon param', () => {
        const params = { lat: 11, lon: 'invalid', dt: 33 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params)
        ).to.throw('property lon of type number required');

        const params2 = { lat: 22, dt: 33 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params2)
        ).to.throw('property lon of type number required');
    });
    it('should throw error for invalid dt param', () => {
        const params = { lat: 11, lon: 11, dt: 'invalid' };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params)
        ).to.throw('property dt of type number required');

        const params2 = { lat: 22, lon: 33 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params2)
        ).to.throw('property dt of type number required');
    });
    it('should throw error for invalid dtEnd param', () => {
        const params = { lat: 11, lon: 11, dtEnd: 'invalid', dt: 33 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params)
        ).to.throw('property dtEnd of type number required');

        const params2 = { lat: 22, lon: 33, dt: 44 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params2)
        ).to.throw('property dtEnd of type number required');
    });
    it('should throw error for dtEnd is greater than dt', () => {
        const params = { lat: 11, lon: 11, dtEnd: 22, dt: 33 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params)
        ).to.throw('dt 33 is greater than dtEnd 22');
    });
    it('should throw error for period greater than 24 hours', () => {
        const params = { lat: 11, lon: 11, dtEnd: 1641740400, dt: 1641654000 };
        expect(
            parseWeatherPeriodParams.bind(parseWeatherPeriodParams, params)
        ).to.throw('period is greater than 24 hours');
    });
});
