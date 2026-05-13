import { Language } from '../types';

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const getLanguageColor = (language: Language): string => {
  const colors: Record<Language, string> = {
    en: '#3B82F6',
    jp: '#F43F5E',
    kr: '#8B5CF6'
  };
  return colors[language];
};

export const getLanguageName = (language: Language): string => {
  const names: Record<Language, string> = {
    en: '英语',
    jp: '日语',
    kr: '韩语'
  };
  return names[language];
};

export const getLevelName = (level: string): string => {
  const names: Record<string, string> = {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级'
  };
  return names[level] || level;
};

export const getLevelColor = (lvl: string): string => {
  const colors: Record<string, string> = {
    beginner: '#10B981',
    intermediate: '#F59E0B',
    advanced: '#EF4444'
  };
  return colors[lvl] || '#6366F1';
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 6) return '夜深了，早点休息';
  if (hour < 9) return '早上好，准备好学习了吗';
  if (hour < 12) return '上午好，继续加油';
  if (hour < 14) return '中午好，午餐后小憩一下';
  if (hour < 18) return '下午好，保持专注';
  if (hour < 21) return '晚上好，充实的一天';
  return '夜深了，今天学到了什么';
};

export const calculateXPForNextLevel = (currentXP: number): { current: number; required: number; progress: number } => {
  const currentLevelXP = currentXP % 500;
  const required = 500;
  return {
    current: currentLevelXP,
    required,
    progress: (currentLevelXP / required) * 100
  };
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
