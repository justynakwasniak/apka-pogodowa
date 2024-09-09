import React, { useState } from "react";
import axios from "axios";
import { WeatherData } from "../weatherTypes";

const WeatherSearch: React.FC<{ onSearch: (city: string) => void }> = ({
  onSearch,
}) => {
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
            Search
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
