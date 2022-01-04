export class WeatherDto {
	cloudCover?: number
    conditions: string[] = []
    dewPoint?: number
    heatIndex?: number
    humidity?: number
    precip?: number
    maxPressure?: number
    minPressure?: number
    maxTemp?: number
    minTemp?: number
    visibility?: number
    windChill?: number
    windDirection?: number
    windGust?: number
    windSpeed?: number
    uvi?: number
}
