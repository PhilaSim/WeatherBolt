import React from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Sun, 
  Gauge,
  MapPin,
  RefreshCw,
  Flag
} from 'lucide-react';
import { WeatherData } from '../types/weather';
import { useWeather } from '../contexts/WeatherContext';
import { getWeatherGradient } from '../utils/weatherAnimations';
import WeatherAnimations from './WeatherAnimations';
import { southAfricanCities } from '../utils/southAfricanWeather';

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const { isDarkMode, refreshWeather, loading } = useWeather();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCityInfo = (cityName: string) => {
    const cityData = southAfricanCities[cityName as keyof typeof southAfricanCities];
    return cityData?.province || '';
  };

  const weatherStats = [
    { label: 'Feels like', value: `${Math.round(weather.feels_like)}°C`, icon: Thermometer },
    { label: 'Humidity', value: `${weather.humidity}%`, icon: Droplets },
    { label: 'Wind Speed', value: `${weather.wind_speed} km/h`, icon: Wind },
    { label: 'Visibility', value: `${weather.visibility} km`, icon: Eye },
    { label: 'UV Index', value: weather.uv_index.toString(), icon: Sun },
    { label: 'Pressure', value: `${weather.pressure} hPa`, icon: Gauge }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl shadow-xl"
    >
      {/* Background with gradient */}
      <div className={`${getWeatherGradient(weather.main, isDarkMode)} p-6`}>
        {/* Weather animations */}
        <WeatherAnimations condition={weather.main} isDarkMode={isDarkMode} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <Flag className="w-5 h-5 text-white/80" />
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {weather.city}
                  </h2>
                  <p className="text-sm text-white/70">
                    {getCityInfo(weather.city)}, South Africa
                  </p>
                </div>
              </div>
            </div>
            <motion.button
              onClick={() => refreshWeather(weather.city)}
              disabled={loading}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <RefreshCw className={`w-5 h-5 text-white ${loading ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>

          {/* Main temperature */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.div
                className="text-6xl font-bold text-white mb-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Math.round(weather.temp)}°C
              </motion.div>
              <p className="text-xl text-white/90 capitalize">
                {weather.description}
              </p>
              <p className="text-white/70">
                H: {Math.round(weather.temp_max)}° L: {Math.round(weather.temp_min)}°
              </p>
            </div>
            <div className="text-right">
              <div className="text-white/80 text-sm">
                <div>🌅 {formatTime(weather.sunrise)}</div>
                <div>🌇 {formatTime(weather.sunset)}</div>
              </div>
            </div>
          </div>

          {/* Weather stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {weatherStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <stat.icon className="w-4 h-4 text-white/80" />
                  <span className="text-sm text-white/80">{stat.label}</span>
                </div>
                <div className="text-lg font-semibold text-white">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherCard;