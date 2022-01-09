import sinon, { SinonStub } from 'sinon';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { ServerError } from '../../src/utils/ServerError';
import { openWeather } from '../../src/services/axios';
import { fetchWeather } from '../../src/openWeather/fetchWeather';
import fullday from '../data/fullDay.json';
import partialDay from '../data/partialDay.json';
import testData from '../data/testData.json';
import testData2 from '../data/testData2.json';

describe('fetchWeather', () => {
    const startTime = 1641680100; // Saturday, January 8, 2022 16:15:00 GMT-06:00
    const endTime1 = 1641685500; // Saturday, January 8, 2022 17:45:00 GMT-06:00
    const endTime2 = 1641685500; // Saturday, January 8, 2022 18:25:00 GMT-06:00
    const lat = 36.196729;
    const lon = -94.141742;
    let openWeatherStub: SinonStub;
    let axiosMock: MockAdapter;
    before(function () {
        axiosMock = new MockAdapter(openWeather);
    });

    beforeEach(function () {});

    afterEach(function () {
        axiosMock.reset();
        sinon.restore();
    });
    it('should fetch once with correct params', async function () {
        openWeatherStub = sinon.stub(openWeather, 'get').resolves();
        openWeatherStub.onFirstCall().returns({ data: fullday });
        await fetchWeather({ lat, lon, dt: startTime, dtEnd: endTime1 });
        expect(openWeatherStub.calledOnce).to.be.true;
        const args = openWeatherStub.args[0];
        expect(args[0]).to.equal('');
        expect(args[1]).to.deep.equal({ params: { dt: endTime1, lat, lon } });
    });
    it('should return 24 hours of hourly data plus current weather', async function () {
        axiosMock.onGet().replyOnce(200, testData).onAny().reply(501);
        const response = await fetchWeather({
            lat,
            lon,
            dt: startTime,
            dtEnd: endTime1,
        });
        expect(axiosMock.history.get[0].params).to.deep.equal({
            units: 'metric',
            appid: 'testing',
            dt: endTime1,
            lat,
            lon,
        });
        expect(axiosMock.history.get.length).to.equal(1);
        expect(Array.isArray(response)).to.be.true;
        expect(response.length).to.be.equal(25);
    });
    it('should return 26 hours of hourly data', async function () {
        axiosMock
            .onGet()
            .replyOnce(200, partialDay)
            .onGet()
            .replyOnce(200, fullday)
            .onAny()
            .reply(501);
        const response = await fetchWeather({
            lat,
            lon,
            dt: startTime,
            dtEnd: endTime2,
        });
        expect(axiosMock.history.get.length).to.equal(2);
        expect(axiosMock.history.get[0].params).to.deep.equal({
            units: 'metric',
            appid: 'testing',
            dt: endTime2,
            lat,
            lon,
        });
        expect(axiosMock.history.get[1].params).to.deep.equal({
            units: 'metric',
            appid: 'testing',
            dt: startTime,
            lat,
            lon,
        });
        expect(Array.isArray(response)).to.be.true;
        expect(response.length).to.be.equal(27);
    });
    it('should handle errors from open weather map', async function () {
        axiosMock
            .onGet()
            .replyOnce(400, {
                cod: '400',
                message:
                    'requested time is out of allowed range of 5 days back',
            })
            .onAny()
            .reply(501);

        await fetchWeather({
            lat,
            lon,
            dt: startTime,
            dtEnd: endTime1,
        }).catch((err) => {
            expect(err).to.be.instanceOf(ServerError);
            expect(err.message).to.be.equal(
                'requested time is out of allowed range of 5 days back'
            );
            expect(err.statusCode).to.equal(500);
        });
    });
    it('should handle unconventional errors from open weather map', async function () {
        axiosMock.onGet().replyOnce(400).onAny().reply(501);

        await fetchWeather({
            lat,
            lon,
            dt: startTime,
            dtEnd: endTime1,
        }).catch((err) => {
            expect(err).to.be.instanceOf(ServerError);
            expect(err.message).to.be.equal('Server Error');
            expect(err.statusCode).to.equal(500);
        });
    });
});
