import { motion } from 'framer-motion';
import { Achievement as AchievementType } from '../../types';
import { useProgressStore } from '../../store/progressStore';
import { Card } from '../common/Card';

interface AchievementBadgeProps {
  achievement: AchievementType;
  index: number;
  showDetails?: boolean;
}

export const AchievementBadge = ({ achievement, index, showDetails = true }: AchievementBadgeProps) => {
  const { progress, getTotalXP, getCompletedLessonsCount } = useProgressStore();
  
  const isUnlocked = (() => {
    switch (achievement.requirement.type) {
      case 'streak':
        return Math.max(...Object.values(progress).map(p => p.streak)) >= achievement.requirement.value;
      case 'xp':
        return getTotalXP() >= achievement.requirement.value;
      case 'lessons':
        return getCompletedLessonsCount() >= achievement.requirement.value;
      case 'vocabulary':
        return Object.values(progress).reduce((sum, p) => sum + p.vocabulary.length, 0) >= achievement.requirement.value;
      default:
        return false;
    }
  })();

  const getIcon = () => {
    const iconMap: Record<string, string> = {
      'Footprints': '🚶',
      'Flame': '🔥',
      'Trophy': '🏆',
      'BookOpen': '📚',
      'Zap': '⚡',
      'GraduationCap': '🎓',
      'Moon': '🌙',
      'Sunrise': '🌅'
    };
    return iconMap[achievement.icon] || '⭐';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card 
        className={`relative p-4 transition-all ${isUnlocked ? '' : 'opacity-50 grayscale'}`}
        hover={isUnlocked}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
            style={{ backgroundColor: `${achievement.color}20` }}
          >
            {getIcon()}
          </div>
          
          {showDetails && (
            <div className="flex-1">
              <h4 className="font-semibold text-white">{achievement.title}</h4>
              <p className="text-sm text-slate-400">{achievement.description}</p>
              {!isUnlocked && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: '30%',
                        backgroundColor: achievement.color 
                      }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">
                    {achievement.requirement.value} {achievement.requirement.type === 'streak' ? '天' : achievement.requirement.type === 'xp' ? 'XP' : '个'}
                  </span>
                </div>
              )}
            </div>
          )}

          {isUnlocked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
            >
              <span className="text-white text-xs">✓</span>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
