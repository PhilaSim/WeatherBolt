import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, MapPin, Clock, Thermometer, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserPreferences as UserPreferencesType } from '../types/weather';

export function UserPreferences() {
  const { user, updatePreferences } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferencesType>(
    user?.preferences || {
      cities: ['London'],
      alert_types: ['email'],
      alert_frequency: 'daily',
      quiet_hours: { enabled: true, start: '22:00', end: '07:00' },
      temperature_unit: 'celsius',
      notifications: { severe_weather: true, daily_forecast: true, air_quality: false }
    }
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    updatePreferences(preferences);
    setIsSaving(false);
  };

  const addCity = (city: string) => {
    if (city && !preferences.cities.includes(city)) {
      setPreferences(prev => ({
        ...prev,
        cities: [...prev.cities, city]
      }));
    }
  };

  const removeCity = (cityToRemove: string) => {
    setPreferences(prev => ({
      ...prev,
      cities: prev.cities.filter(city => city !== cityToRemove)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Preferences
        </h2>
      </div>

      <div className="space-y-6">
        {/* Cities */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              Cities
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {preferences.cities.map(city => (
              <span
                key={city}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
              >
                {city}
                <button
                  onClick={() => removeCity(city)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add new city"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addCity(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>

        {/* Alert Types */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              Alert Methods
            </h3>
          </div>
          <div className="space-y-2">
            {(['email', 'sms'] as const).map(method => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={preferences.alert_types.includes(method)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPreferences(prev => ({
                        ...prev,
                        alert_types: [...prev.alert_types, method]
                      }));
                    } else {
                      setPreferences(prev => ({
                        ...prev,
                        alert_types: prev.alert_types.filter(t => t !== method)
                      }));
                    }
                  }}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 capitalize">
                  {method}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Alert Frequency */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">
            Alert Frequency
          </h3>
          <div className="space-y-2">
            {(['daily', 'emergency_only'] as const).map(frequency => (
              <label key={frequency} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="alert_frequency"
                  value={frequency}
                  checked={preferences.alert_frequency === frequency}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    alert_frequency: e.target.value as 'daily' | 'emergency_only'
                  }))}
                  className="border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {frequency === 'daily' ? 'Daily forecasts' : 'Emergency alerts only'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              Quiet Hours
            </h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.quiet_hours.enabled}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  quiet_hours: { ...prev.quiet_hours, enabled: e.target.checked }
                }))}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Enable quiet hours
              </span>
            </label>
            {preferences.quiet_hours.enabled && (
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    From
                  </label>
                  <input
                    type="time"
                    value={preferences.quiet_hours.start}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      quiet_hours: { ...prev.quiet_hours, start: e.target.value }
                    }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    To
                  </label>
                  <input
                    type="time"
                    value={preferences.quiet_hours.end}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      quiet_hours: { ...prev.quiet_hours, end: e.target.value }
                    }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Temperature Unit */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Thermometer className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-medium text-gray-900 dark:text-white">
              Temperature Unit
            </h3>
          </div>
          <div className="space-y-2">
            {(['celsius', 'fahrenheit'] as const).map(unit => (
              <label key={unit} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="temperature_unit"
                  value={unit}
                  checked={preferences.temperature_unit === unit}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    temperature_unit: e.target.value as 'celsius' | 'fahrenheit'
                  }))}
                  className="border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300 capitalize">
                  {unit}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">
            Notification Types
          </h3>
          <div className="space-y-2">
            {Object.entries(preferences.notifications).map(([type, enabled]) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      [type]: e.target.checked
                    }
                  }))}
                  className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? 'Saving...' : 'Save Preferences'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default UserPreferences;