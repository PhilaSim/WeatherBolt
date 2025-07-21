import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';

// South African cities with coordinates
export const southAfricanCities = {
  'Cape Town': { lat: -33.9249, lon: 18.4241, province: 'Western Cape' },
  'Johannesburg': { lat: -26.2041, lon: 28.0473, province: 'Gauteng' },
  'Durban': { lat: -29.8587, lon: 31.0218, province: 'KwaZulu-Natal' },
  'Pretoria': { lat: -25.7479, lon: 28.2293, province: 'Gauteng' },
  'Port Elizabeth': { lat: -33.9608, lon: 25.6022, province: 'Eastern Cape' },
  'Bloemfontein': { lat: -29.0852, lon: 26.1596, province: 'Free State' },
  'East London': { lat: -33.0153, lon: 27.9116, province: 'Eastern Cape' },
  'Pietermaritzburg': { lat: -29.6197, lon: 30.3925, province: 'KwaZulu-Natal' },
  'Kimberley': { lat: -28.7282, lon: 24.7499, province: 'Northern Cape' },
  'Polokwane': { lat: -23.9045, lon: 29.4689, province: 'Limpopo' },
  'Nelspruit': { lat: -25.4753, lon: 30.9694, province: 'Mpumalanga' },
  'Mafikeng': { lat: -25.8601, lon: 25.6358, province: 'North West' },
  'Upington': { lat: -28.4478, lon: 21.2561, province: 'Northern Cape' },
  'George': { lat: -33.9628, lon: 22.4619, province: 'Western Cape' },
  'Stellenbosch': { lat: -33.9321, lon: 18.8602, province: 'Western Cape' }
};

// OpenWeatherMap API configuration
const WEATHER_API_KEY = 'demo_key'; // In production, use environment variable
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchSouthAfricanWeather(city: string): Promise<WeatherData> {
  try {
    const cityData = southAfricanCities[city as keyof typeof southAfricanCities];
    
    if (!cityData) {
      throw new Error(`City ${city} not found in South African cities`);
    }

    // For demo purposes, we'll use mock data with South African characteristics
    // In production, uncomment the API call below
    
    /*
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: cityData.lat,
        lon: cityData.lon,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    */

    // Mock South African weather data with realistic patterns
    return generateSouthAfricanWeatherData(city, cityData);
  } catch (error) {
    console.error('Error fetching South African weather:', error);
    throw error;
  }
}

export async function fetchSouthAfricanForecast(city: string): Promise<ForecastData[]> {
  try {
    const cityData = southAfricanCities[city as keyof typeof southAfricanCities];
    
    if (!cityData) {
      throw new Error(`City ${city} not found in South African cities`);
    }

    // For demo purposes, we'll use mock data
    // In production, uncomment the API call below
    
    /*
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: cityData.lat,
        lon: cityData.lon,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    */

    return generateSouthAfricanForecastData(city);
  } catch (error) {
    console.error('Error fetching South African forecast:', error);
    throw error;
  }
}

function generateSouthAfricanWeatherData(city: string, cityData: any): WeatherData {
  const now = new Date();
  const month = now.getMonth();
  const isWinter = month >= 5 && month <= 7; // June, July, August
  const isSummer = month >= 11 || month <= 1; // Dec, Jan, Feb
  
  // South African weather patterns
  let baseTemp: number;
  let conditions: string[];
  
  if (city === 'Cape Town') {
    baseTemp = isWinter ? 15 : isSummer ? 25 : 20;
    conditions = isWinter ? ['Rain', 'Clouds', 'Clear'] : ['Clear', 'Clouds', 'Wind'];
  } else if (city === 'Johannesburg') {
    baseTemp = isWinter ? 12 : isSummer ? 22 : 18;
    conditions = isSummer ? ['Thunderstorm', 'Rain', 'Clear'] : ['Clear', 'Clouds'];
  } else if (city === 'Durban') {
    baseTemp = isWinter ? 18 : isSummer ? 28 : 23;
    conditions = isSummer ? ['Rain', 'Thunderstorm', 'Clear'] : ['Clear', 'Clouds'];
  } else {
    baseTemp = isWinter ? 14 : isSummer ? 24 : 19;
    conditions = ['Clear', 'Clouds', 'Rain'];
  }
  
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const temp = baseTemp + (Math.random() * 8 - 4); // ±4°C variation
  
  return {
    id: 1,
    main: condition,
    description: getWeatherDescription(condition),
    icon: getWeatherIcon(condition),
    temp: Math.round(temp),
    feels_like: Math.round(temp + (Math.random() * 4 - 2)),
    humidity: Math.floor(Math.random() * 40) + 40,
    pressure: Math.floor(Math.random() * 50) + 1000,
    uv_index: Math.floor(Math.random() * 11),
    visibility: Math.floor(Math.random() * 5) + 5,
    wind_speed: Math.floor(Math.random() * 20) + 5,
    wind_deg: Math.floor(Math.random() * 360),
    temp_min: Math.round(temp - 3),
    temp_max: Math.round(temp + 5),
    sunrise: Date.now() / 1000 - (Math.random() * 3600),
    sunset: Date.now() / 1000 + (Math.random() * 3600),
    city,
    country: 'ZA',
    timezone: 7200 // SAST (UTC+2)
  };
}

function generateSouthAfricanForecastData(city: string): ForecastData[] {
  const forecast: ForecastData[] = [];
  const now = new Date();
  const month = now.getMonth();
  const isWinter = month >= 5 && month <= 7;
  const isSummer = month >= 11 || month <= 1;
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    let baseTemp: number;
    let conditions: string[];
    
    if (city === 'Cape Town') {
      baseTemp = isWinter ? 15 : isSummer ? 25 : 20;
      conditions = isWinter ? ['Rain', 'Clouds', 'Clear'] : ['Clear', 'Clouds'];
    } else if (city === 'Johannesburg') {
      baseTemp = isWinter ? 12 : isSummer ? 22 : 18;
      conditions = isSummer ? ['Thunderstorm', 'Rain', 'Clear'] : ['Clear', 'Clouds'];
    } else if (city === 'Durban') {
      baseTemp = isWinter ? 18 : isSummer ? 28 : 23;
      conditions = isSummer ? ['Rain', 'Thunderstorm', 'Clear'] : ['Clear', 'Clouds'];
    } else {
      baseTemp = isWinter ? 14 : isSummer ? 24 : 19;
      conditions = ['Clear', 'Clouds', 'Rain'];
    }
    
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const maxTemp = baseTemp + (Math.random() * 6);
    const minTemp = maxTemp - (Math.random() * 8 + 3);
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      temp_min: Math.round(minTemp),
      temp_max: Math.round(maxTemp),
      main: condition,
      description: getWeatherDescription(condition),
      icon: getWeatherIcon(condition),
      humidity: Math.floor(Math.random() * 40) + 40,
      wind_speed: Math.floor(Math.random() * 20) + 5,
      pop: condition === 'Rain' || condition === 'Thunderstorm' ? Math.floor(Math.random() * 60) + 40 : Math.floor(Math.random() * 30)
    });
  }
  
  return forecast;
}

function getWeatherDescription(condition: string): string {
  const descriptions = {
    'Clear': 'clear sky',
    'Clouds': 'scattered clouds',
    'Rain': 'light rain',
    'Thunderstorm': 'thunderstorm with rain',
    'Wind': 'windy conditions',
    'Mist': 'misty conditions'
  };
  return descriptions[condition as keyof typeof descriptions] || 'partly cloudy';
}

function getWeatherIcon(condition: string): string {
  const icons = {
    'Clear': '01d',
    'Clouds': '03d',
    'Rain': '10d',
    'Thunderstorm': '11d',
    'Wind': '50d',
    'Mist': '50d'
  };
  return icons[condition as keyof typeof icons] || '02d';
}