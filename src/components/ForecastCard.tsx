import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind } from 'lucide-react';
import { ForecastData } from '../types/weather';
import { format } from 'date-fns';

interface ForecastCardProps {
  forecast: ForecastData[];
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  const getWeatherIcon = (condition: string) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Drizzle': '🌦️'
    };
    return icons[condition as keyof typeof icons] || '🌤️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        5-Day Forecast
      </h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">
                {getWeatherIcon(day.main)}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {format(new Date(day.date), 'EEEE')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {day.description}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Droplets className="w-4 h-4" />
                  <span>{day.pop}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind className="w-4 h-4" />
                  <span>{day.wind_speed} km/h</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {Math.round(day.temp_max)}°
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round(day.temp_min)}°
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ForecastCard;
