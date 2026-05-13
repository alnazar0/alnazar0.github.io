import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VocabularyWord } from '../../types';
import { Check, X } from 'lucide-react';

interface FlashCardProps {
  word: VocabularyWord;
  onKnow: () => void;
  onDontKnow: () => void;
  isActive: boolean;
}

export const FlashCard = ({ word, onKnow, onDontKnow, isActive }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnow = () => {
    onKnow();
    setIsFlipped(false);
  };

  const handleDontKnow = () => {
    onDontKnow();
    setIsFlipped(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-md mx-auto"
        >
          <div
            className="relative cursor-pointer perspective-1000"
            onClick={handleFlip}
            style={{ height: '320px' }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 flex flex-col items-center justify-center p-8 shadow-2xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <h2 className="text-4xl font-bold text-white mb-2">{word.word}</h2>
                {word.pronunciation && (
                  <p className="text-indigo-200 text-lg mb-4">{word.pronunciation}</p>
                )}
                <p className="text-indigo-300 text-sm">点击查看释义</p>
              </div>

              <div
                className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 shadow-2xl border border-slate-700"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)' 
                }}
              >
                <h2 className="text-4xl font-bold text-white mb-4">{word.translation}</h2>
                {word.example && (
                  <p className="text-slate-400 text-center text-sm italic mb-4">"{word.example}"</p>
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDontKnow}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
            >
              <X className="w-5 h-5" />
              不认识
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleKnow}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
            >
              <Check className="w-5 h-5" />
              认识
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
