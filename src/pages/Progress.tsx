import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { ProgressDashboard } from '../components/progress/ProgressDashboard';
import { StreakCalendar } from '../components/progress/StreakCalendar';
import { Card } from '../components/common/Card';
import { ProgressRing } from '../components/common/ProgressRing';
import { useProgressStore } from '../store/progressStore';
import { Calendar, Target, TrendingUp } from 'lucide-react';

export const Progress = () => {
  const { progress, getTotalXP, getCompletedLessonsCount } = useProgressStore();

  const totalXP = getTotalXP();
  const completedLessons = getCompletedLessonsCount();
  const totalStreak = Math.max(...Object.values(progress).map(p => p.streak), 0);

  const streakData: Record<string, boolean> = {};
  Object.values(progress).forEach(p => {
    if (p.lastStudyDate) {
      streakData[p.lastStudyDate] = true;
    }
  });

  const dailyGoals = Object.entries(progress).map(([lang, data]) => {
    const langNames: Record<string, string> = { en: '英语', jp: '日语', kr: '韩语' };
    const percent = Math.min(100, (data.dailyGoal.completed / data.dailyGoal.target) * 100);
    return { lang: langNames[lang], ...data.dailyGoal, percent };
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">学习进度</h1>
          <p className="text-slate-400">追踪你的学习旅程</p>
        </motion.div>

        <ProgressDashboard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">学习日历</h3>
            </div>
            <StreakCalendar streakData={streakData} />
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">今日目标</h3>
            </div>

            <div className="space-y-6">
              {dailyGoals.map((goal) => (
                <div key={goal.lang} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{goal.lang}</span>
                    <span className="text-sm text-slate-400">
                      {goal.completed} / {goal.target} XP
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.percent}%` }}
                    />
                  </div>
                  {goal.percent >= 100 && (
                    <p className="text-xs text-emerald-400">✓ 目标达成!</p>
                  )}
                </div>
              ))}
            </div>

            {dailyGoals.every(g => g.percent >= 100) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center"
              >
                <p className="text-emerald-400 font-medium">太棒了！今日目标全部完成!</p>
              </motion.div>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">能力分析</h3>
            </div>

            <div className="space-y-6">
              {Object.entries(progress).map(([lang, data]) => {
                const langNames: Record<string, string> = { en: '英语', jp: '日语', kr: '韩语' };
                const abilities = data.abilities;
                const avgAbility = Math.round(
                  (abilities.vocabulary + abilities.grammar + abilities.speaking + abilities.listening) / 4
                );

                return (
                  <div key={lang} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">{langNames[lang]}</span>
                      <span className="text-sm text-slate-400">综合能力</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <ProgressRing
                        percent={avgAbility}
                        size={60}
                        strokeWidth={5}
                        color="#8B5CF6"
                      />
                      <div className="flex-1 grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">词汇</span>
                          <span className="text-emerald-400">{abilities.vocabulary}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">语法</span>
                          <span className="text-sky-400">{abilities.grammar}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">口语</span>
                          <span className="text-violet-400">{abilities.speaking}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">听力</span>
                          <span className="text-amber-400">{abilities.listening}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-6">学习数据统计</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">{totalStreak}</p>
              <p className="text-sm text-slate-400">最长连续学习天数</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">{completedLessons}</p>
              <p className="text-sm text-slate-400">完成课程数</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">{totalXP}</p>
              <p className="text-sm text-slate-400">累计经验值</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-1">
                {Object.values(progress).reduce((sum, p) => sum + p.vocabulary.length, 0)}
              </p>
              <p className="text-sm text-slate-400">掌握词汇数</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
