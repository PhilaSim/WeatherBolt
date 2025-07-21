import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserPreferences } from '../types/weather';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultPreferences: UserPreferences = {
  cities: ['Cape Town'],
  alert_types: ['email'],
  alert_frequency: 'daily',
  quiet_hours: {
    enabled: true,
    start: '22:00',
    end: '07:00'
  },
  temperature_unit: 'celsius',
  notifications: {
    severe_weather: true,
    daily_forecast: true,
    air_quality: false
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('weathersense_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAdmin(userData.email === 'admin@weathersense.com');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    if (email && password) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        preferences: defaultPreferences,
        created_at: new Date().toISOString()
      };

      setUser(userData);
      setIsAdmin(email === 'admin@weathersense.com');
      localStorage.setItem('weathersense_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration
    if (email && password && name) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        preferences: defaultPreferences,
        created_at: new Date().toISOString()
      };

      setUser(userData);
      setIsAdmin(email === 'admin@weathersense.com');
      localStorage.setItem('weathersense_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('weathersense_user');
  };

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...newPreferences }
      };
      setUser(updatedUser);
      localStorage.setItem('weathersense_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updatePreferences,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}