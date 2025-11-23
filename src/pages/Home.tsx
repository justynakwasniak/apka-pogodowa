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
  const [backgroundImage, setBackgroundImage] = useState<string>(
    `url(${rainbowImage})`
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (e) {
      setForecast(null);
      setBackgroundImage(`url(${rainbowImage})`);
      setError("Nothing found for your query. Please try again or check spelling.");
    } finally {
      setLoading(false);
    }
  };

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
              <span className="sr-only">Loading...</span>
            </div>
            <p>Loading...</p>
          </div>
        )}
        {!loading && error && !forecast && (
          <div className="text-center mt-5">
            <p>{error}</p>
            {/* Optionally add an illustration/image here */}
          </div>
        )}
        {!loading && forecast && <WeatherCard forecast={forecast} />}
      </div>
    </div>
  );
};

export default Home;
