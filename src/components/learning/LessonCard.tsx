import { motion } from 'framer-motion';
import { Lesson, LessonType } from '../../types';
import { Card } from '../common/Card';
import { BookOpen, Mic, Headphones, PenTool, Clock, Zap } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted: boolean;
  onClick: () => void;
}

export const LessonCard = ({ lesson, index, isCompleted, onClick }: LessonCardProps) => {
  const getTypeIcon = (type: LessonType) => {
    const icons = {
      vocabulary: BookOpen,
      speaking: Mic,
      listening: Headphones,
      grammar: PenTool
    };
    return icons[type] || BookOpen;
  };

  const getTypeColor = (type: LessonType) => {
    const colors = {
      vocabulary: 'emerald',
      speaking: 'violet',
      listening: 'amber',
      grammar: 'sky'
    };
    return colors[type] || 'indigo';
  };

  const TypeIcon = getTypeIcon(lesson.type);
  const typeColor = getTypeColor(lesson.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card hover onClick={onClick} className="p-4">
        <div className="flex items-center gap-4">
          <div 
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isCompleted ? 'bg-emerald-500/20' : `bg-${typeColor}-500/20`
            }`}
          >
            {isCompleted ? (
              <span className="text-emerald-400 text-xl">✓</span>
            ) : (
              <TypeIcon className={`w-6 h-6 text-${typeColor}-400`} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white truncate">{lesson.title}</h4>
            <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
              <span className={`px-2 py-0.5 rounded-full text-xs bg-${typeColor}-500/10 text-${typeColor}-400`}>
                {lesson.type === 'vocabulary' ? '词汇' : 
                 lesson.type === 'grammar' ? '语法' : 
                 lesson.type === 'speaking' ? '口语' : '听力'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {lesson.duration}分钟
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">{lesson.xpReward}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
