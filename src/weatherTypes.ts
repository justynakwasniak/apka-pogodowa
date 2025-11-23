export interface Weather {
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  humidity: number;
  pressure: number;
}

export interface Wind {
  speed: number;
}

export interface ForecastEntry {
  dt_txt: string;
  main: Main;
  weather: Weather[];
  wind: Wind;
}

export interface City {
  name: string;
}

export interface ForecastResponse {
  list: ForecastEntry[];
  city: City;
}

export interface DailyForecast {
  date: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
}

export interface ForecastData {
  city: string;
  daily: DailyForecast[];
  hourly: ForecastEntry[];
}
