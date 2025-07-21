import axios from 'axios';
import { WeatherData, ForecastData, StormData } from '../types/weather';

// Global weather API configuration
const WEATHER_API_KEY = 'demo_key'; // In production, use environment variable
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Major global cities with coordinates
export const globalCities = {
  // North America
  'New York': { lat: 40.7128, lon: -74.0060, country: 'US', timezone: 'America/New_York' },
  'Los Angeles': { lat: 34.0522, lon: -118.2437, country: 'US', timezone: 'America/Los_Angeles' },
  'Toronto': { lat: 43.6532, lon: -79.3832, country: 'CA', timezone: 'America/Toronto' },
  'Mexico City': { lat: 19.4326, lon: -99.1332, country: 'MX', timezone: 'America/Mexico_City' },
  
  // Europe
  'London': { lat: 51.5074, lon: -0.1278, country: 'GB', timezone: 'Europe/London' },
  'Paris': { lat: 48.8566, lon: 2.3522, country: 'FR', timezone: 'Europe/Paris' },
  'Berlin': { lat: 52.5200, lon: 13.4050, country: 'DE', timezone: 'Europe/Berlin' },
  'Rome': { lat: 41.9028, lon: 12.4964, country: 'IT', timezone: 'Europe/Rome' },
  'Madrid': { lat: 40.4168, lon: -3.7038, country: 'ES', timezone: 'Europe/Madrid' },
  'Amsterdam': { lat: 52.3676, lon: 4.9041, country: 'NL', timezone: 'Europe/Amsterdam' },
  
  // Asia
  'Tokyo': { lat: 35.6762, lon: 139.6503, country: 'JP', timezone: 'Asia/Tokyo' },
  'Beijing': { lat: 39.9042, lon: 116.4074, country: 'CN', timezone: 'Asia/Shanghai' },
  'Mumbai': { lat: 19.0760, lon: 72.8777, country: 'IN', timezone: 'Asia/Kolkata' },
  'Singapore': { lat: 1.3521, lon: 103.8198, country: 'SG', timezone: 'Asia/Singapore' },
  'Seoul': { lat: 37.5665, lon: 126.9780, country: 'KR', timezone: 'Asia/Seoul' },
  'Bangkok': { lat: 13.7563, lon: 100.5018, country: 'TH', timezone: 'Asia/Bangkok' },
  
  // Africa
  'Cape Town': { lat: -33.9249, lon: 18.4241, country: 'ZA', timezone: 'Africa/Johannesburg' },
  'Johannesburg': { lat: -26.2041, lon: 28.0473, country: 'ZA', timezone: 'Africa/Johannesburg' },
  'Cairo': { lat: 30.0444, lon: 31.2357, country: 'EG', timezone: 'Africa/Cairo' },
  'Lagos': { lat: 6.5244, lon: 3.3792, country: 'NG', timezone: 'Africa/Lagos' },
  
  // South America
  'São Paulo': { lat: -23.5505, lon: -46.6333, country: 'BR', timezone: 'America/Sao_Paulo' },
  'Buenos Aires': { lat: -34.6118, lon: -58.3960, country: 'AR', timezone: 'America/Argentina/Buenos_Aires' },
  'Lima': { lat: -12.0464, lon: -77.0428, country: 'PE', timezone: 'America/Lima' },
  
  // Oceania
  'Sydney': { lat: -33.8688, lon: 151.2093, country: 'AU', timezone: 'Australia/Sydney' },
  'Melbourne': { lat: -37.8136, lon: 144.9631, country: 'AU', timezone: 'Australia/Melbourne' },
  'Auckland': { lat: -36.8485, lon: 174.7633, country: 'NZ', timezone: 'Pacific/Auckland' }
};

export async function fetchGlobalWeather(city: string): Promise<WeatherData> {
  try {
    const cityData = globalCities[city as keyof typeof globalCities];
    
    if (!cityData) {
      throw new Error(`City ${city} not found in global cities`);
    }

    // For demo purposes, we'll use mock data with global characteristics
    // In production, uncomment the API call below
    
    /*
    const [weatherResponse, airQualityResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: {
          lat: cityData.lat,
          lon: cityData.lon,
          appid: WEATHER_API_KEY,
          units: 'metric'
        }
      }),
      axios.get(`${BASE_URL}/air_pollution`, {
        params: {
          lat: cityData.lat,
          lon: cityData.lon,
          appid: WEATHER_API_KEY
        }
      })
    ]);
    */

    return generateGlobalWeatherData(city, cityData);
  } catch (error) {
    console.error('Error fetching global weather:', error);
    throw error;
  }
}

export async function fetchGlobalForecast(city: string): Promise<ForecastData[]> {
  try {
    const cityData = globalCities[city as keyof typeof globalCities];
    
    if (!cityData) {
      throw new Error(`City ${city} not found in global cities`);
    }

    return generateGlobalForecastData(city, cityData);
  } catch (error) {
    console.error('Error fetching global forecast:', error);
    throw error;
  }
}

export async function fetchStormData(): Promise<StormData[]> {
  // Mock storm data - in production, this would come from NOAA or similar APIs
  const mockStorms: StormData[] = [
    {
      id: 'hurricane-alex-2024',
      name: 'Hurricane Alex',
      type: 'hurricane',
      lat: 25.7617,
      lon: -80.1918,
      intensity: 3,
      wind_speed: 185,
      pressure: 945,
      movement_direction: 315,
      movement_speed: 25,
      radius: 150,
      status: 'active',
      last_updated: new Date().toISOString()
    },
    {
      id: 'typhoon-ming-2024',
      name: 'Typhoon Ming',
      type: 'typhoon',
      lat: 14.5995,
      lon: 120.9842,
      intensity: 2,
      wind_speed: 150,
      pressure: 965,
      movement_direction: 270,
      movement_speed: 20,
      radius: 120,
      status: 'strengthening',
      last_updated: new Date().toISOString()
    }
  ];
  
  return mockStorms;
}

function generateGlobalWeatherData(city: string, cityData: any): WeatherData {
  const now = new Date();
  const month = now.getMonth();
  
  // Determine season based on hemisphere
  const isNorthernHemisphere = cityData.lat > 0;
  const isWinter = isNorthernHemisphere ? 
    (month >= 11 || month <= 1) : 
    (month >= 5 && month <= 7);
  const isSummer = isNorthernHemisphere ? 
    (month >= 5 && month <= 7) : 
    (month >= 11 || month <= 1);
  
  // Climate-based temperature ranges
  let baseTemp: number;
  let conditions: string[];
  
  // Regional climate patterns
  if (cityData.country === 'GB' || cityData.country === 'NL' || cityData.country === 'DE') {
    // Temperate oceanic climate
    baseTemp = isWinter ? 5 : isSummer ? 20 : 12;
    conditions = ['Rain', 'Clouds', 'Clear'];
  } else if (cityData.country === 'US' && city === 'Los Angeles') {
    // Mediterranean climate
    baseTemp = isWinter ? 18 : isSummer ? 28 : 23;
    conditions = ['Clear', 'Clouds'];
  } else if (cityData.country === 'IN' || cityData.country === 'TH') {
    // Tropical climate
    baseTemp = isWinter ? 25 : isSummer ? 35 : 30;
    conditions = isSummer ? ['Rain', 'Thunderstorm', 'Clear'] : ['Clear', 'Clouds'];
  } else if (cityData.country === 'AU' || cityData.country === 'ZA') {
    // Southern hemisphere
    baseTemp = isWinter ? 15 : isSummer ? 28 : 22;
    conditions = isSummer ? ['Clear', 'Thunderstorm'] : ['Clear', 'Clouds', 'Rain'];
  } else if (cityData.country === 'JP' || cityData.country === 'KR') {
    // Continental climate
    baseTemp = isWinter ? 0 : isSummer ? 28 : 15;
    conditions = isWinter ? ['Snow', 'Clear'] : ['Rain', 'Clear', 'Clouds'];
  } else {
    // Default temperate
    baseTemp = isWinter ? 8 : isSummer ? 25 : 16;
    conditions = ['Clear', 'Clouds', 'Rain'];
  }
  
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const temp = baseTemp + (Math.random() * 8 - 4);
  
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
    visibility: Math.floor(Math.random() * 15) + 5,
    wind_speed: Math.floor(Math.random() * 25) + 5,
    wind_deg: Math.floor(Math.random() * 360),
    temp_min: Math.round(temp - 3),
    temp_max: Math.round(temp + 5),
    sunrise: Date.now() / 1000 - (Math.random() * 3600),
    sunset: Date.now() / 1000 + (Math.random() * 3600),
    city,
    country: cityData.country,
    timezone: getTimezoneOffset(cityData.timezone),
    lat: cityData.lat,
    lon: cityData.lon,
    air_quality: {
      aqi: Math.floor(Math.random() * 5) + 1,
      co: Math.floor(Math.random() * 1000) + 200,
      no2: Math.floor(Math.random() * 100) + 10,
      o3: Math.floor(Math.random() * 200) + 50,
      pm2_5: Math.floor(Math.random() * 50) + 5,
      pm10: Math.floor(Math.random() * 100) + 10
    }
  };
}

function generateGlobalForecastData(city: string, cityData: any): ForecastData[] {
  const forecast: ForecastData[] = [];
  const now = new Date();
  const month = now.getMonth();
  
  const isNorthernHemisphere = cityData.lat > 0;
  const isWinter = isNorthernHemisphere ? 
    (month >= 11 || month <= 1) : 
    (month >= 5 && month <= 7);
  const isSummer = isNorthernHemisphere ? 
    (month >= 5 && month <= 7) : 
    (month >= 11 || month <= 1);
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    let baseTemp: number;
    let conditions: string[];
    
    // Same climate logic as weather data
    if (cityData.country === 'GB' || cityData.country === 'NL' || cityData.country === 'DE') {
      baseTemp = isWinter ? 5 : isSummer ? 20 : 12;
      conditions = ['Rain', 'Clouds', 'Clear'];
    } else if (cityData.country === 'US' && city === 'Los Angeles') {
      baseTemp = isWinter ? 18 : isSummer ? 28 : 23;
      conditions = ['Clear', 'Clouds'];
    } else if (cityData.country === 'IN' || cityData.country === 'TH') {
      baseTemp = isWinter ? 25 : isSummer ? 35 : 30;
      conditions = isSummer ? ['Rain', 'Thunderstorm', 'Clear'] : ['Clear', 'Clouds'];
    } else {
      baseTemp = isWinter ? 8 : isSummer ? 25 : 16;
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
      wind_speed: Math.floor(Math.random() * 25) + 5,
      wind_deg: Math.floor(Math.random() * 360),
      pop: condition === 'Rain' || condition === 'Thunderstorm' ? 
        Math.floor(Math.random() * 60) + 40 : 
        Math.floor(Math.random() * 30),
      precipitation: condition === 'Rain' ? Math.random() * 10 : 
        condition === 'Thunderstorm' ? Math.random() * 20 : 0
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
    'Snow': 'light snow',
    'Mist': 'misty conditions',
    'Fog': 'foggy conditions'
  };
  return descriptions[condition as keyof typeof descriptions] || 'partly cloudy';
}

function getWeatherIcon(condition: string): string {
  const icons = {
    'Clear': '01d',
    'Clouds': '03d',
    'Rain': '10d',
    'Thunderstorm': '11d',
    'Snow': '13d',
    'Mist': '50d',
    'Fog': '50d'
  };
  return icons[condition as keyof typeof icons] || '02d';
}

function getTimezoneOffset(timezone: string): number {
  // Simplified timezone offset mapping
  const offsets = {
    'America/New_York': -18000,
    'America/Los_Angeles': -28800,
    'America/Toronto': -18000,
    'America/Mexico_City': -21600,
    'Europe/London': 0,
    'Europe/Paris': 3600,
    'Europe/Berlin': 3600,
    'Europe/Rome': 3600,
    'Europe/Madrid': 3600,
    'Europe/Amsterdam': 3600,
    'Asia/Tokyo': 32400,
    'Asia/Shanghai': 28800,
    'Asia/Kolkata': 19800,
    'Asia/Singapore': 28800,
    'Asia/Seoul': 32400,
    'Asia/Bangkok': 25200,
    'Africa/Johannesburg': 7200,
    'Africa/Cairo': 7200,
    'Africa/Lagos': 3600,
    'America/Sao_Paulo': -10800,
    'America/Argentina/Buenos_Aires': -10800,
    'America/Lima': -18000,
    'Australia/Sydney': 39600,
    'Australia/Melbourne': 39600,
    'Pacific/Auckland': 43200
  };
  return offsets[timezone as keyof typeof offsets] || 0;
}