import React, { useState, useMemo } from 'react';
import { Contestant, Caucus, TeamMilestone } from '../types';
import { 
  Search, 
  Shield, 
  Scale, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Award, 
  Vote, 
  Users, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface LeaderboardViewProps {
  contestants: Contestant[];
  teamMilestones: TeamMilestone[];
  onSelectContestant: (contestant: Contestant) => void;
  onVoteForContestant: (id: string) => void;
  onNavigateToAuditions?: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  contestants,
  teamMilestones,
  onSelectContestant,
  onVoteForContestant,
  onNavigateToAuditions,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCaucus, setSelectedCaucus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'pcp' | 'approval' | 'tasks' | 'votes'>('pcp');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter and sort contestants
  const filteredContestants = useMemo(() => {
    return contestants
      .filter((c) => {
        const matchesSearch = 
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.hometown.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.politicalAspiration.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.ideologicalLane.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = 
          selectedStatus === 'all' || 
          c.status.toLowerCase() === selectedStatus.toLowerCase();

        const matchesCaucus = 
          selectedCaucus === 'all' || 
          c.caucus === selectedCaucus;

        return matchesSearch && matchesStatus && matchesCaucus;
      })
      .sort((a, b) => {
        if (sortBy === 'pcp') return b.politicalCapital - a.politicalCapital;
        if (sortBy === 'approval') return b.approvalRating - a.approvalRating;
        if (sortBy === 'tasks') {
          const totalA = a.taskStats.mentalChallengesWon + a.taskStats.outdoorMissionsCompleted + a.taskStats.billsPassed;
          const totalB = b.taskStats.mentalChallengesWon + b.taskStats.outdoorMissionsCompleted + b.taskStats.billsPassed;
          return totalB - totalA;
        }
        if (sortBy === 'votes') return b.viewerBallotCount - a.viewerBallotCount;
        return 0;
      });
  }, [contestants, searchQuery, selectedStatus, selectedCaucus, sortBy]);

  // Statistics
  const activeCount = contestants.filter((c) => c.status === 'Active').length;
  const immuneCount = contestants.filter((c) => c.status === 'Immune').length;
  const nominatedCount = contestants.filter((c) => c.status === 'Nominated').length;
  const eliminatedCount = contestants.filter((c) => c.status === 'Eliminated').length;

  return (
    <div className="space-y-8">
      {/* Top Banner & Executive Overview */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <span>Capitol House Telemetry</span>
              <span aria-hidden="true">·</span>
              <span>Season 1 Live Broadcast</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white flex items-center gap-3">
              <span>The Next Leader</span>
              <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                Official Leaderboard
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Tracking 26 fierce political contenders navigating daily legislative crises, secret chamber nomination ballots, and real-world outdoor civic missions across the nation’s heartlands.
            </p>

            {onNavigateToAuditions && (
              <div className="pt-2">
                <button
                  onClick={onNavigateToAuditions}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  <span>Think you can lead? Register for Auditions</span>
                  <span className="text-[10px] bg-slate-950/20 px-1.5 py-0.5 rounded font-mono">6 Cities</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#090D14]/80 border border-slate-800/80 p-3 rounded-lg">
            <div className="px-3 py-1">
              <div className="text-xs text-slate-400">In Sansad Niwas</div>
              <div className="text-xl font-mono font-bold text-white tabular-nums">{activeCount + immuneCount + nominatedCount} / 26</div>
            </div>
            <div className="px-3 py-1 border-l border-slate-800">
              <div className="text-xs text-emerald-400 flex items-center gap-1"><Shield className="w-3 h-3" /> Sengol Immune</div>
              <div className="text-xl font-mono font-bold text-emerald-400 tabular-nums">{immuneCount}</div>
            </div>
            <div className="px-3 py-1 border-l border-slate-800">
              <div className="text-xs text-rose-400 flex items-center gap-1"><Scale className="w-3 h-3" /> Chopping Block</div>
              <div className="text-xl font-mono font-bold text-rose-400 tabular-nums">{nominatedCount}</div>
            </div>
            <div className="px-3 py-1 border-l border-slate-800">
              <div className="text-xs text-slate-500">Nishkasit (Out)</div>
              <div className="text-xl font-mono font-bold text-slate-500 tabular-nums">{eliminatedCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Milestones & Caucus Alignment */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Gathbandhan & Morcha Milestones (दल संकल्प)
            </h2>
          </div>
          <span className="text-xs text-slate-400">Sansad Legislative Perks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMilestones.map((milestone) => (
            <div 
              key={milestone.id}
              className="bg-[#0F172A] border border-slate-800/90 rounded-lg p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-amber-300">{milestone.caucus}</span>
                  <span className={`font-mono font-bold tabular-nums ${milestone.progress >= 100 ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {milestone.progress}%
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">{milestone.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{milestone.targetMetric}</p>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden my-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      milestone.progress >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, milestone.progress)}%` }}
                  />
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-900/80 border border-slate-800/60 p-2 rounded flex items-start gap-1.5 mt-2">
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${milestone.progress >= 100 ? 'text-emerald-400' : 'text-amber-500'}`} />
                <span>
                  <strong className="text-white">Perk:</strong> {milestone.unlockedPerk}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Bar: Search, Filters, Sorting, and View Toggle */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search contestants by name, city, aspiration, or ideology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-400 whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="pcp">Political Capital (PCP)</option>
              <option value="approval">Viewer Approval %</option>
              <option value="tasks">Total Task Wins</option>
              <option value="votes">Viewer Ballot Count</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-amber-400/20 text-amber-400' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-amber-400/20 text-amber-400' : 'text-slate-400 hover:text-white'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
          {/* Status Segment */}
          <div className="flex flex-wrap items-center gap-1">
            {[
              { id: 'all', label: `All (${contestants.length})` },
              { id: 'active', label: `Active (${activeCount})` },
              { id: 'immune', label: `Immune (${immuneCount})` },
              { id: 'nominated', label: `Nominated (${nominatedCount})` },
              { id: 'eliminated', label: `Eliminated (${eliminatedCount})` },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedStatus(btn.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedStatus === btn.id
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Caucus Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Gathbandhan:</span>
            <select
              value={selectedCaucus}
              onChange={(e) => setSelectedCaucus(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-md px-2.5 py-1 focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Alliances (Sabhi Dal)</option>
              <option value="Rashtriya Vikas Morcha">Rashtriya Vikas Morcha</option>
              <option value="Kisan & Shramik Gathbandhan">Kisan & Shramik Gathbandhan</option>
              <option value="Samvidhaan Suraksha Manch">Samvidhaan Suraksha Manch</option>
              <option value="Yuva Swaraj Dal">Yuva Swaraj Dal</option>
              <option value="Nirpeksh Krantikari">Nirpeksh Krantikari</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Contestant Display: Grid or Table */}
      {filteredContestants.length === 0 ? (
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <p className="text-slate-400 text-sm">No political contenders match your search and filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('all');
              setSelectedCaucus('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredContestants.map((contestant, index) => {
            const isEliminated = contestant.status === 'Eliminated';
            const isNominated = contestant.status === 'Nominated';
            const isImmune = contestant.status === 'Immune';

            return (
              <div
                key={contestant.id}
                onClick={() => onSelectContestant(contestant)}
                className={`bg-[#0F172A] border rounded-xl p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group hover:-translate-y-1 hover:shadow-xl ${
                  isNominated
                    ? 'border-rose-500/60 shadow-rose-950/20'
                    : isImmune
                    ? 'border-emerald-500/60 shadow-emerald-950/20'
                    : isEliminated
                    ? 'border-slate-800/60 opacity-60'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Metadata Row */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800/80 mb-4">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-amber-400 font-bold">#{index + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300 font-medium">{contestant.caucus}</span>
                    </div>
                    {isImmune && (
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold uppercase text-[11px]">
                        <Shield className="w-3.5 h-3.5" /> Immune
                      </span>
                    )}
                    {isNominated && (
                      <span className="flex items-center gap-1 text-rose-400 font-semibold uppercase text-[11px] animate-pulse">
                        <Scale className="w-3.5 h-3.5" /> On The Block
                      </span>
                    )}
                    {isEliminated && (
                      <span className="text-slate-500 font-semibold uppercase text-[11px]">
                        Eliminated
                      </span>
                    )}
                    {!isImmune && !isNominated && !isEliminated && (
                      <span className="text-slate-400 font-medium text-[11px]">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Candidate Identification */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full font-display font-bold text-lg flex items-center justify-center shrink-0 ${
                      isNominated
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : isImmune
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    }`}>
                      {contestant.avatarSeed}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                          {contestant.name}
                        </h3>
                        {contestant.weeklyTrajectory === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        {contestant.weeklyTrajectory === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                        {contestant.weeklyTrajectory === 'steady' && <Minus className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {contestant.hometown}, {contestant.state} · Aiming for {contestant.politicalAspiration}
                      </div>
                    </div>
                  </div>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-900/90 border border-slate-800/80 p-2.5 rounded-lg mb-4">
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Capital</div>
                      <div className="text-base font-mono font-bold text-amber-400 tabular-nums">
                        {contestant.politicalCapital} <span className="text-xs font-normal text-slate-400">PCP</span>
                      </div>
                    </div>
                    <div className="border-l border-slate-800 pl-2.5">
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">Approval</div>
                      <div className="text-base font-mono font-bold text-emerald-400 tabular-nums">
                        {contestant.approvalRating}%
                      </div>
                    </div>
                  </div>

                  {/* Task Mini-Scorecard */}
                  <div className="space-y-1 text-xs text-slate-400 mb-4">
                    <div className="flex justify-between py-0.5">
                      <span>Mental Challenges Won:</span>
                      <span className="font-mono text-slate-200 tabular-nums">{contestant.taskStats.mentalChallengesWon}</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span>Outdoor Missions:</span>
                      <span className="font-mono text-slate-200 tabular-nums">{contestant.taskStats.outdoorMissionsCompleted}</span>
                    </div>
                    <div className="flex justify-between py-0.5">
                      <span>Bills Passed:</span>
                      <span className="font-mono text-slate-200 tabular-nums">{contestant.taskStats.billsPassed}</span>
                    </div>
                  </div>

                  <p className="text-xs italic text-slate-400 line-clamp-2 mb-2 border-l border-slate-700 pl-2">
                    "{contestant.keyQuote}"
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80 mt-2">
                  <span className="text-[11px] text-slate-400">
                    {contestant.viewerBallotCount.toLocaleString()} votes
                  </span>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onVoteForContestant(contestant.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center gap-1"
                      title="Vote for candidate in Viewer Electorate poll"
                    >
                      <Vote className="w-3 h-3" /> Vote
                    </button>
                    <button
                      onClick={() => onSelectContestant(contestant)}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                      title="View full candidate file"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* High-Density Data Table View */
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0B1120] text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Contender</th>
                <th className="py-3 px-4">Target Office</th>
                <th className="py-3 px-4">Caucus</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">PCP</th>
                <th className="py-3 px-4 text-right">Approval</th>
                <th className="py-3 px-4 text-center">Mental</th>
                <th className="py-3 px-4 text-center">Outdoor</th>
                <th className="py-3 px-4 text-center">Bills</th>
                <th className="py-3 px-4 text-right">Ballots</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredContestants.map((c, idx) => (
                <tr 
                  key={c.id} 
                  onClick={() => onSelectContestant(c)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-amber-400 tabular-nums">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white hover:text-amber-300">{c.name}</div>
                    <div className="text-[11px] text-slate-400">{c.hometown}, {c.state}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{c.politicalAspiration}</td>
                  <td className="py-3 px-4 text-slate-400">{c.caucus}</td>
                  <td className="py-3 px-4">
                    {c.status === 'Immune' && <span className="text-emerald-400 font-semibold">Immune</span>}
                    {c.status === 'Nominated' && <span className="text-rose-400 font-semibold">On Block</span>}
                    {c.status === 'Eliminated' && <span className="text-slate-500 font-semibold">Eliminated</span>}
                    {c.status === 'Active' && <span className="text-slate-400">Active</span>}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-amber-400 tabular-nums">
                    {c.politicalCapital}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 tabular-nums">
                    {c.approvalRating}%
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums">{c.taskStats.mentalChallengesWon}</td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums">{c.taskStats.outdoorMissionsCompleted}</td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums">{c.taskStats.billsPassed}</td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">{c.viewerBallotCount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onVoteForContestant(c.id)}
                      className="px-2 py-1 text-[11px] font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded"
                    >
                      Vote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
