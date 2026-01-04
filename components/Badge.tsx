import React from 'react';
import { SourceType } from '../types';
import { MessageSquare, Mail, Twitter } from 'lucide-react';

interface BadgeProps {
  type: 'source' | 'tag';
  label: string;
  sourceType?: SourceType;
}

const SourceIcon = ({ type }: { type: SourceType }) => {
  switch (type) {
    case 'reddit':
      return <MessageSquare size={12} className="mr-1" />;
    case 'newsletter':
      return <Mail size={12} className="mr-1" />;
    case 'twitter':
      return <Twitter size={12} className="mr-1" />;
    default:
      return null;
  }
};

export const Badge: React.FC<BadgeProps> = ({ type, label, sourceType }) => {
  if (type === 'source' && sourceType) {
    const colors = {
      reddit: 'bg-orange-50 text-orange-700 border-orange-100',
      newsletter: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      twitter: 'bg-sky-50 text-sky-700 border-sky-100',
    };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors[sourceType]}`}>
        <SourceIcon type={sourceType} />
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
      {label}
    </span>
  );
};