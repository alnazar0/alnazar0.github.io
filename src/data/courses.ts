import { Course, Lesson, VocabularyContent, GrammarContent, SpeakingContent, ListeningContent } from '../types';

const englishVocabularyLesson: Lesson = {
  id: 'en-vocab-1',
  title: '日常词汇 - 食物',
  type: 'vocabulary',
  duration: 15,
  xpReward: 50,
  content: {
    words: [
      { id: '1', word: 'apple', translation: '苹果', pronunciation: '/ˈæpəl/', example: 'An apple a day keeps the doctor away.' },
      { id: '2', word: 'bread', translation: '面包', pronunciation: '/bred/', example: 'I eat bread for breakfast.' },
      { id: '3', word: 'coffee', translation: '咖啡', pronunciation: '/ˈkɒfi/', example: 'I drink coffee every morning.' },
      { id: '4', word: 'water', translation: '水', pronunciation: '/ˈwɔːtər/', example: 'Please drink more water.' },
      { id: '5', word: 'rice', translation: '米饭', pronunciation: '/raɪs/', example: 'We have rice for dinner.' },
      { id: '6', word: 'chicken', translation: '鸡肉', pronunciation: '/ˈtʃɪkɪn/', example: 'Chicken is my favorite meat.' },
      { id: '7', word: 'vegetable', translation: '蔬菜', pronunciation: '/ˈvedʒtəbəl/', example: 'Eat more vegetables.' },
      { id: '8', word: 'fruit', translation: '水果', pronunciation: '/fruːt/', example: 'Fruit is good for health.' }
    ]
  } as VocabularyContent
};

const englishGrammarLesson: Lesson = {
  id: 'en-grammar-1',
  title: '现在时态',
  type: 'grammar',
  duration: 20,
  xpReward: 60,
  content: {
    rules: [
      {
        id: '1',
        pattern: '主语 + be动词 + 形容词',
        explanation: '使用 be 动词描述状态或特征',
        examples: ['I am happy.', 'She is beautiful.', 'They are students.']
      },
      {
        id: '2',
        pattern: '主语 + 动词原形/三单',
        explanation: '描述经常性动作或客观事实',
        examples: ['I play tennis.', 'She plays tennis every week.']
      }
    ],
    exercises: [
      {
        id: '1',
        question: '选择正确形式：She ___ a teacher.',
        options: ['is', 'are', 'am', 'be'],
        correctAnswer: 'is',
        explanation: 'She 是第三人称单数，应使用 is'
      },
      {
        id: '2',
        question: '选择正确形式：They ___ playing football.',
        options: ['is', 'am', 'are', 'be'],
        correctAnswer: 'are',
        explanation: 'They 是复数主语，应使用 are'
      },
      {
        id: '3',
        question: '选择正确形式：I ___ breakfast at 8 AM.',
        options: ['eat', 'eats', 'eating', 'eaten'],
        correctAnswer: 'eat',
        explanation: '第一人称 I 使用动词原形'
      }
    ]
  } as GrammarContent
};

const englishSpeakingLesson: Lesson = {
  id: 'en-speaking-1',
  title: '日常对话 - 问候',
  type: 'speaking',
  duration: 15,
  xpReward: 70,
  content: {
    sentences: [
      { id: '1', text: 'Hello, how are you?', translation: '你好，你好吗？', difficulty: 'easy' },
      { id: '2', text: 'Nice to meet you!', translation: '很高兴认识你！', difficulty: 'easy' },
      { id: '3', text: 'How is your day going?', translation: '你今天过得怎么样？', difficulty: 'medium' },
      { id: '4', text: 'It was nice talking to you.', translation: '和你聊天很开心。', difficulty: 'medium' }
    ]
  } as SpeakingContent
};

const englishListeningLesson: Lesson = {
  id: 'en-listening-1',
  title: '听力训练 - 餐厅点餐',
  type: 'listening',
  duration: 20,
  xpReward: 65,
  content: {
    dialogues: [
      {
        id: '1',
        script: 'A: Good evening! Welcome to our restaurant. B: Good evening! I would like a table for two. A: Of course! Right this way, please.',
        translation: 'A：晚上好！欢迎光临。B：晚上好！我想要一张两人桌。A：好的！请这边走。',
        questions: [
          { id: '1', question: 'Where are they talking?', options: ['Restaurant', 'Hotel', 'Office', 'School'], correctAnswer: 'Restaurant' },
          { id: '2', question: 'How many people?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Two' }
        ]
      }
    ]
  } as ListeningContent
};

const japaneseVocabularyLesson: Lesson = {
  id: 'jp-vocab-1',
  title: '五十音入门',
  type: 'vocabulary',
  duration: 15,
  xpReward: 50,
  content: {
    words: [
      { id: '1', word: 'あ', translation: 'a', pronunciation: 'a', example: 'あいうえお' },
      { id: '2', word: 'い', translation: 'i', pronunciation: 'i', example: 'あいうえお' },
      { id: '3', word: 'う', translation: 'u', pronunciation: 'u', example: 'あいうえお' },
      { id: '4', word: 'え', translation: 'e', pronunciation: 'e', example: 'あいうえお' },
      { id: '5', word: 'お', translation: 'o', pronunciation: 'o', example: 'あいうえお' },
      { id: '6', word: 'か', translation: 'ka', pronunciation: 'ka', example: 'かきくけこ' },
      { id: '7', word: 'き', translation: 'ki', pronunciation: 'ki', example: 'かきくけこ' },
      { id: '8', word: 'く', translation: 'ku', pronunciation: 'ku', example: 'かきくけこ' }
    ]
  } as VocabularyContent
};

const japaneseGrammarLesson: Lesson = {
  id: 'jp-grammar-1',
  title: '基本句型',
  type: 'grammar',
  duration: 20,
  xpReward: 60,
  content: {
    rules: [
      {
        id: '1',
        pattern: '私は 学生 です',
        explanation: '我是学生（基本陈述句）',
        examples: ['私は 先生 です。', '彼 は 日本人 です。']
      }
    ],
    exercises: [
      {
        id: '1',
        question: '私は ___ です。(I am a student)',
        options: ['先生', '学生', '医者', '警察'],
        correctAnswer: '学生',
        explanation: '学生（がくせい）意思是学生'
      }
    ]
  } as GrammarContent
};

const koreanVocabularyLesson: Lesson = {
  id: 'kr-vocab-1',
  title: '韩文字母',
  type: 'vocabulary',
  duration: 15,
  xpReward: 50,
  content: {
    words: [
      { id: '1', word: 'ㄱ', translation: 'g/k', pronunciation: 'giyok', example: '가' },
      { id: '2', word: 'ㄴ', translation: 'n', pronunciation: 'niun', example: '나' },
      { id: '3', word: 'ㄷ', translation: 'd/t', pronunciation: 'digeut', example: '다' },
      { id: '4', word: 'ㄹ', translation: 'r/l', pronunciation: 'rieul', example: '라' },
      { id: '5', word: 'ㅁ', translation: 'm', pronunciation: 'mieum', example: '마' },
      { id: '6', word: 'ㅂ', translation: 'b/p', pronunciation: 'bieup', example: '바' },
      { id: '7', word: 'ㅅ', translation: 's', pronunciation: 'siot', example: '사' },
      { id: '8', word: 'ㅇ', translation: 'ng/无声', pronunciation: 'ieung', example: '아' }
    ]
  } as VocabularyContent
};

export const courses: Course[] = [
  {
    id: 'en-beginner',
    language: 'en',
    level: 'beginner',
    title: '英语入门',
    description: '从零开始学习英语，掌握基础词汇和语法',
    icon: 'BookOpen',
    color: '#3B82F6',
    lessons: [englishVocabularyLesson, englishGrammarLesson, englishSpeakingLesson, englishListeningLesson],
    totalXP: 245
  },
  {
    id: 'en-intermediate',
    language: 'en',
    level: 'intermediate',
    title: '英语进阶',
    description: '提升英语水平，学习更复杂的表达',
    icon: 'TrendingUp',
    color: '#0EA5E9',
    lessons: [englishVocabularyLesson, englishGrammarLesson],
    totalXP: 350
  },
  {
    id: 'jp-beginner',
    language: 'jp',
    level: 'beginner',
    title: '日语入门',
    description: '学习日语五十音和基础会话',
    icon: 'BookOpen',
    color: '#F43F5E',
    lessons: [japaneseVocabularyLesson, japaneseGrammarLesson],
    totalXP: 220
  },
  {
    id: 'jp-intermediate',
    language: 'jp',
    level: 'intermediate',
    title: '日语进阶',
    description: '深入学习日语语法和词汇',
    icon: 'TrendingUp',
    color: '#FB7185',
    lessons: [japaneseVocabularyLesson, japaneseGrammarLesson],
    totalXP: 380
  },
  {
    id: 'kr-beginner',
    language: 'kr',
    level: 'beginner',
    title: '韩语入门',
    description: '学习韩文字母和基础表达',
    icon: 'BookOpen',
    color: '#8B5CF6',
    lessons: [koreanVocabularyLesson],
    totalXP: 200
  },
  {
    id: 'kr-intermediate',
    language: 'kr',
    level: 'intermediate',
    title: '韩语进阶',
    description: '提升韩语听说读写能力',
    icon: 'TrendingUp',
    color: '#A78BFA',
    lessons: [koreanVocabularyLesson],
    totalXP: 320
  }
];
