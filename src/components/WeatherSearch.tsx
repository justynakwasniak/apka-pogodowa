import React, { useState } from "react";

const WeatherSearch: React.FC<{
  onSearch: (city?: string, lat?: number, lon?: number) => void;
}> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      await onSearch(city);
      setCity("");
      setError(null);
    } catch {
      setError("City not found or API error");
    }
  };

  const handleLocationSearch = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            await onSearch(undefined, latitude, longitude);
            setCity("");
            setError(null);
          } catch {
            setError("Location not found or API error");
          }
        },
        () => {
          setError("Unable to retrieve location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-md-6 mt-5">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Which city are you exploring today?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="d-flex justify-content-between mt-3 gap-2">
          <button onClick={handleSearch} className="btn btn-custom">
            Search by City
          </button>
          <button onClick={handleLocationSearch} className="btn btn-custom">
            Let's locate you!
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default WeatherSearch;
