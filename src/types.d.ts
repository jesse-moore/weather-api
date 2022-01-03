interface Alert {
    sender_name: string
    event: string
    start: number
    end: number
    description: string
}

enum Condition {
    ThunderstormRainLight = 200,
    ThunderstormRain = 201,
    ThunderstormRainHeavy = 202,
    ThunderstormLight = 210,
    ThunderstormNormal = 211,
    ThunderstormHeavy = 212,
    ThunderstormRagged = 221,
    ThunderstormDrizzleLight = 230,
    ThunderstormDrizzle = 231,
    ThunderstormDrizzleHeavy = 232,

    DrizzleLight = 300,
    DrizzleNormal = 301,
    DrizzleHeavy = 302,
    DrizzleRainLight = 310,
    DrizzleRain = 311,
    DrizzleRainHeavy = 312,
    DrizzleRainShower = 313,
    DrizzleRainShowerHeavy = 314,
    DrizzleShower = 321,

    RainLight = 500,
    RainModerate = 501,
    RainHeavy = 502,
    RainVeryHeavy = 503,
    RainExtreme = 504,
    RainFreezing = 511,
    RainShowerLight = 520,
    RainShower = 521,
    RainShowerHeavy = 522,
    RainRaggedShower = 531,

    SnowLight = 600,
    SnowNormal = 601,
    SnowHeavy = 602,
    SnowSleet = 611,
    SnowSleetShowerLight = 612,
    SnowSleetShower = 613,
    SnowMixedLight = 615,
    SnowMixed = 616,
    SnowShowerLight = 620,
    SnowShower = 621,
    SnowShowerHeavy = 622,

    Mist = 701,
    Smoke = 711,
    Haze = 721,
    DustWhirls = 731,
    Fog = 741,
    Sand = 751,
    Dust = 761,
    Ash = 762,
    Squall = 771,
    Tornado = 781,

    Clear = 800,
    CloudsFew = 801,
    CloudsScattered = 802,
    CloudsBroken = 803,
    CloudsOvercast = 804,
}

interface CurrentDataBlock extends DataBlock {
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    visibility: number
    uvi: number
    rain?: PrecipitationDataPoint
    snow?: PrecipitationDataPoint
}

interface DailyDataBlock extends DataBlock {
    sunrise: number
    sunset: number
    temp: TemperatureBlock
    feels_like: TemperatureDayBlock
    uvi: number
    rain?: number
    snow?: number
    pop: number
}

interface TemperatureDayBlock {
    morn: number
    day: number
    eve: number
    night: number
}

interface TemperatureBlock extends TemperatureDayBlock {
    min: number
    max: number
}

interface PrecipitationDataPoint {
    '1h': number
}

interface DataBlock {
    dt: number
    temp: number | TemperatureBlock
    feels_like: number | TemperatureDayBlock
    pressure: number
    humidity: number
    dew_point: number
    clouds: number
    visibility?: number
    wind_speed: number
    wind_gust?: number
    wind_deg: number
    pop?: number
    rain?: PrecipitationDataPoint | number
    snow?: PrecipitationDataPoint | number
    weather: WeatherBlock[]
    uvi?: number
}

interface Forecast {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current?: CurrentDataBlock
    minutely?: MinutelyDataBlock[]
    hourly?: HourlyDataBlock[]
    daily?: DailyDataBlock[]
    alerts?: Alert[]
}

interface FullForecast extends Forecast {
    current: CurrentDataBlock
    minutely: MinutelyDataBlock[]
    hourly: HourlyDataBlock[]
    daily: DailyDataBlock[]
    alerts: Alert[]
}

interface CurrentForecast extends Forecast {
    current: CurrentDataBlock
}

interface WeekForecast extends Forecast {
    daily: DailyDataBlock[]
}

interface DayForecast extends Forecast {
    hourly: HourlyDataBlock[]
}

interface HourForecast extends Forecast {
    hourly: HourlyDataBlock[]
}

export interface HourlyDataBlock extends DataBlock {
    temp: number
    feels_like: number
    rain?: PrecipitationDataPoint
    snow?: PrecipitationDataPoint
    pop?: number
    visibility: number
}

interface MinutelyDataBlock {
    dt: number
    precipitation: number
}

interface WeatherBlock {
    id: Condition
    main: string
    description: string
    icon: WeatherIcon
}

enum WeatherIcon {
    ClearSky = '01d',
    ClearSkyNight = '01n',

    FewClouds = '02d',
    FewCloudsNight = '02n',

    ScatteredClouds = '03d',
    ScatteredCloudsNight = '03n',

    BrokenClouds = '04d',
    BrokenCloudsNight = '04n',

    ShowerRain = '09d',
    ShowerRainNight = '09n',

    Rain = '10d',
    RainNight = '10n',

    Thunderstorm = '11d',
    ThunderstormNight = '11n',

    Snow = '13d',
    SnowNight = '13n',

    Mist = '50d',
    MistNight = '50n',
}

const ICON_EXTENSION = '.png'
const LARGER_ICON = '@2x'

export interface WeatherPeriodDataOpenWeather {
    lat: number
    lon: number
    timezone: string
    timezone_offset: number
    current: CurrentDataBlock
    hourly: HourlyDataBlock[]
}
