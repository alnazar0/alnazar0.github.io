import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { AchievementBadge } from '../components/achievement/AchievementBadge';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressRing } from '../components/common/ProgressRing';
import { achievements } from '../data/achievements';
import { useUserStore } from '../store/userStore';
import { useProgressStore } from '../store/progressStore';
import { languages } from '../data/languages';
import { Settings, Award, BookOpen, Zap, Flame, ChevronRight, Crown } from 'lucide-react';

export const Profile = () => {
  const { user, isAuthenticated } = useUserStore();
  const { progress, getTotalXP, getCompletedLessonsCount, getOverallProgress } = useProgressStore();

  const totalXP = getTotalXP();
  const completedLessons = getCompletedLessonsCount();
  const overallProgress = getOverallProgress();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">请先登录</h1>
          <p className="text-slate-400 mb-6">登录后即可查看您的学习数据</p>
          <Link to="/login">
            <Button>去登录</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-2xl bg-slate-700"
                />
                {user.vip && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
                <p className="text-slate-400 mb-4">{user.email}</p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400">
                    <Zap className="w-4 h-4" />
                    <span className="font-medium">{totalXP} XP</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400">
                    <Flame className="w-4 h-4" />
                    <span className="font-medium">
                      {Math.max(...Object.values(progress).map(p => p.streak))} 天连续
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">{completedLessons} 课程</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <ProgressRing
                  percent={overallProgress}
                  size={100}
                  strokeWidth={8}
                  color="#6366F1"
                />
                <p className="mt-2 text-sm text-slate-400">综合进度</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  成就墙
                </h2>
                <span className="text-sm text-slate-400">
                  {achievements.length} 个成就
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">学习语言</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {languages.map((lang) => {
                  const langProgress = progress[lang.code];
                  return (
                    <Link key={lang.code} to={`/learn/${lang.code}`}>
                      <Card hover className="p-4">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                            style={{ backgroundColor: `${lang.color}20` }}
                          >
                            {lang.flag}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{lang.name}</h3>
                            <p className="text-sm text-slate-400">
                              Lv.{langProgress.level} · {langProgress.xp} XP
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-500" />
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">设置</h3>
                </div>

                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 transition-colors text-left">
                    <span className="text-slate-300">每日提醒</span>
                    <span className="text-emerald-400">已开启</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 transition-colors text-left">
                    <span className="text-slate-300">深色主题</span>
                    <span className="text-emerald-400">已启用</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 transition-colors text-left">
                    <span className="text-slate-300">声音效果</span>
                    <span className="text-emerald-400">已开启</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 transition-colors text-left">
                    <span className="text-slate-300">学习偏好</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">学习数据</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">注册日期</span>
                    <span className="text-white">
                      {new Date(user.joinDate).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">VIP状态</span>
                    <span className={user.vip ? 'text-amber-400' : 'text-slate-500'}>
                      {user.vip ? '已开通' : '未开通'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">掌握词汇</span>
                    <span className="text-white">
                      {Object.values(progress).reduce((sum, p) => sum + p.vocabulary.length, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">完成课程</span>
                    <span className="text-white">{completedLessons}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
