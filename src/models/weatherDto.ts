export class WeatherDto {
    windDirection?: number
    cloudCover?: number
    minTemp?: number
    maxTemp?: number
    precip?: number
    solarRadiation?: number
    dewPoint?: number
    humidity?: number
    visibility?: number
    windSpeed?: number
    heatIndex?: number
    snowDepth?: number
    maxPressure?: number
    minPressure?: number
    snow?: number
    windGust?: number
    conditions: string[] = []
    windChill?: number
}
