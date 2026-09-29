import React, { useState } from 'react';
import { Contestant } from '../types';
import { SHOW_IMAGES } from '../data/showData';
import { 
  Scale, 
  Shield, 
  Vote, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  UserX,
  Scroll
} from 'lucide-react';

interface NominationRoomViewProps {
  contestants: Contestant[];
  onSimulateNominationVote: (targetId: string, rationale: string) => void;
  onDeployVeto: (nomineeId: string) => void;
}

export const NominationRoomView: React.FC<NominationRoomViewProps> = ({
  contestants,
  onSimulateNominationVote,
  onDeployVeto,
}) => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>('');
  const [rationale, setRationale] = useState<string>('');
  const [ballotCast, setBallotCast] = useState<boolean>(false);
  const [recentBallotSummary, setRecentBallotSummary] = useState<string | null>(null);

  const activeContestants = contestants.filter((c) => c.status !== 'Eliminated');
  const nominatedContestants = contestants.filter((c) => c.status === 'Nominated');
  const immuneContestants = contestants.filter((c) => c.status === 'Immune');

  const eligibleTargets = activeContestants.filter((c) => c.status !== 'Immune');

  const handleCastBallot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTargetId) return;

    const target = contestants.find((c) => c.id === selectedTargetId);
    onSimulateNominationVote(selectedTargetId, rationale || 'Strategic caucus balance.');
    
    setRecentBallotSummary(`Secret ballot officially cast against ${target?.name}. Sealed in the Brass Urn.`);
    setBallotCast(true);
    setSelectedTargetId('');
    setRationale('');

    setTimeout(() => {
      setBallotCast(false);
    }, 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Gupt Matdaan Kaksh · Secret Ballot Chamber</span>
              <span aria-hidden="true">·</span>
              <span>Saturday Midnight Ceremony</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white flex items-center gap-3">
              <span>Gupt Matdaan Kaksh</span>
              <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                गुप्त मतदान कक्ष
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Every Saturday night at midnight, each contender enters this soundproof teakwood chamber alone. One studio lens. Two wax-sealed slips dropped into the Brass Matdaan Peti to determine who faces Sunday's live floor elimination.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-xs text-slate-300">
            <Scale className="w-4 h-4 text-rose-400 shrink-0" />
            <span><strong>Sansad Niyam:</strong> Whispering or revealing votes outside the chamber incurs an immediate 150 PCP sanction.</span>
          </div>
        </div>
      </div>

      {/* Chamber Visual Backdrop */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-[21/9] max-h-72">
        <img 
          src={SHOW_IMAGES.nominationChamber} 
          alt="The Secret Nomination Chamber" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex flex-col justify-end p-6 sm:p-8">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
            Brass Matdaan Peti Is Open
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            "Speak your truth to the lens. The sealed wax slip does not lie."
          </h2>
        </div>
      </div>

      {/* The Current Chopping Block (Nominees) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Currently On The Chopping Block (Ravivar Live Maha-Nishkasan)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {nominatedContestants.length} Netas Facing Elimination
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {nominatedContestants.map((nominee) => (
            <div 
              key={nominee.id}
              className="bg-[#0F172A] border border-rose-500/50 rounded-xl p-5 shadow-lg shadow-rose-950/20 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-rose-400 pb-2 border-b border-rose-950/80">
                  <span className="font-semibold uppercase tracking-wider">Nominated for Eviction</span>
                  <span className="font-mono font-bold">{nominee.votesReceivedInChamber} Chamber Slips</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-300 font-display font-bold text-lg flex items-center justify-center border border-rose-500/40 shrink-0">
                    {nominee.avatarSeed}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{nominee.name}</h3>
                    <div className="text-xs text-slate-400">{nominee.caucus} · {nominee.politicalAspiration}</div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 italic border-l border-rose-500/40 pl-2">
                  "{nominee.keyQuote}"
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-900 p-2.5 rounded-lg text-xs">
                  <div>
                    <span className="text-slate-400">Approval:</span>
                    <span className="font-mono font-bold text-emerald-400 ml-1.5">{nominee.approvalRating}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400">PCP:</span>
                    <span className="font-mono font-bold text-amber-400 ml-1.5">{nominee.politicalCapital}</span>
                  </div>
                </div>
              </div>

              {/* Action: Deploy Clemency / Veto */}
              <div className="pt-4 border-t border-slate-800 mt-4">
                <button
                  onClick={() => onDeployVeto(nominee.id)}
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  title="Deploy Janta Ka Veto / Executive Clemency"
                >
                  <Shield className="w-3.5 h-3.5" /> Deploy Janta Ka Veto (Save Contender)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Secret Ballot Voting Booth Simulator */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Vote className="w-4 h-4 text-amber-400" />
            <span>Gupt Matdaan Simulator (गुप्त मतदान)</span>
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Cast a Secret Ballot Into The Brass Matdaan Peti
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Step into the private booth. Choose an eligible non-immune contender to place on Sunday’s elimination block and record your confidential rationale for the broadcast cameras.
          </p>
        </div>

        {ballotCast ? (
          <div className="bg-amber-500/10 border border-amber-500/40 p-6 rounded-xl text-center space-y-2 animate-fadeIn">
            <CheckCircle2 className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Ballot Wax-Sealed & Recorded</h4>
            <p className="text-xs text-slate-300">{recentBallotSummary}</p>
          </div>
        ) : (
          <form onSubmit={handleCastBallot} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-semibold">
                  Nominate Contender for Elimination:
                </label>
                <select
                  value={selectedTargetId}
                  onChange={(e) => setSelectedTargetId(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select an eligible contender...</option>
                  {eligibleTargets.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.caucus} · {c.politicalCapital} PCP)
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-500 mt-1">
                  Note: Contenders holding the Sengol of Immunity cannot be nominated.
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-semibold">
                  Confidential Rationale to the Camera:
                </label>
                <input
                  type="text"
                  placeholder="e.g., 'Compromised on agrarian water rights and broke whip during Zero Hour.'"
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-400 placeholder-slate-500"
                />
                <div className="text-[11px] text-slate-500 mt-1">
                  This recorded testimonial will air during Sunday’s live broadcast.
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!selectedTargetId}
                className="py-2.5 px-6 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" /> Seal & Drop Into Matdaan Peti
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Immune Roster Banner */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300">
            <strong>Currently Immune Contenders:</strong>{' '}
            {immuneContestants.map(c => c.name).join(', ') || 'None currently immune'}
          </span>
        </div>
        <span className="text-emerald-400 font-semibold">
          Protected by the Sengol of Immunity
        </span>
      </div>
    </div>
  );
};
