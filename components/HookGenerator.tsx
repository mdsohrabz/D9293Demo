import React, { useState } from 'react';
import { Wand2, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { HookPlatform } from '../types';
import { MOCK_GENERATED_HOOKS } from '../constants';

interface HookGeneratorProps {
  contentTitle: string;
  onClose?: () => void;
}

export const HookGenerator: React.FC<HookGeneratorProps> = ({ contentTitle }) => {
  const [activePlatform, setActivePlatform] = useState<HookPlatform>('twitter');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const hooks = MOCK_GENERATED_HOOKS[activePlatform] || MOCK_GENERATED_HOOKS['twitter'];
      // Randomly select a mock hook
      const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
      setGeneratedContent(randomHook);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <Wand2 size={16} className="text-indigo-600" />
          AI Hook Generator
        </h4>
        <div className="flex bg-white rounded-md border border-slate-200 p-0.5">
          {(['twitter', 'linkedin'] as const).map((platform) => (
            <button
              key={platform}
              onClick={() => {
                setActivePlatform(platform);
                setGeneratedContent(null);
              }}
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                activePlatform === platform
                  ? 'bg-slate-100 text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {!generatedContent && !isGenerating ? (
        <div className="text-center py-6">
          <p className="text-slate-500 text-sm mb-4">
            Generate a viral {activePlatform} post based on <span className="italic">"{contentTitle}"</span>
          </p>
          <Button onClick={handleGenerate} variant="secondary" size="sm" icon={<Wand2 size={14} />}>
            Generate Hook
          </Button>
        </div>
      ) : isGenerating ? (
        <div className="py-8 flex flex-col items-center justify-center text-slate-500">
          <RefreshCw className="animate-spin text-indigo-600 mb-2" size={24} />
          <span className="text-xs">Analyzing content structure...</span>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative">
            <textarea
              readOnly
              value={generatedContent || ''}
              className="w-full h-32 p-3 text-sm text-slate-700 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none font-medium leading-relaxed"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
          <div className="flex justify-end gap-2">
             <Button variant="ghost" size="sm" onClick={() => handleGenerate()} icon={<RefreshCw size={14} />}>
              Regenerate
            </Button>
            <Button variant="primary" size="sm" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy Text'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};