import React, { useState } from "react";

const WeatherSearch: React.FC<{
  onSearch: (city?: string, lat?: number, lon?: number) => void;
}> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      await onSearch(city);
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch} className="btn-custom mt-2">
            Search by City
          </button>
          <button onClick={handleLocationSearch} className="btn-custom mt-2">
            Use My Location
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
