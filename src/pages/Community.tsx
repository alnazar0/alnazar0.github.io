import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { PostCard } from '../components/community/PostCard';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { CommunityPost, Language } from '../types';
import { languages } from '../data/languages';
import { Search, TrendingUp, Clock, MessageCircle, Plus, X } from 'lucide-react';

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    authorId: '1',
    authorName: 'Sarah Chen',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    language: 'en',
    title: '英语学习100天打卡',
    content: '从零基础到现在可以简单日常对话了，感谢LinguaFlow的陪伴！每天坚持学习30分钟，真的能看到进步。分享一下我的学习心得...',
    likes: 234,
    comments: 45,
    createdAt: Date.now() - 3600000,
    tags: ['英语', '学习打卡', '进步']
  },
  {
    id: '2',
    authorId: '2',
    authorName: '李明浩',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ming',
    language: 'jp',
    title: '日语N3考试通过经验分享',
    content: '备考了三个月终于通过了N3，给大家分享一下我的备考经验。首先要打好基础，五十音图一定要滚瓜烂熟...',
    likes: 456,
    comments: 89,
    createdAt: Date.now() - 7200000,
    tags: ['日语', 'JLPT', '经验分享']
  },
  {
    id: '3',
    authorId: '3',
    authorName: '김지수',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jisu',
    language: 'kr',
    title: '韩剧追星学韩语',
    content: '因为喜欢看韩剧开始学韩语，现在已经能听懂大部分台词了！推荐几部适合学习的韩剧...',
    likes: 189,
    comments: 32,
    createdAt: Date.now() - 86400000,
    tags: ['韩语', '韩剧', '兴趣学习']
  },
  {
    id: '4',
    authorId: '4',
    authorName: 'David Wang',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    language: 'en',
    title: '雅思口语7分备考攻略',
    content: '终于考到目标分数了！分享一下我的备考经验，口语最重要的是多说多练，不要害怕犯错...',
    likes: 567,
    comments: 102,
    createdAt: Date.now() - 172800000,
    tags: ['雅思', '英语', '考试']
  }
];

export const Community = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  const filteredPosts = mockPosts.filter(post => {
    if (selectedLanguage !== 'all' && post.language !== selectedLanguage) return false;
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    return b.createdAt - a.createdAt;
  });

  const popularTags = ['英语学习', '日语N3', '韩语入门', '口语练习', '听力技巧', '词汇记忆'];

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">学习社区</h1>
              <p className="text-slate-400">与学习伙伴交流，分享学习心得</p>
            </div>
            <Button onClick={() => setShowNewPost(true)}>
              <Plus className="w-4 h-4 mr-2" />
              发布帖子
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="搜索帖子..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy('recent')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                      sortBy === 'recent'
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    最新
                  </button>
                  <button
                    onClick={() => setSortBy('popular')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                      sortBy === 'popular'
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    热门
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setSelectedLanguage('all')}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedLanguage === 'all'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  全部
                </button>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLanguage(lang.code)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedLanguage === lang.code
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </Card>

            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}

              {filteredPosts.length === 0 && (
                <Card className="p-12 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                  <p className="text-slate-400 mb-2">暂无相关帖子</p>
                  <p className="text-sm text-slate-500">成为第一个发布帖子的人吧！</p>
                </Card>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">热门话题</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-sm bg-slate-800 text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">社区规则</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  分享真实的学习经验
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  尊重其他学习者
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  互相帮助，共同进步
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✗</span>
                  禁止广告和垃圾信息
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400">✗</span>
                  禁止人身攻击
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">学习小组</h3>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="text-white">{lang.name}学习组</span>
                    </div>
                    <span className="text-sm text-slate-400">
                      {Math.floor(Math.random() * 500 + 100)}人
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showNewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">发布帖子</h2>
              <button
                onClick={() => setShowNewPost(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">标题</label>
                <input
                  type="text"
                  placeholder="输入帖子标题"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">内容</label>
                <textarea
                  rows={5}
                  placeholder="分享你的学习心得..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-slate-700 text-slate-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
              <Button fullWidth onClick={() => setShowNewPost(false)}>
                发布
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
