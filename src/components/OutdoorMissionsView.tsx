import React, { useState } from 'react';
import { OUTDOOR_MISSIONS_DATA, SHOW_IMAGES } from '../data/showData';
import { OutdoorMission, Contestant } from '../types';
import { 
  Compass, 
  MapPin, 
  Shield, 
  Clock, 
  Award, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  Play, 
  Sparkles,
  Camera
} from 'lucide-react';

interface OutdoorMissionsViewProps {
  contestants: Contestant[];
  onAwardImmunityToContestant?: (contestantId: string) => void;
}

export const OutdoorMissionsView: React.FC<OutdoorMissionsViewProps> = ({
  contestants,
  onAwardImmunityToContestant,
}) => {
  const [selectedMissionId, setSelectedMissionId] = useState<string>('om-04'); // Week 4 active mission
  const [filterType, setFilterType] = useState<string>('all');
  
  // Interactive Simulation State
  const [simulatorContestantId, setSimulatorContestantId] = useState<string>(contestants[0]?.id || '');
  const [selectedStrategy, setSelectedStrategy] = useState<'empathy' | 'fiscal' | 'oratory' | 'procedural'>('empathy');
  const [simulationResult, setSimulationResult] = useState<{
    score: number;
    verdict: string;
    civicReaction: string;
    immunityGranted: boolean;
  } | null>(null);

  const selectedMission = OUTDOOR_MISSIONS_DATA.find((m) => m.id === selectedMissionId) || OUTDOOR_MISSIONS_DATA[0];

  const filteredMissions = OUTDOOR_MISSIONS_DATA.filter((m) => {
    if (filterType === 'all') return true;
    return m.activeStatus.toLowerCase() === filterType.toLowerCase();
  });

  const runSimulation = () => {
    const candidate = contestants.find((c) => c.id === simulatorContestantId) || contestants[0];
    let baseScore = 65;

    // Evaluate strategy synergy with candidate strengths
    if (selectedStrategy === 'empathy' && candidate.caucus === 'Kisan & Shramik Gathbandhan') baseScore += 26;
    if (selectedStrategy === 'fiscal' && candidate.caucus === 'Rashtriya Vikas Morcha') baseScore += 28;
    if (selectedStrategy === 'oratory' && candidate.taskStats.mentalChallengesWon >= 2) baseScore += 22;
    if (selectedStrategy === 'procedural' && candidate.caucus === 'Samvidhaan Suraksha Manch') baseScore += 24;
    if (candidate.caucus === 'Yuva Swaraj Dal') baseScore += 18;
    if (candidate.caucus === 'Nirpeksh Krantikari') baseScore += 15;

    // Mission specific modifiers
    if (selectedMission.id === 'om-04' && selectedStrategy === 'empathy') baseScore += 12; // Mandi standoff respects empathy
    if (selectedMission.id === 'om-01' && selectedStrategy === 'oratory') baseScore += 14; // Marathwada town hall likes oratory
    if (selectedMission.id === 'om-02' && selectedStrategy === 'procedural') baseScore += 15; // Slum legal accord likes procedural

    const finalScore = Math.min(98, Math.max(45, baseScore));
    const wonImmunity = finalScore >= 80;

    let verdict = '';
    let civicReaction = '';

    if (wonImmunity) {
      verdict = `${candidate.name} commanded the field with exceptional civic poise, earning the Sengol of Immunity.`;
      civicReaction = `The local panchayat and citizen council of ${selectedMission.communityStakeholders} voted 88% in favor of the negotiated accord.`;
    } else {
      verdict = `${candidate.name} faced severe pushback during Phase 2 ground negotiations and failed to unite opposing stakeholders.`;
      civicReaction = `Local community stakeholders voiced strong skepticism over lack of immediate statutory guarantees.`;
    }

    setSimulationResult({
      score: finalScore,
      verdict,
      civicReaction,
      immunityGranted: wonImmunity,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Zameen Pe Jung · Ground Civic Missions</span>
              <span aria-hidden="true">·</span>
              <span>Sengol of Immunity</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white flex items-center gap-3">
              <span>Zameen Pe Jung: Outdoor Missions</span>
              <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                मैदानी चुनौतियाँ
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Every Tuesday, contenders leave Sansad Niwas to confront real working citizens, distressed farmers, and local panchayats in real Indian crisis zones. The victor wins the revered Sengol of Immunity.
            </p>
          </div>

          {/* Filter Status */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg">
            {[
              { id: 'all', label: 'All Tasks' },
              { id: 'completed', label: 'Completed' },
              { id: 'in progress', label: 'In Progress' },
              { id: 'upcoming', label: 'Upcoming' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterType(btn.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors capitalize ${
                  filterType === btn.id
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

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMissions.map((mission) => {
          const isSelected = mission.id === selectedMissionId;
          const isInProgress = mission.activeStatus === 'In Progress';
          const isCompleted = mission.activeStatus === 'Completed';

          return (
            <div
              key={mission.id}
              onClick={() => {
                setSelectedMissionId(mission.id);
                setSimulationResult(null);
              }}
              className={`bg-[#0F172A] border rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all ${
                isSelected
                  ? 'border-amber-400 shadow-lg shadow-amber-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span className="font-mono text-amber-400 font-bold">WEEK {mission.week} · {mission.codename}</span>
                  {isInProgress ? (
                    <span className="text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      In Progress
                    </span>
                  ) : isCompleted ? (
                    <span className="text-emerald-400 font-bold uppercase text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="text-slate-500 font-bold uppercase text-[11px]">Upcoming</span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white hover:text-amber-300 transition-colors">
                    {mission.title}
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{mission.locationName}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {mission.civicObjective}
                </p>

                <div className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg space-y-1 text-xs">
                  <div className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px] uppercase tracking-wider">
                    <Shield className="w-3.5 h-3.5" /> Immunity Stakes
                  </div>
                  <div className="text-slate-300 line-clamp-2 text-[11px]">
                    {mission.immunityReward}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {mission.phases.length} Execution Phases
                </span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  Inspect Briefing →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Mission Full Executive Dossier */}
      {selectedMission && (
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl overflow-hidden shadow-2xl space-y-6">
          {/* Mission Hero Banner */}
          <div className="relative aspect-[21/8] max-h-72 w-full overflow-hidden border-b border-slate-800">
            <img 
              src={selectedMission.bannerImage || SHOW_IMAGES.outdoorTownHall} 
              alt={selectedMission.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
                <span>Operation {selectedMission.codename}</span>
                <span aria-hidden="true">·</span>
                <span>Week {selectedMission.week} Immunity Task</span>
                <span aria-hidden="true">·</span>
                <span>{selectedMission.locationAreaType}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {selectedMission.title}
              </h2>
              <div className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{selectedMission.locationName}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Civic Objective & TV Drama Hook */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-400" />
                  Civic Mandate & Objective
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedMission.civicObjective}
                </p>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <strong>Community Stakeholders:</strong> {selectedMission.communityStakeholders}
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Television Drama Hook & Pressure Cooker
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedMission.tvDramaHook}
                </p>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800 flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong>Logistics:</strong> {selectedMission.logisticalSetup}</span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Phase Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Mission Tactical Phases & Win Milestones
                </h3>
                <span className="text-xs text-slate-400">Strict Timed Parameters</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedMission.phases.map((phase) => (
                  <div 
                    key={phase.phaseNumber}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-amber-400 font-mono font-bold">
                        <span>PHASE {phase.phaseNumber}</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3" /> {phase.timeLimit}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{phase.title}</h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{phase.action}</p>
                    </div>

                    <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/80">
                      <strong className="text-amber-300">Key Skill:</strong> {phase.criticalSkill}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immunity Reward & Community Legacy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Immunity Package */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  Immunity Reward Package
                </div>
                <div className="text-sm font-bold text-white">{selectedMission.immunityReward}</div>
                <div className="space-y-1 pt-2 border-t border-emerald-500/20">
                  {selectedMission.rewardPerks.map((perk, idx) => (
                    <div key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Community Legacy */}
              <div className="bg-amber-950/20 border border-amber-500/30 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-400" />
                  Real-World Community Legacy Program
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedMission.communityLegacy}
                </p>
                <div className="text-xs text-slate-400 pt-2 border-t border-amber-500/20">
                  Production commits real capital donations to the communities where our outdoor tasks occur, turning reality TV into lasting municipal infrastructure.
                </div>
              </div>
            </div>

            {/* Interactive Outdoor Task Simulator */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Interactive Mission Field Simulator
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Deploy a contestant on <strong className="text-slate-200">{selectedMission.title}</strong> and test whether their tactical strategy can win community endorsement and the Immunity Gavel.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {/* Candidate Selector */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Lead Contestant:</label>
                  <select
                    value={simulatorContestantId}
                    onChange={(e) => setSimulatorContestantId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-400"
                  >
                    {contestants.filter(c => c.status !== 'Eliminated').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.caucus})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Strategy Selector */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Tactical Field Strategy:</label>
                  <select
                    value={selectedStrategy}
                    onChange={(e) => setSelectedStrategy(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg p-2.5 focus:outline-none focus:border-amber-400"
                  >
                    <option value="empathy">Empathetic Grassroots Listening</option>
                    <option value="fiscal">Hardball Fiscal & Ledger Restructuring</option>
                    <option value="oratory">Inspirational Town Hall Oratory</option>
                    <option value="procedural">Strict Statutory & Regulatory Compliance</option>
                  </select>
                </div>

                {/* Simulate Button */}
                <div className="flex items-end">
                  <button
                    onClick={runSimulation}
                    className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" /> Execute Field Simulation
                  </button>
                </div>
              </div>

              {/* Simulation Result Box */}
              {simulationResult && (
                <div className={`mt-4 p-4 rounded-xl border space-y-2 ${
                  simulationResult.immunityGranted
                    ? 'bg-emerald-950/30 border-emerald-500/50'
                    : 'bg-slate-950 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-amber-400">
                      FIELD SCORE: {simulationResult.score} / 100
                    </span>
                    {simulationResult.immunityGranted ? (
                      <span className="text-emerald-400 font-bold uppercase flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5" /> Immunity Awarded!
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold uppercase">
                        Immunity Not Attained
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-white font-medium">
                    {simulationResult.verdict}
                  </p>
                  <p className="text-xs text-slate-400">
                    <strong>Local Citizen Tally:</strong> {simulationResult.civicReaction}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
