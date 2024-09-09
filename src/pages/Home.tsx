import React, { useState } from "react";
import WeatherSearch from "../components/WeatherSearch";
import WeatherCard from "../components/WeatherCard";
import { ForecastData } from "../weatherTypes";
import { fetchWeather } from "../api/fetchWeather";

const Home: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);

  const handleSearch = async (city: string) => {
    try {
      const data = await fetchWeather(city);
      setForecast(data);
    } catch (error) {
      setForecast(null);
      console.error("Failed to fetch weather data:", error);
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
