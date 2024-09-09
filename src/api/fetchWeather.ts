import axios from "axios";
import { ForecastData } from "../weatherTypes";

const API_KEY = "89b1ce64eff5ef41c79d534710f10a8d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchWeather = async (city: string): Promise<ForecastData> => {
  if (!API_KEY) {
    throw new Error("API key is missing");
  }

  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });

  const data = response.data;
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date(today).setDate(new Date(today).getDate() + 1);
  const dayAfterTomorrow = new Date(today).setDate(
    new Date(today).getDate() + 2
  );

  // Get unique dates for today, tomorrow, and the day after tomorrow
  const forecastMap = new Map<string, any>();

  data.list.forEach((entry: any) => {
    const entryDate = new Date(entry.dt_txt).setHours(0, 0, 0, 0);
    if ([today, tomorrow, dayAfterTomorrow].includes(entryDate)) {
      if (!forecastMap.has(entryDate)) {
        forecastMap.set(entryDate, entry);
      }
    }
  });

  const dailyForecast = Array.from(forecastMap.values()).map((entry: any) => ({
    date: entry.dt_txt,
    temp: entry.main.temp,
    description: entry.weather[0].description,
    icon: entry.weather[0].icon,
  }));

  return {
    city: data.city.name,
    daily: dailyForecast,
  };
};
