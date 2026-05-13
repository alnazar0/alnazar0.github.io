import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const Card = ({ children, className, hover = false, gradient = false, glow = false, onClick }: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={clsx(
        'rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50',
        gradient && 'bg-gradient-to-br from-slate-800 to-slate-900',
        glow && 'shadow-lg shadow-indigo-500/10',
        hover && 'cursor-pointer transition-shadow hover:shadow-xl hover:shadow-indigo-500/10',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
