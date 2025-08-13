import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  Bell, 
  TrendingUp, 
  MapPin, 
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { AdminStats } from '../types/weather';

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock admin stats
    const mockStats: AdminStats = {
      total_users: 1247,
      active_users: 892,
      alerts_sent_today: 156,
      alert_delivery_rate: 97.5,
      popular_cities: [
        { city: 'London', count: 234 },
        { city: 'New York', count: 189 },
        { city: 'Tokyo', count: 156 },
        { city: 'Paris', count: 123 },
        { city: 'Sydney', count: 98 }
      ],
      alert_types_distribution: [
        { type: 'Daily Forecast', count: 45 },
        { type: 'Severe Weather', count: 35 },
        { type: 'Air Quality', count: 20 }
      ]
    };

    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: 'Total Users',
      value: stats.total_users.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Users',
      value: stats.active_users.toLocaleString(),
      icon: Activity,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Alerts Sent Today',
      value: stats.alerts_sent_today.toLocaleString(),
      icon: Bell,
      color: 'bg-yellow-500',
      change: '+15%'
    },
    {
      title: 'Delivery Rate',
      value: `${stats.alert_delivery_rate}%`,
      icon: CheckCircle,
      color: 'bg-purple-500',
      change: '+2%'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {card.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {card.title}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Cities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Popular Cities
            </h3>
          </div>
          <div className="space-y-3">
            {stats.popular_cities.map((city, index) => (
              <div key={city.city} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  {index + 1}. {city.city}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {city.count} users
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alert Types Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Alert Types Distribution
            </h3>
          </div>
          <div className="space-y-3">
            {stats.alert_types_distribution.map((type, index) => (
              <div key={type.type} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  {type.type}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${type.count}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {type.count}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent System Activity
          </h3>
        </div>
        <div className="space-y-4">
          {[
            { time: '2 min ago', event: 'Severe weather alert sent to 45 users in London' },
            { time: '15 min ago', event: 'Daily forecast delivered to 1,234 users' },
            { time: '1 hour ago', event: 'New user registration: john@example.com' },
            { time: '2 hours ago', event: 'Air quality alert sent to 23 users in Tokyo' },
            { time: '3 hours ago', event: 'System maintenance completed successfully' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {activity.event}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminDashboard;
