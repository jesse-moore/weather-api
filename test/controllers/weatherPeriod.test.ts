import { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda';
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { lambdaHandler } from '../../src/controllers/weatherPeriod';
import * as parseParams from '../../src/openWeather/parseWeatherPeriodParams';
import * as service from '../../src/services/weatherPeriod';
import _event from '../data/event.json';

describe('handler', () => {
    let parseParamsStub: SinonStub;
    let serviceStub: SinonStub;

    before(() => {
        parseParamsStub = sinon.stub(parseParams, 'parseWeatherPeriodParams');
        serviceStub = sinon.stub(service, 'weatherPeriod');
    });

    afterEach(() => {
        sinon.reset();
    });

    it('should call the functions once', async () => {
        const event = _event as unknown as APIGatewayEvent;
        const context = {} as unknown as APIGatewayEventRequestContext;
        await lambdaHandler(event, context);
        expect(parseParamsStub.calledOnce).to.be.true;
        expect(serviceStub.calledOnce).to.be.true;
    });
    it('should return correct response', async () => {
        const event = _event as unknown as APIGatewayEvent;
        const context = {} as unknown as APIGatewayEventRequestContext;
        serviceStub.onFirstCall().returns({ data: 'data' });
        const result = await lambdaHandler(event, context);
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.equal('{"data":"data"}');
    });
    it('should response with error response for missing request body', async () => {
        const event = {} as unknown as APIGatewayEvent;
        const context = {} as unknown as APIGatewayEventRequestContext;
        const result = await lambdaHandler(event, context);
        expect(result.statusCode).to.equal(400);
        expect(result.body).to.equal('{"error":"Request Body Required"}');
    });
    it('should response with 500 error response for unconventional errors', async () => {
        const event = _event as unknown as APIGatewayEvent;
        const context = {} as unknown as APIGatewayEventRequestContext;
        serviceStub.throws(new Error('unconventional error'));
        const result = await lambdaHandler(event, context);
        expect(result.statusCode).to.equal(500);
        expect(result.body).to.equal('{"error":"Something went wrong"}');
    });
});
