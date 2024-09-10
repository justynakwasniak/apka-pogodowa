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

// Funkcja do uzyskania odpowiedniego obrazu tła na podstawie opisu
const getBackgroundImage = (description: string): string => {
  if (description.includes("rain")) {
    return `url(${rainImage})`;
  } else if (description.includes("clear")) {
    return `url(${sunnyImage})`;
  } else if (description.includes("snow")) {
    return `url(${snowImage})`;
  } else if (description.includes("cloud")) {
    return `url(${cloudyImage})`;
  }
  return `url(${rainbowImage})`; // Domyślne tło, jeśli opis nie pasuje
};

const Home: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    `url(${rainbowImage})`
  ); // Początkowe tło

  const handleSearch = async (city?: string, lat?: number, lon?: number) => {
    try {
      const data = await fetchWeather(city, lat, lon);
      setForecast(data);

      if (data.daily.length > 0) {
        const todayDescription = data.daily[0].description;
        setBackgroundImage(getBackgroundImage(todayDescription));
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setForecast(null);
      setBackgroundImage(`url(${rainbowImage})`); // Ustawienie tła na tęczę w przypadku błędu
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
        <WeatherSearch onSearch={handleSearch} />
        {forecast && <WeatherCard forecast={forecast} />}
      </div>
    </div>
  );
};

export default Home;
