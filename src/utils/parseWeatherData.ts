import { WeatherDto } from '../models/weatherDto'
import { HourlyDataBlock } from '../types'

export const condenseHourlyData = (
    hourly: HourlyDataBlock[],
    start: number,
    end: number
): WeatherDto => {
    const weatherDto = new WeatherDto()
    // const

    return weatherDto
}
