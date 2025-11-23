# Weather App

A modern weather application built with Vite, React, and TypeScript. Features include localization, a responsive UI, and an intuitive hourly breakdown for any chosen day.

## Features

- **City Search:** Enter any city name to get an up-to-date forecast.
- **Geolocation:** Get the forecast based on your current location.
- **Daily & Hourly View:** Click any day to view an hourly (3-hour interval) forecast breakdown.
- **Loading & Error States:** Visual progress indicator during API fetches, and clear messages if no results are found.
- **Responsive Design:** Works seamlessly on both desktop and mobile devices.
- **UX & Accessibility:** Screen reader support, aria-labels, high-contrast UI, and interactive language switcher.
- **i18n Translations:** Toggle between English and Polish at any time; prepared for easy localization expansion.

## Technology Stack

- **Vite** – super-fast development and build tool
- **React** – component-based UI
- **TypeScript** – static type safety
- **react-i18next & i18next** – translation management
- **Bootstrap** – layout and styling
- **OpenWeatherMap API** – live weather data

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/justynakwasniak/apka-pogodowa.git
   cd apka-pogodowa
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your OpenWeatherMap API key:**
   > Note: The `.env` file is gitignored for security.
   ```
   VITE_OPEN_WEATHER_API_KEY=your_openweather_api_key_here
   ```
   You can get a free API key at: https://openweathermap.org/appid

4. **Run the app in development mode:**
   ```bash
   npm run dev
   ```
   By default, the app will be accessible at [http://localhost:5173](http://localhost:5173)

## Usage

- Use the search bar to enter a city and view its weather forecast.
- Click "Locate me!" to fetch the forecast for your current location.
- Click any daily forecast card to view detailed hourly data for that day.
- Switch UI language in the top right (PL/EN).
- In case of API errors or no results, you'll see a helpful message.

## Accessibility & Security
- Buttons have proper contrast and aria-labels for screen reader support.
- API keys are managed securely via environment variables (`.env`).

## Credits

- [OpenWeatherMap API](https://openweathermap.org/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [react-i18next](https://react.i18next.com/)
