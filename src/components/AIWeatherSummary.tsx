import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Music, Heart, Sparkles, Zap, Shield } from 'lucide-react';
import { WeatherSummary } from '../types/weather';

interface AIWeatherSummaryProps {
  summary: WeatherSummary;
}

export function AIWeatherSummary({ summary }: AIWeatherSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-6 h-6 text-purple-500" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          AI Weather Intelligence
        </h3>
      </div>

      {/* Friendly Summary */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
      >
        <div className="flex items-start space-x-2">
          <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {summary.friendly_summary}
          </p>
        </div>
      </motion.div>

      {/* Activity Suggestions */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center space-x-2 mb-3">
          <Activity className="w-5 h-5 text-green-500" />
          <h4 className="font-medium text-gray-900 dark:text-white">
            Activity Suggestions
          </h4>
        </div>
        <div className="space-y-2">
          {summary.activity_suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {suggestion}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mood Playlist */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-6"
      >
        <div className="flex items-center space-x-2 mb-3">
          <Music className="w-5 h-5 text-pink-500" />
          <h4 className="font-medium text-gray-900 dark:text-white">
            {summary.mood_playlist.title}
          </h4>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {summary.mood_playlist.description}
        </p>
        <div className="space-y-1">
          {summary.mood_playlist.songs.map((song, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="flex items-center space-x-2 p-2 bg-pink-50 dark:bg-pink-900/20 rounded text-sm"
            >
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                {song}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Solar Tips */}
      {summary.solar_tips && summary.solar_tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h4 className="font-medium text-gray-900 dark:text-white">
              Solar Energy Tips
            </h4>
          </div>
          <div className="space-y-2">
            {summary.solar_tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {tip}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Health Recommendations */}
      {summary.health_recommendations && summary.health_recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 mb-3">
            <Shield className="w-5 h-5 text-blue-500" />
            <h4 className="font-medium text-gray-900 dark:text-white">
              Health & Safety
            </h4>
          </div>
          <div className="space-y-2">
            {summary.health_recommendations.map((recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {recommendation}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Daily Affirmation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700"
      >
        <div className="flex items-start space-x-2">
          <Heart className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              Daily Affirmation
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              {summary.affirmation}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AIWeatherSummary;