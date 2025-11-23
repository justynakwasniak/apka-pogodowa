import React from "react";

interface WeatherSearchProps {
  onSearch: (city?: string, lat?: number, lon?: number) => void;
  loading: boolean;
  error: string | null;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch, loading, error }) => {
  const [city, setCity] = React.useState("");

  const handleSearch = async () => {
    await onSearch(city);
    setCity("");
  };

  const handleLocationSearch = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        await onSearch(undefined, latitude, longitude);
        setCity("");
      });
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
          disabled={loading}
        />
        <div className="d-flex justify-content-between mt-3 gap-2">
          <button onClick={handleSearch} className="btn btn-custom" disabled={loading}>
            {loading ? "Searching..." : "Search by City"}
          </button>
          <button onClick={handleLocationSearch} className="btn btn-custom" disabled={loading}>
            {loading ? "Locating..." : "Let's locate you!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
