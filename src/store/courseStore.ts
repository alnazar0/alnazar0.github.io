import { create } from 'zustand';
import { Course, Lesson, Language } from '../types';
import { courses } from '../data/courses';

interface CourseState {
  courses: Course[];
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson | null) => void;
  getLessonsByLanguage: (language: Language) => Lesson[];
  getLessonsByLevel: (language: Language, level: string) => Lesson[];
  getCourseById: (courseId: string) => Course | undefined;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses,
  currentLesson: null,

  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

  getLessonsByLanguage: (language) => {
    const { courses } = get();
    return courses.filter(c => c.language === language).flatMap(c => c.lessons);
  },

  getLessonsByLevel: (language, level) => {
    const { courses } = get();
    return courses.filter(c => c.language === language && c.level === level).flatMap(c => c.lessons);
  },

  getCourseById: (courseId) => {
    const { courses } = get();
    return courses.find(c => c.id === courseId);
  }
}));
