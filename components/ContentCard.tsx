import React, { useState } from 'react';
import { Bookmark, ExternalLink, MoreHorizontal, Trash2, Calendar } from 'lucide-react';
import { ContentItem } from '../types';
import { Badge } from './Badge';
import { Button } from './Button';
import { HookGenerator } from './HookGenerator';

interface ContentCardProps {
  item: ContentItem;
  onToggleSave: (id: string) => void;
  onDelete?: (id: string) => void;
  view: 'feed' | 'saved';
}

export const ContentCard: React.FC<ContentCardProps> = ({ item, onToggleSave, onDelete, view }) => {
  const [showGenerator, setShowGenerator] = useState(false);

  const formattedDate = new Date(item.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`group bg-white rounded-xl border border-slate-200 p-5 transition-all duration-300 hover:shadow-md hover:border-slate-300 ${item.isSaved ? 'ring-1 ring-indigo-50 border-indigo-100' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Badge type="source" label={item.sourceName} sourceType={item.source} />
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar size={10} />
            {formattedDate}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            <ExternalLink size={16} />
          </a>
          {view === 'saved' && onDelete && (
             <button
             onClick={(e) => {
               e.stopPropagation();
               onDelete(item.id);
             }}
             className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
           >
             <Trash2 size={16} />
           </button>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-tight">
        {item.title}
      </h3>

      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {item.summary}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} type="tag" label={tag} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {view === 'feed' ? (
             <Button
             variant={item.isSaved ? "secondary" : "outline"}
             size="sm"
             onClick={() => onToggleSave(item.id)}
             icon={<Bookmark size={14} className={item.isSaved ? "fill-current" : ""} />}
           >
             {item.isSaved ? 'Saved' : 'Save'}
           </Button>
          ) : (
            <Button
              variant={showGenerator ? "ghost" : "primary"}
              size="sm"
              onClick={() => setShowGenerator(!showGenerator)}
              className={showGenerator ? "bg-slate-100 text-slate-600" : ""}
            >
              {showGenerator ? 'Close Generator' : 'Generate Hook'}
            </Button>
          )}
        </div>
      </div>

      {view === 'saved' && showGenerator && (
        <HookGenerator contentTitle={item.title} />
      )}
    </div>
  );
};