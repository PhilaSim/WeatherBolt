import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeatherData, ForecastData, WeatherSummary, SavedLocation } from '../types/weather';
import { fetchGlobalWeather, fetchGlobalForecast, globalCities } from '../utils/globalWeatherData';
import { generateAdvancedWeatherSummary } from '../utils/aiWeatherInsights';

interface WeatherContextType {
  currentWeather: WeatherData | null;
  forecast: ForecastData[];
  weatherSummary: WeatherSummary | null;
  loading: boolean;
  error: string | null;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  refreshWeather: (city: string) => Promise<void>;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  availableCities: string[];
  savedLocations: SavedLocation[];
  addLocation: (location: Omit<SavedLocation, 'id' | 'created_at'>) => void;
  removeLocation: (locationId: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [weatherSummary, setWeatherSummary] = useState<WeatherSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Cape Town');
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const availableCities = Object.keys(globalCities);

  useEffect(() => {
    // Check for stored dark mode preference
    const stored = localStorage.getItem('weathersense_darkmode');
    if (stored) {
      setIsDarkMode(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Load initial weather data
    refreshWeather(selectedCity);
  }, [selectedCity]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('weathersense_darkmode', JSON.stringify(newMode));
  };

  const refreshWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Fetch South African weather data
      // Fetch global weather data
      const weatherData = await fetchGlobalWeather(city);
      const forecastData = await fetchGlobalForecast(city);
      
      // Generate AI summary
      const summary = generateAdvancedWeatherSummary(weatherData, forecastData);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setWeatherSummary(summary);
    } catch (err) {
      setError(`Failed to fetch weather data for ${city}`);
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addLocation = (location: Omit<SavedLocation, 'id' | 'created_at'>) => {
    const newLocation: SavedLocation = {
      ...location,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    setSavedLocations(prev => [...prev, newLocation]);
  };

  const removeLocation = (locationId: string) => {
    setSavedLocations(prev => prev.filter(loc => loc.id !== locationId));
  };

  return (
    <WeatherContext.Provider value={{
      currentWeather,
      forecast,
      weatherSummary,
      loading,
      error,
      isDarkMode,
      toggleDarkMode,
      refreshWeather,
      selectedCity,
      setSelectedCity,
      availableCities,
      savedLocations,
      addLocation,
      removeLocation
    }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}