import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Clock, Mail, MessageSquare } from 'lucide-react';
import { Alert } from '../types/weather';
import { useAuth } from '../contexts/AuthContext';

export function AlertsPanel() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Mock alert data
    const mockAlerts: Alert[] = [
      {
        id: '1',
        user_id: user?.id || '1',
        type: 'severe_weather',
        title: 'Severe Weather Warning',
        message: 'Heavy rainfall expected in London. Take necessary precautions.',
        severity: 'high',
        city: 'London',
        sent_at: new Date().toISOString(),
        delivery_method: 'email',
        status: 'delivered'
      },
      {
        id: '2',
        user_id: user?.id || '1',
        type: 'daily_forecast',
        title: 'Daily Weather Update',
        message: 'Sunny weather expected today with temperatures reaching 25°C.',
        severity: 'low',
        city: 'London',
        sent_at: new Date(Date.now() - 86400000).toISOString(),
        delivery_method: 'sms',
        status: 'delivered'
      },
      {
        id: '3',
        user_id: user?.id || '1',
        type: 'air_quality',
        title: 'Air Quality Alert',
        message: 'Air quality index is moderate. Sensitive individuals should limit outdoor activities.',
        severity: 'medium',
        city: 'London',
        sent_at: new Date(Date.now() - 172800000).toISOString(),
        delivery_method: 'email',
        status: 'delivered'
      }
    ];
    
    setAlerts(mockAlerts);
  }, [user]);

  const getSeverityColor = (severity: Alert['severity']) => {
    const colors = {
      low: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20',
      medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20',
      high: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20',
      critical: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
    };
    return colors[severity];
  };

  const getStatusIcon = (status: Alert['status']) => {
    const icons = {
      sent: <Clock className="w-4 h-4" />,
      delivered: <CheckCircle className="w-4 h-4" />,
      failed: <XCircle className="w-4 h-4" />
    };
    return icons[status];
  };

  const getDeliveryIcon = (method: Alert['delivery_method']) => {
    const icons = {
      email: <Mail className="w-4 h-4" />,
      sms: <MessageSquare className="w-4 h-4" />
    };
    return icons[method];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Alerts
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {alerts.length} total alerts
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {alert.title}
                </h3>
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
                <span>📍 {alert.city}</span>
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

      {alerts.length === 0 && (
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No alerts to show</p>
        </div>
      )}
    </motion.div>
  );
}

export default AlertsPanel;
