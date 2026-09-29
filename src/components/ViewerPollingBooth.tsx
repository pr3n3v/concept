import React, { useState } from 'react';
import { ViewerPoll, Contestant } from '../types';
import { 
  Vote, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Clock, 
  Radio,
  Flame
} from 'lucide-react';

interface ViewerPollingBoothProps {
  viewerPoll: ViewerPoll;
  contestants: Contestant[];
  onCastViewerVote: (contestantId: string) => void;
}

export const ViewerPollingBooth: React.FC<ViewerPollingBoothProps> = ({
  viewerPoll,
  contestants,
  onCastViewerVote,
}) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [thankYouMessage, setThankYouMessage] = useState<string>('');

  const activeContestants = contestants.filter(c => c.status !== 'Eliminated');
  const sortedByApproval = [...activeContestants].sort((a, b) => b.approvalRating - a.approvalRating);

  const handleVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidateId) return;

    onCastViewerVote(selectedCandidateId);
    const candidate = contestants.find(c => c.id === selectedCandidateId);
    setThankYouMessage(`Your ballot has been officially tallied for ${candidate?.name}! Approval rating updated.`);
    setHasVoted(true);

    setTimeout(() => {
      setHasVoted(false);
    }, 4500);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Vote className="w-3.5 h-3.5" />
              <span>Janta Ki Adalat · National Electorate Terminal</span>
              <span aria-hidden="true">·</span>
              <span>Direct Viewer Mandate</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white flex items-center gap-3">
              <span>Janta Ki Adalat Polling Booth</span>
              <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                जनता की अदालत
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              In <em>Lok Nayak</em>, 1.4 billion citizens hold the supreme sovereign mandate. Your weekly votes dictate contender approval ratings, award the Janta Ka Veto, and punish corrupt faction maneuvers.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs text-slate-300">
            <div>
              <div className="text-slate-400">Total Ballots Cast</div>
              <div className="text-base font-mono font-bold text-amber-400 tabular-nums">
                {viewerPoll.totalVotesCast.toLocaleString()}
              </div>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <div className="text-slate-400">Poll Closes In</div>
              <div className="text-base font-mono font-bold text-emerald-400 tabular-nums">
                {viewerPoll.closesInHours} Hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Active Weekly Referendum */}
      <div className="bg-[#0F172A] border border-amber-500/40 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl shadow-amber-950/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Active Weekly Electorate Referendum
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              {viewerPoll.title}
            </h2>
          </div>

          <span className="px-3 py-1 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full text-xs font-bold uppercase tracking-wider shrink-0">
            High Stakes
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {viewerPoll.description}
        </p>

        {/* Live Vote Share Bars */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Current Standings in Viewer Vote Share
          </div>

          <div className="space-y-3">
            {viewerPoll.candidates.map((cand) => (
              <div key={cand.contestantId} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">{cand.contestantName}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 tabular-nums">{cand.votes.toLocaleString()} votes</span>
                    <span className="font-bold text-amber-400 tabular-nums">{cand.percent}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${cand.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Voting Form */}
        <div className="pt-4 border-t border-slate-800">
          {hasVoted ? (
            <div className="bg-emerald-950/30 border border-emerald-500/50 p-5 rounded-xl text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
              <div className="text-sm font-bold text-white">Ballot Successfully Tallied!</div>
              <p className="text-xs text-slate-300">{thankYouMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleVoteSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <select
                  value={selectedCandidateId}
                  onChange={(e) => setSelectedCandidateId(e.target.value)}
                  required
                  className="flex-1 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select your favorite candidate to vote for...</option>
                  {activeContestants.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.caucus} · {c.approvalRating}% Approval)
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={!selectedCandidateId}
                  className="py-2.5 px-6 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shrink-0 cursor-pointer"
                >
                  <Vote className="w-4 h-4" /> Cast Public Ballot
                </button>
              </div>
              <div className="text-[11px] text-slate-500">
                Verified digital balloting. Each vote awards +10 PCP to the chosen candidate and recalculates the National Approval Index.
              </div>
            </form>
          )}
        </div>
      </div>

      {/* National Approval Rating Leaderboard (Top 5 Electorate Favorites) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              National Public Favorability Index (Top 5 Candidates)
            </h2>
          </div>
          <span className="text-xs text-slate-400">Based on millions of verified audience ballots</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {sortedByApproval.slice(0, 5).map((candidate, idx) => (
            <div 
              key={candidate.id}
              className="bg-[#0F172A] border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono font-bold text-amber-400">#{idx + 1} FAVORITE</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                    {candidate.approvalRating}%
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-300 font-display font-bold text-xs flex items-center justify-center border border-amber-500/20 shrink-0">
                    {candidate.avatarSeed}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white text-xs truncate">{candidate.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{candidate.caucus}</div>
                  </div>
                </div>

                <p className="text-[11px] italic text-slate-400 line-clamp-2 border-l border-slate-700 pl-1.5 my-2">
                  "{candidate.keyQuote}"
                </p>
              </div>

              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800 font-mono">
                {candidate.viewerBallotCount.toLocaleString()} lifetime votes
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Viewer Power Catalog */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          The Electorate Powers Granted by Viewer Votes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 space-y-1">
            <div className="font-bold text-amber-400">1. Janta Ka Veto (The People's Clemency)</div>
            <p className="text-slate-300">Awarded to the top voter choice in India each month. Can nullify any nomination made in the Gupt Matdaan Kaksh live on national television.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 space-y-1">
            <div className="font-bold text-amber-400">2. The Primetime National Address</div>
            <p className="text-slate-300">Contenders with ≥ 85% approval receive an unfiltered 3-minute prime-time camera monologue during Sunday’s broadcast with zero interruptions.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 space-y-1">
            <div className="font-bold text-amber-400">3. Lok Lokpal & Sanction Referendums</div>
            <p className="text-slate-300">If a contender commits floor horse-trading or moral betrayals, viewers can vote in real-time to strip their Zero Hour speaking rights for 48 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
