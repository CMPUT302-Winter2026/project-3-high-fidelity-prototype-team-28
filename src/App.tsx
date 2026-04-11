import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Home as HomeIcon, 
  Brain, 
  Volume2, 
  Bookmark, 
  Flag, 
  Info, 
  PlayCircle,
  Plus,
  Minus,
  Maximize,
  Layers,
  ChevronRight,
  Folder,
  FolderOpen,
  Package,
  Lightbulb,
  Network,
  Users,
  PawPrint,
  CloudSun,
  User,
  Footprints,
  Leaf
} from 'lucide-react';
import { categories, words } from './data';
import { Category, Word } from './types';

type View = 'home' | 'category' | 'word' | 'map' | 'study' | 'flag' | 'search';

const IconMap: Record<string, any> = {
  Users,
  PawPrint,
  CloudSun,
  User,
  Footprints,
  Leaf
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [isExpertMode, setIsExpertMode] = useState(false);
  const [savedWordIds, setSavedWordIds] = useState<string[]>(['atim', 'maskwa']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFlagConfirmation, setShowFlagConfirmation] = useState(false);

  const selectedWord = words.find(w => w.id === selectedWordId);

  const filteredWords = words.filter(w => 
    w.cree.toLowerCase().includes(searchQuery.toLowerCase()) || 
    w.english.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSaveWord = (id: string) => {
    setSavedWordIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const navigateToCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    setCurrentView('category');
  };

  const navigateToWord = (id: string) => {
    setSelectedWordId(id);
    setSearchQuery('');
    setCurrentView('word');
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans pb-24">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="max-w-screen-md mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {currentView !== 'home' && (
              <button 
                onClick={() => {
                  if (currentView === 'word') setCurrentView('category');
                  else if (currentView === 'map') setCurrentView('word');
                  else {
                    setCurrentView('home');
                    setSearchQuery('');
                  }
                }}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-primary" />
              </button>
            )}
            <h1 className="text-xl font-bold tracking-tight">
              {currentView === 'home' ? 'Vocabulary Explorer' : 
               currentView === 'category' ? selectedCategory :
               currentView === 'word' ? 'Word Details' :
               currentView === 'map' ? 'Semantic Map' :
               currentView === 'study' ? 'Study List' :
               currentView === 'flag' ? 'Flag Gap' :
               currentView === 'search' ? 'Search' : 'Explorer'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {(currentView === 'word' || currentView === 'map') && (
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-outline text-right leading-tight">
                    Expert<br/>Mode
                  </span>
                  <button 
                    onClick={() => setIsExpertMode(!isExpertMode)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${isExpertMode ? 'bg-primary' : 'bg-surface-container-highest'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isExpertMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
                <span className="text-[9px] italic text-outline/80 pr-1">Dive Deeper</span>
              </div>
            )}
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
              <Brain className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-md mx-auto px-6 pt-6">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <header>
                <h2 className="text-4xl font-headline italic text-primary leading-tight mb-4">
                  Explore Cree Words by Topic
                </h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Connecting ancestral wisdom with modern learning through a curated archive of language.
                </p>
              </header>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                  <input 
                    type="text" 
                    placeholder="Word Look up"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value.length > 0) setCurrentView('search');
                    }}
                    className="w-full bg-surface-variant border-none rounded-xl py-4 pl-12 pr-6 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                  />
                </div>

              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button 
                    key={cat.name}
                    onClick={() => navigateToCategory(cat.name)}
                    className={`group relative overflow-hidden ${cat.colorClass} rounded-2xl p-5 min-h-[160px] flex flex-col justify-end text-left transition-transform active:scale-95 shadow-sm border border-black/5`}
                  >
                    <div className={`absolute top-4 right-4 ${cat.iconColorClass}`}>
                      {IconMap[cat.icon] && (
                        (() => {
                          const IconComponent = IconMap[cat.icon];
                          return <IconComponent className="w-16 h-16" />;
                        })()
                      )}
                    </div>
                    <div className="relative z-10">
                      <h3 className={`font-headline text-2xl font-semibold ${cat.textColorClass}`}>{cat.name}</h3>
                      <p className={`cree-text text-sm mt-1 opacity-90 ${cat.textColorClass}`}>{cat.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'search' && (
            <motion.div 
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search words..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-variant border-none rounded-xl py-4 pl-12 pr-6 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                />
              </div>

              <div className="space-y-4">
                {searchQuery.length > 0 ? (
                  filteredWords.length > 0 ? (
                    filteredWords.map((word) => (
                      <div 
                        key={word.id}
                        onClick={() => {
                          if (word.id === 'atim') {
                            navigateToWord(word.id);
                          }
                        }}
                        className={`bg-surface-container-low rounded-2xl p-5 flex justify-between items-center transition-all ${word.id === 'atim' ? 'hover:bg-surface-container-high cursor-pointer' : 'opacity-60 cursor-default'}`}
                      >
                        <div className="flex flex-col">
                          <span className="cree-text text-2xl text-primary font-semibold mb-1">{word.cree}</span>
                          <span className="text-secondary text-sm">{word.english}</span>
                        </div>
                        {word.id === 'atim' && (
                          <ChevronRight className="w-5 h-5 text-outline" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-outline">No words found for "{searchQuery}"</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-12">
                    <p className="text-outline">Start typing to search...</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {currentView === 'category' && (
            <motion.div 
              key="category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input 
                  type="text" 
                  placeholder={`Search in ${selectedCategory}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-variant border-none rounded-xl py-4 pl-12 pr-6 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                />
              </div>
              <p className="text-xs font-bold text-outline uppercase tracking-widest text-center">
                Tip: Tap a word to view detail
              </p>

              <div className="space-y-4">
                {words
                  .filter(w => w.category === selectedCategory)
                  .filter(w => 
                    w.cree.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    w.english.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((word) => (
                  <div 
                    key={word.id}
                    onClick={() => navigateToWord(word.id)}
                    className="bg-surface-container-low rounded-2xl p-5 flex justify-between items-center transition-all hover:bg-surface-container-high cursor-pointer group"
                  >
                    <div className="flex flex-col">
                      <span className="cree-text text-2xl text-primary font-semibold mb-1">{word.cree}</span>
                      <span className="text-secondary text-sm">{word.english}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-full hover:bg-primary/10 text-outline group-hover:text-primary transition-colors">
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveWord(word.id);
                        }}
                        className={`p-2 rounded-full hover:bg-primary/10 transition-colors ${savedWordIds.includes(word.id) ? 'text-primary' : 'text-outline'}`}
                      >
                        <Bookmark className={`w-5 h-5 ${savedWordIds.includes(word.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'word' && selectedWord && (
            <motion.div 
              key="word"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <section className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center gap-6 mb-4">
                  <h2 className="font-headline text-8xl font-medium italic text-primary leading-tight">{selectedWord.cree}</h2>
                  <button className="bg-primary-fixed text-on-primary-fixed-variant p-5 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-md">
                    <Volume2 className="w-8 h-8" />
                  </button>
                </div>
                <p className="text-3xl text-secondary italic">({selectedWord.english})</p>
                
                {isExpertMode && (
                  <div className="flex justify-center gap-4 mt-8">
                    <div className="bg-surface-container-low px-5 py-2.5 rounded-2xl flex items-center gap-2 text-on-surface-variant border border-outline-variant/30">
                      <Info className="w-4 h-4" />
                      <span className="text-sm font-medium">Common Noun</span>
                    </div>
                    <div className="bg-surface-container-low px-5 py-2.5 rounded-2xl flex items-center gap-2 text-on-surface-variant border border-outline-variant/30">
                      <Brain className="w-4 h-4" />
                      <span className="text-sm font-medium">Standard Cree</span>
                    </div>
                  </div>
                )}

                {!isExpertMode && (
                  <div className="mt-10 w-full flex justify-center">
                    <button 
                      onClick={() => toggleSaveWord(selectedWord.id)}
                      className="w-full max-w-xs border-2 border-outline-variant text-on-surface flex items-center justify-center gap-3 px-8 py-4 rounded-2xl hover:bg-surface-container-low transition-all active:scale-95 shadow-sm"
                    >
                      <Bookmark className={`w-6 h-6 ${savedWordIds.includes(selectedWord.id) ? 'fill-current' : ''}`} />
                      <span className="font-bold text-lg">
                        {savedWordIds.includes(selectedWord.id) ? 'Saved to Study List' : 'Save to Study List'}
                      </span>
                    </button>
                  </div>
                )}
              </section>

              {isExpertMode && selectedWord.classification && (
                <section className="space-y-6">
                  <div className="bg-tertiary-container/10 p-8 rounded-[2rem] border border-tertiary-container/20">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-tertiary-container mb-6 flex items-center gap-3">
                      <Layers className="w-5 h-5" />
                      Linguistic Classification
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                        <span className="text-on-surface-variant">Class</span>
                        <span className="font-bold text-xl text-primary">{selectedWord.classification.class}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-on-surface-variant">Paradigm</span>
                        <span className="font-bold text-xl text-primary">{selectedWord.classification.paradigm}</span>
                      </div>
                    </div>
                  </div>

                  {selectedWord.morphology && (
                    <div className="bg-surface-container p-8 rounded-[2rem] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-bl-full -mr-12 -mt-12" />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-6 flex items-center gap-3">
                        <Brain className="w-5 h-5" />
                        Morphology
                      </h3>
                      <p className="font-headline text-3xl italic text-on-surface leading-relaxed mb-4">
                        Root: <span className="text-primary">{selectedWord.morphology.root}</span>
                      </p>
                      <p className="text-on-surface-variant leading-relaxed">{selectedWord.morphology.explanation}</p>
                    </div>
                  )}
                </section>
              )}

              {selectedWord.exampleSentence && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-[2px] w-8 bg-secondary-container" />
                    <h3 className="font-headline text-2xl font-semibold">Example Usage!</h3>
                  </div>
                  <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm border border-outline-variant/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-3">
                        <p className="font-headline text-4xl italic text-primary leading-snug">{selectedWord.exampleSentence.cree}</p>
                        <p className="text-xl text-secondary">"{selectedWord.exampleSentence.english}"</p>
                      </div>
                      <button className="self-start md:self-center bg-surface-container-high p-4 rounded-full hover:bg-surface-container-highest transition-colors">
                        <PlayCircle className="w-8 h-8" />
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {selectedWord.relatedWords && selectedWord.relatedWords.length > 0 && (
                <section>
                  <h3 className="font-headline text-2xl font-semibold mb-6">Related Words</h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedWord.relatedWords.map(id => {
                      const related = words.find(w => w.id === id);
                      if (!related) return null;
                      return (
                        <button 
                          key={id}
                          onClick={() => navigateToWord(id)}
                          className="bg-primary-fixed/60 px-6 py-3 rounded-full text-on-primary-fixed-variant font-medium hover:bg-primary-fixed transition-colors flex items-center gap-3 shadow-sm"
                        >
                          <span className="font-headline text-xl italic">{related.cree}</span>
                          <span className="text-sm opacity-70">({related.english})</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              )}

              <div className="mt-16 pb-12">
                <button 
                  onClick={() => setCurrentView('map')}
                  className="w-full bg-primary text-on-primary py-6 rounded-2xl flex items-center justify-center gap-4 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all group overflow-hidden relative shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Network className="w-8 h-8" />
                  <span className="font-bold text-xl tracking-wider uppercase">View Semantic Map</span>
                </button>
              </div>
            </motion.div>
          )}

          {currentView === 'map' && selectedWord && (
            <motion.div 
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {isExpertMode ? (
                /* Active Root Card */
                <div className="bg-tertiary text-on-tertiary rounded-[2rem] p-8 relative overflow-hidden shadow-md">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
                    <Bookmark className="w-48 h-48 fill-current" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-90">Active Root</h3>
                    <h2 className="font-headline text-6xl italic font-medium mb-2">{selectedWord.cree}</h2>
                    <p className="text-lg opacity-90 mb-8 italic">Animate Noun / {selectedWord.english}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                        <div className="text-[8px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Class</div>
                        <div className="font-bold">{selectedWord.classification?.class || 'VAI'}</div>
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                        <div className="text-[8px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Paradigm</div>
                        <div className="font-bold">{selectedWord.classification?.paradigm || 'AI-1'}</div>
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                        <div className="text-[8px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Dialect</div>
                        <div className="font-bold">{selectedWord.classification?.dialect || 'Plains Cree'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Beginner Tip */
                <div className="bg-primary-fixed/30 rounded-2xl p-5 flex items-start gap-4 border border-primary/10">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-on-surface text-sm font-semibold mb-1">Beginner Tip</p>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Tip: Tap a node to explore related words!
                    </p>
                  </div>
                </div>
              )}

              {/* Instruction (Expert Only) */}
              {isExpertMode && (
                <div className="flex items-center gap-3 px-2">
                  <Info className="w-5 h-5 text-primary" />
                  <p className="text-sm italic text-on-surface-variant font-medium">Tap a node to explore or flag a linguistic gap</p>
                </div>
              )}

              {/* Map Area */}
              <div className="relative w-full aspect-[4/5] md:aspect-square canvas-texture rounded-[2rem] border border-outline-variant/30 overflow-hidden bg-surface-container-low shadow-inner">
                
                {/* Legend */}
                {isExpertMode && (
                  <div className="absolute top-6 left-6 bg-surface-container-lowest/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-outline-variant/20 z-20">
                    <h4 className="text-[9px] font-bold uppercase tracking-widest mb-3 text-on-surface">Map Legend</h4>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-[10px] font-bold text-on-surface-variant">Known word</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full border border-dashed border-tertiary"></div>
                        <span className="text-[10px] font-bold text-on-surface-variant">Missing gap</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-0.5 bg-primary"></div>
                        <span className="text-[10px] font-bold text-on-surface-variant">Related to</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-0.5 border-t border-dashed border-secondary"></div>
                        <span className="text-[10px] font-bold text-on-surface-variant">Same category</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Zoom Controls */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
                  <div className="bg-surface-container-highest/80 backdrop-blur-sm rounded-full flex flex-col shadow-sm border border-outline-variant/20">
                    <button className="p-3 hover:bg-black/5 rounded-t-full transition-colors"><Plus className="w-5 h-5 text-on-surface" /></button>
                    <div className="h-[1px] w-full bg-outline-variant/30"></div>
                    <button className="p-3 hover:bg-black/5 rounded-b-full transition-colors"><Minus className="w-5 h-5 text-on-surface" /></button>
                  </div>
                  <button className="p-3 bg-primary text-on-primary rounded-full shadow-md hover:bg-primary-container transition-colors mt-2">
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>

                {/* Map SVG Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                  {/* Center to Top Right (Atimo-pimitâkan) */}
                  <line x1="200" y1="250" x2="280" y2="180" stroke="var(--color-primary)" strokeWidth="2" />
                  {/* Center to Bottom Right (Mahihkan) */}
                  <line x1="200" y1="250" x2="270" y2="300" stroke="var(--color-primary)" strokeWidth="2" />
                  {/* Center to Bottom Left (Mostos) - Dashed */}
                  <line x1="200" y1="250" x2="140" y2="350" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Center to Left (Missing Gap) - Dashed */}
                  {isExpertMode && (
                    <line x1="200" y1="250" x2="100" y2="230" stroke="var(--color-tertiary)" strokeWidth="2" strokeDasharray="4 4" />
                  )}
                </svg>

                {/* Nodes */}
                {/* Center Node */}
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-24 h-24 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center ring-8 ring-primary/20">
                    <span className="font-headline text-2xl italic font-medium">{selectedWord.cree}</span>
                  </div>
                </div>

                {/* Top Right Node */}
                <button 
                  onClick={() => navigateToWord('atimo-pimitakan')}
                  className="absolute top-[36%] left-[70%] -translate-x-1/2 -translate-y-1/2 bg-surface-container-highest px-4 py-3 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow text-center min-w-[100px]"
                >
                  <span className="font-headline text-lg italic font-bold text-primary block">Atimo-<br/>pimitâkan</span>
                  <span className="text-[9px] font-bold uppercase text-on-surface-variant mt-1 block">Dog Sled</span>
                </button>

                {/* Bottom Right Node */}
                <button 
                  onClick={() => navigateToWord('mahihkan')}
                  className="absolute top-[60%] left-[67%] -translate-x-1/2 -translate-y-1/2 bg-surface-container-highest px-5 py-3 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <span className="font-headline text-lg italic font-bold text-secondary block">Mahihkan</span>
                  <span className="text-[9px] font-bold uppercase text-on-surface-variant mt-1 block">Wolf</span>
                </button>

                {/* Bottom Left Node */}
                <button 
                  onClick={() => navigateToWord('mostos')}
                  className="absolute top-[70%] left-[35%] -translate-x-1/2 -translate-y-1/2 bg-surface-container-highest px-5 py-3 rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <span className="font-headline text-lg italic font-bold text-secondary block">Mostos</span>
                  <span className="text-[9px] font-bold uppercase text-on-surface-variant mt-1 block">Cow / Bison</span>
                </button>

                {/* Missing Gap Node */}
                {isExpertMode && (
                  <div className="absolute top-[46%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <button 
                      onClick={() => setCurrentView('flag')}
                      className="bg-tertiary text-on-tertiary text-[9px] font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform mb-2 z-20"
                    >
                      <Flag className="w-3 h-3" />
                      FLAG GAP
                    </button>
                    <div className="bg-surface-container-lowest/50 px-4 py-3 rounded-[2rem] border-2 border-dashed border-tertiary text-center w-32">
                      <span className="text-[10px] font-bold text-tertiary block leading-tight">Missing Semantic<br/>Concept</span>
                    </div>
                  </div>
                )}

              </div>

              {isExpertMode ? (
                <>
                  {/* Contextual Insight */}
                  <div className="bg-primary-fixed/30 rounded-[2rem] p-6 border border-primary/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Lightbulb className="w-5 h-5 text-primary" />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Contextual Insight</h3>
                    </div>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-medium">
                      The root <span className="font-headline italic text-lg">{selectedWord.cree}</span> serves as a foundation for many animate concepts in Cree. Notice the connection to transportation (<span className="font-headline italic text-lg">Atimo-pimitâkan</span>) which signifies the historical role of dogs in the landscape.
                    </p>
                  </div>

                  {/* Graph Statistics */}
                  <div className="bg-surface-container-high rounded-[2rem] p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Layers className="w-5 h-5 text-secondary" />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">Graph Statistics</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-surface-container-lowest rounded-2xl p-4 text-center border border-outline-variant/20 shadow-sm">
                        <div className="font-headline text-3xl italic font-bold text-primary mb-1">4</div>
                        <div className="text-[8px] font-bold uppercase tracking-widest text-on-surface-variant">Connections</div>
                      </div>
                      <div className="bg-surface-container-lowest rounded-2xl p-4 text-center border border-outline-variant/20 shadow-sm">
                        <div className="font-headline text-3xl italic font-bold text-tertiary mb-1">1</div>
                        <div className="text-[8px] font-bold uppercase tracking-widest text-on-surface-variant">Known Gap</div>
                      </div>
                      <div className="bg-surface-container-lowest rounded-2xl p-4 text-center border border-outline-variant/20 shadow-sm">
                        <div className="font-headline text-3xl italic font-bold text-secondary mb-1">2</div>
                        <div className="text-[8px] font-bold uppercase tracking-widest text-on-surface-variant">Categories</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4 py-8">
                  <button 
                    onClick={() => setCurrentView('word')}
                    className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
                  >
                    <Info className="w-5 h-5" />
                    Word Details
                  </button>
                  <button 
                    onClick={() => toggleSaveWord(selectedWord.id)}
                    className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    {savedWordIds.includes(selectedWord.id) ? 'Remove from Study List' : 'Add to Study List'}
                  </button>
                </div>
              )}

            </motion.div>
          )}

          {currentView === 'study' && (
            <motion.div 
              key="study"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Study List</h2>
                <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full shadow-md">
                  <FolderOpen className="w-5 h-5" />
                  <span className="text-sm font-semibold">New Folder</span>
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
                <input 
                  type="text" 
                  placeholder="Search Saved Words"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-lowest border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface shadow-sm"
                />
              </div>

              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg">Week 3 vocab</h3>
                      <p className="text-[10px] text-outline uppercase tracking-widest font-bold">
                        {savedWordIds.length} Words • Last active 2h ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  {savedWordIds
                    .map(id => words.find(w => w.id === id))
                    .filter(word => word !== undefined)
                    .filter(word => 
                      word!.cree.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      word!.english.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(word => {
                      const id = word!.id;
                      return (
                        <div 
                          key={id}
                          onClick={() => navigateToWord(id)}
                          className="bg-surface-container-low p-5 rounded-xl flex items-center justify-between hover:bg-surface-container-high cursor-pointer"
                        >
                          <div className="flex items-center gap-5">
                            <button className="bg-white/60 p-3 rounded-full">
                              <Volume2 className="w-5 h-5 text-primary" />
                            </button>
                            <div>
                              <h4 className="cree-text text-2xl text-primary leading-none mb-1">{word!.cree}</h4>
                              <p className="text-on-surface-variant font-medium">{word!.english}</p>
                            </div>
                          </div>
                          <Bookmark className="w-5 h-5 text-primary fill-current" />
                        </div>
                      );
                    })}
                </div>
              </section>

              <div className="bg-secondary-container/30 rounded-2xl p-5 flex gap-4 items-start border border-secondary-container/50">
                <Lightbulb className="w-5 h-5 text-on-secondary-container" />
                <p className="text-sm text-on-secondary-container leading-relaxed">
                  <strong>Tip:</strong> Words with the bookmark icon are saved to your library for offline review.
                </p>
              </div>
            </motion.div>
          )}

          {currentView === 'flag' && (
            <motion.div 
              key="flag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <header className="text-center md:text-left">
                <h2 className="font-headline italic text-3xl text-primary mb-2">Help improve Cree Vocab network</h2>
                <p className="text-outline text-sm leading-relaxed">Your contribution helps us map the relationships between traditional Cree terms and modern concepts.</p>
              </header>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <section className="bg-surface-container-low rounded-xl p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-outline uppercase tracking-widest">Related word</label>
                    <input 
                      type="text" 
                      readOnly 
                      value={selectedWord?.cree || ''} 
                      className="w-full bg-surface-variant/40 border-none rounded-lg py-3 px-4 font-headline italic text-xl text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-outline uppercase tracking-widest">Missing Concept</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sled dog harness"
                      className="w-full bg-surface-container-lowest border-none rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-outline uppercase tracking-widest">Why is this missing?</label>
                    <textarea 
                      rows={3}
                      placeholder="Explain the cultural or linguistic context..."
                      className="w-full bg-surface-container-lowest border-none rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                </section>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setCurrentView('map')}
                    className="flex-1 px-8 py-4 rounded-xl border-2 border-transparent hover:bg-surface-container-highest text-outline font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    onClick={() => setShowFlagConfirmation(true)}
                    className="flex-1 px-8 py-4 rounded-xl bg-primary text-on-primary font-bold shadow-lg hover:bg-primary-container transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-xl border-t border-outline-variant/10 z-50">
        <div className="max-w-screen-md mx-auto flex justify-around items-center px-4 pb-8 pt-2">
          <button 
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center justify-center px-5 py-1.5 transition-all active:scale-90 ${currentView === 'home' ? 'text-primary' : 'text-outline'}`}
          >
            <HomeIcon className={`w-6 h-6 mb-1 ${currentView === 'home' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
          </button>
          
          <button 
            onClick={() => {
              setCurrentView('search');
              setSearchQuery('');
            }}
            className={`flex flex-col items-center justify-center px-5 py-1.5 transition-all active:scale-90 ${currentView === 'search' || currentView === 'category' || currentView === 'word' || currentView === 'map' ? 'bg-primary-fixed text-on-primary-fixed rounded-2xl' : 'text-outline'}`}
          >
            <Search className={`w-6 h-6 mb-1 ${currentView === 'search' || currentView === 'category' || currentView === 'word' || currentView === 'map' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Search</span>
          </button>

          <button 
            onClick={() => setCurrentView('study')}
            className={`flex flex-col items-center justify-center px-5 py-1.5 transition-all active:scale-90 ${currentView === 'study' ? 'bg-primary-fixed text-on-primary-fixed rounded-2xl' : 'text-outline'}`}
          >
            <BookOpen className={`w-6 h-6 mb-1 ${currentView === 'study' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Study List</span>
          </button>
        </div>
      </nav>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showFlagConfirmation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowFlagConfirmation(false);
                setCurrentView('map');
              }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-surface-container-lowest w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-outline-variant/20 text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Flag className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-headline text-3xl italic text-primary mb-4">Kinanâskomitin!</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Thank you for contributing to the Cree Vocabulary network. Your insight helps us bridge linguistic gaps and preserve ancestral knowledge.
              </p>
              <button 
                onClick={() => {
                  setShowFlagConfirmation(false);
                  setCurrentView('map');
                }}
                className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold shadow-lg hover:bg-primary-container transition-all active:scale-95"
              >
                Return to Map
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
