import React from 'react';
import { motion } from 'framer-motion';

interface WeatherAnimationsProps {
  condition: string;
  isDarkMode: boolean;
}

export function WeatherAnimations({ condition, isDarkMode }: WeatherAnimationsProps) {
  const renderRainDrops = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-0.5 h-4 ${isDarkMode ? 'bg-blue-300' : 'bg-blue-500'} rounded-full opacity-60`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
          animate={{
            y: ['-10vh', '110vh'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );

  const renderSnowflakes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 ${isDarkMode ? 'bg-white' : 'bg-gray-100'} rounded-full opacity-80`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );

  const renderClouds = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-20 h-12 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full opacity-40`}
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 25}%`
          }}
          animate={{
            x: ['-20px', '20px', '-20px']
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );

  const renderSunRays = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-8 ${isDarkMode ? 'bg-yellow-300' : 'bg-yellow-400'} rounded-full opacity-60`}
            style={{
              top: '-50px',
              left: '50%',
              transformOrigin: '50% 50px',
              transform: `rotate(${i * 45}deg) translateX(-50%)`
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  );

  const renderLightning = () => (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        animate={{
          opacity: [0, 0.3, 0, 0.5, 0]
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 3
        }}
      />
    </div>
  );

  switch (condition) {
    case 'Rain':
    case 'Drizzle':
      return renderRainDrops();
    case 'Snow':
      return renderSnowflakes();
    case 'Clouds':
      return renderClouds();
    case 'Clear':
      return renderSunRays();
    case 'Thunderstorm':
      return (
        <>
          {renderRainDrops()}
          {renderLightning()}
        </>
      );
    default:
      return null;
  }
}

export default WeatherAnimations;