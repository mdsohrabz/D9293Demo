import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentCard } from './components/ContentCard';
import { Button } from './components/Button';
import { TabView, ContentItem } from './types';
import { MOCK_INITIAL_DATA, MOCK_NEW_DATA } from './constants';
import { Download, Sparkles, Filter, Search, Menu, Bookmark } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>('feed');
  const [items, setItems] = useState<ContentItem[]>(MOCK_INITIAL_DATA);
  const [isScraping, setIsScraping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Computed data
  const savedItems = useMemo(() => items.filter(item => item.isSaved), [items]);
  const displayedItems = useMemo(() => {
    const sourceData = activeTab === 'feed' ? items : savedItems;
    if (!searchTerm) return sourceData;
    return sourceData.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [items, savedItems, activeTab, searchTerm]);

  // Handlers
  const handleToggleSave = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isSaved: !item.isSaved } : item
    ));
  };

  const handleDelete = (id: string) => {
    // For saved items, "delete" just unsaves them for this demo
    // In a real app, you might permanently delete or just unsave
    if (activeTab === 'saved') {
        handleToggleSave(id);
    }
  };

  const handleScrape = () => {
    setIsScraping(true);
    // Simulate API delay
    setTimeout(() => {
      // Add new items that aren't already in the list
      const currentIds = new Set(items.map(i => i.id));
      const newItems = MOCK_NEW_DATA.filter(i => !currentIds.has(i.id));
      
      setItems(prev => [...newItems, ...prev]);
      setIsScraping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
            setActiveTab(tab);
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedItems.length}
      />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full overflow-y-auto">
             <Sidebar 
                activeTab={activeTab} 
                onTabChange={(tab) => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                }}
                savedCount={savedItems.length}
            />
        </div>
      </div>

      <main className="md:ml-64 p-4 md:p-8 min-h-screen transition-all">
        {/* Header */}
        <header className="max-w-5xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
                <button 
                    className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                        {activeTab === 'feed' ? 'Content Feed' : 'Saved Collection'}
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {activeTab === 'feed' 
                        ? 'Discover and curate the latest insights.' 
                        : 'Transform your saved gems into viral content.'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
               {activeTab === 'feed' && (
                   <Button 
                    onClick={handleScrape} 
                    isLoading={isScraping}
                    icon={<Download size={18} />}
                    className="w-full md:w-auto"
                   >
                    {isScraping ? 'Fetching...' : 'Scrape New Sources'}
                   </Button>
               )}
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by title, summary, or tag..." 
                    className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 pl-0 sm:pl-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <Filter size={18} />
                </button>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="max-w-5xl mx-auto">
            {displayedItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {displayedItems.map((item) => (
                        <ContentCard 
                            key={item.id} 
                            item={item} 
                            onToggleSave={handleToggleSave}
                            onDelete={handleDelete}
                            view={activeTab}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                        {activeTab === 'feed' ? <Download size={24} /> : <Bookmark size={24} />}
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                        {searchTerm ? 'No matches found' : (activeTab === 'feed' ? 'Your feed is empty' : 'No saved items yet')}
                    </h3>
                    <p className="text-slate-500 max-w-sm mb-6">
                        {searchTerm 
                            ? `We couldn't find anything matching "${searchTerm}". Try a different keyword.` 
                            : (activeTab === 'feed' 
                                ? 'Click the scrape button above to fetch fresh content from your sources.' 
                                : 'Save items from your feed to see them here and generate hooks.')}
                    </p>
                    {activeTab === 'feed' && !searchTerm && (
                        <Button onClick={handleScrape} isLoading={isScraping} variant="outline">
                            Fetch Content
                        </Button>
                    )}
                    {activeTab === 'saved' && !searchTerm && (
                        <Button onClick={() => setActiveTab('feed')} variant="outline">
                            Go to Feed
                        </Button>
                    )}
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;