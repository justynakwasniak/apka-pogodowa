export interface ForecastData {
  city: string;
  daily: Array<{
    date: string;
    temp: number;
    description: string;
    icon: string;
  }>;
}
