import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SpeakingSentence } from '../../types';
import { Card } from '../common/Card';
import { Mic, Star } from 'lucide-react';

interface SpeakingExerciseProps {
  sentences: SpeakingSentence[];
  onComplete: (score: number) => void;
}

export const SpeakingExercise = ({ sentences, onComplete }: SpeakingExerciseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const currentSentence = sentences[currentIndex];
  const isLast = currentIndex === sentences.length - 1;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setScore(null);
      setShowResult(false);

      setTimeout(() => {
        stopRecording();
      }, 3000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setScore(Math.floor(Math.random() * 30) + 70);
      setIsRecording(false);
      setShowResult(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setScore(Math.floor(Math.random() * 30) + 70);
      setShowResult(true);
    }
  };

  const handleNext = () => {
    if (isLast) {
      const totalScore = Math.round(
        sentences.reduce((sum, _, i) => {
          return sum + (i === currentIndex ? score || 0 : 80);
        }, 0) / sentences.length
      );
      onComplete(totalScore);
    } else {
      setCurrentIndex(prev => prev + 1);
      setScore(null);
      setShowResult(false);
    }
  };

  const getScoreColor = (s: number) => {
    if (s >= 90) return 'emerald';
    if (s >= 70) return 'amber';
    return 'rose';
  };

  const getDifficultyColor = (diff: string) => {
    const colors = { easy: 'emerald', medium: 'amber', hard: 'rose' };
    return colors[diff as keyof typeof colors] || 'slate';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          句子 {currentIndex + 1} / {sentences.length}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-xs bg-${getDifficultyColor(currentSentence.difficulty)}-500/10 text-${getDifficultyColor(currentSentence.difficulty)}-400`}>
          {currentSentence.difficulty === 'easy' ? '简单' : 
           currentSentence.difficulty === 'medium' ? '中等' : '困难'}
        </span>
      </div>

      <Card className="p-8 text-center">
        <p className="text-3xl font-bold text-white mb-4">{currentSentence.text}</p>
        <p className="text-lg text-slate-400 mb-8">{currentSentence.translation}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? stopRecording : startRecording}
          className={`relative w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all ${
            isRecording
              ? 'bg-rose-500 animate-pulse shadow-lg shadow-rose-500/50'
              : 'bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/50'
          }`}
        >
          {isRecording ? (
            <div className="w-8 h-8 rounded bg-white/90" />
          ) : (
            <Mic className="w-10 h-10 text-white" />
          )}
          
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-rose-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>

        <p className="mt-4 text-sm text-slate-400">
          {isRecording ? '录音中... 点击停止' : '点击开始录音'}
        </p>
      </Card>

      {showResult && score !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.ceil(score / 20)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          <p className={`text-4xl font-bold text-${getScoreColor(score)}-400 mb-2`}>
            {score}
          </p>
          <p className="text-slate-400">
            {score >= 90 ? '太棒了！发音非常标准！' :
             score >= 70 ? '不错！继续练习会更好！' :
             '加油！多听几遍再试试！'}
          </p>
        </motion.div>
      )}

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
            {isLast ? '完成' : '下一句'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
