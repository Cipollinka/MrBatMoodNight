import {Moods, Tracker} from '@/models/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  // User preferences
  isStartSkipped: boolean;
  setIsStartSkipped: (isStartSkipped: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  notifications: boolean;
  setNotifications: (enabled: boolean) => void;

  // Mood tracking
  currentMood: Moods | null;
  setCurrentMood: (mood: Moods | null) => void;
  moodStories: Record<Moods, number>;
  updateMoodStory: (mood: Moods) => void;

  // Story management
  favoriteStories: Record<Moods, number[]>;
  updateFavoriteStory: (mood: Moods, index: number) => void;

  // Mood statistics
  moodTracker: Record<Tracker, number>;
  updateMoodTracker: (tracker: Tracker) => void;
  weeklyStats: Record<string, Tracker>;
  updateWeeklyStats: (date: string, tracker: Tracker) => void;

  // Session state
  isFinished: boolean;
  setIsFinished: (isFinished: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  lastCheckedDate: string | null;
  checkDayChange: () => boolean;

  isTodayFinished: boolean;
  setIsTodayFinished: (isFinished: boolean) => void;
}

export const useCommonStore = create(
  persist<State>(
    (set, get) => ({
      isTodayFinished: false,
      setIsTodayFinished: isFinished => {
        set({isTodayFinished: isFinished});
      },
      // User preferences
      isStartSkipped: false,
      setIsStartSkipped: isStartSkipped => {
        set({isStartSkipped});
      },
      language: 'en',
      setLanguage: lang => set({language: lang}),
      notifications: true,
      setNotifications: enabled => set({notifications: enabled}),

      // Mood tracking
      currentMood: null,
      setCurrentMood: mood => {
        set({currentMood: mood});
      },
      moodStories: {
        [Moods.Mystical]: 0,
        [Moods.Quite]: 0,
        [Moods.Starry]: 0,
      },
      updateMoodStory: mood => {
        set({
          moodStories: {
            ...get().moodStories,
            [mood]: (get().moodStories[mood] + 1) % 5,
          },
        });
      },

      // Story management
      favoriteStories: {
        [Moods.Mystical]: [],
        [Moods.Quite]: [],
        [Moods.Starry]: [],
      },
      updateFavoriteStory: (mood, index) => {
        const saved = get().favoriteStories[mood];
        const isAlreadySaved = saved.includes(index);

        if (isAlreadySaved) {
          set({
            favoriteStories: {
              ...get().favoriteStories,
              [mood]: saved.filter(i => i !== index),
            },
          });
          return;
        }
        set({
          favoriteStories: {
            ...get().favoriteStories,
            [mood]: [...saved, index],
          },
        });
      },

      // Mood statistics
      moodTracker: {
        [Tracker.Nice]: 0,
        [Tracker.Normal]: 0,
        [Tracker.Terrible]: 0,
      },
      updateMoodTracker: tracker => {
        const today = dayjs().format('YYYY-MM-DD');
        set({
          moodTracker: {
            ...get().moodTracker,
            [tracker]: get().moodTracker[tracker] + 1,
          },
          weeklyStats: {
            ...get().weeklyStats,
            [today]: tracker,
          },
        });
      },
      weeklyStats: {},
      updateWeeklyStats: (date, tracker) => {
        set({
          weeklyStats: {
            ...get().weeklyStats,
            [date]: tracker,
          },
        });
      },

      // Session state
      isFinished: false,
      setIsFinished: isFinished => {
        set({isFinished});
      },
      currentStep: 1,
      setCurrentStep: step => {
        set({currentStep: step});
      },
      lastCheckedDate: null,
      checkDayChange: () => {
        const today = dayjs().format('YYYY-MM-DD');
        const lastCheckedDate = get().lastCheckedDate;

        if (lastCheckedDate !== today) {
          set({
            currentStep: 1,
            isFinished: false,
            currentMood: null,
            lastCheckedDate: today,
            isTodayFinished: false,
          });
          return true;
        } else {
          return false;
        }
      },
    }),
    {
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
      name: 'commonStore',
    },
  ),
);
