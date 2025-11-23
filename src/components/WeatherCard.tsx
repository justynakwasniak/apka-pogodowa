import React from "react";
import { ForecastData } from "../weatherTypes";
import sunIcon from "../icons/sunIcon.png";
import rainIcon from "../icons/rainIcon.png";
import snowIcon from "../icons/snowIcon.png";
import cloudIcon from "../icons/cloudIcon.png";
import cloudSunIcon from "../icons/cloudSunIcon.png";

interface WeatherCardProps {
  forecast: ForecastData;
}
const weatherIcons: Record<string, string> = {
  clear: sunIcon,
  rain: rainIcon,
  snow: snowIcon,
  lightsnow: snowIcon,
  clouds: cloudIcon, 
  "clouds with sun": cloudSunIcon,
  scatteredclouds: cloudIcon,
  fewclouds: cloudSunIcon,
  overcastclouds: cloudIcon,
  brokenclouds: cloudIcon,
  lightrain: rainIcon,
  clearsky: sunIcon,
  moderaterain: rainIcon,
  heavyintensityrain: rainIcon,
};
const normalizeDescription = (description: string): string => {
  return description.toLowerCase().replace(/\s+/g, "");
};

const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">{forecast.city}</h2>
      <div className="row">
        {forecast.daily.map((day, index) => {
          const descriptionKey = normalizeDescription(day.description);
          const iconSrc = weatherIcons[descriptionKey];
          console.log(
            `Description: ${day.description}, Icon Key: ${descriptionKey}, Icon Src: ${iconSrc}`
          );

          return (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="weather-card-content">
                <h3>{new Date(day.date).toLocaleDateString()}</h3>
                <img src={iconSrc} alt={day.description} />
                <p>Temperature: {Math.round(day.temp)} °C</p>
                <p>Weather: {day.description}</p>
                <p>Humidity: {day.humidity} %</p>
                <p>Pressure: {day.pressure} hPa</p>
                <p>Wind Speed: {day.windSpeed} m/s</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WeatherCard;
