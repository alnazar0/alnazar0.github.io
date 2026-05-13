import { Card } from '../common/Card';
import { MessageCircle, Heart, Share2 } from 'lucide-react';
import { CommunityPost } from '../../types';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface PostCardProps {
  post: CommunityPost;
  index: number;
}

export const PostCard = ({ post, index }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return '刚刚';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}分钟前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    return `${days}天前`;
  };

  const langColors: Record<string, string> = {
    en: 'bg-blue-500/20 text-blue-400',
    jp: 'bg-rose-500/20 text-rose-400',
    kr: 'bg-violet-500/20 text-violet-400'
  };

  const langNames: Record<string, string> = {
    en: '英语',
    jp: '日语',
    kr: '韩语'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-5 hover:border-slate-600 transition-colors">
        <div className="flex gap-4">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-12 h-12 rounded-full bg-slate-700"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-white">{post.authorName}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${langColors[post.language]}`}>
                {langNames[post.language]}
              </span>
              <span className="text-sm text-slate-500">{timeAgo(post.createdAt)}</span>
            </div>

            <h4 className="font-semibold text-white mb-2">{post.title}</h4>
            <p className="text-slate-400 text-sm line-clamp-3 mb-3">{post.content}</p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-xs bg-slate-700/50 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 transition-colors ${
                  liked ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-rose-400' : ''}`} />
                <span>{likes}</span>
              </button>
              
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </button>
              
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
