import { useState } from 'react';
import { motion } from 'framer-motion';
import { ListeningDialogue } from '../../types';
import { Card } from '../common/Card';
import { Volume2, Check, X } from 'lucide-react';

interface ListeningExerciseProps {
  dialogues: ListeningDialogue[];
  onComplete: (score: number) => void;
}

export const ListeningExercise = ({ dialogues, onComplete }: ListeningExerciseProps) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentDialogue = dialogues[currentDialogueIndex];
  const currentQuestion = currentDialogue.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentDialogue.questions.length - 1;
  const isLastDialogue = currentDialogueIndex === dialogues.length - 1;

  const handlePlayAudio = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const handleSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion && isLastDialogue) {
      const finalScore = Math.round((correctCount / dialogues.reduce((sum, d) => sum + d.questions.length, 0)) * 100);
      onComplete(finalScore);
    } else if (isLastQuestion) {
      setCurrentDialogueIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          对话 {currentDialogueIndex + 1} / {dialogues.length}
        </span>
        <span className="text-slate-400">
          题目 {currentQuestionIndex + 1} / {currentDialogue.questions.length}
        </span>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">听力原文</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayAudio}
            className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
          >
            <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          </motion.button>
        </div>

        <p className="text-slate-300 leading-relaxed mb-6 p-4 rounded-xl bg-slate-800/50">
          {currentDialogue.script}
        </p>

        <details className="mb-6">
          <summary className="cursor-pointer text-sm text-indigo-400 hover:text-indigo-300">
            查看翻译
          </summary>
          <p className="mt-2 text-slate-400 text-sm p-4 rounded-xl bg-slate-800/30">
            {currentDialogue.translation}
          </p>
        </details>
      </Card>

      <Card className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">{currentQuestion.question}</h4>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: showResult ? 1 : 1.01 }}
                whileTap={{ scale: showResult ? 1 : 0.99 }}
                onClick={() => handleSelect(option)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  showCorrect
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : showWrong
                    ? 'border-rose-500 bg-rose-500/10'
                    : isSelected
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
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
                  <span className={showCorrect ? 'text-emerald-400' : showWrong ? 'text-rose-400' : 'text-white'}>
                    {option}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
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
            {isLastQuestion && isLastDialogue ? '完成' : '下一题'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
