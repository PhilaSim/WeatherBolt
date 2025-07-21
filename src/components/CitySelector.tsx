import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Plus } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { globalCities } from '../utils/globalWeatherData';

export function CitySelector() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCity, setSelectedCity, availableCities } = useWeather();

  const filteredCities = availableCities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCityInfo = (city: string) => {
    const cityData = globalCities[city as keyof typeof globalCities];
    return cityData ? `${cityData.country}` : '';
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MapPin className="w-4 h-4 text-blue-500" />
        <span className="text-gray-900 dark:text-white font-medium">
          {selectedCity}
        </span>
        <Plus className={`w-4 h-4 text-gray-500 transform transition-transform ${isOpen ? 'rotate-45' : ''}`} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
        >
          <div className="p-4">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search global cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="max-h-48 overflow-y-auto">
              {filteredCities.map((city, index) => (
                <motion.button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    city === selectedCity
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div>
                    <div className="font-medium">{city}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {getCityInfo(city)}
                    </div>
                  </div>
                </motion.button>
              ))}
              
              {filteredCities.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No cities found
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default CitySelector;