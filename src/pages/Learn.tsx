import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { LessonCard } from '../components/learning/LessonCard';
import { Card } from '../components/common/Card';
import { ProgressRing } from '../components/common/ProgressRing';
import { useProgressStore } from '../store/progressStore';
import { languages } from '../data/languages';
import { courses } from '../data/courses';
import { Language, Level } from '../types';
import { TrendingUp, Clock, Zap } from 'lucide-react';

export const Learn = () => {
  const { language } = useParams<{ language: string }>();
  const [searchParams] = useSearchParams();
  const levelFilter = searchParams.get('level') as Level | null;
  const navigate = useNavigate();
  
  const { progress } = useProgressStore();

  const currentLanguage = language as Language;
  const langInfo = languages.find(l => l.code === currentLanguage);
  const langProgress = progress[currentLanguage];

  const filteredCourses = levelFilter
    ? courses.filter(c => c.language === currentLanguage && c.level === levelFilter)
    : courses.filter(c => c.language === currentLanguage);

  const handleLessonClick = (lessonId: string) => {
    navigate(`/learn/${currentLanguage}/${lessonId}`);
  };

  const completedCount = langProgress.completedLessons.length;
  const totalCount = filteredCourses.reduce((sum, c) => sum + c.lessons.length, 0);
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${langInfo?.color}20` }}
            >
              {langInfo?.flag}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {langInfo?.name} 学习中心
              </h1>
              <p className="text-slate-400">
                {levelFilter ? `${levelFilter === 'beginner' ? '初级' : levelFilter === 'intermediate' ? '中级' : '高级'}课程` : '全部课程'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">学习进度</p>
                  <p className="text-2xl font-bold text-white">
                    {completedCount} / {totalCount} 课
                  </p>
                </div>
                <ProgressRing
                  percent={progressPercent}
                  size={70}
                  strokeWidth={6}
                  color={langInfo?.color || '#6366F1'}
                />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">经验值</p>
                  <p className="text-2xl font-bold text-white">{langProgress.xp} XP</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">当前等级</p>
                  <p className="text-2xl font-bold text-white">Lv.{langProgress.level}</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        <div className="flex gap-8">
          <Sidebar language={currentLanguage} />

          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course, courseIndex) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: courseIndex * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                        <p className="text-sm text-slate-400">{course.description}</p>
                      </div>
                      <div 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${course.color}20`,
                          color: course.color
                        }}
                      >
                        {course.level === 'beginner' ? '初级' : 
                         course.level === 'intermediate' ? '中级' : '高级'}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.lessons.length} 节课
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {course.totalXP} XP
                      </span>
                    </div>

                    <div className="space-y-2">
                      {course.lessons.map((lesson, index) => {
                        const isCompleted = langProgress.completedLessons.includes(lesson.id);
                        return (
                          <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            index={index}
                            isCompleted={isCompleted}
                            onClick={() => handleLessonClick(lesson.id)}
                          />
                        );
                      })}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-slate-400 mb-4">暂无符合条件的课程</p>
                <p className="text-sm text-slate-500">
                  尝试选择其他难度级别或语言
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
