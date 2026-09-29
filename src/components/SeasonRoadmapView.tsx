import React, { useState } from 'react';
import { EPISODES_ROADMAP } from '../data/showData';
import { EpisodeRoadmapItem } from '../types';
import { 
  Calendar, 
  Tv, 
  Shield, 
  Scale, 
  Flame, 
  Vote, 
  Compass, 
  ChevronRight, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SeasonRoadmapViewProps {
  onSelectMissionByCodename?: (codename: string) => void;
}

export const SeasonRoadmapView: React.FC<SeasonRoadmapViewProps> = ({
  onSelectMissionByCodename,
}) => {
  const [selectedEpisodeNumber, setSelectedEpisodeNumber] = useState<number>(4); // Currently active week 4
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'active' | 'upcoming'>('all');

  const selectedEpisode = EPISODES_ROADMAP.find((ep) => ep.episodeNumber === selectedEpisodeNumber) || EPISODES_ROADMAP[0];

  const getEpisodeStatus = (epNum: number): 'completed' | 'active' | 'upcoming' => {
    if (epNum < 4) return 'completed';
    if (epNum === 4) return 'active';
    return 'upcoming';
  };

  const filteredEpisodes = EPISODES_ROADMAP.filter((ep) => {
    const status = getEpisodeStatus(ep.episodeNumber);
    if (statusFilter === 'all') return true;
    return status === statusFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Full Season Broadcast Architecture</span>
              <span aria-hidden="true">·</span>
              <span>10-Episode Arc</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white flex items-center gap-3">
              <span>Season 1 Episode Roadmap</span>
              <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                10-सप्ताह महासंग्राम
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Explore the 10-week dramatic arc: from Central Hall oaths and drought/mandi crisis diplomacy to the live nationwide general election coronation of Lok Nayak (Desh Ka Neta).
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
            {[
              { id: 'all', label: 'All (10)' },
              { id: 'completed', label: 'Aired (3)' },
              { id: 'active', label: 'Current Ep 4' },
              { id: 'upcoming', label: 'Upcoming (6)' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setStatusFilter(btn.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  statusFilter === btn.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Episode Timeline Selector */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Episode Timeline (Select to inspect full broadcast details)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {EPISODES_ROADMAP.map((ep) => {
            const status = getEpisodeStatus(ep.episodeNumber);
            const isSelected = ep.episodeNumber === selectedEpisodeNumber;
            
            return (
              <button
                key={ep.episodeNumber}
                onClick={() => setSelectedEpisodeNumber(ep.episodeNumber)}
                className={`p-3 rounded-lg border text-left transition-all relative ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow-lg'
                    : status === 'active'
                    ? 'bg-slate-900 border-amber-500/50 text-slate-200 hover:border-amber-400'
                    : status === 'completed'
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    : 'bg-slate-900/30 border-slate-800/60 text-slate-500 hover:border-slate-700'
                }`}
              >
                {status === 'active' && (
                  <span className="absolute -top-1.5 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                )}
                
                <div className="text-[11px] font-mono text-amber-400 font-bold">
                  EP {ep.episodeNumber}
                </div>
                <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                  {ep.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-1">
                  {status === 'completed' ? 'Aired' : status === 'active' ? 'Broadcast Week' : 'Upcoming'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Episode Spotlight Detail View */}
      {selectedEpisode && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden shadow-xl space-y-6">
          {/* Episode Header */}
          <div className="p-6 sm:p-8 bg-[#0B1120] border-b border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="text-amber-400 font-bold uppercase">Episode {selectedEpisode.episodeNumber}</span>
                <span aria-hidden="true">·</span>
                <span>Week {selectedEpisode.weekNumber}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3 h-3 text-slate-400" /> {selectedEpisode.runtime}
                </span>
              </div>

              {getEpisodeStatus(selectedEpisode.episodeNumber) === 'active' ? (
                <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Currently In Broadcast
                </span>
              ) : getEpisodeStatus(selectedEpisode.episodeNumber) === 'completed' ? (
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Aired / Official Record
                </span>
              ) : (
                <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs font-bold uppercase tracking-wider">
                  Upcoming Episode
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              {selectedEpisode.title}: <span className="text-amber-400 font-normal text-xl sm:text-2xl">{selectedEpisode.theme}</span>
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {selectedEpisode.logline}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Major Plotlines: A-Story and B-Story */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-amber-400" />
                  A-Story: High-Stakes Civic Clash
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedEpisode.majorPlotlines.aStory}
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-indigo-400" />
                  B-Story: House Social Dynamic & Betrayal
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedEpisode.majorPlotlines.bStory}
                </p>
              </div>
            </div>

            {/* Episode Outcomes Banner: Outdoor Mission, Immunity, Nominees & Eliminations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl">
              <div className="space-y-1">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-amber-400" /> Outdoor Task Tie-in
                </div>
                <div className="text-sm font-bold text-white">
                  {selectedEpisode.outdoorMissionCodename}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Immunity Winner
                </div>
                <div className="text-sm font-bold text-white">
                  {selectedEpisode.immunityWinner}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] text-rose-400 uppercase tracking-wider flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5" /> On The Chopping Block
                </div>
                <div className="text-xs font-semibold text-rose-300">
                  {selectedEpisode.nominees.join(', ')}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500" /> Eliminated
                </div>
                <div className="text-sm font-bold text-slate-300">
                  {selectedEpisode.eliminatedContestant}
                </div>
              </div>
            </div>

            {/* Daily 7-Day Rhythm Breakdown */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Daily House Schedule & Dramatic Beats (Week {selectedEpisode.weekNumber})
              </div>

              <div className="space-y-2">
                {selectedEpisode.dailyRhythm.map((d, idx) => (
                  <div 
                    key={idx}
                    className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="sm:w-1/4 font-mono font-bold text-amber-400">
                      {d.day}
                    </div>
                    <div className="sm:w-1/3 font-semibold text-white">
                      {d.event}
                    </div>
                    <div className="sm:w-5/12 text-slate-300 text-left sm:text-right">
                      {d.stakes}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Viewer Impact Twist Event */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-start gap-3">
              <Vote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Viewer Influence Twist for this Episode
                </div>
                <p className="text-xs text-slate-200 mt-0.5">
                  {selectedEpisode.viewerImpactEvent}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
