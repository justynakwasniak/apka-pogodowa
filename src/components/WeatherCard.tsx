import React from "react";
import { ForecastData } from "../weatherTypes";
import sunIcon from "../icons/sunIcon.png";
import rainIcon from "../icons/rainIcon.png";
import snowIcon from "../icons/snowIcon.png";
import cloudIcon from "../icons/cloudIcon.png";
import cloudSunIcon from "../icons/cloudSunIcon.png";
import { useTranslation } from 'react-i18next';

interface WeatherCardProps {
  forecast: ForecastData;
  onDayClick?: (date: string) => void;
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

const WeatherCard: React.FC<WeatherCardProps> = ({ forecast, onDayClick }) => {
  const { t } = useTranslation();
  return (
    <div className="container mt-4">
      <h2 className="text-center">{forecast.city}</h2>
      <div className="row">
        {forecast.daily.map((day, index) => {
          const descriptionKey = normalizeDescription(day.description);
          const iconSrc = weatherIcons[descriptionKey];
          return (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4" role="button" tabIndex={0} onClick={() => onDayClick?.(day.date)} onKeyDown={(e) => { if(e.key === 'Enter'){ onDayClick?.(day.date); }}} aria-label={`Zobacz szczegóły godzinowe dla ${new Date(day.date).toLocaleDateString()}`} style={{ cursor: onDayClick ? 'pointer' : undefined }}>
              <div className="weather-card-content">
                <h3>{t('date')}: {new Date(day.date).toLocaleDateString()}</h3>
                <img src={iconSrc} alt={day.description} />
                <p>{t('temperature')}: {Math.round(day.temp)} °C</p>
                <p>{t('weather')}: {day.description}</p>
                <p>{t('humidity')}: {day.humidity} %</p>
                <p>{t('pressure')}: {day.pressure} hPa</p>
                <p>{t('wind_speed')}: {day.windSpeed} m/s</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WeatherCard;
