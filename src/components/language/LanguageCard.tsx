import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LanguageInfo } from '../../types';
import { Card } from '../common/Card';
import { formatNumber } from '../../utils/helpers';
import { Users, TrendingUp, BookOpen } from 'lucide-react';

interface LanguageCardProps {
  language: LanguageInfo;
  index: number;
}

export const LanguageCard = ({ language, index }: LanguageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link to={`/learn/${language.code}`}>
        <Card hover gradient className="relative overflow-hidden group">
          <div className={`absolute inset-0 bg-gradient-to-br ${language.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
          
          <div className="relative p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                  style={{ backgroundColor: `${language.color}20` }}
                >
                  {language.flag}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {language.name}
                  </h3>
                  <p className="text-sm text-slate-400">{language.nativeName}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-xl bg-slate-700/50">
                  <Users className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-lg font-bold text-white">{formatNumber(language.learnerCount)}</p>
                <p className="text-xs text-slate-500">学习者</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-xl bg-emerald-500/10">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-lg font-bold text-white">A2-B1</p>
                <p className="text-xs text-slate-500">难度范围</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-xl bg-indigo-500/10">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                </div>
                <p className="text-lg font-bold text-white">50+</p>
                <p className="text-xs text-slate-500">课程数</p>
              </div>
            </div>

            <motion.div
              className="mt-6 h-1 rounded-full bg-slate-700 overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: language.color }}
                initial={{ width: '0%' }}
                animate={{ width: '35%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
            <p className="mt-2 text-xs text-slate-500">35% 用户从此开始</p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
