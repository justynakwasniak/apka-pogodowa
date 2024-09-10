import React from "react";
import { ForecastData } from "../weatherTypes";

interface WeatherCardProps {
  forecast: ForecastData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">{forecast.city}</h2>
      <div className="row">
        {forecast.daily.map((day, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div
              className="weather-card-content"
              style={{ position: "relative", zIndex: 1 }}
            >
              <h3>{new Date(day.date).toLocaleDateString()}</h3>
              <p>Temperature: {day.temp} °C</p>
              <p>Weather: {day.description}</p>
              <p>Humidity: {day.humidity} %</p>
              <p>Pressure: {day.pressure} hPa</p>
              <p>Wind Speed: {day.windSpeed} m/s</p>
              <img
                src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.description}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
