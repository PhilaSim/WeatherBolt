import { WeatherData, WeatherSummary, ForecastData } from '../types/weather';

// Enhanced AI-powered weather insights with global context
export function generateAdvancedWeatherSummary(
  weather: WeatherData, 
  forecast: ForecastData[],
  userLocation?: string
): WeatherSummary {
  const temp = weather.temp;
  const condition = weather.main;
  const humidity = weather.humidity;
  const windSpeed = weather.wind_speed;
  const uvIndex = weather.uv_index;
  const airQuality = weather.air_quality;
  
  // Generate comprehensive summary
  const friendlySummary = generateAdvancedSummary(weather, forecast);
  
  // Generate location-aware activity suggestions
  const activitySuggestions = generateGlobalActivitySuggestions(weather, forecast);
  
  // Generate mood-based playlist
  const moodPlaylist = generateAdvancedMoodPlaylist(weather);
  
  // Generate personalized affirmation
  const affirmation = generatePersonalizedAffirmation(weather);
  
  // Generate solar optimization tips
  const solarTips = generateSolarTips(weather, forecast);
  
  // Generate health recommendations
  const healthRecommendations = generateHealthRecommendations(weather);
  
  return {
    friendly_summary: friendlySummary,
    activity_suggestions: activitySuggestions,
    mood_playlist: moodPlaylist,
    affirmation: affirmation,
    solar_tips: solarTips,
    health_recommendations: healthRecommendations
  };
}

function generateAdvancedSummary(weather: WeatherData, forecast: ForecastData[]): string {
  const temp = weather.temp;
  const condition = weather.main;
  const city = weather.city;
  const windSpeed = weather.wind_speed;
  const humidity = weather.humidity;
  const uvIndex = weather.uv_index;
  
  // Temperature descriptors
  let tempDesc = 'mild';
  if (temp < 0) tempDesc = 'freezing';
  else if (temp < 10) tempDesc = 'cold';
  else if (temp < 18) tempDesc = 'cool';
  else if (temp < 25) tempDesc = 'pleasant';
  else if (temp < 30) tempDesc = 'warm';
  else if (temp < 35) tempDesc = 'hot';
  else tempDesc = 'extremely hot';
  
  // Wind descriptors
  let windDesc = '';
  if (windSpeed > 25) windDesc = ' with strong winds';
  else if (windSpeed > 15) windDesc = ' with moderate winds';
  else if (windSpeed > 8) windDesc = ' with light winds';
  
  // Humidity comfort
  let humidityDesc = '';
  if (humidity > 80) humidityDesc = ' and quite humid';
  else if (humidity > 60) humidityDesc = ' with moderate humidity';
  else if (humidity < 30) humidityDesc = ' and dry';
  
  // UV warning
  let uvWarning = '';
  if (uvIndex >= 8) uvWarning = ' ⚠️ High UV - wear sunscreen!';
  else if (uvIndex >= 6) uvWarning = ' ☀️ Moderate UV - consider sun protection';
  
  // Tomorrow's outlook
  const tomorrow = forecast[0];
  let tomorrowOutlook = '';
  if (tomorrow) {
    const tempChange = tomorrow.temp_max - temp;
    if (tempChange > 5) tomorrowOutlook = ` Tomorrow will be warmer (${Math.round(tomorrow.temp_max)}°C).`;
    else if (tempChange < -5) tomorrowOutlook = ` Tomorrow will be cooler (${Math.round(tomorrow.temp_max)}°C).`;
    else tomorrowOutlook = ` Similar weather expected tomorrow.`;
  }
  
  const summaries = {
    'Clear': [
      `Beautiful ${tempDesc} and sunny weather in ${city}${windDesc}${humidityDesc}!${uvWarning}${tomorrowOutlook} ☀️`,
      `Gorgeous clear skies and ${tempDesc} temperatures in ${city}${windDesc}. Perfect day ahead!${uvWarning}${tomorrowOutlook} 🌞`,
      `Stunning ${tempDesc} sunshine in ${city}${windDesc}${humidityDesc}. Make the most of this beautiful day!${uvWarning}${tomorrowOutlook} ✨`
    ],
    'Clouds': [
      `${tempDesc.charAt(0).toUpperCase() + tempDesc.slice(1)} and cloudy in ${city}${windDesc}${humidityDesc}. Comfortable weather for most activities!${tomorrowOutlook} ☁️`,
      `Overcast but ${tempDesc} conditions in ${city}${windDesc}. Great weather for outdoor adventures!${tomorrowOutlook} 🌤️`,
      `Pleasant ${tempDesc} weather with cloud cover in ${city}${windDesc}${humidityDesc}. Perfect for a stroll!${tomorrowOutlook} ⛅`
    ],
    'Rain': [
      `${tempDesc.charAt(0).toUpperCase() + tempDesc.slice(1)} and rainy in ${city}${windDesc}${humidityDesc}. Great day for cozy indoor activities!${tomorrowOutlook} 🌧️`,
      `Refreshing rain and ${tempDesc} temperatures in ${city}${windDesc}. Don't forget your umbrella!${tomorrowOutlook} ☔`,
      `${tempDesc.charAt(0).toUpperCase() + tempDesc.slice(1)} showers in ${city}${windDesc}. Perfect weather for relaxing indoors!${tomorrowOutlook} 🌦️`
    ],
    'Thunderstorm': [
      `Dramatic thunderstorms and ${tempDesc} weather in ${city}${windDesc}${humidityDesc}. Stay safe indoors!${tomorrowOutlook} ⛈️`,
      `Stormy ${tempDesc} conditions in ${city}${windDesc}. Perfect day for hot drinks and indoor activities!${tomorrowOutlook} 🌩️`,
      `Intense thunderstorm weather in ${city}${windDesc}${humidityDesc}. Cozy up inside and enjoy the show!${tomorrowOutlook} ⚡`
    ],
    'Snow': [
      `${tempDesc.charAt(0).toUpperCase() + tempDesc.slice(1)} and snowy in ${city}${windDesc}${humidityDesc}. Winter wonderland conditions!${tomorrowOutlook} ❄️`,
      `Beautiful snow and ${tempDesc} temperatures in ${city}${windDesc}. Bundle up and enjoy!${tomorrowOutlook} 🌨️`,
      `Snowy ${tempDesc} weather in ${city}${windDesc}${humidityDesc}. Perfect for winter activities!${tomorrowOutlook} ⛄`
    ]
  };
  
  const conditionSummaries = summaries[condition as keyof typeof summaries] || summaries['Clear'];
  return conditionSummaries[Math.floor(Math.random() * conditionSummaries.length)];
}

function generateGlobalActivitySuggestions(weather: WeatherData, forecast: ForecastData[]): string[] {
  const temp = weather.temp;
  const condition = weather.main;
  const windSpeed = weather.wind_speed;
  const uvIndex = weather.uv_index;
  const city = weather.city;
  const country = weather.country;
  
  const suggestions: string[] = [];
  
  // Location-specific suggestions
  if (country === 'US') {
    if (city === 'New York') {
      if (condition === 'Clear' && temp >= 15) {
        suggestions.push('Perfect weather for a walk in Central Park! 🌳');
        suggestions.push('Great day to visit the High Line! 🚶‍♀️');
      }
    } else if (city === 'Los Angeles') {
      if (condition === 'Clear') {
        suggestions.push('Ideal beach weather in Malibu! 🏖️');
        suggestions.push('Perfect for hiking in Griffith Park! 🥾');
      }
    }
  } else if (country === 'GB') {
    if (condition === 'Rain') {
      suggestions.push('Perfect weather for visiting museums! 🏛️');
      suggestions.push('Great day for a cozy pub visit! 🍺');
    } else if (condition === 'Clear') {
      suggestions.push('Lovely weather for a countryside walk! 🌿');
    }
  } else if (country === 'JP') {
    if (condition === 'Clear' && temp >= 15) {
      suggestions.push('Beautiful weather for cherry blossom viewing! 🌸');
      suggestions.push('Perfect for visiting traditional gardens! 🏯');
    }
  } else if (country === 'AU') {
    if (condition === 'Clear' && temp >= 20) {
      suggestions.push('Great day for a barbecue! 🔥');
      suggestions.push('Perfect beach weather! 🏄‍♂️');
    }
  }
  
  // Universal weather-based suggestions
  if (condition === 'Clear') {
    if (temp >= 20 && temp <= 28) {
      suggestions.push('Perfect temperature for outdoor sports! ⚽');
      suggestions.push('Great weather for cycling! 🚴‍♀️');
      suggestions.push('Ideal conditions for a picnic! 🧺');
    }
    if (temp >= 25) {
      suggestions.push('Perfect swimming weather! 🏊‍♀️');
    }
    if (uvIndex >= 6) {
      suggestions.push('Don\'t forget sunscreen for outdoor activities! 🧴');
    }
  }
  
  if (condition === 'Clouds') {
    suggestions.push('Great weather for photography - soft lighting! 📸');
    suggestions.push('Perfect for long walks without harsh sun! 🚶‍♂️');
    suggestions.push('Ideal conditions for outdoor markets! 🛒');
  }
  
  if (condition === 'Rain') {
    suggestions.push('Perfect weather for reading with hot tea! 📚☕');
    suggestions.push('Great day for indoor rock climbing! 🧗‍♀️');
    suggestions.push('Ideal time for cooking a hearty meal! 🍲');
    suggestions.push('Perfect for binge-watching your favorite series! 📺');
  }
  
  if (condition === 'Snow') {
    suggestions.push('Perfect for building snowmen! ⛄');
    suggestions.push('Great weather for skiing or snowboarding! 🎿');
    suggestions.push('Ideal for cozy fireside activities! 🔥');
  }
  
  // Wind-based suggestions
  if (windSpeed > 20) {
    suggestions.push('Too windy for cycling - consider indoor activities! 🚫🚴‍♂️');
  } else if (windSpeed > 12) {
    suggestions.push('Great wind conditions for kite flying! 🪁');
    suggestions.push('Perfect weather for sailing! ⛵');
  }
  
  // Temperature-based suggestions
  if (temp > 35) {
    suggestions.push('Stay hydrated and seek shade! 💧');
    suggestions.push('Perfect for indoor activities with AC! ❄️');
  } else if (temp < 0) {
    suggestions.push('Bundle up warmly for outdoor activities! 🧥');
    suggestions.push('Great weather for hot chocolate! ☕');
  }
  
  return suggestions.slice(0, 4);
}

function generateAdvancedMoodPlaylist(weather: WeatherData): { title: string; description: string; songs: string[] } {
  const condition = weather.main;
  const temp = weather.temp;
  const time = new Date().getHours();
  
  let playlistModifier = '';
  if (time >= 6 && time < 12) playlistModifier = 'Morning ';
  else if (time >= 12 && time < 17) playlistModifier = 'Afternoon ';
  else if (time >= 17 && time < 21) playlistModifier = 'Evening ';
  else playlistModifier = 'Night ';
  
  const playlists = {
    'Clear': {
      title: `${playlistModifier}Sunshine Vibes ☀️`,
      description: 'Uplifting tracks to match the beautiful sunny weather',
      songs: [
        'Here Comes the Sun - The Beatles',
        'Good as Hell - Lizzo',
        'Can\'t Stop the Feeling - Justin Timberlake',
        'Walking on Sunshine - Katrina and the Waves',
        'Happy - Pharrell Williams',
        'Lovely Day - Bill Withers',
        'Three Little Birds - Bob Marley',
        'I Can See Clearly Now - Johnny Nash',
        'Sunshine - OneRepublic',
        'Good Day Sunshine - The Beatles'
      ]
    },
    'Clouds': {
      title: `${playlistModifier}Cloudy Contemplation ☁️`,
      description: 'Thoughtful melodies for a peaceful cloudy day',
      songs: [
        'Both Sides Now - Joni Mitchell',
        'Cloudy - Simon & Garfunkel',
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
      title: `${playlistModifier}Rainy Day Comfort 🌧️`,
      description: 'Cozy songs perfect for rainy weather',
      songs: [
        'Raindrops Keep Fallin\' on My Head - B.J. Thomas',
        'Purple Rain - Prince',
        'Have You Ever Seen the Rain? - CCR',
        'Riders on the Storm - The Doors',
        'November Rain - Guns N\' Roses',
        'Rain on Me - Lady Gaga & Ariana Grande',
        'Set Fire to the Rain - Adele',
        'I Can\'t Stand the Rain - Ann Peebles',
        'Rainy Days and Mondays - The Carpenters',
        'It\'s Raining Men - The Weather Girls'
      ]
    },
    'Thunderstorm': {
      title: `${playlistModifier}Storm Soundtrack ⛈️`,
      description: 'Dramatic music to match the stormy weather',
      songs: [
        'Thunderstruck - AC/DC',
        'Thunder - Imagine Dragons',
        'Stormy Weather - Etta James',
        'Lightning Crashes - Live',
        'Riders on the Storm - The Doors',
        'Thunder Road - Bruce Springsteen',
        'Electric Feel - MGMT',
        'Storm - Godspeed You! Black Emperor',
        'When the Levee Breaks - Led Zeppelin',
        'Tornado of Souls - Megadeth'
      ]
    },
    'Snow': {
      title: `${playlistModifier}Winter Wonderland ❄️`,
      description: 'Magical songs for snowy weather',
      songs: [
        'Let It Snow! Let It Snow! Let It Snow! - Dean Martin',
        'Winter Wonderland - Tony Bennett',
        'Snowflake - Kate Bush',
        'White Winter Hymnal - Fleet Foxes',
        'Snow (Hey Oh) - Red Hot Chili Peppers',
        'A Hazy Shade of Winter - Simon & Garfunkel',
        'Winter Song - Sara Bareilles & Ingrid Michaelson',
        'Snowed In - Hanson',
        'Snow Angel - Renee Fleming',
        'Frosty the Snowman - Gene Autry'
      ]
    }
  };
  
  const playlist = playlists[condition as keyof typeof playlists] || playlists['Clear'];
  
  // Shuffle and return 6 random songs
  const shuffledSongs = [...playlist.songs].sort(() => Math.random() - 0.5).slice(0, 6);
  
  return {
    ...playlist,
    songs: shuffledSongs
  };
}

function generatePersonalizedAffirmation(weather: WeatherData): string {
  const condition = weather.main;
  const temp = weather.temp;
  const time = new Date().getHours();
  
  let timeGreeting = '';
  if (time >= 5 && time < 12) timeGreeting = 'This morning, ';
  else if (time >= 12 && time < 17) timeGreeting = 'This afternoon, ';
  else if (time >= 17 && time < 21) timeGreeting = 'This evening, ';
  else timeGreeting = 'Tonight, ';
  
  const affirmations = {
    'Clear': [
      `${timeGreeting}I embrace the sunshine and let it fill me with energy and positivity! ✨`,
      `${timeGreeting}like the clear sky above, my mind is clear and focused on my goals! 🌞`,
      `${timeGreeting}I radiate warmth and light, just like the beautiful sun! 💫`,
      `${timeGreeting}I am grateful for this beautiful day and all the opportunities it brings! 🌈`
    ],
    'Clouds': [
      `${timeGreeting}even behind clouds, I know my inner light shines bright! ☁️✨`,
      `${timeGreeting}I find peace in life's gentle moments, just like these soft clouds! 🤍`,
      `${timeGreeting}I am calm and centered, like the serene sky above! 🧘‍♀️`,
      `${timeGreeting}I embrace both sunny and cloudy days as part of life's beautiful journey! ☁️`
    ],
    'Rain': [
      `${timeGreeting}like rain nourishes the earth, I allow myself to grow and flourish! 🌱`,
      `${timeGreeting}I find peace in life's rhythms, just like the gentle sound of rain! 🌧️`,
      `${timeGreeting}I am grateful for moments of reflection and renewal! 💆‍♀️`,
      `${timeGreeting}every drop of rain reminds me that growth comes from all experiences! ☔`
    ],
    'Thunderstorm': [
      `${timeGreeting}I am strong and resilient, weathering any storm that comes my way! ⚡`,
      `${timeGreeting}like lightning illuminates the sky, I let my inner power shine! 💪`,
      `${timeGreeting}I find excitement and energy in life's dramatic moments! ⛈️`,
      `${timeGreeting}after every storm, I emerge stronger and more grateful! 🌈`
    ],
    'Snow': [
      `${timeGreeting}I embrace the quiet beauty of this moment, like fresh fallen snow! ❄️`,
      `${timeGreeting}I am unique and special, just like every snowflake! ⛄`,
      `${timeGreeting}I find wonder in winter's peaceful embrace! 🌨️`,
      `${timeGreeting}I am cozy and content, surrounded by nature's winter magic! ✨`
    ]
  };
  
  const conditionAffirmations = affirmations[condition as keyof typeof affirmations] || affirmations['Clear'];
  return conditionAffirmations[Math.floor(Math.random() * conditionAffirmations.length)];
}

function generateSolarTips(weather: WeatherData, forecast: ForecastData[]): string[] {
  const condition = weather.main;
  const uvIndex = weather.uv_index;
  const cloudCover = condition === 'Clouds' ? 70 : condition === 'Clear' ? 10 : 90;
  
  const tips: string[] = [];
  
  if (condition === 'Clear' && uvIndex >= 6) {
    tips.push('☀️ Excellent solar panel efficiency expected today - up to 95% output!');
    tips.push('💡 Peak solar generation between 10 AM - 2 PM');
    tips.push('🔋 Great day to run energy-intensive appliances during daylight hours');
  } else if (condition === 'Clouds') {
    tips.push('⛅ Moderate solar efficiency expected - around 60-70% output');
    tips.push('🌤️ Diffused sunlight still generates power throughout the day');
    tips.push('💰 Good day for battery storage to maximize solar investment');
  } else if (condition === 'Rain') {
    tips.push('🌧️ Lower solar output today - rely more on stored battery power');
    tips.push('🧽 Rain will naturally clean your solar panels for better future efficiency!');
    tips.push('⚡ Consider using grid power for high-energy activities today');
  }
  
  // Weekly outlook
  const clearDays = forecast.filter(day => day.main === 'Clear').length;
  if (clearDays >= 3) {
    tips.push(`📊 Great week ahead for solar - ${clearDays} sunny days expected!`);
  }
  
  return tips.slice(0, 3);
}

function generateHealthRecommendations(weather: WeatherData): string[] {
  const temp = weather.temp;
  const condition = weather.main;
  const humidity = weather.humidity;
  const uvIndex = weather.uv_index;
  const airQuality = weather.air_quality;
  
  const recommendations: string[] = [];
  
  // Temperature-based health advice
  if (temp > 30) {
    recommendations.push('🌡️ Stay hydrated - drink water regularly throughout the day');
    recommendations.push('🏠 Avoid prolonged outdoor activities during peak heat hours');
    recommendations.push('👕 Wear light-colored, loose-fitting clothing');
  } else if (temp < 5) {
    recommendations.push('🧥 Dress in layers to maintain body temperature');
    recommendations.push('🫖 Warm beverages can help maintain core body temperature');
    recommendations.push('🏃‍♂️ Light exercise can help improve circulation in cold weather');
  }
  
  // UV-based recommendations
  if (uvIndex >= 8) {
    recommendations.push('☀️ Apply SPF 30+ sunscreen and reapply every 2 hours');
    recommendations.push('🕶️ Wear sunglasses and a wide-brimmed hat outdoors');
    recommendations.push('🌳 Seek shade during peak UV hours (10 AM - 4 PM)');
  } else if (uvIndex >= 3) {
    recommendations.push('🧴 Light sun protection recommended for extended outdoor time');
  }
  
  // Humidity-based advice
  if (humidity > 80) {
    recommendations.push('💨 High humidity may affect those with respiratory conditions');
    recommendations.push('🏠 Use dehumidifiers indoors for comfort');
  } else if (humidity < 30) {
    recommendations.push('💧 Low humidity - use moisturizer and stay hydrated');
    recommendations.push('🌿 Consider using a humidifier indoors');
  }
  
  // Air quality recommendations
  if (airQuality && airQuality.aqi >= 3) {
    recommendations.push('😷 Consider wearing a mask outdoors if you have respiratory sensitivities');
    recommendations.push('🏠 Keep windows closed and use air purifiers indoors');
    recommendations.push('🚫 Limit outdoor exercise, especially for sensitive individuals');
  }
  
  // Weather condition specific
  if (condition === 'Rain') {
    recommendations.push('🦠 Wash hands frequently - damp weather can increase illness transmission');
  } else if (condition === 'Snow') {
    recommendations.push('❄️ Watch for icy conditions to prevent slips and falls');
    recommendations.push('🧤 Protect extremities from frostbite with proper gear');
  }
  
  return recommendations.slice(0, 4);
}