import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { FlashCard } from '../components/learning/FlashCard';
import { GrammarExerciseComponent } from '../components/learning/GrammarExercise';
import { SpeakingExercise } from '../components/learning/SpeakingExercise';
import { ListeningExercise } from '../components/learning/ListeningExercise';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useCourseStore } from '../store/courseStore';
import { useProgressStore } from '../store/progressStore';
import { VocabularyContent, GrammarContent, SpeakingContent, ListeningContent, LessonType } from '../types';
import { ArrowLeft, CheckCircle, Trophy, Zap, BookOpen, PenTool, Mic, Headphones } from 'lucide-react';

export const Lesson = () => {
  const { language, lessonId } = useParams<{ language: string; lessonId: string }>();
  const navigate = useNavigate();
  const { courses } = useCourseStore();
  const { completeLesson, progress, updateAbility, addVocabulary } = useProgressStore();

  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const lesson = courses.flatMap(c => c.lessons).find(l => l.id === lessonId);
  const currentLanguage = language as 'en' | 'jp' | 'kr';

  useEffect(() => {
    if (lesson && progress[currentLanguage].completedLessons.includes(lesson.id)) {
      setIsCompleted(true);
    }
  }, [lesson, progress, currentLanguage]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">课程不存在</h1>
          <Button onClick={() => navigate(`/learn/${language}`)}>返回学习中心</Button>
        </div>
      </div>
    );
  }

  const handleComplete = (finalScore: number) => {
    setScore(finalScore);
    setIsCompleted(true);
    completeLesson(currentLanguage, lesson.id, Math.round((finalScore / 100) * lesson.xpReward));
    
    if (finalScore >= 60) {
      updateAbility(currentLanguage, lesson.type, Math.min(100, (progress[currentLanguage].abilities[lesson.type] || 0) + 10));
    }
  };

  const handleKnowWord = (wordId: string) => {
    addVocabulary(currentLanguage, wordId);
  };

  const getTypeIcon = (type: LessonType) => {
    const icons = {
      vocabulary: BookOpen,
      grammar: PenTool,
      speaking: Mic,
      listening: Headphones
    };
    return icons[type] || BookOpen;
  };

  const getTypeName = (type: LessonType) => {
    const names: Record<LessonType, string> = {
      vocabulary: '词汇记忆',
      grammar: '语法练习',
      speaking: '口语跟读',
      listening: '听力训练'
    };
    return names[type] || type;
  };

  const TypeIcon = getTypeIcon(lesson.type);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(`/learn/${language}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回课程列表
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                <TypeIcon className="w-7 h-7 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
                <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                  <span>{getTypeName(lesson.type)}</span>
                  <span>·</span>
                  <span>{lesson.duration} 分钟</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Zap className="w-4 h-4" />
                    {lesson.xpReward} XP
                  </span>
                </div>
              </div>
            </div>

            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">已完成</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-2">课程完成!</h2>
            <p className="text-slate-400 mb-6">你获得了 {Math.round((score / 100) * lesson.xpReward)} XP</p>

            <div className="flex items-center justify-center gap-4">
              <Button onClick={() => navigate(`/learn/${language}`)} variant="secondary">
                返回课程列表
              </Button>
              <Button onClick={() => {
                window.location.reload();
              }}>
                再学一遍
              </Button>
            </div>
          </motion.div>
        ) : (
          <Card className="p-8">
            {lesson.type === 'vocabulary' && (
              <VocabularyLesson
                content={lesson.content as VocabularyContent}
                onComplete={handleComplete}
                onKnowWord={handleKnowWord}
              />
            )}
            {lesson.type === 'grammar' && (
              <GrammarLesson
                content={lesson.content as GrammarContent}
                onComplete={handleComplete}
              />
            )}
            {lesson.type === 'speaking' && (
              <SpeakingExercise
                sentences={(lesson.content as SpeakingContent).sentences}
                onComplete={handleComplete}
              />
            )}
            {lesson.type === 'listening' && (
              <ListeningExercise
                dialogues={(lesson.content as ListeningContent).dialogues}
                onComplete={handleComplete}
              />
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

const VocabularyLesson = ({ 
  content, 
  onComplete, 
  onKnowWord 
}: { 
  content: VocabularyContent; 
  onComplete: (score: number) => void;
  onKnowWord: (wordId: string) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownWords, setKnownWords] = useState<string[]>([]);
  const totalWords = content.words.length;

  const handleKnow = (wordId: string) => {
    setKnownWords(prev => [...prev, wordId]);
    onKnowWord(wordId);
    if (currentIndex < totalWords - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const score = Math.round((knownWords.length / totalWords) * 100);
      onComplete(score);
    }
  };

  const handleDontKnow = () => {
    if (currentIndex < totalWords - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const score = Math.round((knownWords.length / totalWords) * 100);
      onComplete(score);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          单词 {currentIndex + 1} / {totalWords}
        </span>
        <span className="text-emerald-400">
          已认识: {knownWords.length}
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentIndex + 1) / totalWords) * 100}%` }}
        />
      </div>

      <FlashCard
        word={content.words[currentIndex]}
        onKnow={() => handleKnow(content.words[currentIndex].id)}
        onDontKnow={handleDontKnow}
        isActive={true}
      />
    </div>
  );
};

const GrammarLesson = ({ 
  content, 
  onComplete 
}: { 
  content: GrammarContent; 
  onComplete: (score: number) => void;
}) => {
  const [showRules, setShowRules] = useState(true);

  return (
    <div className="space-y-6">
      {showRules ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-white">语法规则</h3>
          
          <div className="space-y-4">
            {content.rules.map((rule) => (
              <Card key={rule.id} className="p-4">
                <h4 className="font-semibold text-indigo-400 mb-2">{rule.pattern}</h4>
                <p className="text-slate-300 text-sm mb-3">{rule.explanation}</p>
                <div className="space-y-1">
                  {rule.examples.map((example, idx) => (
                    <p key={idx} className="text-sm text-slate-400">• {example}</p>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setShowRules(false)}>
              开始练习
            </Button>
          </div>
        </motion.div>
      ) : (
        <GrammarExerciseComponent
          exercises={content.exercises}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};
