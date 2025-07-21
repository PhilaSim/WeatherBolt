export function getWeatherAnimation(condition: string): string {
  const animations = {
    'Clear': 'animate-pulse',
    'Clouds': 'animate-float',
    'Rain': 'animate-rain',
    'Thunderstorm': 'animate-flash',
    'Snow': 'animate-snow',
    'Mist': 'animate-fade',
    'Drizzle': 'animate-drizzle',
    'Fog': 'animate-fade'
  };
  
  return animations[condition as keyof typeof animations] || 'animate-pulse';
}

export function getWeatherGradient(condition: string, isDarkMode: boolean): string {
  const gradients = {
    'Clear': isDarkMode 
      ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900'
      : 'bg-gradient-to-br from-blue-400 via-blue-500 to-yellow-400',
    'Clouds': isDarkMode
      ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900'
      : 'bg-gradient-to-br from-gray-400 via-gray-500 to-blue-400',
    'Rain': isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800'
      : 'bg-gradient-to-br from-gray-600 via-blue-600 to-gray-500',
    'Thunderstorm': isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
      : 'bg-gradient-to-br from-gray-700 via-purple-700 to-gray-800',
    'Snow': isDarkMode
      ? 'bg-gradient-to-br from-blue-900 via-gray-800 to-blue-800'
      : 'bg-gradient-to-br from-blue-200 via-white to-gray-300',
    'Mist': isDarkMode
      ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600'
      : 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500'
  };
  
  return gradients[condition as keyof typeof gradients] || gradients['Clear'];
}