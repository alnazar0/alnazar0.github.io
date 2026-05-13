import { motion } from 'framer-motion';
import { useProgressStore } from '../../store/progressStore';
import { ProgressRing } from '../common/ProgressRing';
import { Card } from '../common/Card';
import { Flame, Zap, Target, Trophy } from 'lucide-react';

export const ProgressDashboard = () => {
  const { progress, getOverallProgress, getTotalXP, getCompletedLessonsCount } = useProgressStore();

  const overallProgress = getOverallProgress();
  const totalXP = getTotalXP();
  const completedLessons = getCompletedLessonsCount();
  const totalStreak = Math.max(...Object.values(progress).map(p => p.streak), 0);

  const stats = [
    {
      icon: Flame,
      label: '连续学习',
      value: `${totalStreak} 天`,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-400'
    },
    {
      icon: Zap,
      label: '总经验值',
      value: `${totalXP} XP`,
      color: 'indigo',
      gradient: 'from-indigo-500 to-violet-400'
    },
    {
      icon: Trophy,
      label: '完成课程',
      value: `${completedLessons} 节`,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-400'
    },
    {
      icon: Target,
      label: '学习进度',
      value: `${overallProgress}%`,
      color: 'rose',
      gradient: 'from-rose-500 to-pink-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">各语言学习进度</h3>
          <div className="space-y-6">
            {Object.entries(progress).map(([lang, data]) => {
              const langNames: Record<string, string> = { en: '英语', jp: '日语', kr: '韩语' };
              const langColors: Record<string, string> = { en: '#3B82F6', jp: '#F43F5E', kr: '#8B5CF6' };
              const langProgress = Math.min(100, (data.xp / 500) * 100);

              return (
                <div key={lang} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{langNames[lang]}</span>
                    <span className="text-sm text-slate-400">Lv.{data.level} - {data.xp} XP</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: langColors[lang] }}
                      initial={{ width: 0 }}
                      animate={{ width: `${langProgress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>掌握词汇: {data.vocabulary.length}</span>
                    <span>完成课程: {data.completedLessons.length}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-white mb-4">综合进度</h3>
          <ProgressRing
            percent={overallProgress}
            size={160}
            strokeWidth={12}
            color="#6366F1"
          />
          <p className="mt-4 text-center text-slate-400">
            {overallProgress >= 50 ? '继续保持！' : '加油！'}
          </p>
        </Card>
      </div>
    </div>
  );
};
