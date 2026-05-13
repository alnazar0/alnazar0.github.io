import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { LanguageCard } from '../components/language/LanguageCard';
import { Card } from '../components/common/Card';
import { languages } from '../data/languages';
import { achievements } from '../data/achievements';
import { useUserStore } from '../store/userStore';
import { useProgressStore } from '../store/progressStore';
import { formatNumber, getGreeting } from '../utils/helpers';
import { ArrowRight, Sparkles, Users, TrendingUp, BookOpen } from 'lucide-react';

export const Home = () => {
  const { user, isAuthenticated } = useUserStore();
  const { getTotalXP, getOverallProgress } = useProgressStore();

  const totalXP = getTotalXP();
  const overallProgress = getOverallProgress();

  const stats = [
    { icon: Users, label: '学习者', value: formatNumber(5280000), color: 'text-blue-400' },
    { icon: BookOpen, label: '课程总数', value: '150+', color: 'text-emerald-400' },
    { icon: TrendingUp, label: '平均进度', value: '68%', color: 'text-amber-400' },
    { icon: Sparkles, label: '完成率', value: '85%', color: 'text-violet-400' }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-900 to-violet-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  开启你的语言学习之旅
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
                {isAuthenticated && user
                  ? `${user.name}，${getGreeting()}！`
                  : '沉浸式语言学习体验，让掌握新语言变得简单有趣'}
              </p>

              {isAuthenticated && (
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-medium">{totalXP} XP</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400">
                    <span className="font-medium">整体进度 {overallProgress}%</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4">
                {!isAuthenticated && (
                  <Link
                    to="/register"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold text-lg shadow-lg shadow-indigo-500/30 hover:from-indigo-600 hover:to-violet-600 transition-all flex items-center gap-2"
                  >
                    免费开始学习
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
                <Link
                  to="/learn/en"
                  className="px-8 py-4 rounded-xl border-2 border-indigo-500/50 text-indigo-400 font-semibold text-lg hover:bg-indigo-500/10 transition-all"
                >
                  探索课程
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-4 text-center">
                    <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">选择你的学习语言</h2>
            <p className="text-slate-400">从英语、日语、韩语开始你的学习之旅</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map((language, index) => (
              <LanguageCard key={language.code} language={language} index={index} />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">学习模式</h2>
            <p className="text-slate-400">多种学习方式，全面提升语言能力</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: '词汇记忆', desc: '闪卡式学习，间隔重复', color: 'emerald' },
              { icon: TrendingUp, title: '语法练习', desc: '精选练习题，巩固基础', color: 'sky' },
              { icon: Sparkles, title: '口语跟读', desc: 'AI评分，即时反馈', color: 'violet' },
              { icon: Users, title: '听力训练', desc: '分级听力材料', color: 'amber' }
            ].map((mode, index) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-6 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-${mode.color}-500/20 flex items-center justify-center mb-4`}>
                    <mode.icon className={`w-6 h-6 text-${mode.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{mode.title}</h3>
                  <p className="text-sm text-slate-400">{mode.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">成就系统</h2>
            <p className="text-slate-400">完成学习目标，解锁专属成就</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {achievements.slice(0, 8).map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div 
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-2"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  {achievement.icon === 'Flame' ? '🔥' :
                   achievement.icon === 'Trophy' ? '🏆' :
                   achievement.icon === 'BookOpen' ? '📚' :
                   achievement.icon === 'Zap' ? '⚡' :
                   achievement.icon === 'GraduationCap' ? '🎓' : '⭐'}
                </div>
                <p className="text-xs text-slate-400">{achievement.title}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="border-t border-slate-800 py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  LinguaFlow
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                © 2024 LinguaFlow. 让语言学习更简单。
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
