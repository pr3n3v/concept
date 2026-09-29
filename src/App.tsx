import React, { useState } from 'react';
import { 
  INITIAL_CONTESTANTS, 
  OUTDOOR_MISSIONS_DATA, 
  EPISODES_ROADMAP, 
  MENTAL_SOCIAL_CHALLENGES, 
  INITIAL_VIEWER_POLL, 
  TEAM_MILESTONES 
} from './data/showData';
import { Contestant, ViewerPoll, TeamMilestone } from './types';
import { Header, ActiveTab } from './components/Header';
import { LeaderboardView } from './components/LeaderboardView';
import { ContestantDetailModal } from './components/ContestantDetailModal';
import { ShowFlowPresentation } from './components/ShowFlowPresentation';
import { SeasonRoadmapView } from './components/SeasonRoadmapView';
import { OutdoorMissionsView } from './components/OutdoorMissionsView';
import { NominationRoomView } from './components/NominationRoomView';
import { ViewerPollingBooth } from './components/ViewerPollingBooth';
import { DailyChallengeView } from './components/DailyChallengeView';
import { AuditionRegistrationView } from './components/AuditionRegistrationView';
import { Vote, Shield, Scale, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('leaderboard');
  const [contestants, setContestants] = useState<Contestant[]>(INITIAL_CONTESTANTS);
  const [teamMilestones, setTeamMilestones] = useState<TeamMilestone[]>(TEAM_MILESTONES);
  const [viewerPoll, setViewerPoll] = useState<ViewerPoll>(INITIAL_VIEWER_POLL);
  const [selectedContestant, setSelectedContestant] = useState<Contestant | null>(null);
  const [isVotingModalOpen, setIsVotingModalOpen] = useState<boolean>(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotificationToast(message);
    setTimeout(() => {
      setNotificationToast(null);
    }, 4000);
  };

  // Vote for a candidate in the public electorate poll
  const handleVoteForContestant = (contestantId: string) => {
    setContestants((prev) =>
      prev.map((c) => {
        if (c.id === contestantId) {
          const newApproval = Math.min(99, c.approvalRating + 1);
          return {
            ...c,
            politicalCapital: c.politicalCapital + 10,
            approvalRating: newApproval,
            viewerBallotCount: c.viewerBallotCount + 1,
            weeklyTrajectory: 'up',
          };
        }
        return c;
      })
    );

    // Also update current active poll candidate if included
    setViewerPoll((prev) => {
      const exists = prev.candidates.some((cand) => cand.contestantId === contestantId);
      const total = prev.totalVotesCast + 1;
      if (!exists) {
        return {
          ...prev,
          totalVotesCast: total,
        };
      }
      return {
        ...prev,
        totalVotesCast: total,
        candidates: prev.candidates.map((cand) => {
          if (cand.contestantId === contestantId) {
            const votes = cand.votes + 1;
            return {
              ...cand,
              votes,
              percent: Math.round((votes / total) * 100),
            };
          }
          return {
            ...cand,
            percent: Math.round((cand.votes / total) * 100),
          };
        }),
      };
    });

    const candidate = contestants.find((c) => c.id === contestantId);
    showToast(`Public Electorate Ballot recorded for ${candidate?.name || 'Contender'}! (+10 PCP)`);
  };

  // Award PCP after a debate or mental challenge
  const handleAwardPcp = (contestantId: string, amount: number) => {
    setContestants((prev) =>
      prev.map((c) => {
        if (c.id === contestantId) {
          return {
            ...c,
            politicalCapital: c.politicalCapital + amount,
            taskStats: {
              ...c.taskStats,
              mentalChallengesWon: c.taskStats.mentalChallengesWon + 1,
            },
          };
        }
        return c;
      })
    );
    const candidate = contestants.find((c) => c.id === contestantId);
    showToast(`${amount} Political Capital Points awarded to ${candidate?.name}!`);
  };

  // Simulate a secret nomination slip in the Chamber
  const handleSimulateNominationVote = (targetId: string, rationale: string) => {
    setContestants((prev) =>
      prev.map((c) => {
        if (c.id === targetId) {
          const newVotes = c.votesReceivedInChamber + 1;
          const isNowNominated = newVotes >= 4 ? 'Nominated' : c.status;
          return {
            ...c,
            votesReceivedInChamber: newVotes,
            status: isNowNominated as any,
          };
        }
        return c;
      })
    );
    const candidate = contestants.find((c) => c.id === targetId);
    showToast(`Secret ballot sealed against ${candidate?.name}. Chamber count updated.`);
  };

  // Deploy Clemency Veto
  const handleDeployVeto = (nomineeId: string) => {
    setContestants((prev) =>
      prev.map((c) => {
        if (c.id === nomineeId) {
          return {
            ...c,
            status: 'Active',
            weeklyTrajectory: 'up',
          };
        }
        return c;
      })
    );
    const nominee = contestants.find((c) => c.id === nomineeId);
    showToast(`Janta Ka Veto exercised! ${nominee?.name} is saved from eviction.`);
  };

  const activeContestantCount = contestants.filter((c) => c.status !== 'Eliminated').length;

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      <div>
        {/* Top Bar Navigation */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenVotingModal={() => setActiveTab('polling')}
          activeContestantCount={activeContestantCount}
        />

        {/* Global Toast Notification */}
        {notificationToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 text-xs border border-amber-300 animate-bounce">
            <Vote className="w-4 h-4 text-slate-950" />
            <span>{notificationToast}</span>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'leaderboard' && (
            <LeaderboardView
              contestants={contestants}
              teamMilestones={teamMilestones}
              onSelectContestant={(c) => setSelectedContestant(c)}
              onVoteForContestant={handleVoteForContestant}
              onNavigateToAuditions={() => setActiveTab('auditions')}
            />
          )}

          {activeTab === 'auditions' && (
            <AuditionRegistrationView 
              onRegistrationSuccess={(name) => {
                showToast(`Audition application received for ${name}! Check your SMS for City Call Letter.`);
              }}
            />
          )}

          {activeTab === 'presentation' && <ShowFlowPresentation />}

          {activeTab === 'roadmap' && (
            <SeasonRoadmapView
              onSelectMissionByCodename={(codename) => setActiveTab('missions')}
            />
          )}

          {activeTab === 'missions' && (
            <OutdoorMissionsView
              contestants={contestants}
              onAwardImmunityToContestant={(id) => {
                setContestants((prev) =>
                  prev.map((c) => (c.id === id ? { ...c, status: 'Immune', immunityTokens: c.immunityTokens + 1 } : c))
                );
                showToast(`Sengol of Immunity awarded! (सेंगोल सुरक्षा)`);
              }}
            />
          )}

          {activeTab === 'challenges' && (
            <DailyChallengeView
              contestants={contestants}
              onAwardPcp={handleAwardPcp}
            />
          )}

          {activeTab === 'nomination' && (
            <NominationRoomView
              contestants={contestants}
              onSimulateNominationVote={handleSimulateNominationVote}
              onDeployVeto={handleDeployVeto}
            />
          )}

          {activeTab === 'polling' && (
            <ViewerPollingBooth
              viewerPoll={viewerPoll}
              contestants={contestants}
              onCastViewerVote={handleVoteForContestant}
            />
          )}
        </main>
      </div>

      {/* Candidate Dossier Detail Modal */}
      <ContestantDetailModal
        contestant={selectedContestant}
        onClose={() => setSelectedContestant(null)}
        onVoteForContestant={(id) => {
          handleVoteForContestant(id);
          if (selectedContestant && selectedContestant.id === id) {
            setSelectedContestant({
              ...selectedContestant,
              approvalRating: Math.min(99, selectedContestant.approvalRating + 1),
              politicalCapital: selectedContestant.politicalCapital + 10,
              viewerBallotCount: selectedContestant.viewerBallotCount + 1,
            });
          }
        }}
      />

      {/* Production Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070A0F] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-300 tracking-wider uppercase">
              The Next Leader
            </span>
            <span aria-hidden="true">·</span>
            <span>Season 1 Production Telemetry & Series Bible</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>26 Political Contenders</span>
            <span aria-hidden="true">·</span>
            <span>70-Day Capitol House Arc</span>
            <span aria-hidden="true">·</span>
            <span>₹5 Crore ($600K) Seed Grant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
