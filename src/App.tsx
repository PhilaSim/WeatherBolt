import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WeatherProvider } from './contexts/WeatherContext';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import AdvancedWeatherCard from './components/AdvancedWeatherCard';
import ForecastCard from './components/ForecastCard';
import SmartAlertSystem from './components/SmartAlertSystem';
import UserPreferences from './components/UserPreferences';
import AdminDashboard from './components/AdminDashboard';
import CitySelector from './components/CitySelector';
import AIWeatherSummary from './components/AIWeatherSummary';
import GlobalWeatherMap from './components/GlobalWeatherMap';
import { useWeather } from './contexts/WeatherContext';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentWeather, forecast, weatherSummary, loading, error } = useWeather();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Global Weather Intelligence Dashboard
              </h1>
              <CitySelector />
            </div>
            
            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            {currentWeather && !loading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AdvancedWeatherCard weather={currentWeather} />
                <ForecastCard forecast={forecast} />
              </div>
            )}
            
            {weatherSummary && !loading && (
              <AIWeatherSummary summary={weatherSummary} />
            )}
            
            {!loading && (
              <GlobalWeatherMap 
                onCitySelect={(city) => {
                  // This will be handled by the WeatherContext
                  // For now, we'll just log it
                  console.log('Selected city:', city);
                }} 
                selectedCity={currentWeather?.city || ''}
              />
            )}
          </div>
        );
      
      case 'alerts':
        return <SmartAlertSystem currentWeather={currentWeather} />;
      
      case 'settings':
        return <UserPreferences />;
      
      case 'admin':
        return <AdminDashboard />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

function AppContent() {
  const { user } = useAuth();
  
  if (!user) {
    return <LoginForm />;
  }
  
  return (
    <WeatherProvider>
      <Dashboard />
    </WeatherProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;