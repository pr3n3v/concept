import React, { useState } from 'react';
import { MENTAL_SOCIAL_CHALLENGES } from '../data/showData';
import { MentalSocialChallenge, Contestant } from '../types';
import { 
  Flame, 
  Clock, 
  AlertCircle, 
  Award, 
  Swords, 
  Play, 
  CheckCircle2, 
  FileText, 
  Scale, 
  ShieldAlert 
} from 'lucide-react';

interface DailyChallengeViewProps {
  contestants: Contestant[];
  onAwardPcp?: (contestantId: string, amount: number) => void;
}

export const DailyChallengeView: React.FC<DailyChallengeViewProps> = ({
  contestants,
  onAwardPcp,
}) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('ch-01');
  const [challengerAId, setChallengerAId] = useState<string>(contestants[0]?.id || '');
  const [challengerBId, setChallengerBId] = useState<string>(contestants[1]?.id || '');
  const [simulatedDuelResult, setSimulatedDuelResult] = useState<{
    winnerName: string;
    scoreSummary: string;
    dialogueExcerpt: string;
    pointsAwarded: number;
  } | null>(null);

  const selectedChallenge = MENTAL_SOCIAL_CHALLENGES.find((c) => c.id === selectedChallengeId) || MENTAL_SOCIAL_CHALLENGES[0];
  const activeContestants = contestants.filter((c) => c.status !== 'Eliminated');

  const handleRunChallenge = () => {
    const candidateA = contestants.find((c) => c.id === challengerAId) || contestants[0];
    const candidateB = contestants.find((c) => c.id === challengerBId) || contestants[1];

    if (candidateA.id === candidateB.id) return;

    // Calculate mental scores based on stats and strengths
    const scoreA = candidateA.politicalCapital / 10 + candidateA.taskStats.mentalChallengesWon * 15 + Math.floor(Math.random() * 20);
    const scoreB = candidateB.politicalCapital / 10 + candidateB.taskStats.mentalChallengesWon * 15 + Math.floor(Math.random() * 20);

    const winner = scoreA >= scoreB ? candidateA : candidateB;
    const runnerUp = scoreA >= scoreB ? candidateB : candidateA;

    if (onAwardPcp) {
      onAwardPcp(winner.id, selectedChallenge.pcpAward);
    }

    setSimulatedDuelResult({
      winnerName: winner.name,
      scoreSummary: `${winner.name} scored ${Math.round(Math.max(scoreA, scoreB))} pts vs ${runnerUp.name} (${Math.round(Math.min(scoreA, scoreB))} pts) before the chamber jury.`,
      dialogueExcerpt: `"${winner.keyQuote}" — Delivered with razor-sharp cadence under the 90-second countdown clock.`,
      pointsAwarded: selectedChallenge.pcpAward,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Daily Mental & Social Gauntlet</span>
              <span aria-hidden="true">·</span>
              <span>Sansad Niwas Central Arena</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white flex items-center gap-3">
              <span>Sansad Mental Challenges</span>
              <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                मानसिक चुनौतियाँ
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Every afternoon inside the Central Hall of Sansad Niwas, contenders face high-pressure political simulations: 3:00 AM national crisis scrums, aggressive press varta grilling, Zero Hour legislative battles, and 24-hour marathon filibusters.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs text-slate-300">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Winning mental challenges awards Political Capital Points (PCP) used to secure legislative privileges.</span>
          </div>
        </div>
      </div>

      {/* Challenge Catalog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MENTAL_SOCIAL_CHALLENGES.map((challenge) => {
          const isSelected = challenge.id === selectedChallengeId;

          return (
            <div
              key={challenge.id}
              onClick={() => {
                setSelectedChallengeId(challenge.id);
                setSimulatedDuelResult(null);
              }}
              className={`bg-[#0F172A] border rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? 'border-amber-400 shadow-lg shadow-amber-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-semibold text-amber-400 uppercase">{challenge.category}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" /> {challenge.durationMinutes} Min
                  </span>
                </div>

                <h3 className="text-base font-bold text-white hover:text-amber-300 transition-colors">
                  {challenge.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {challenge.overview}
                </p>

                <div className="flex items-center justify-between text-xs bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-400">Award:</span>
                  <span className="font-mono font-bold text-amber-400">+{challenge.pcpAward} PCP</span>
                  <span className="text-slate-400">Stress:</span>
                  <span className={`font-semibold ${challenge.stressFactor === 'Extreme' ? 'text-rose-400' : 'text-amber-400'}`}>
                    {challenge.stressFactor}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">{challenge.mechanics.length} Rules of Order</span>
                <span className="text-amber-400 font-semibold">Test In Arena →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Challenge Spotlight & Interactive Debate Arena */}
      {selectedChallenge && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
                {selectedChallenge.category} Gauntlet
              </div>
              <h2 className="text-2xl font-bold font-display text-white mt-1">
                {selectedChallenge.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20 px-3 py-1 rounded-full font-bold">
                +{selectedChallenge.pcpAward} PCP Bounty
              </span>
              <span className="text-xs font-mono text-slate-400">
                {selectedChallenge.durationMinutes} Minutes
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {selectedChallenge.overview}
          </p>

          {/* Rules & Win Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Mechanics & Procedure
              </div>
              <div className="space-y-1.5">
                {selectedChallenge.mechanics.map((mech, idx) => (
                  <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">§</span>
                    <span>{mech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Winning Condition
                </div>
                <p className="text-xs text-slate-200 mt-1">{selectedChallenge.winningMetric}</p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Penalty for Failure
                </div>
                <p className="text-xs text-slate-300 mt-1">{selectedChallenge.penaltyForFailure}</p>
              </div>
            </div>
          </div>

          {/* Interactive Podium Duel Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Simulate Podium Clash for this Challenge
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Select two contenders to face off in {selectedChallenge.title} to test their rhetoric and caucus discipline.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Affirmative Podium:</label>
                <select
                  value={challengerAId}
                  onChange={(e) => setChallengerAId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-400"
                >
                  {activeContestants.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.politicalCapital} PCP)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Rebuttal Podium:</label>
                <select
                  value={challengerBId}
                  onChange={(e) => setChallengerBId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-400"
                >
                  {activeContestants.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.politicalCapital} PCP)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleRunChallenge}
                  disabled={challengerAId === challengerBId}
                  className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" /> Convene Chamber Jury
                </button>
              </div>
            </div>

            {/* Duel Result */}
            {simulatedDuelResult && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Podium Winner: {simulatedDuelResult.winnerName}
                  </span>
                  <span className="font-mono text-amber-400 font-bold">
                    +{simulatedDuelResult.pointsAwarded} PCP Awarded
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white font-medium">
                  {simulatedDuelResult.scoreSummary}
                </p>
                <p className="text-xs italic text-slate-300 border-l border-emerald-500 pl-2">
                  {simulatedDuelResult.dialogueExcerpt}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
