import React from "react";
import { useTranslation } from 'react-i18next';

interface WeatherSearchProps {
  onSearch: (city?: string, lat?: number, lon?: number) => void;
  loading: boolean;
  error: string | null;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch, loading }) => {
  const [city, setCity] = React.useState("");
  const { t } = useTranslation();

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
          placeholder={t('search_city_placeholder')}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          aria-label={t('search_city_placeholder')}
        />
        <div className="d-flex justify-content-between mt-3 gap-2">
          <button
            onClick={handleSearch}
            className="btn btn-custom"
            disabled={loading}
            aria-label={t('search_by_city')}
            style={{ color: '#fff' }}
          >
            {loading ? t('searching') : t('search_by_city')}
          </button>
          <button
            onClick={handleLocationSearch}
            className="btn btn-custom"
            disabled={loading}
            aria-label={t('locate_me')}
            style={{ color: '#fff' }}
          >
            {loading ? t('locating') : t('locate_me')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
