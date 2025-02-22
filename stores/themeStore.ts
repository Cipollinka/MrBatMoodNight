import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  hapticFeedback: boolean;
  setHapticFeedback: (enabled: boolean) => void;
  animationSpeed: 'fast' | 'normal' | 'slow';
  setAnimationSpeed: (speed: 'fast' | 'normal' | 'slow') => void;
  useGradients: boolean;
  setUseGradients: (enabled: boolean) => void;
  elevationLevel: 'small' | 'medium' | 'large';
  setElevationLevel: (level: 'small' | 'medium' | 'large') => void;
}

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      isDarkMode: false,
      setIsDarkMode: (isDarkMode) => set({isDarkMode}),
      accentColor: '#57A9FF',
      setAccentColor: (color) => set({accentColor: color}),
      fontSize: 'medium',
      setFontSize: (size) => set({fontSize: size}),
      hapticFeedback: true,
      setHapticFeedback: (enabled) => set({hapticFeedback: enabled}),
      animationSpeed: 'normal',
      setAnimationSpeed: (speed) => set({animationSpeed: speed}),
      useGradients: true,
      setUseGradients: (enabled) => set({useGradients: enabled}),
      elevationLevel: 'medium',
      setElevationLevel: (level) => set({elevationLevel: level}),
    }),
    {
      name: 'themeStore',
      storage: {
        getItem: async (key: string) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key: string, value: any) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key: string) => {
          await AsyncStorage.removeItem(key);
        },
      },
    },
  ),
);