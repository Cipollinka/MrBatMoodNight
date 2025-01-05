import {Moods, Tracker} from '@/models/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  isStartSkipped: boolean;
  setIsStartSkipped: (isStartSkipped: boolean) => void;

  currentMood: Moods | null;
  setCurrentMood: (mood: Moods | null) => void;

  moodStories: Record<Moods, number>;
  updateMoodStory: (mood: Moods) => void;

  favoriteStories: Record<Moods, number[]>;
  updateFavoriteStory: (mood: Moods, index: number) => void;

  moodTracker: Record<Tracker, number>;
  updateMoodTracker: (tracker: Tracker) => void;

  isFinished: boolean;
  setIsFinished: (isFinished: boolean) => void;

  currentStep: number;
  setCurrentStep: (step: number) => void;

  lastCheckedDate: string | null;
  checkDayChange: () => void;
}

export const useCommonStore = create(
  persist<State>(
    (set, get) => ({
      isStartSkipped: false,
      setIsStartSkipped: isStartSkipped => {
        set({isStartSkipped});
      },

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

      moodTracker: {
        [Tracker.Nice]: 0,
        [Tracker.Normal]: 0,
        [Tracker.Terrible]: 0,
      },
      updateMoodTracker: tracker => {
        set({
          moodTracker: {
            ...get().moodTracker,
            [tracker]: get().moodTracker[tracker] + 1,
          },
        });
      },

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
          });
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
