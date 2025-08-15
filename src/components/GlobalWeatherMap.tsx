import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { 
  Map, 
  Layers, 
  Thermometer, 
  Wind, 
  CloudRain, 
  Eye,
  Search,
  Locate,
  Settings,
  Zap
} from 'lucide-react';
import { WeatherData, WeatherMapLayer, StormData } from '../types/weather';
import { globalCities, fetchGlobalWeather, fetchStormData } from '../utils/globalWeatherData';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface GlobalWeatherMapProps {
  onCitySelect: (city: string) => void;
  selectedCity: string;
}

export function GlobalWeatherMap({ onCitySelect, selectedCity }: GlobalWeatherMapProps) {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [stormData, setStormData] = useState<StormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showLayers, setShowLayers] = useState(false);
  const [activeLayers, setActiveLayers] = useState<WeatherMapLayer[]>([
    { id: 'temperature', name: 'Temperature', type: 'temperature', enabled: true, opacity: 0.6, color_scale: ['#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000'] },
    { id: 'precipitation', name: 'Precipitation', type: 'precipitation', enabled: false, opacity: 0.7, color_scale: ['#FFFFFF', '#87CEEB', '#4169E1', '#0000FF', '#000080'] },
    { id: 'wind', name: 'Wind', type: 'wind', enabled: false, opacity: 0.5, color_scale: ['#FFFFFF', '#90EE90', '#FFFF00', '#FFA500', '#FF0000'] },
    { id: 'clouds', name: 'Cloud Cover', type: 'clouds', enabled: false, opacity: 0.4, color_scale: ['#FFFFFF', '#D3D3D3', '#A9A9A9', '#696969', '#2F2F2F'] }
  ]);

  useEffect(() => {
    loadWeatherData();
    loadStormData();
  }, []);

  const loadWeatherData = async () => {
    setLoading(true);
    const data: Record<string, WeatherData> = {};
    
    // Load weather for major cities
    const cityNames = Object.keys(globalCities).slice(0, 20); // Limit for demo
    
    for (const city of cityNames) {
      try {
        const weather = await fetchGlobalWeather(city);
        data[city] = weather;
      } catch (error) {
        console.error(`Failed to load weather for ${city}:`, error);
      }
    }
    
    setWeatherData(data);
    setLoading(false);
  };

  const loadStormData = async () => {
    try {
      const storms = await fetchStormData();
      setStormData(storms);
    } catch (error) {
      console.error('Failed to load storm data:', error);
    }
  };

  const getWeatherIcon = (condition: string, temp: number) => {
    const iconMap = {
      'Clear': temp > 25 ? '☀️' : '🌤️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️'
    };
    return iconMap[condition as keyof typeof iconMap] || '🌤️';
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 0) return '#0000FF';
    if (temp < 10) return '#4169E1';
    if (temp < 20) return '#00BFFF';
    if (temp < 25) return '#00FF00';
    if (temp < 30) return '#FFFF00';
    if (temp < 35) return '#FFA500';
    return '#FF0000';
  };

  const filteredCities = Object.keys(globalCities).filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  const MapController = () => {
    const map = useMap();
    
    const centerOnCity = (city: string) => {
      const cityData = globalCities[city as keyof typeof globalCities];
      if (cityData) {
        map.setView([cityData.lat, cityData.lon], 10);
      }
    };

    const centerOnUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            map.setView([position.coords.latitude, position.coords.longitude], 10);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    };

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Map Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Map className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Global Weather Map
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setShowLayers(!showLayers)}
              className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Layers className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cities worldwide..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Layer Controls */}
        {showLayers && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 gap-2 mb-4"
          >
            {activeLayers.map((layer) => (
              <motion.button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-colors ${
                  layer.enabled
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {layer.type === 'temperature' && <Thermometer className="w-4 h-4" />}
                {layer.type === 'precipitation' && <CloudRain className="w-4 h-4" />}
                {layer.type === 'wind' && <Wind className="w-4 h-4" />}
                {layer.type === 'clouds' && <Eye className="w-4 h-4" />}
                <span>{layer.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Quick City Access */}
        {searchTerm && (
          <div className="max-h-32 overflow-y-auto">
            <div className="grid grid-cols-2 gap-1">
              {filteredCities.slice(0, 8).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    onCitySelect(city);
                    setSearchTerm('');
                  }}
                  className="text-left p-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="h-96 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <MapController />
          
          {/* Weather Markers */}
          {Object.entries(weatherData).map(([city, weather]) => {
            const cityData = globalCities[city as keyof typeof globalCities];
            if (!cityData) return null;
            
            return (
              <Marker
                key={city}
                position={[cityData.lat, cityData.lon]}
                eventHandlers={{
                  click: () => onCitySelect(city)
                }}
              >
                <Popup>
                  <div className="p-2 min-w-48">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{city}</h4>
                      <span className="text-2xl">
                        {getWeatherIcon(weather.main, weather.temp)}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Temperature:</span>
                        <span className="font-medium">{Math.round(weather.temp)}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Condition:</span>
                        <span className="font-medium capitalize">{weather.description}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Humidity:</span>
                        <span className="font-medium">{weather.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wind:</span>
                        <span className="font-medium">{weather.wind_speed} km/h</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onCitySelect(city)}
                      className="w-full mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          {/* Storm Markers */}
          {stormData.map((storm) => (
            <Marker
              key={storm.id}
              position={[storm.lat, storm.lon]}
            >
              <Popup>
                <div className="p-2 min-w-48">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-red-600">{storm.name}</h4>
                    <Zap className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium capitalize">{storm.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Intensity:</span>
                      <span className="font-medium">Category {storm.intensity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind Speed:</span>
                      <span className="font-medium">{storm.wind_speed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`font-medium capitalize ${
                        storm.status === 'active' ? 'text-red-600' : 
                        storm.status === 'strengthening' ? 'text-orange-600' : 
                        'text-yellow-600'
                      }`}>
                        {storm.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Map Legend */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Weather Stations</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-red-500" />
              <span>Active Storms</span>
            </div>
          </div>
          <div className="text-xs">
            Click markers for detailed weather information
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default GlobalWeatherMap;
