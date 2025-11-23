import axios from "axios";
import {
  ForecastData,
  ForecastEntry,
  ForecastResponse,
  DailyForecast,
} from "../weatherTypes";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchWeather = async (
  city?: string,
  lat?: number,

  lon?: number
): Promise<ForecastData> => {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const params: {
    units: string;
    appid: string;
    q?: string;
    lat?: number;
    lon?: number;
  } = {
    units: "metric",
    appid: API_KEY,
  };

  if (city) {
    params.q = city;
  } else if (lat && lon) {
    params.lat = lat;
    params.lon = lon;
  } else {
    throw new Error("City or coordinates must be provided");
  }

  const response = await axios.get<ForecastResponse>(BASE_URL, { params });
  const data = response.data;

  const now = new Date();
  const currentForecast = data.list.reduce(
    (closest: ForecastEntry | null, entry: ForecastEntry) => {
      const entryDate = new Date(entry.dt_txt);
      const timeDifference = Math.abs(entryDate.getTime() - now.getTime());
      if (
        !closest ||
        timeDifference <
          Math.abs(new Date(closest.dt_txt).getTime() - now.getTime())
      ) {
        return entry;
      }
      return closest;
    },
    null
  );

  if (!currentForecast) {
    throw new Error("No forecast available for the current time");
  }

  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(now.getDate() + 2);

  const getMiddayForecast = (targetDate: Date): ForecastEntry | undefined => {
    return data.list.find((entry: ForecastEntry) => {
      const entryDate = new Date(entry.dt_txt);
      return (
        entryDate.getDate() === targetDate.getDate() &&
        entryDate.getHours() === 12
      );
    });
  };

  const tomorrowForecast = getMiddayForecast(tomorrow);
  const dayAfterTomorrowForecast = getMiddayForecast(dayAfterTomorrow);

  if (!tomorrowForecast) {
    throw new Error("No forecast available for tomorrow");
  }
  if (!dayAfterTomorrowForecast) {
    throw new Error("No forecast available for the day after tomorrow");
  }

  const dailyForecast: DailyForecast[] = [
    {
      date: currentForecast.dt_txt,
      temp: currentForecast.main.temp,
      description: currentForecast.weather[0].description,
      icon: currentForecast.weather[0].icon,
      humidity: currentForecast.main.humidity,
      pressure: currentForecast.main.pressure,
      windSpeed: currentForecast.wind.speed,
    },
    {
      date: tomorrowForecast.dt_txt,
      temp: tomorrowForecast.main.temp,
      description: tomorrowForecast.weather[0].description,
      icon: tomorrowForecast.weather[0].icon,
      humidity: tomorrowForecast.main.humidity,
      pressure: tomorrowForecast.main.pressure,
      windSpeed: tomorrowForecast.wind.speed,
    },
    {
      date: dayAfterTomorrowForecast.dt_txt,
      temp: dayAfterTomorrowForecast.main.temp,
      description: dayAfterTomorrowForecast.weather[0].description,
      icon: dayAfterTomorrowForecast.weather[0].icon,
      humidity: dayAfterTomorrowForecast.main.humidity,
      pressure: dayAfterTomorrowForecast.main.pressure,
      windSpeed: dayAfterTomorrowForecast.wind.speed,
    },
  ];

  return {
    city: data.city.name,
    daily: dailyForecast,
  };
};
