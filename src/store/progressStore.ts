import { create } from 'zustand';
import { Language, LanguageProgress } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const defaultProgress: Record<Language, LanguageProgress> = {
  en: { level: 1, xp: 0, streak: 0, vocabulary: [], completedLessons: [], dailyGoal: { target: 50, completed: 0 }, lastStudyDate: '', abilities: { vocabulary: 0, grammar: 0, speaking: 0, listening: 0 } },
  jp: { level: 1, xp: 0, streak: 0, vocabulary: [], completedLessons: [], dailyGoal: { target: 50, completed: 0 }, lastStudyDate: '', abilities: { vocabulary: 0, grammar: 0, speaking: 0, listening: 0 } },
  kr: { level: 1, xp: 0, streak: 0, vocabulary: [], completedLessons: [], dailyGoal: { target: 50, completed: 0 }, lastStudyDate: '', abilities: { vocabulary: 0, grammar: 0, speaking: 0, listening: 0 } }
};

interface ProgressState {
  progress: Record<Language, LanguageProgress>;
  updateXP: (language: Language, amount: number) => void;
  completeLesson: (language: Language, lessonId: string, xpReward: number) => void;
  updateStreak: (language: Language) => void;
  addVocabulary: (language: Language, wordId: string) => void;
  updateDailyGoal: (language: Language, completed: number) => void;
  updateAbility: (language: Language, ability: keyof LanguageProgress['abilities'], value: number) => void;
  getOverallProgress: () => number;
  getTotalXP: () => number;
  getCompletedLessonsCount: () => number;
}

const calculateStreak = (lastDate: string): number => {
  if (!lastDate) return 1;
  const last = new Date(lastDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  const diff = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 0;
  if (diff === 1) return 1;
  return 1;
};

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: loadFromStorage('progress') || defaultProgress,

  updateXP: (language, amount) => {
    set(state => {
      const newProgress = { ...state.progress };
      const current = newProgress[language];
      
      newProgress[language] = {
        ...current,
        xp: current.xp + amount,
        level: Math.floor((current.xp + amount) / 500) + 1
      };
      
      saveToStorage('progress', newProgress);
      return { progress: newProgress };
    });
  },

  completeLesson: (language, lessonId, xpReward) => {
    set(state => {
      const newProgress = { ...state.progress };
      const current = newProgress[language];
      const today = new Date().toISOString().split('T')[0];
      const streakIncrease = calculateStreak(current.lastStudyDate);
      
      newProgress[language] = {
        ...current,
        xp: current.xp + xpReward,
        level: Math.floor((current.xp + xpReward) / 500) + 1,
        streak: current.lastStudyDate === today ? current.streak : current.streak + streakIncrease,
        completedLessons: current.completedLessons.includes(lessonId) 
          ? current.completedLessons 
          : [...current.completedLessons, lessonId],
        lastStudyDate: today
      };
      
      saveToStorage('progress', newProgress);
      return { progress: newProgress };
    });
  },

  updateStreak: (language) => {
    set(state => {
      const newProgress = { ...state.progress };
      const current = newProgress[language];
      const today = new Date().toISOString().split('T')[0];
      
      if (current.lastStudyDate !== today) {
        const streakIncrease = calculateStreak(current.lastStudyDate);
        newProgress[language] = {
          ...current,
          streak: current.streak + streakIncrease,
          lastStudyDate: today
        };
        saveToStorage('progress', newProgress);
      }
      
      return { progress: newProgress };
    });
  },

  addVocabulary: (language, wordId) => {
    set(state => {
      const newProgress = { ...state.progress };
      const current = newProgress[language];
      
      if (!current.vocabulary.includes(wordId)) {
        newProgress[language] = {
          ...current,
          vocabulary: [...current.vocabulary, wordId]
        };
        saveToStorage('progress', newProgress);
      }
      
      return { progress: newProgress };
    });
  },

  updateDailyGoal: (language, completed) => {
    set(state => {
      const newProgress = { ...state.progress };
      newProgress[language] = {
        ...newProgress[language],
        dailyGoal: { ...newProgress[language].dailyGoal, completed }
      };
      saveToStorage('progress', newProgress);
      return { progress: newProgress };
    });
  },

  updateAbility: (language, ability, value) => {
    set(state => {
      const newProgress = { ...state.progress };
      newProgress[language] = {
        ...newProgress[language],
        abilities: { ...newProgress[language].abilities, [ability]: value }
      };
      saveToStorage('progress', newProgress);
      return { progress: newProgress };
    });
  },

  getOverallProgress: () => {
    const { progress } = get();
    const totalPossibleXP = 3000;
    const totalXP = Object.values(progress).reduce((sum, p) => sum + p.xp, 0);
    return Math.min(100, Math.round((totalXP / totalPossibleXP) * 100));
  },

  getTotalXP: () => {
    const { progress } = get();
    return Object.values(progress).reduce((sum, p) => sum + p.xp, 0);
  },

  getCompletedLessonsCount: () => {
    const { progress } = get();
    return Object.values(progress).reduce((sum, p) => sum + p.completedLessons.length, 0);
  }
}));
