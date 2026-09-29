export type ContestantStatus = 'Active' | 'Nominated' | 'Immune' | 'Eliminated';

export type Caucus = 
  | 'Rashtriya Vikas Morcha'
  | 'Kisan & Shramik Gathbandhan'
  | 'Samvidhaan Suraksha Manch'
  | 'Yuva Swaraj Dal'
  | 'Nirpeksh Krantikari';

export interface Contestant {
  id: string;
  name: string;
  age: number;
  hometown: string;
  state: string;
  priorOccupation: string;
  politicalAspiration: string; // e.g. "Lok Sabha MP", "Chief Minister", "Union Minister", "Mayor of Mega-City"
  ideologicalLane: string;
  caucus: Caucus;
  politicalCapital: number; // PCP (Political Capital Points / Rajneeti Score)
  approvalRating: number; // 0 - 100% from Janta voting
  status: ContestantStatus;
  immunityTokens: number;
  avatarSeed: string;
  keyQuote: string;
  bio: string;
  signatureStance: string;
  strengths: string[];
  vulnerabilities: string[];
  taskStats: {
    mentalChallengesWon: number;
    outdoorMissionsCompleted: number;
    billsPassed: number;
    filibustersSurvived: number;
  };
  weeklyTrajectory: 'up' | 'down' | 'steady';
  votesReceivedInChamber: number;
  viewerBallotCount: number;
}

export interface OutdoorMission {
  id: string;
  week: number;
  title: string;
  codename: string;
  locationName: string;
  locationAreaType: 'Agrarian Mandi Hub' | 'Drought Basin & Rural Taluka' | 'Dense Urban Slum Cluster' | 'Industrial Port & SEZ' | 'Himalayan Border Corridor' | 'Tech IT Corridor';
  civicObjective: string;
  communityStakeholders: string;
  tvDramaHook: string;
  logisticalSetup: string;
  phases: {
    phaseNumber: number;
    title: string;
    action: string;
    timeLimit: string;
    criticalSkill: string;
  }[];
  immunityReward: string;
  rewardPerks: string[];
  communityLegacy: string;
  activeStatus: 'Upcoming' | 'In Progress' | 'Completed';
  winningLeaderOrCaucus?: string;
  bannerImage?: string;
}

export interface EpisodeRoadmapItem {
  episodeNumber: number;
  weekNumber: number;
  title: string;
  theme: string;
  runtime: string;
  logline: string;
  majorPlotlines: {
    aStory: string; // High-stakes political clash
    bStory: string; // Personal betrayal / social house dynamic
  };
  dailyRhythm: {
    day: string;
    event: string;
    stakes: string;
  }[];
  outdoorMissionCodename: string;
  immunityWinner: string;
  nominees: string[];
  eliminatedContestant: string;
  viewerImpactEvent: string;
}

export interface MentalSocialChallenge {
  id: string;
  title: string;
  category: 'Debate & Oratory' | 'Crisis Room' | 'Legislation Drafting' | 'Bipartisan Coalition' | 'Press Cross-Examination' | 'Secret Negotiation';
  durationMinutes: number;
  overview: string;
  mechanics: string[];
  winningMetric: string;
  penaltyForFailure: string;
  pcpAward: number;
  stressFactor: 'Moderate' | 'High' | 'Extreme';
}

export interface ViewerPoll {
  id: string;
  title: string;
  description: string;
  closesInHours: number;
  totalVotesCast: number;
  powerGranted: string;
  candidates: {
    contestantId: string;
    contestantName: string;
    votes: number;
    percent: number;
  }[];
}

export interface TeamMilestone {
  id: string;
  title: string;
  caucus: Caucus | 'All House';
  progress: number; // 0 - 100
  targetMetric: string;
  unlockedPerk: string;
  status: 'In Progress' | 'Achieved' | 'Stalled';
}
