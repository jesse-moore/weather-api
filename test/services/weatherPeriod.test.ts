import sinon, { SinonStub } from 'sinon';
import { weatherPeriod } from '../../src/services/weatherPeriod';
import * as owm from '../../src/openWeather/parseWeatherData';
import * as fetch from '../../src/openWeather/fetchWeather';
import * as config from '../../src/config';
import { expect } from 'chai';
import { ServerError } from '../../src/utils/ServerError';

describe('weatherPeriod Service', () => {
    const time1 = 1641594956;
    const time2 = 1641596756;
    const lat = 36.196729;
    const lon = -94.141742;
    let fetchWeather: SinonStub;
    let condenseHourlyData: SinonStub;
    let filterOWMHourlyData: SinonStub;

    beforeEach(() => {
        fetchWeather = sinon.stub(fetch, 'fetchWeather');
        condenseHourlyData = sinon.stub(owm, 'condenseHourlyData');
        filterOWMHourlyData = sinon.stub(owm, 'filterOWMHourlyData');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should call functions once', async () => {
        await weatherPeriod({
            lat,
            lon,
            dt: time1,
            dtEnd: time2,
        });
        expect(fetchWeather.calledOnce).to.be.true;
        expect(condenseHourlyData.calledOnce).to.be.true;
        expect(filterOWMHourlyData.calledOnce).to.be.true;
    });
    it('should throw error with invalid api key', () => {
        sinon.stub(config, 'OWM_KEY').value('token');
        weatherPeriod({
            lat,
            lon,
            dt: time1,
            dtEnd: time2,
        }).catch((error) => {
            expect(error).to.be.instanceOf(ServerError);
            expect(error.message).to.equal('Invalid Open Weather Map API Key');
        });
    });
});
