import React from 'react';
import { Contestant } from '../types';
import { X, Shield, Award, Scroll, Scale, Vote, MapPin, Briefcase, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ContestantDetailModalProps {
  contestant: Contestant | null;
  onClose: () => void;
  onVoteForContestant: (id: string) => void;
}

export const ContestantDetailModal: React.FC<ContestantDetailModalProps> = ({
  contestant,
  onClose,
  onVoteForContestant,
}) => {
  if (!contestant) return null;

  const getStatusBadge = (status: Contestant['status']) => {
    switch (status) {
      case 'Immune':
        return <span className="text-emerald-400 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"><Shield className="w-3.5 h-3.5" /> Immune</span>;
      case 'Nominated':
        return <span className="text-rose-400 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider"><Scale className="w-3.5 h-3.5" /> On The Block</span>;
      case 'Eliminated':
        return <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Eliminated</span>;
      default:
        return <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Active Contender</span>;
    }
  };

  const getTrajectoryIcon = (traj: Contestant['weeklyTrajectory']) => {
    if (traj === 'up') return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    if (traj === 'down') return <TrendingDown className="w-4 h-4 text-rose-400" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0b1120]">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Contestant Dossier</span>
            <span aria-hidden="true">·</span>
            <span>ID #{contestant.id.toUpperCase()}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-200 font-medium">{contestant.caucus}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Hero Profile Lockup */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-display font-bold text-2xl flex items-center justify-center shadow-lg shrink-0">
                {contestant.avatarSeed}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{contestant.name}</h2>
                  {getTrajectoryIcon(contestant.weeklyTrajectory)}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {contestant.hometown}, {contestant.state}</span>
                  <span aria-hidden="true">·</span>
                  <span>Age {contestant.age}</span>
                  <span aria-hidden="true">·</span>
                  {getStatusBadge(contestant.status)}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-lg w-full sm:w-auto justify-around sm:justify-end">
              <div className="text-center sm:text-right">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Political Capital</div>
                <div className="text-lg font-mono font-bold text-amber-400 tabular-nums">{contestant.politicalCapital} PCP</div>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-center sm:text-right">
                <div className="text-xs text-slate-400 uppercase tracking-wider">Approval</div>
                <div className="text-lg font-mono font-bold text-emerald-400 tabular-nums">{contestant.approvalRating}%</div>
              </div>
            </div>
          </div>

          {/* Aspirations & Key Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-lg space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-500" /> Prior Career & Target Office
              </div>
              <div className="text-sm font-semibold text-slate-200">{contestant.priorOccupation}</div>
              <div className="text-xs text-slate-400">
                Aiming for: <span className="text-amber-300 font-medium">{contestant.politicalAspiration}</span>
              </div>
              <div className="text-xs text-slate-400">
                Ideological Lane: <span className="text-slate-300">{contestant.ideologicalLane}</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-lg flex flex-col justify-between">
              <div className="text-xs text-slate-400 uppercase tracking-wider">Campaign Creed</div>
              <blockquote className="text-sm italic text-slate-300 border-l-2 border-amber-500/70 pl-3 py-1 my-1">
                "{contestant.keyQuote}"
              </blockquote>
              <div className="text-xs text-slate-400">Signature Policy: {contestant.signatureStance}</div>
            </div>
          </div>

          {/* Task Performance Scorecard */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Season Task Performance Scorecard
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                <div className="text-xl font-mono font-bold text-white tabular-nums">{contestant.taskStats.mentalChallengesWon}</div>
                <div className="text-xs text-slate-400 mt-1">Mental Wins</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                <div className="text-xl font-mono font-bold text-white tabular-nums">{contestant.taskStats.outdoorMissionsCompleted}</div>
                <div className="text-xs text-slate-400 mt-1">Outdoor Tasks</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                <div className="text-xl font-mono font-bold text-white tabular-nums">{contestant.taskStats.billsPassed}</div>
                <div className="text-xs text-slate-400 mt-1">Bills Passed</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                <div className="text-xl font-mono font-bold text-white tabular-nums">{contestant.taskStats.filibustersSurvived}</div>
                <div className="text-xs text-slate-400 mt-1">Filibusters</div>
              </div>
            </div>
          </div>

          {/* Strengths & Strategic Vulnerabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Political Strengths
              </div>
              <div className="space-y-1">
                {contestant.strengths.map((str, idx) => (
                  <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> Strategic Vulnerabilities
              </div>
              <div className="space-y-1">
                {contestant.vulnerabilities.map((vuln, idx) => (
                  <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-rose-500 font-bold">!</span>
                    <span>{vuln}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio Overview */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Candidate Background</div>
            <p className="text-sm text-slate-300 leading-relaxed">{contestant.bio}</p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-4">
            <div className="text-xs text-slate-400">
              Gupt Matdaan slips: <span className="font-mono text-white tabular-nums font-semibold">{contestant.votesReceivedInChamber}</span>
              {' · '}
              Janta ballots cast: <span className="font-mono text-white tabular-nums font-semibold">{contestant.viewerBallotCount.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onVoteForContestant(contestant.id)}
                className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-md cursor-pointer"
              >
                <Vote className="w-4 h-4" /> Cast Janta Vote (जनता वोट)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
