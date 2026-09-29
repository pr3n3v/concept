import React from 'react';
import { Vote, Radio } from 'lucide-react';

export type ActiveTab = 'leaderboard' | 'presentation' | 'roadmap' | 'missions' | 'nomination' | 'polling' | 'challenges' | 'auditions';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenVotingModal: () => void;
  activeContestantCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenVotingModal,
  activeContestantCount,
}) => {
  const navItems: { id: ActiveTab; label: string; highlight?: boolean }[] = [
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'auditions', label: 'Auditions & Register', highlight: true },
    { id: 'presentation', label: 'Show Bible' },
    { id: 'roadmap', label: '10-Episode Arc' },
    { id: 'missions', label: 'Zameen Pe Jung' },
    { id: 'challenges', label: 'Sansad Gauntlet' },
    { id: 'nomination', label: 'Gupt Matdaan' },
    { id: 'polling', label: 'Janta Polling' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090D14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('leaderboard')} 
            className="text-left group cursor-pointer flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center font-bold text-xs text-slate-950 font-mono shadow-sm ring-1 ring-amber-300/40">
              TNL
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg tracking-wider text-white group-hover:text-amber-400 transition-colors uppercase">
                  The Next Leader
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                  Season 1
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-tight hidden sm:block">
                High-Stakes Political Reality · 26 Contenders · 1 Mandate
              </p>
            </div>
          </button>
          
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Week 4: Karnal Mandi
            </span>
            <span aria-hidden="true">·</span>
            <span>{activeContestantCount} Contenders in House</span>
          </div>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 lg:px-3 py-1.5 text-xs font-semibold tracking-wide whitespace-nowrap transition-colors rounded-md relative cursor-pointer ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/10 border border-amber-400/20 shadow-sm'
                    : item.highlight
                    ? 'text-amber-300 hover:text-amber-200 bg-amber-400/5 hover:bg-amber-400/10 border border-amber-400/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
                {item.highlight && !isActive && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary action - Janta Ballot */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenVotingModal}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
          >
            <Vote className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">Janta Ka Veto · Vote</span>
            <span className="sm:hidden">Vote</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-800/60 bg-[#0B1120] text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 rounded whitespace-nowrap font-medium ${
              activeTab === item.id
                ? 'bg-amber-400/10 text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
