// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
import { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda';
import { weatherPeriod } from '../services/weatherPeriod';
import { CustomError } from '../utils/CustomError';
import { parseWeatherPeriodParams } from '../openWeather/parseWeatherPeriodParams';
import { RequestError } from '../utils/RequestError';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
export const lambdaHandler = async (
    event: APIGatewayEvent,
    context: APIGatewayEventRequestContext
) => {
    try {
        if (!event.body) throw new RequestError('Request Body Required');
        const params = parseWeatherPeriodParams(JSON.parse(event.body));
        const weatherData = await weatherPeriod(params);
        return {
            statusCode: 200,
            body: weatherData,
        };
    } catch (err: any) {
        if (err instanceof CustomError) {
            return {
                statusCode: err.statusCode,
                body: JSON.stringify({ error: err.message }),
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Something went wrong' }),
            };
        }
    }
};
