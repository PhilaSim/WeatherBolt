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
  Flag,
  Compass,
  Zap,
  Shield,
  Activity
} from 'lucide-react';
import { WeatherData } from '../types/weather';
import { useWeather } from '../contexts/WeatherContext';
import { getWeatherGradient } from '../utils/weatherAnimations';
import WeatherAnimations from './WeatherAnimations';

interface AdvancedWeatherCardProps {
  weather: WeatherData;
}

export function AdvancedWeatherCard({ weather }: AdvancedWeatherCardProps) {
  const { isDarkMode, refreshWeather, loading } = useWeather();

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const getAirQualityLevel = (aqi: number) => {
    if (aqi <= 1) return { level: 'Good', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/20' };
    if (aqi <= 2) return { level: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/20' };
    if (aqi <= 3) return { level: 'Moderate', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/20' };
    if (aqi <= 4) return { level: 'Poor', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/20' };
    return { level: 'Very Poor', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/20' };
  };

  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: 'Low', color: 'text-green-500' };
    if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-500' };
    if (uvIndex <= 7) return { level: 'High', color: 'text-orange-500' };
    if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-500' };
    return { level: 'Extreme', color: 'text-purple-500' };
  };

  const weatherStats = [
    { 
      label: 'Feels like', 
      value: `${Math.round(weather.feels_like)}°C`, 
      icon: Thermometer,
      description: 'Apparent temperature'
    },
    { 
      label: 'Humidity', 
      value: `${weather.humidity}%`, 
      icon: Droplets,
      description: 'Relative humidity'
    },
    { 
      label: 'Wind', 
      value: `${weather.wind_speed} km/h ${getWindDirection(weather.wind_deg)}`, 
      icon: Wind,
      description: 'Wind speed and direction'
    },
    { 
      label: 'Visibility', 
      value: `${weather.visibility} km`, 
      icon: Eye,
      description: 'Atmospheric visibility'
    },
    { 
      label: 'UV Index', 
      value: `${weather.uv_index} (${getUVLevel(weather.uv_index).level})`, 
      icon: Sun,
      description: 'UV radiation level',
      color: getUVLevel(weather.uv_index).color
    },
    { 
      label: 'Pressure', 
      value: `${weather.pressure} hPa`, 
      icon: Gauge,
      description: 'Atmospheric pressure'
    }
  ];

  const airQuality = weather.air_quality ? getAirQualityLevel(weather.air_quality.aqi) : null;

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
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Flag className="w-5 h-5 text-white/80" />
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {weather.city}
                  </h2>
                  <p className="text-sm text-white/70">
                    {weather.country} • {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Coordinates */}
              <div className="text-right text-white/70 text-xs">
                <div>{weather.lat.toFixed(2)}°N</div>
                <div>{weather.lon.toFixed(2)}°E</div>
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
          </div>

          {/* Main temperature and condition */}
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
              <p className="text-xl text-white/90 capitalize mb-1">
                {weather.description}
              </p>
              <p className="text-white/70">
                H: {Math.round(weather.temp_max)}° L: {Math.round(weather.temp_min)}°
              </p>
            </div>
            <div className="text-right text-white/80">
              <div className="flex items-center space-x-1 mb-2">
                <Sun className="w-4 h-4" />
                <span className="text-sm">Rise: {formatTime(weather.sunrise)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sun className="w-4 h-4 rotate-180" />
                <span className="text-sm">Set: {formatTime(weather.sunset)}</span>
              </div>
            </div>
          </div>

          {/* Air Quality Alert */}
          {airQuality && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${airQuality.bg} rounded-lg p-3 mb-6`}
            >
              <div className="flex items-center space-x-2">
                <Shield className={`w-4 h-4 ${airQuality.color}`} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Air Quality: <span className={airQuality.color}>{airQuality.level}</span>
                </span>
              </div>
              {weather.air_quality && (
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div>PM2.5: {weather.air_quality.pm2_5}μg/m³</div>
                  <div>PM10: {weather.air_quality.pm10}μg/m³</div>
                  <div>O₃: {weather.air_quality.o3}μg/m³</div>
                </div>
              )}
            </motion.div>
          )}

          {/* Weather stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {weatherStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-3 hover:bg-white/25 transition-colors group"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <stat.icon className="w-4 h-4 text-white/80" />
                  <span className="text-sm text-white/80">{stat.label}</span>
                </div>
                <div className={`text-lg font-semibold text-white ${stat.color || ''}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Wind Compass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center justify-center"
          >
            <div className="relative">
              <Compass className="w-12 h-12 text-white/60" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: weather.wind_deg }}
                transition={{ duration: 1 }}
              >
                <div className="w-1 h-6 bg-white/80 rounded-full"></div>
              </motion.div>
            </div>
            <div className="ml-3 text-white/80">
              <div className="text-sm">Wind Direction</div>
              <div className="font-semibold">{getWindDirection(weather.wind_deg)} ({weather.wind_deg}°)</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default AdvancedWeatherCard;