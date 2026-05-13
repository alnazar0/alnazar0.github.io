import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { Achievement } from '../../types';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementToast = ({ achievement, onClose }: AchievementToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

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
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-2xl blur-xl opacity-50"
              style={{ backgroundColor: achievement.color }}
            />
            
            <div 
              className="relative p-6 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95))' 
              }}
            >
              <div className="absolute top-0 right-0 p-2">
                <button
                  onClick={() => {
                    setShow(false);
                    setTimeout(onClose, 300);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                  style={{ backgroundColor: `${achievement.color}30` }}
                >
                  {getIcon()}
                </motion.div>

                <div>
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <Star className="w-4 h-4" />
                    <span className="text-sm font-medium">成就解锁</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
                  <p className="text-sm text-slate-400">{achievement.description}</p>
                </div>
              </div>

              <motion.div
                className="mt-4 h-1 rounded-full bg-slate-700 overflow-hidden"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: achievement.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
