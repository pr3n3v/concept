import React, { useState } from 'react';
import { SHOW_IMAGES } from '../data/showData';
import { generateTheNextLeaderPPT } from '../utils/generatePPT';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Flame, 
  Tv, 
  Landmark, 
  Calendar, 
  Layers, 
  ShieldCheck,
  Award,
  Vote,
  Radio,
  Clock,
  Sparkles,
  Download,
  FileSpreadsheet
} from 'lucide-react';

interface GalleryItem {
  src: string;
  title: string;
  desc?: string;
  day?: string;
  tag?: string;
}

interface Slide {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  heroImage: string;
  quote?: string;
  gallery?: GalleryItem[];
  bullets?: { label: string; desc: string }[];
  kpis?: { num: string; label: string }[];
  cycle?: { day: string; focus: string; action: string }[];
  pillars?: { name: string; subtitle: string; image: string; badge: string; points: string[] }[];
  steps?: { step: string; desc: string }[];
}

export const ShowFlowPresentation: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [presentationMode, setPresentationMode] = useState<'deck' | 'document'>('deck');
  const [isExportingPPT, setIsExportingPPT] = useState<boolean>(false);

  const handleDownloadPPT = async () => {
    try {
      setIsExportingPPT(true);
      await generateTheNextLeaderPPT();
    } catch (err) {
      console.error('Failed to export presentation', err);
    } finally {
      setIsExportingPPT(false);
    }
  };

  const slides: Slide[] = [
    {
      id: 'premise',
      tag: 'Executive Overview',
      title: 'The Next Leader',
      subtitle: '26 Aspiring Political Contenders Enter The Capitol House',
      heroImage: SHOW_IMAGES.keyArt,
      quote: 'Democracy is not merely a vote once every five years; in The Next Leader, every single sunrise is a live test of public mandate.',
      gallery: [
        {
          src: SHOW_IMAGES.parliamentDebate,
          title: 'The Senate Chamber',
          desc: '26 brass-crested member desks wired with 88 UHD broadcast cameras for Zero Hour debates.'
        },
        {
          src: SHOW_IMAGES.warRoom,
          title: 'Coalition War Rooms',
          desc: 'Five soundproof caucus suites where whips, backroom alliances, and floor deals are drafted.'
        },
        {
          src: SHOW_IMAGES.outdoorTownHall,
          title: 'Zameen Pe Jung Field Arena',
          desc: 'Real communities, grain mandis, and civic councils where outdoor immunity battles are waged.'
        }
      ],
      bullets: [
        { label: '26 Pan-India Contenders', desc: 'Rising political leaders from 18 states: Supreme Court PIL lawyers, Panchayat Sarpanches, Kisan Morcha conveners, trade unionists, and civic tech innovators.' },
        { label: 'The Capitol House Residence', desc: 'A stately neoclassical estate with a central debate arena, 26 member desks, caucus war rooms, and a soundproof Gupt Matdaan (Secret Ballot) Chamber.' },
        { label: '70 Days to National Mandate', desc: '10 weeks of daily Zero Hour debates, unannounced 3 AM crisis simulations, marathon 24-hour filibusters, and real-world outdoor field missions.' },
        { label: 'The Grand Mandate Grant', desc: '₹5 Crore ($600,000) Campaign & Public Policy Seed Grant + Prime-Time Live Coronation Keynote.' },
      ],
      kpis: [
        { num: '26', label: 'Contenders' },
        { num: '10', label: 'Weekly Episodes' },
        { num: '₹5 Cr', label: 'Campaign Seed Fund' },
        { num: '88', label: 'Broadcast Cameras' },
      ],
    },
    {
      id: 'cycle',
      tag: 'Production Rhythm',
      title: 'The 7-Day Weekly Broadcast Cycle',
      subtitle: 'A Clockwork Schedule Driving High-Voltage Primetime Television',
      heroImage: SHOW_IMAGES.warRoom,
      quote: 'Seven days, seven escalating pressure points. By Sunday night, the floor erupts into democracy live.',
      gallery: [
        {
          day: 'Somwar (Mon)',
          src: SHOW_IMAGES.warRoom,
          title: 'Gathbandhan War Rooms',
          tag: 'Strategy & Whip Counts',
          desc: 'Closed-door coalition whip counts and strategy.'
        },
        {
          day: 'Mangalwar (Tue)',
          src: SHOW_IMAGES.outdoorTownHall,
          title: 'Zameen Pe Jung (Field)',
          tag: 'Real-World Turf Challenge',
          desc: 'Real crisis zones across agricultural and municipal turf.'
        },
        {
          day: 'Budhwar (Wed)',
          src: SHOW_IMAGES.pressCrisis,
          title: '3 AM Crisis & Press Varta',
          tag: 'Media Ambush Gauntlet',
          desc: 'Unannounced 3 AM emergency scrums and live media grilling.'
        },
        {
          day: 'Ravivar (Sun)',
          src: SHOW_IMAGES.liveElimination,
          title: 'Live Elimination Gala',
          tag: 'Nationwide Floor Vote',
          desc: 'Nationwide broadcast standing vote to eliminate one contender.'
        },
      ],
      cycle: [
        { day: 'Somwar (Mon): Coalition War Rooms', focus: 'Alliance & Whip Strategy', action: 'Closed-door faction meetings; the House Speaker issues the weekly Legislative Bill and budget parameters.' },
        { day: 'Mangalwar (Tue): Zameen Pe Jung (Field Task)', focus: 'Ground Reality on Turf', action: 'Contestants are transported to real crisis zones: drought basins, mandis, or slums. Winner claims the Sengol of Immunity.' },
        { day: 'Budhwar (Wed): 3 AM Crisis & Press Varta', focus: 'Mental & Media Gauntlet', action: 'Unannounced 3 AM emergency scrums, followed by grilling by senior political editors on live camera.' },
        { day: 'Guruwar (Thu): Floor Debate & Zero Hour', focus: 'Parliamentary Combat', action: 'Calling Attention motions, No-Confidence challenges, and marathon bill markups under strict parliamentary rules.' },
        { day: 'Shukrawar (Fri): Janta Ki Adalat (Viewer Poll)', focus: 'Direct National Democracy', action: 'Pan-India mobile and SMS voting closes; the public approval rating unlocks the "Janta Ka Veto" (Executive Clemency).' },
        { day: 'Shanivar (Sat): Gupt Matdaan (Secret Chamber)', focus: 'The Solitary Ballot', action: 'Contenders enter the dark teakwood chamber alone, state rationale on camera, and drop sealed wax slips into the Brass Matdaan Peti.' },
        { day: 'Ravivar (Sun): Maha-Elimination Live Gala', focus: 'Sunday Primetime Live', action: '2.5-hour nationwide broadcast; nominees deliver final defenses, immunity is deployed, and an open floor vote eliminates one contender.' },
      ],
    },
    {
      id: 'pillars',
      tag: 'Format Architecture',
      title: 'The Three Pillars of Power',
      subtitle: 'Internal Parliamentary Strategy Meets Ground Struggle & Public Janadesh',
      heroImage: SHOW_IMAGES.parliamentDebate,
      pillars: [
        {
          name: 'I. The Senate Chamber',
          subtitle: 'Mental & Parliamentary Arena',
          image: SHOW_IMAGES.parliamentDebate,
          badge: 'House Arena',
          points: [
            'Daily debates on actual constitutional, agrarian, and economic crises',
            'Passing bills unlocks house budget food, regional cuisine, and caucus amenities',
            '24-hour standing filibusters test physical stamina and oratorical command',
            'Late-night coalition pacts, backroom betrayals, and whip maneuvers',
          ],
        },
        {
          name: 'II. Zameen Pe Jung',
          subtitle: 'Outdoor Field Missions',
          image: SHOW_IMAGES.outdoorTownHall,
          badge: 'Real-World Turf',
          points: [
            'Bused into real communities: grain mandis, drought talukas, slums, riverbanks',
            'Evaluated by actual farmers, local panchayat leaders, and small business owners',
            'Sengol of Immunity rewards: absolute protection from weekly nomination',
            '₹25 Lakh direct civic development funds donated by production to host communities',
          ],
        },
        {
          name: 'III. Janta Ka Janadesh',
          subtitle: 'Viewer Electorate Influence',
          image: SHOW_IMAGES.electorateHub,
          badge: 'Public Mandate',
          points: [
            'Weekly national approval rating tracking for all 26 contenders across the country',
            'Audience votes unlock the "Janta Ka Veto" (Executive Clemency)',
            'Viewers vote live during Sunday galas on debate agendas and privilege sanctions',
            'The ultimate Next Leader is crowned live by 100+ million national votes',
          ],
        },
      ],
    },
    {
      id: 'elimination',
      tag: 'Nomination & Eviction Protocol',
      title: 'Gupt Matdaan & Live Floor Elimination',
      subtitle: 'How Contenders Are Evicted From The Capitol House',
      heroImage: SHOW_IMAGES.nominationChamber,
      quote: 'Behind closed doors, oaths of alliance are sworn. Inside the Brass Matdaan Peti, truth is counted.',
      gallery: [
        {
          src: SHOW_IMAGES.nominationChamber,
          title: 'Gupt Matdaan Kaksh',
          desc: 'The solitary soundproof teakwood vault where wax-sealed ballots are deposited.'
        },
        {
          src: SHOW_IMAGES.liveElimination,
          title: 'Sunday Primetime Eviction Gala',
          desc: 'Contenders stand before nationwide cameras as non-nominated members cast open votes.'
        },
        {
          src: SHOW_IMAGES.pressCrisis,
          title: 'Exit Media Gauntlet',
          desc: 'Eliminated contenders immediately face unfiltered press interrogation upon departure.'
        }
      ],
      steps: [
        {
          step: '1. The Sengol Presentation',
          desc: 'Before nominations begin, the winner of Tuesday’s outdoor task raises the Sengol of Immunity. They and one chosen ally are unconditionally safe.',
        },
        {
          step: '2. The Solitary Walk',
          desc: 'Saturday midnight. Each contender walks in total silence down the stone corridor into the teakwood Gupt Matdaan Kaksh.',
        },
        {
          step: '3. Recorded Justification',
          desc: 'Facing the solitary red studio camera, the candidate names two contenders for eviction, detailing specific policy failures or moral betrayals.',
        },
        {
          step: '4. The Wax-Sealed Matdaan Peti',
          desc: 'Ballots are marked with wax seals and dropped into the solid brass urn. The House Clerk tallies the count; top 2 or 3 are placed on the Chopping Block.',
        },
        {
          step: '5. Sunday Live Floor Vote',
          desc: 'During the live Sunday telecast, non-nominated members stand and publicly announce their vote before the nation. Majority rules; the evicted candidate departs.',
        },
        {
          step: '6. Janta Ka Veto (People’s Clemency)',
          desc: 'The winner of the nationwide viewer poll can overturn one nomination live on air, forcing a sudden-death 3-minute Zero Hour floor debate.',
        },
      ],
    },
    {
      id: 'broadcast',
      tag: 'Broadcast Scale & Grand Mandate',
      title: 'The Broadcast Engine & Grand Coronation',
      subtitle: 'State-of-the-Art Multi-Camera Production Meets Real Political Stakes',
      heroImage: SHOW_IMAGES.liveElimination,
      quote: 'The ultimate winner does not leave with a plastic trophy; they depart with a ₹5 Crore campaign war chest and a verified nationwide mandate.',
      gallery: [
        {
          src: SHOW_IMAGES.electorateHub,
          title: 'Control Room & 24/7 Live Feeds',
          desc: '88 broadcast cameras and unedited live feeds streaming to millions of mobile app users.'
        },
        {
          src: SHOW_IMAGES.parliamentDebate,
          title: 'Chamber Television Lighting',
          desc: 'Broadcast-grade theatrical lighting shifting to emergency red during 3 AM crisis scrums.'
        },
        {
          src: SHOW_IMAGES.liveElimination,
          title: 'The Grand Coronation Stage',
          desc: 'Season finale watched by over 120 million viewers as the ultimate leader is crowned.'
        }
      ],
      kpis: [
        { num: '88', label: 'UHD Cameras' },
        { num: '24/7', label: 'Uncut Live Streams' },
        { num: '₹5 Cr', label: 'Grand Seed Grant' },
        { num: '100M+', label: 'Projected Ballots' },
      ],
      bullets: [
        { label: '₹5 Crore Campaign Seed Grant', desc: 'Direct, legally verified public campaign seed funding deposited into an independent political trust for the winner.' },
        { label: 'Prime-Time National Address', desc: 'An uninterrupted 15-minute televised national keynote address broadcast across major television news networks.' },
        { label: 'Civic Legacy Endowment', desc: 'Over ₹2.5 Crore deployed directly into grassroots water, agrarian, and slum infrastructure throughout the 10-week filming period.' },
        { label: 'Independent Electoral Auditing', desc: 'All digital viewer ballots and House floor counts verified in real-time by an independent certified election auditing board.' },
      ]
    }
  ];

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className="space-y-8">
      {/* Top Header & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" />
            <span>The Next Leader · Format Bible & Pitch Deck</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1 flex items-center gap-3">
            <span>The Next Leader: Show Flow & Production Blueprint</span>
          </h1>
        </div>

        {/* View Toggle & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadPPT}
            disabled={isExportingPPT}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 rounded-lg shadow-sm transition-all cursor-pointer"
            title="Download full presentation as PowerPoint (.pptx)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPPT ? 'Generating PPT...' : 'Download PPT (.pptx)'}</span>
          </button>

          <div className="flex items-center gap-1 bg-[#0F172A] border border-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setPresentationMode('deck')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                presentationMode === 'deck'
                  ? 'bg-slate-800 text-amber-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Visual Slide Deck
            </button>
            <button
              onClick={() => setPresentationMode('document')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                presentationMode === 'document'
                  ? 'bg-slate-800 text-amber-400 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Series Bible
            </button>
          </div>
        </div>
      </div>

      {presentationMode === 'deck' ? (
        /* Interactive Visual Slide Deck Mode */
        <div className="space-y-6">
          {/* Main Slide Stage */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Slide Header Ribbon */}
            <div className="px-6 py-3 bg-[#0B1120] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-amber-400 font-semibold">{currentSlide.tag}</span>
                <span aria-hidden="true">·</span>
                <span>Slide {currentSlideIndex + 1} of {slides.length}</span>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentSlideIndex === 0}
                  className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-slate-800 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-mono text-xs text-slate-400 px-1">
                  {currentSlideIndex + 1}/{slides.length}
                </span>
                <button
                  onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-slate-800 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Slide Titles */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  The Next Leader
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {currentSlide.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-medium">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* SLIDE 1: PREMISE & HIGH CONCEPT */}
              {currentSlide.id === 'premise' && (
                <div className="space-y-6">
                  {/* Hero Banner */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-[21/9] max-h-72 shadow-lg">
                    <img 
                      src={currentSlide.heroImage} 
                      alt="The Next Leader Stage" 
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
                      <p className="text-sm sm:text-base italic text-slate-200 font-medium">
                        "{currentSlide.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Visual Image Showcase (3 Photo Gallery) */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>The Next Leader Production Architecture</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {currentSlide.gallery?.map((item, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-amber-400/40 transition-colors">
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={item.src} 
                              alt={item.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                            <span className="absolute bottom-2 left-2 text-xs font-bold text-amber-300 drop-shadow">
                              {item.title}
                            </span>
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {currentSlide.kpis?.map((k, i) => (
                      <div key={i} className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg text-center">
                        <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">{k.num}</div>
                        <div className="text-xs text-slate-400 mt-1">{k.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bullets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSlide.bullets?.map((b, i) => (
                      <div key={i} className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-lg space-y-1">
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {b.label}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 2: 7-DAY CYCLE */}
              {currentSlide.id === 'cycle' && (
                <div className="space-y-6">
                  {/* Multi-Photo Rhythm Strip */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Weekly Broadcast Pressure Points
                      </span>
                      <span className="text-slate-400 font-normal">Four Staged Escalations</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {currentSlide.gallery?.map((item, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-amber-400/40 transition-colors">
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={item.src} 
                              alt={item.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-2.5">
                              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">{item.day}</span>
                              <span className="text-xs font-bold text-white leading-tight">{item.title}</span>
                            </div>
                          </div>
                          <div className="p-2 text-[11px] text-slate-300 font-medium">
                            {item.tag}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Day-by-Day List */}
                  <div className="space-y-2.5">
                    {currentSlide.cycle?.map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                      >
                        <div className="md:w-1/3">
                          <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">{item.day}</div>
                          <div className="text-sm font-semibold text-white mt-0.5">{item.focus}</div>
                        </div>
                        <div className="md:w-2/3 text-xs text-slate-300 border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-4">
                          {item.action}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 3: THREE PILLARS OF POWER */}
              {currentSlide.id === 'pillars' && (
                <div className="space-y-6">
                  {/* Three Visual Pillar Cards with Dedicated Images */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {currentSlide.pillars?.map((pillar, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-colors shadow-lg"
                      >
                        <div>
                          {/* Dedicated Pillar Image */}
                          <div className="relative aspect-video overflow-hidden">
                            <img 
                              src={pillar.image} 
                              alt={pillar.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                            <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-slate-950 bg-amber-400 px-2 py-0.5 rounded shadow">
                              {pillar.badge}
                            </span>
                            <span className="absolute bottom-2 left-2 text-sm font-bold text-white drop-shadow">
                              {pillar.name}
                            </span>
                          </div>

                          <div className="p-4 space-y-3">
                            <div className="text-xs text-amber-400 font-semibold">{pillar.subtitle}</div>
                            <div className="space-y-2 pt-2 border-t border-slate-800">
                              {pillar.points.map((pt, pidx) => (
                                <div key={pidx} className="text-xs text-slate-300 flex items-start gap-2">
                                  <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                  <span>{pt}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
                    <Flame className="w-5 h-5 text-amber-400 shrink-0" />
                    <p className="text-xs text-slate-300">
                      <strong>Tri-Cameral Friction:</strong> In <em>The Next Leader</em>, contestants cannot win through backroom scheming alone. If they alienate the Public Electorate or fail the real-world Outdoor Tasks, their house majorities will be shattered by viewer vetoes and immunity shields.
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 4: NOMINATION & ELIMINATION PROTOCOL */}
              {currentSlide.id === 'elimination' && (
                <div className="space-y-6">
                  {/* Two-Photo Split Header */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-video shadow-lg">
                      <img 
                        src={SHOW_IMAGES.nominationChamber} 
                        alt="Nomination Vault" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">Phase 1: Gupt Matdaan</span>
                        <h4 className="text-base font-bold text-white">The Subterranean Vault & Brass Ballot Urn</h4>
                      </div>
                    </div>

                    <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-video shadow-lg">
                      <img 
                        src={SHOW_IMAGES.liveElimination} 
                        alt="Sunday Live Stage" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">Phase 2: Live Eviction</span>
                        <h4 className="text-base font-bold text-white">Sunday Primetime Live Floor Vote</h4>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs italic text-slate-200 text-center">
                    "{currentSlide.quote}"
                  </div>

                  {/* 6 Steps Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentSlide.steps?.map((step, idx) => (
                      <div key={idx} className="bg-slate-900/80 border border-slate-800 p-4 rounded-lg space-y-1.5 hover:border-amber-400/30 transition-colors">
                        <div className="text-xs font-mono font-bold text-amber-400">{step.step}</div>
                        <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 5: BROADCAST SCALE & THE GRAND MANDATE */}
              {currentSlide.id === 'broadcast' && (
                <div className="space-y-6">
                  {/* Hero Photo Banner */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-[21/9] max-h-72 shadow-lg">
                    <img 
                      src={currentSlide.heroImage} 
                      alt="Coronation Arena" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
                      <p className="text-sm sm:text-base italic text-slate-200 font-medium">
                        "{currentSlide.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Dual Technology & Broadcast Photos */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentSlide.gallery?.map((item, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-amber-400/40 transition-colors">
                        <div className="relative aspect-video overflow-hidden">
                          <img 
                            src={item.src} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                          <span className="absolute bottom-2 left-2 text-xs font-bold text-amber-300 drop-shadow">
                            {item.title}
                          </span>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* KPIs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {currentSlide.kpis?.map((k, i) => (
                      <div key={i} className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg text-center">
                        <div className="text-2xl font-mono font-bold text-amber-400 tabular-nums">{k.num}</div>
                        <div className="text-xs text-slate-400 mt-1">{k.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bullets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSlide.bullets?.map((b, i) => (
                      <div key={i} className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-lg space-y-1">
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-amber-400 shrink-0" />
                          {b.label}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Slide Deck Navigation Bar */}
            <div className="p-4 bg-[#0B1120] border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`px-3 py-1 text-xs rounded-md font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      currentSlideIndex === idx
                        ? 'bg-amber-400 text-slate-950'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {idx + 1}. {s.tag}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentSlideIndex === 0}
                  className="px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 rounded transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Series Bible Document View */
        <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-10">
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Official Production Series Bible · Season 1
            </span>
            <h2 className="text-3xl font-display font-bold text-white">
              The Next Leader: Format Manual & Production Bible
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              An exhaustive production guide detailing the structural mechanics, rules of engagement, 7-day broadcast rhythm, outdoor task logistical specs across states, and viewer voting integration for Season 1.
            </p>
          </div>

          {/* Section 1: The Premise */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-400" />
              1. The Premise & Capitol House Setting
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800">
                <img src={SHOW_IMAGES.keyArt} alt="The Capitol House" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-amber-300">The Capitol House Arena</span>
                </div>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800">
                <img src={SHOW_IMAGES.parliamentDebate} alt="Chamber Floor" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-amber-300">The Senate Chamber (26 Desks)</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Twenty-six citizens who have formally committed to seeking elected public office enter the Capitol House. The residence contains a legislative Senate floor with 26 brass-crested desks, an All-Party Library, five private faction dormitories, and an isolated subterranean Nomination Chamber. Contestants are isolated from all external media, polling data, and internet access, receiving news only via simulated emergency dispatches from the House Speaker.
            </p>
          </div>

          {/* Section 2: The Three Pillars */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              2. The Three Pillars of Power
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden space-y-2">
                <div className="relative aspect-video">
                  <img src={SHOW_IMAGES.parliamentDebate} alt="Chamber" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 font-bold text-amber-400">Pillar 1: Chamber Floor</span>
                </div>
                <div className="p-3">
                  <p>Internal legislative prowess, rapid Zero Hour debate, drafting compromises, and filibuster stamina under parliamentary rules.</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden space-y-2">
                <div className="relative aspect-video">
                  <img src={SHOW_IMAGES.outdoorTownHall} alt="Field" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 font-bold text-amber-400">Pillar 2: Zameen Pe Jung</span>
                </div>
                <div className="p-3">
                  <p>Tuesday outdoor tasks in real communities: grain mandis, drought-hit talukas, slums, and river basins for the coveted Sengol of Immunity.</p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden space-y-2">
                <div className="relative aspect-video">
                  <img src={SHOW_IMAGES.electorateHub} alt="Polling Hub" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 font-bold text-amber-400">Pillar 3: The Electorate</span>
                </div>
                <div className="p-3">
                  <p>Audience participation through verified digital ballots on mobile apps. Public approval swings dictate weekly clemency vetoes and crown the winner.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: The 7-Day Cycle */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              3. The 7-Day Production Routine
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800">
                <img src={SHOW_IMAGES.warRoom} alt="War Room" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-amber-300">Coalition War Rooms (Monday)</span>
                </div>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800">
                <img src={SHOW_IMAGES.pressCrisis} alt="Press Pool" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-amber-300">3 AM Press Pool Gauntlet (Wednesday)</span>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-800/80 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <div className="p-3 flex items-start gap-4">
                <span className="font-mono text-amber-400 font-bold w-28 shrink-0">SOMWAR (MON)</span>
                <div><strong>Coalition War Rooms:</strong> Faction registration, whip counts, analysis of the week's legislative docket.</div>
              </div>
              <div className="p-3 flex items-start gap-4">
                <span className="font-mono text-amber-400 font-bold w-28 shrink-0">MANGALWAR (TUE)</span>
                <div><strong>Zameen Pe Jung (Field Task):</strong> Real-world civic crisis mission in local villages, mandis, or slums for the Sengol of Immunity.</div>
              </div>
              <div className="p-3 flex items-start gap-4">
                <span className="font-mono text-amber-400 font-bold w-28 shrink-0">BUDHWAR (WED)</span>
                <div><strong>3 AM Crisis & Press Varta:</strong> Midnight national emergency scrums, simulated leaked dossiers, and grilling by senior political editors.</div>
              </div>
              <div className="p-3 flex items-start gap-4">
                <span className="font-mono text-amber-400 font-bold w-28 shrink-0">GURUWAR (THU)</span>
                <div><strong>Floor Debate & Zero Hour:</strong> Calling Attention motions, No-Confidence challenges, and marathon consensus bill voting.</div>
              </div>
              <div className="p-3 flex items-start gap-4">
                <span className="font-mono text-amber-400 font-bold w-28 shrink-0">SHUKRAWAR (FRI)</span>
                <div><strong>Janta Ki Adalat (Poll Closes):</strong> National public approval ratings broadcast into the house; Janta Ka Veto (Executive Clemency) awarded.</div>
              </div>
              <div className="p-3 flex items-start gap-4">
                <span className="font-mono text-amber-400 font-bold w-28 shrink-0">SHANIVAR (SAT)</span>
                <div><strong>Gupt Matdaan Kaksh:</strong> Secret wax-sealed ballots cast in the private teakwood chamber; top nominees placed on the Chopping Block.</div>
              </div>
              <div className="p-3 flex items-start gap-4">
                <span className="font-mono text-amber-400 font-bold w-28 shrink-0">RAVIVAR (SUN)</span>
                <div><strong>Maha-Elimination Live Gala:</strong> 2.5-hour live floor vote before the nation; eliminated contender departs The Capitol House.</div>
              </div>
            </div>
          </div>

          {/* Section 4: Nomination & Eviction Protocol */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Vote className="w-5 h-5 text-amber-400" />
              4. The Nomination Vault & Live Eviction Protocol
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800">
                <img src={SHOW_IMAGES.nominationChamber} alt="Nomination Chamber" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-amber-300">The Secret Nomination Vault</span>
                </div>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800">
                <img src={SHOW_IMAGES.liveElimination} alt="Live Elimination" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-amber-300">Sunday Primetime Live Floor Vote</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Every Saturday midnight, contenders enter the solitary soundproof mahogany chamber. Behind sealed doors, they speak their recorded rationale to a single camera lens and drop wax-sealed slips into the solid brass urn. On Sunday evening, non-nominated members stand and publicly vote on live television to evict one contender.
            </p>
          </div>

          {/* Section 5: Civic Legacy Investment */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              5. Community Civic Legacy Program (₹25 Lakh Per Mission)
            </h3>

            <div className="relative aspect-[21/9] max-h-56 rounded-lg overflow-hidden border border-slate-800">
              <img src={SHOW_IMAGES.outdoorTownHall} alt="Civic Legacy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold text-amber-300">Over ₹2.5 Crore Deployed into Community Infrastructure</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Unlike traditional entertainment reality shows where tasks are artificial gimmicks, every outdoor mission on <em>The Next Leader</em> is paired with a direct ₹25 Lakh capital grant and permanent civic infrastructure for the host community. From community solar deep-aquifer pumps in Marathwada to smokeless ceramic kilns in Dharavi, automated APMC mandi moisture labs in Karnal, and flood rescue catamarans in Majuli, the show leaves enduring civic progress in every state it visits.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
