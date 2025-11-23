import React, { useState } from "react";
import WeatherSearch from "../components/WeatherSearch";
import WeatherCard from "../components/WeatherCard";
import { ForecastData } from "../weatherTypes";
import { fetchWeather } from "../api/fetchWeather";
import rainImage from "../images/rain.avif";
import sunnyImage from "../images/sunny.avif";
import snowImage from "../images/snow.avif";
import cloudyImage from "../images/cloudy.avif";
import rainbowImage from "../images/rainbow.avif";
import { useTranslation } from 'react-i18next';

const getBackgroundImage = (description: string): string => {
  if (description.includes("rain")) {
    return `url(${rainImage})`;
  } else if (description.includes("clear")) {
    return `url(${sunnyImage})`;
  } else if (description.includes("snow")) {
    return `url(${snowImage})`;
  } else if (description.includes("few clouds")) {
    return `url(${sunnyImage})`;
  } else if (description.includes("cloud")) {
    return `url(${cloudyImage})`;
  }

  return `url(${rainbowImage})`;
};

const Home: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    `url(${rainbowImage})`
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSearch = async (city?: string, lat?: number, lon?: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city, lat, lon);
      setForecast(data);
      setError(null);
      if (data.daily.length > 0) {
        const todayDescription = data.daily[0].description;
        setBackgroundImage(getBackgroundImage(todayDescription));
      }
    } catch {
      setForecast(null);
      setBackgroundImage(`url(${rainbowImage})`);
      setError("Nothing found. Please try again or check spelling.");
    } finally {
      setLoading(false);
    }
  };

  const handleDayClick = (date: string) => setSelectedDay(date);
  const handleBack = () => setSelectedDay(null);

  return (
    <div
      className="app-container"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mt-4">
        <WeatherSearch onSearch={handleSearch} loading={loading} error={error} />
        {loading && (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">{t('loading')}</span>
            </div>
            <p>{t('loading')}</p>
          </div>
        )}
        {!loading && error && !forecast && (
          <div className="text-center mt-5">
            <p>{t('no_results')}</p>
            {/* Optionally add an illustration/image here */}
          </div>
        )}
        {!loading && forecast && !selectedDay && (
          <WeatherCard forecast={forecast} onDayClick={handleDayClick} />
        )}
        {!loading && forecast && selectedDay && (
          <div className="hourly-view">
            <button className="btn btn-custom mb-3" onClick={handleBack}>{t('back_to_daily')}</button>
            <h3 className="text-center mb-3">{t('hourly_forecast')} {new Date(selectedDay).toLocaleDateString()}</h3>
            <div className="row g-2 justify-content-center">
              {forecast.hourly.filter(h => h.dt_txt.slice(0,10) === selectedDay.slice(0,10)).map((entry, idx) => (
                <div className="col-12 col-md-4 mb-2" key={idx}>
                  <div className="weather-card-content h-100">
                    <strong>{new Date(entry.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                    <p>{t('temperature')}: {Math.round(entry.main.temp)}°C</p>
                    <p>{t('weather')}: {entry.weather[0].description}</p>
                    <p>{t('humidity')}: {entry.main.humidity}%</p>
                    <p>{t('pressure')}: {entry.main.pressure} hPa</p>
                    <p>{t('wind_speed')}: {entry.wind.speed} m/s</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
