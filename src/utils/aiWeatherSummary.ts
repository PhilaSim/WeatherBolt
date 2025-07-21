import { WeatherData, WeatherSummary, ActivityPreference } from '../types/weather';

// Mock AI-powered weather summary generation
// In production, this would integrate with Amazon Bedrock or OpenAI
export function generateWeatherSummary(weather: WeatherData, userPreferences?: ActivityPreference[]): WeatherSummary {
  const temp = weather.temp;
  const condition = weather.main;
  const humidity = weather.humidity;
  const windSpeed = weather.wind_speed;
  
  // Generate friendly summary
  const friendlySummary = generateFriendlySummary(weather);
  
  // Generate activity suggestions
  const activitySuggestions = generateActivitySuggestions(weather, userPreferences);
  
  // Generate mood-based playlist
  const moodPlaylist = generateMoodPlaylist(weather);
  
  // Generate affirmation
  const affirmation = generateAffirmation(weather);
  
  return {
    friendly_summary: friendlySummary,
    activity_suggestions: activitySuggestions,
    mood_playlist: moodPlaylist,
    affirmation: affirmation
  };
}

function generateFriendlySummary(weather: WeatherData): string {
  const temp = weather.temp;
  const condition = weather.main;
  const city = weather.city;
  
  const tempDescriptions = {
    cold: temp < 10,
    cool: temp >= 10 && temp < 18,
    mild: temp >= 18 && temp < 25,
    warm: temp >= 25 && temp < 30,
    hot: temp >= 30
  };
  
  let tempDesc = 'mild';
  if (tempDescriptions.cold) tempDesc = 'cold';
  else if (tempDescriptions.cool) tempDesc = 'cool';
  else if (tempDescriptions.warm) tempDesc = 'warm';
  else if (tempDescriptions.hot) tempDesc = 'hot';
  
  const summaries = {
    'Clear': [
      `It's a beautiful ${tempDesc} day in ${city}! Perfect weather for outdoor activities. ☀️`,
      `Gorgeous ${tempDesc} and sunny weather in ${city} today. Make the most of it! 🌞`,
      `What a lovely ${tempDesc} day! Clear skies and sunshine await you in ${city}. ✨`
    ],
    'Clouds': [
      `It's a ${tempDesc} and cloudy day in ${city}. Great weather for a casual stroll! ☁️`,
      `Overcast but pleasant ${tempDesc} weather in ${city}. Perfect for indoor or outdoor activities. 🌤️`,
      `A ${tempDesc} cloudy day in ${city} - comfortable weather for most activities! ⛅`
    ],
    'Rain': [
      `It's a ${tempDesc} and rainy day in ${city}. Perfect weather for cozy indoor activities! 🌧️`,
      `Rainy ${tempDesc} weather in ${city} today. Don't forget your umbrella! ☔`,
      `A refreshing ${tempDesc} rainy day in ${city}. Great time to relax indoors! 🌦️`
    ],
    'Thunderstorm': [
      `Thunderstorms expected in ${city} today with ${tempDesc} temperatures. Stay safe indoors! ⛈️`,
      `Stormy ${tempDesc} weather in ${city}. Perfect day for indoor activities and hot drinks! 🌩️`,
      `Dramatic thunderstorm weather in ${city} with ${tempDesc} temps. Cozy up inside! ⚡`
    ]
  };
  
  const conditionSummaries = summaries[condition as keyof typeof summaries] || summaries['Clear'];
  return conditionSummaries[Math.floor(Math.random() * conditionSummaries.length)];
}

function generateActivitySuggestions(weather: WeatherData, userPreferences?: ActivityPreference[]): string[] {
  const temp = weather.temp;
  const condition = weather.main;
  const windSpeed = weather.wind_speed;
  
  const suggestions: string[] = [];
  
  // Weather-based suggestions
  if (condition === 'Clear') {
    if (temp >= 20 && temp <= 28) {
      suggestions.push('Perfect day for a braai (BBQ) with friends! 🔥');
      suggestions.push('Great weather for hiking in the Drakensberg! 🥾');
      suggestions.push('Ideal conditions for a beach day in Durban! 🏖️');
    }
    if (temp >= 15 && temp <= 25) {
      suggestions.push('Excellent weather for outdoor sports! ⚽');
      suggestions.push('Perfect for a picnic in the park! 🧺');
    }
    suggestions.push('Great day for photography - golden hour will be amazing! 📸');
  }
  
  if (condition === 'Clouds') {
    suggestions.push('Perfect overcast weather for a long walk! 🚶‍♀️');
    suggestions.push('Great conditions for cycling - not too hot! 🚴‍♂️');
    suggestions.push('Ideal weather for visiting outdoor markets! 🛒');
  }
  
  if (condition === 'Rain') {
    suggestions.push('Perfect weather for visiting museums or galleries! 🎨');
    suggestions.push('Great day for reading with a cup of rooibos tea! 📚');
    suggestions.push('Ideal time for indoor rock climbing! 🧗‍♀️');
    suggestions.push('Perfect for binge-watching your favorite series! 📺');
  }
  
  if (condition === 'Thunderstorm') {
    suggestions.push('Stay indoors and enjoy some board games! 🎲');
    suggestions.push('Perfect weather for cooking a hearty meal! 🍲');
    suggestions.push('Great time for indoor yoga or meditation! 🧘‍♀️');
  }
  
  // Wind-based suggestions
  if (windSpeed > 15) {
    suggestions.push('Too windy for cycling - consider indoor activities! 🚫🚴‍♂️');
  } else if (windSpeed > 10) {
    suggestions.push('Great wind conditions for kite flying! 🪁');
  }
  
  // Temperature-based suggestions
  if (temp > 30) {
    suggestions.push('Too hot for intense outdoor activities - stay hydrated! 💧');
    suggestions.push('Perfect weather for swimming! 🏊‍♀️');
  } else if (temp < 10) {
    suggestions.push('Bundle up for outdoor activities! 🧥');
    suggestions.push('Great weather for hot chocolate by the fireplace! ☕');
  }
  
  return suggestions.slice(0, 4); // Return top 4 suggestions
}

function generateMoodPlaylist(weather: WeatherData): { title: string; description: string; songs: string[] } {
  const condition = weather.main;
  const temp = weather.temp;
  
  const playlists = {
    'Clear': {
      title: 'Sunny Vibes ☀️',
      description: 'Upbeat tracks to match the beautiful sunny weather',
      songs: [
        'Here Comes the Sun - The Beatles',
        'Good as Hell - Lizzo',
        'Can\'t Stop the Feeling - Justin Timberlake',
        'Walking on Sunshine - Katrina and the Waves',
        'Happy - Pharrell Williams',
        'Lovely Day - Bill Withers',
        'Three Little Birds - Bob Marley',
        'I Can See Clearly Now - Johnny Nash'
      ]
    },
    'Clouds': {
      title: 'Cloudy Day Chill ☁️',
      description: 'Mellow tunes for a relaxed cloudy day',
      songs: [
        'Mad World - Gary Jules',
        'The Night We Met - Lord Huron',
        'Skinny Love - Bon Iver',
        'Holocene - Bon Iver',
        'Breathe Me - Sia',
        'Black - Pearl Jam',
        'Hurt - Johnny Cash',
        'Everybody Hurts - R.E.M.'
      ]
    },
    'Rain': {
      title: 'Rainy Day Comfort 🌧️',
      description: 'Cozy songs perfect for rainy weather',
      songs: [
        'Raindrops Keep Fallin\' on My Head - B.J. Thomas',
        'Purple Rain - Prince',
        'Have You Ever Seen the Rain? - Creedence Clearwater Revival',
        'Riders on the Storm - The Doors',
        'November Rain - Guns N\' Roses',
        'Rain on Me - Lady Gaga & Ariana Grande',
        'Set Fire to the Rain - Adele',
        'Chocolate Rain - Tay Zonday'
      ]
    },
    'Thunderstorm': {
      title: 'Storm Soundtrack ⛈️',
      description: 'Dramatic music to match the stormy weather',
      songs: [
        'Thunderstruck - AC/DC',
        'Thunder - Imagine Dragons',
        'Stormy Weather - Etta James',
        'Lightning Crashes - Live',
        'Riders on the Storm - The Doors',
        'Thunder Road - Bruce Springsteen',
        'Come on Eileen - Dexys Midnight Runners',
        'Electric Feel - MGMT'
      ]
    }
  };
  
  const playlist = playlists[condition as keyof typeof playlists] || playlists['Clear'];
  
  // Shuffle and return 5 random songs
  const shuffledSongs = [...playlist.songs].sort(() => Math.random() - 0.5).slice(0, 5);
  
  return {
    ...playlist,
    songs: shuffledSongs
  };
}

function generateAffirmation(weather: WeatherData): string {
  const condition = weather.main;
  const temp = weather.temp;
  
  const affirmations = {
    'Clear': [
      'Today is full of possibilities, just like this beautiful clear sky! ✨',
      'I radiate positivity and warmth, matching the sunshine around me! 🌞',
      'Clear skies remind me that after every storm, there\'s always brightness ahead! 🌈',
      'I embrace this beautiful day with gratitude and joy! 💫'
    ],
    'Clouds': [
      'Even on cloudy days, I shine from within! ☁️✨',
      'I find beauty in the gentle, soft light of today! 🤍',
      'Cloudy skies remind me that rest and reflection are just as important as action! 🧘‍♀️',
      'I am calm and peaceful, like the serene cloudy sky above! ☁️'
    ],
    'Rain': [
      'Like the rain nourishes the earth, I allow myself to grow and flourish! 🌱',
      'I find peace in the gentle rhythm of the rain! 🌧️',
      'Rainy days are perfect for self-care and inner reflection! 💆‍♀️',
      'I am grateful for this cozy day that allows me to slow down and appreciate life! ☔'
    ],
    'Thunderstorm': [
      'I am strong and resilient, just like nature weathering this storm! ⚡',
      'Storms remind me of my inner power and ability to overcome challenges! 💪',
      'I find excitement and energy in life\'s dramatic moments! ⛈️',
      'After every storm, I emerge stronger and more grateful! 🌈'
    ]
  };
  
  const conditionAffirmations = affirmations[condition as keyof typeof affirmations] || affirmations['Clear'];
  return conditionAffirmations[Math.floor(Math.random() * conditionAffirmations.length)];
}

// Activity preferences for South African users
export const defaultActivityPreferences: ActivityPreference[] = [
  {
    id: 'braai',
    name: 'Braai (BBQ)',
    weather_conditions: ['Clear', 'Clouds'],
    temperature_range: { min: 18, max: 32 }
  },
  {
    id: 'hiking',
    name: 'Hiking',
    weather_conditions: ['Clear', 'Clouds'],
    temperature_range: { min: 15, max: 28 }
  },
  {
    id: 'beach',
    name: 'Beach Activities',
    weather_conditions: ['Clear'],
    temperature_range: { min: 22, max: 35 }
  },
  {
    id: 'rugby',
    name: 'Rugby/Sports',
    weather_conditions: ['Clear', 'Clouds'],
    temperature_range: { min: 12, max: 30 }
  },
  {
    id: 'wine_tasting',
    name: 'Wine Tasting',
    weather_conditions: ['Clear', 'Clouds'],
    temperature_range: { min: 16, max: 26 }
  },
  {
    id: 'safari',
    name: 'Safari/Game Drive',
    weather_conditions: ['Clear', 'Clouds'],
    temperature_range: { min: 10, max: 30 }
  }
];