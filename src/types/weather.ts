export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  uv_index: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  temp_min: number;
  temp_max: number;
  sunrise: number;
  sunset: number;
  city: string;
  country: string;
  timezone: number;
  lat: number;
  lon: number;
  air_quality?: {
    aqi: number;
    co: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
  };
}

export interface ForecastData {
  date: string;
  temp_min: number;
  temp_max: number;
  main: string;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  pop: number; // probability of precipitation
  precipitation?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
  created_at: string;
  locations: SavedLocation[];
}

export interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  city: string;
  country: string;
  is_primary: boolean;
  created_at: string;
}

export interface UserPreferences {
  alert_types: ('sms' | 'email' | 'push')[];
  alert_frequency: 'daily' | 'emergency_only' | 'hourly';
  quiet_hours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  temperature_unit: 'celsius' | 'fahrenheit';
  wind_unit: 'kmh' | 'mph' | 'ms';
  pressure_unit: 'hpa' | 'inhg' | 'mmhg';
  notifications: {
    severe_weather: boolean;
    daily_forecast: boolean;
    air_quality: boolean;
    uv_alerts: boolean;
    precipitation: boolean;
    temperature_extremes: boolean;
  };
  alert_thresholds: {
    temperature_high: number;
    temperature_low: number;
    wind_speed: number;
    precipitation: number;
    uv_index: number;
    air_quality: number;
  };
}

export interface Alert {
  id: string;
  user_id: string;
  location_id: string;
  type: 'severe_weather' | 'daily_forecast' | 'air_quality' | 'uv_alert' | 'precipitation' | 'temperature_extreme';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  weather_condition: string;
  sent_at: string;
  delivery_method: 'sms' | 'email' | 'push';
  status: 'sent' | 'delivered' | 'failed' | 'read';
  expires_at?: string;
}

export interface WeatherSummary {
  friendly_summary: string;
  activity_suggestions: string[];
  mood_playlist: {
    title: string;
    description: string;
    songs: string[];
  };
  affirmation: string;
  solar_tips?: string[];
  health_recommendations: string[];
}

export interface WeatherMapLayer {
  id: string;
  name: string;
  type: 'temperature' | 'precipitation' | 'wind' | 'pressure' | 'clouds' | 'air_quality';
  enabled: boolean;
  opacity: number;
  color_scale: string[];
}

export interface StormData {
  id: string;
  name: string;
  type: 'hurricane' | 'typhoon' | 'cyclone' | 'thunderstorm' | 'tornado';
  lat: number;
  lon: number;
  intensity: number;
  wind_speed: number;
  pressure: number;
  movement_direction: number;
  movement_speed: number;
  radius: number;
  status: 'active' | 'weakening' | 'strengthening' | 'dissipated';
  last_updated: string;
}

export interface AdminStats {
  total_users: number;
  active_users: number;
  alerts_sent_today: number;
  alert_delivery_rate: number;
  popular_locations: { location: string; count: number }[];
  alert_types_distribution: { type: string; count: number }[];
  weather_conditions_frequency: { condition: string; count: number }[];
  user_engagement: {
    daily_active: number;
    weekly_active: number;
    monthly_active: number;
  };
}

export interface WeatherReport {
  id: string;
  user_id: string;
  location_id: string;
  report_type: 'daily' | 'weekly' | 'monthly';
  generated_at: string;
  weather_summary: string;
  forecast_data: ForecastData[];
  insights: string[];
  recommendations: string[];
  pdf_url?: string;
}
