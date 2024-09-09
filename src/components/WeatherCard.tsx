import React from "react";
import { ForecastData } from "../weatherTypes";

interface WeatherCardProps {
  forecast: ForecastData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
  return (
    <div className="weather-card mt-4">
      <h2>{forecast.city}</h2>
      {forecast.daily.map((day, index) => (
        <div key={index} className="daily-forecast">
          <h3>{new Date(day.date).toLocaleDateString()}</h3>
          <p>Temperature: {day.temp} °C</p>
          <p>Weather: {day.description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${day.icon}.png`}
            alt={day.description}
          />
        </div>
      ))}
    </div>
  );
};

export default WeatherCard;
