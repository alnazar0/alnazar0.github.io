import { Achievement } from '../types';

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: '第一步',
    description: '完成你的第一节课',
    icon: 'Footprints',
    color: '#10B981',
    requirement: { type: 'lessons', value: 1 }
  },
  {
    id: 'week-streak',
    title: '一周坚持',
    description: '连续学习7天',
    icon: 'Flame',
    color: '#F59E0B',
    requirement: { type: 'streak', value: 7 }
  },
  {
    id: 'month-streak',
    title: '一月坚持',
    description: '连续学习30天',
    icon: 'Trophy',
    color: '#FFD700',
    requirement: { type: 'streak', value: 30 }
  },
  {
    id: 'vocab-master',
    title: '词汇大师',
    description: '掌握100个单词',
    icon: 'BookOpen',
    color: '#6366F1',
    requirement: { type: 'vocabulary', value: 100 }
  },
  {
    id: 'xp-warrior',
    title: '经验战士',
    description: '累计获得1000经验值',
    icon: 'Zap',
    color: '#EC4899',
    requirement: { type: 'xp', value: 1000 }
  },
  {
    id: 'lesson-legend',
    title: '课程达人',
    description: '完成50节课程',
    icon: 'GraduationCap',
    color: '#8B5CF6',
    requirement: { type: 'lessons', value: 50 }
  },
  {
    id: 'night-owl',
    title: '夜猫子',
    description: '在午夜学习',
    icon: 'Moon',
    color: '#6366F1',
    requirement: { type: 'lessons', value: 10 }
  },
  {
    id: 'early-bird',
    title: '早起鸟',
    description: '在早上6点前学习',
    icon: 'Sunrise',
    color: '#F59E0B',
    requirement: { type: 'lessons', value: 10 }
  }
];
