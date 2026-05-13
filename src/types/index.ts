export type Language = 'en' | 'jp' | 'kr';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type LessonType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  vip: boolean;
  joinDate: number;
  preferredLanguage: Language;
}

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  learnerCount: number;
  color: string;
  gradient: string;
}

export interface Course {
  id: string;
  language: Language;
  level: Level;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  totalXP: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: number;
  xpReward: number;
  content: VocabularyContent | GrammarContent | SpeakingContent | ListeningContent;
}

export interface VocabularyContent {
  words: VocabularyWord[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
  audioUrl?: string;
}

export interface GrammarContent {
  rules: GrammarRule[];
  exercises: GrammarExercise[];
}

export interface GrammarRule {
  id: string;
  pattern: string;
  explanation: string;
  examples: string[];
}

export interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface SpeakingContent {
  sentences: SpeakingSentence[];
}

export interface SpeakingSentence {
  id: string;
  text: string;
  translation: string;
  audioUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ListeningContent {
  dialogues: ListeningDialogue[];
}

export interface ListeningDialogue {
  id: string;
  audioUrl?: string;
  script: string;
  translation: string;
  questions: ListeningQuestion[];
}

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface LanguageProgress {
  level: number;
  xp: number;
  streak: number;
  vocabulary: string[];
  completedLessons: string[];
  dailyGoal: {
    target: number;
    completed: number;
  };
  lastStudyDate: string;
  abilities: {
    vocabulary: number;
    grammar: number;
    speaking: number;
    listening: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: number;
  requirement: {
    type: 'streak' | 'lessons' | 'xp' | 'vocabulary';
    value: number;
  };
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  language: Language;
  title: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: number;
  tags: string[];
}

export interface Settings {
  dailyReminder: boolean;
  theme: 'dark' | 'light';
  soundEffects: boolean;
  autoPlay: boolean;
}
