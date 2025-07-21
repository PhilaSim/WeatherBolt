import { WeatherData, ForecastData } from '../types/weather';

const weatherConditions = [
  { main: 'Clear', description: 'clear sky', icon: '01d' },
  { main: 'Clouds', description: 'few clouds', icon: '02d' },
  { main: 'Clouds', description: 'scattered clouds', icon: '03d' },
  { main: 'Clouds', description: 'overcast clouds', icon: '04d' },
  { main: 'Rain', description: 'light rain', icon: '09d' },
  { main: 'Rain', description: 'moderate rain', icon: '10d' },
  { main: 'Thunderstorm', description: 'thunderstorm', icon: '11d' },
  { main: 'Snow', description: 'light snow', icon: '13d' },
  { main: 'Mist', description: 'mist', icon: '50d' }
];

export function mockWeatherData(city: string): WeatherData {
  const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  const baseTemp = Math.floor(Math.random() * 30) + 5; // 5-35°C
  
  return {
    id: 1,
    main: condition.main,
    description: condition.description,
    icon: condition.icon,
    temp: baseTemp,
    feels_like: baseTemp + (Math.random() * 4 - 2),
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
    uv_index: Math.floor(Math.random() * 11), // 0-10
    visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
    wind_speed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    wind_deg: Math.floor(Math.random() * 360),
    temp_min: baseTemp - Math.floor(Math.random() * 5),
    temp_max: baseTemp + Math.floor(Math.random() * 5),
    sunrise: Date.now() / 1000 - (Math.random() * 7200), // ~2 hours ago
    sunset: Date.now() / 1000 + (Math.random() * 7200), // ~2 hours from now
    city,
    country: 'GB',
    timezone: 0
  };
}

export function mockForecastData(): ForecastData[] {
  const forecast: ForecastData[] = [];
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const maxTemp = Math.floor(Math.random() * 25) + 10; // 10-35°C
    const minTemp = maxTemp - Math.floor(Math.random() * 8) - 3; // 3-10°C less
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      temp_min: minTemp,
      temp_max: maxTemp,
      main: condition.main,
      description: condition.description,
      icon: condition.icon,
      humidity: Math.floor(Math.random() * 40) + 40,
      wind_speed: Math.floor(Math.random() * 20) + 5,
      pop: Math.floor(Math.random() * 100) // 0-100%
    });
  }
  
  return forecast;
}