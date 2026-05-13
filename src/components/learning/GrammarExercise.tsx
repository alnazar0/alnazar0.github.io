import { useState } from 'react';
import { motion } from 'framer-motion';
import { GrammarExercise } from '../../types';
import { Card } from '../common/Card';
import { Check, X, Lightbulb } from 'lucide-react';

interface GrammarExerciseProps {
  exercises: GrammarExercise[];
  onComplete: (score: number) => void;
}

export const GrammarExerciseComponent = ({ exercises, onComplete }: GrammarExerciseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentExercise = exercises[currentIndex];
  const isLast = currentIndex === exercises.length - 1;

  const handleSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentExercise.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLast) {
      const finalScore = Math.round((correctCount / exercises.length) * 100);
      onComplete(finalScore);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          题目 {currentIndex + 1} / {exercises.length}
        </span>
        <span className="text-sm text-emerald-400">
          正确: {correctCount}
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white mb-6">{currentExercise.question}</h3>

        <div className="grid grid-cols-1 gap-3">
          {currentExercise.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentExercise.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: showResult ? 1 : 1.01 }}
                whileTap={{ scale: showResult ? 1 : 0.99 }}
                onClick={() => handleSelect(option)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  showCorrect
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : showWrong
                    ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                    : isSelected
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                    showCorrect
                      ? 'bg-emerald-500 text-white'
                      : showWrong
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-700 text-slate-300'
                  }`}>
                    {showCorrect ? <Check className="w-4 h-4" /> : 
                     showWrong ? <X className="w-4 h-4" /> : 
                     String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </span>
              </motion.button>
            );
          })}
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl ${
              selectedAnswer === currentExercise.correctAnswer
                ? 'bg-emerald-500/10 border border-emerald-500/20'
                : 'bg-amber-500/10 border border-amber-500/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <Lightbulb className={`w-5 h-5 mt-0.5 ${
                selectedAnswer === currentExercise.correctAnswer
                  ? 'text-emerald-400'
                  : 'text-amber-400'
              }`} />
              <div>
                <p className={`font-medium ${
                  selectedAnswer === currentExercise.correctAnswer
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}>
                  {selectedAnswer === currentExercise.correctAnswer ? '正确！' : '解析'}
                </p>
                <p className="text-slate-300 text-sm mt-1">
                  {currentExercise.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </Card>

      {showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium shadow-lg shadow-indigo-500/25"
          >
            {isLast ? '完成' : '下一题'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
