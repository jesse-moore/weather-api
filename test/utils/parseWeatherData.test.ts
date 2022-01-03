import { condenseHourlyData } from '../../src/utils/parseWeatherData'
import data from '../data/owmHistSample.json'
import { HourlyDataBlock } from '../../src/types'
import { expect } from 'chai'
import { WeatherDto } from '../../src/models/weatherDto'

const start = 1641129323
const end = 1641133403

describe('formatWeatherData', function () {
    it('should return null when no location property', function () {
        const hourlyData = data.hourly as HourlyDataBlock[]
        const result = condenseHourlyData(hourlyData, start, end)
        expect(result).to.be.instanceOf(WeatherDto)
    })
})
