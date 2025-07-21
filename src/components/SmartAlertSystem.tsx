import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  MessageSquare,
  Smartphone,
  Settings,
  Filter,
  TrendingUp,
  MapPin,
  Thermometer,
  Wind,
  CloudRain,
  Sun,
  Shield
} from 'lucide-react';
import { Alert, WeatherData } from '../types/weather';
import { useAuth } from '../contexts/AuthContext';

interface SmartAlertSystemProps {
  currentWeather?: WeatherData;
}

export function SmartAlertSystem({ currentWeather }: SmartAlertSystemProps) {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    generateSmartAlerts();
  }, [currentWeather, user]);

  const generateSmartAlerts = () => {
    if (!currentWeather || !user) return;

    const newAlerts: Alert[] = [];
    const now = new Date().toISOString();

    // Temperature extreme alerts
    if (currentWeather.temp > (user.preferences.alert_thresholds?.temperature_high || 35)) {
      newAlerts.push({
        id: `temp-high-${Date.now()}`,
        user_id: user.id,
        location_id: 'current',
        type: 'temperature_extreme',
        title: 'Extreme Heat Warning',
        message: `Temperature has reached ${Math.round(currentWeather.temp)}°C in ${currentWeather.city}. Stay hydrated and avoid prolonged outdoor exposure.`,
        severity: 'high',
        weather_condition: currentWeather.main,
        sent_at: now,
        delivery_method: 'email',
        status: 'delivered'
      });
    }

    if (currentWeather.temp < (user.preferences.alert_thresholds?.temperature_low || -5)) {
      newAlerts.push({
        id: `temp-low-${Date.now()}`,
        user_id: user.id,
        location_id: 'current',
        type: 'temperature_extreme',
        title: 'Freezing Temperature Alert',
        message: `Temperature has dropped to ${Math.round(currentWeather.temp)}°C in ${currentWeather.city}. Protect pipes and dress warmly.`,
        severity: 'medium',
        weather_condition: currentWeather.main,
        sent_at: now,
        delivery_method: 'sms',
        status: 'delivered'
      });
    }

    // Wind speed alerts
    if (currentWeather.wind_speed > (user.preferences.alert_thresholds?.wind_speed || 50)) {
      newAlerts.push({
        id: `wind-${Date.now()}`,
        user_id: user.id,
        location_id: 'current',
        type: 'severe_weather',
        title: 'High Wind Warning',
        message: `Strong winds of ${currentWeather.wind_speed} km/h detected in ${currentWeather.city}. Secure loose objects and avoid outdoor activities.`,
        severity: 'high',
        weather_condition: currentWeather.main,
        sent_at: now,
        delivery_method: 'push',
        status: 'delivered'
      });
    }

    // UV alerts
    if (currentWeather.uv_index >= (user.preferences.alert_thresholds?.uv_index || 8)) {
      newAlerts.push({
        id: `uv-${Date.now()}`,
        user_id: user.id,
        location_id: 'current',
        type: 'uv_alert',
        title: 'High UV Index Alert',
        message: `UV index is ${currentWeather.uv_index} in ${currentWeather.city}. Apply SPF 30+ sunscreen and wear protective clothing.`,
        severity: 'medium',
        weather_condition: currentWeather.main,
        sent_at: now,
        delivery_method: 'email',
        status: 'delivered'
      });
    }

    // Air quality alerts
    if (currentWeather.air_quality && currentWeather.air_quality.aqi >= (user.preferences.alert_thresholds?.air_quality || 3)) {
      newAlerts.push({
        id: `air-${Date.now()}`,
        user_id: user.id,
        location_id: 'current',
        type: 'air_quality',
        title: 'Poor Air Quality Alert',
        message: `Air quality index is ${currentWeather.air_quality.aqi} in ${currentWeather.city}. Consider limiting outdoor activities, especially if you have respiratory conditions.`,
        severity: currentWeather.air_quality.aqi >= 4 ? 'high' : 'medium',
        weather_condition: currentWeather.main,
        sent_at: now,
        delivery_method: 'email',
        status: 'delivered'
      });
    }

    // Severe weather alerts
    if (currentWeather.main === 'Thunderstorm') {
      newAlerts.push({
        id: `storm-${Date.now()}`,
        user_id: user.id,
        location_id: 'current',
        type: 'severe_weather',
        title: 'Thunderstorm Warning',
        message: `Thunderstorms detected in ${currentWeather.city}. Stay indoors and avoid using electrical appliances.`,
        severity: 'critical',
        weather_condition: currentWeather.main,
        sent_at: now,
        delivery_method: 'push',
        status: 'delivered',
        expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() // 6 hours
      });
    }

    // Add some historical alerts for demo
    const historicalAlerts: Alert[] = [
      {
        id: 'daily-1',
        user_id: user.id,
        location_id: 'current',
        type: 'daily_forecast',
        title: 'Daily Weather Update',
        message: 'Partly cloudy with a high of 24°C. Light winds from the southwest.',
        severity: 'low',
        weather_condition: 'Clouds',
        sent_at: new Date(Date.now() - 86400000).toISOString(),
        delivery_method: 'email',
        status: 'read'
      },
      {
        id: 'precip-1',
        user_id: user.id,
        location_id: 'current',
        type: 'precipitation',
        title: 'Rain Expected',
        message: 'Light rain expected this afternoon. Don\'t forget your umbrella!',
        severity: 'low',
        weather_condition: 'Rain',
        sent_at: new Date(Date.now() - 43200000).toISOString(),
        delivery_method: 'sms',
        status: 'delivered'
      }
    ];

    setAlerts([...newAlerts, ...historicalAlerts]);
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    const colors = {
      low: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      high: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      critical: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    };
    return colors[severity];
  };

  const getStatusIcon = (status: Alert['status']) => {
    const icons = {
      sent: <Clock className="w-4 h-4" />,
      delivered: <CheckCircle className="w-4 h-4" />,
      failed: <XCircle className="w-4 h-4" />,
      read: <CheckCircle className="w-4 h-4 opacity-50" />
    };
    return icons[status];
  };

  const getDeliveryIcon = (method: Alert['delivery_method']) => {
    const icons = {
      email: <Mail className="w-4 h-4" />,
      sms: <MessageSquare className="w-4 h-4" />,
      push: <Smartphone className="w-4 h-4" />
    };
    return icons[method];
  };

  const getAlertTypeIcon = (type: Alert['type']) => {
    const icons = {
      severe_weather: <AlertTriangle className="w-5 h-5" />,
      daily_forecast: <Sun className="w-5 h-5" />,
      air_quality: <Shield className="w-5 h-5" />,
      uv_alert: <Sun className="w-5 h-5" />,
      precipitation: <CloudRain className="w-5 h-5" />,
      temperature_extreme: <Thermometer className="w-5 h-5" />
    };
    return icons[type];
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unread') return alert.status !== 'read';
    if (filter === 'critical') return alert.severity === 'critical' || alert.severity === 'high';
    return true;
  });

  const alertStats = {
    total: alerts.length,
    unread: alerts.filter(a => a.status !== 'read').length,
    critical: alerts.filter(a => a.severity === 'critical' || a.severity === 'high').length
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Smart Weather Alerts
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {alertStats.total}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">Total</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {alertStats.unread}
          </div>
          <div className="text-sm text-yellow-600 dark:text-yellow-400">Unread</div>
        </div>
        <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {alertStats.critical}
          </div>
          <div className="text-sm text-red-600 dark:text-red-400">Critical</div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-4 h-4 text-gray-500" />
        {(['all', 'unread', 'critical'] as const).map((filterType) => (
          <motion.button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === filterType
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`border rounded-lg p-4 hover:shadow-md transition-all ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getAlertTypeIcon(alert.type)}
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {alert.title}
                </h3>
                {alert.expires_at && new Date(alert.expires_at) > new Date() && (
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-full">
                    Expires {new Date(alert.expires_at).toLocaleTimeString()}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {alert.message}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{currentWeather?.city || 'Current Location'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getDeliveryIcon(alert.delivery_method)}
                  <span>{alert.delivery_method}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(alert.status)}
                  <span>{alert.status}</span>
                </div>
              </div>
              <span>
                {new Date(alert.sent_at).toLocaleDateString()} {new Date(alert.sent_at).toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {filter === 'all' ? 'No alerts to show' : `No ${filter} alerts`}
          </p>
        </div>
      )}

      {/* Alert Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">
            Alert Thresholds
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-1">
                High Temperature (°C)
              </label>
              <input
                type="number"
                defaultValue={user?.preferences.alert_thresholds?.temperature_high || 35}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-1">
                Low Temperature (°C)
              </label>
              <input
                type="number"
                defaultValue={user?.preferences.alert_thresholds?.temperature_low || -5}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-1">
                Wind Speed (km/h)
              </label>
              <input
                type="number"
                defaultValue={user?.preferences.alert_thresholds?.wind_speed || 50}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-1">
                UV Index
              </label>
              <input
                type="number"
                defaultValue={user?.preferences.alert_thresholds?.uv_index || 8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SmartAlertSystem;