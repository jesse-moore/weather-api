export class WeatherDto {
    cloudCover?: number;
    conditions: string[] = [];
    icons: number[] = [];
    dewPoint?: number;
    heatIndex?: number;
    humidity?: number;
    maxPressure?: number;
    minPressure?: number;
    maxTemp?: number;
    minTemp?: number;
    precip?: number;
    windChill?: number;
    windDirection?: number;
    windGust?: number;
    windSpeed?: number;
    uvi?: number;
    visibility?: number;
}
