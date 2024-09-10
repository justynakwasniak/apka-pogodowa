import React, { useState } from "react";
import WeatherSearch from "../components/WeatherSearch";
import WeatherCard from "../components/WeatherCard";
import { ForecastData } from "../weatherTypes";
import { fetchWeather } from "../api/fetchWeather";

const Home: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);

  const handleSearch = async (city?: string, lat?: number, lon?: number) => {
    try {
      const data = await fetchWeather(city, lat, lon);
      setForecast(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setForecast(null);
    }
  };

  return (
    <div className="container">
      <WeatherSearch onSearch={handleSearch} />
      {forecast && <WeatherCard forecast={forecast} />}
    </div>
  );
};

export default Home;
