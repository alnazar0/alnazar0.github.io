import { Link, useLocation } from 'react-router-dom';
import { Language } from '../../types';

interface SidebarProps {
  language?: Language;
  levels?: string[];
}

export const Sidebar = ({ language, levels = ['beginner', 'intermediate', 'advanced'] }: SidebarProps) => {
  const location = useLocation();
  const basePath = language ? `/learn/${language}` : '';

  const levelLabels: Record<string, string> = {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级'
  };

  const levelColors: Record<string, string> = {
    beginner: 'emerald',
    intermediate: 'amber',
    advanced: 'rose'
  };

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-20 space-y-2">
        <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          课程难度
        </h3>
        
        <Link
          to={basePath}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            location.pathname === basePath
              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-slate-500" />
          全部课程
        </Link>

        {levels.map((level) => (
          <Link
            key={level}
            to={`${basePath}?level=${level}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              location.search.includes(`level=${level}`)
                ? `bg-${levelColors[level]}-500/10 text-${levelColors[level]}-400 border border-${levelColors[level]}-500/20`
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full bg-${levelColors[level]}-500`} />
            {levelLabels[level]}
          </Link>
        ))}

        <div className="pt-6">
          <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            学习统计
          </h3>
          <div className="px-4 py-3 rounded-xl bg-slate-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">已完成</span>
              <span className="text-sm font-medium text-emerald-400">0 课</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">学习中</span>
              <span className="text-sm font-medium text-amber-400">0 课</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">待解锁</span>
              <span className="text-sm font-medium text-slate-400">0 课</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
