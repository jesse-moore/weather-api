import axios from 'axios'
import { VC_KEY } from '../config'

const instance = axios.create({
    baseURL:
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history',
    timeout: 1000,
    params: {
        aggregateHours: 1,
        unitGroup: 'metric',
        contentType: 'json',
        locationMode: 'single',
        includeAstronomy: true,
        key: VC_KEY,
    },
})
// dayStartTime=${startTime}
// dayEndTime=${endTime}
// startDateTime=${startDate}
// endDateTime=${endDate}
// locations=${lat},${lng}
export default async function fetchWeather({
    lat,
    lng,
    startDate,
    startTime,
    endDate,
    endTime,
}: {
    lat: number
    lng: number
    startDate: string
    startTime: string
    endDate: string
    endTime: string
}): Promise<{ [k: string]: any } | null> {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?`
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        // handleAxiosError(error)
        return null
    }
}
