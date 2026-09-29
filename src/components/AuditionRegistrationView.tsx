import React, { useState } from 'react';
import { 
  UserCheck, 
  Upload, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Award, 
  Send, 
  Sparkles, 
  Video, 
  HelpCircle,
  Clock,
  Building,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { SHOW_IMAGES } from '../data/showData';

interface RegistrationFormData {
  fullName: string;
  age: string;
  gender: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  currentProfession: string;
  politicalAspiration: string;
  selectedCoalitionInterest: string;
  experienceSummary: string;
  keyCivicAgenda: string;
  videoPitchUrl: string;
  acceptTerms: boolean;
}

const AUDITION_CITIES = [
  { city: 'New Delhi', date: 'October 12 - 14, 2026', venue: 'Constitutional Club of India, Rafi Marg', slots: 'Open (Batch 1 & 2)' },
  { city: 'Mumbai', date: 'October 18 - 20, 2026', venue: 'Nehru Centre Auditorium, Worli', slots: 'Open' },
  { city: 'Lucknow', date: 'October 24 - 26, 2026', venue: 'Indira Gandhi Pratishthan, Gomti Nagar', slots: 'Filling Fast' },
  { city: 'Bengaluru', date: 'November 2 - 4, 2026', venue: 'Manpho Convention Centre, Nagavara', slots: 'Open' },
  { city: 'Kolkata', date: 'November 8 - 10, 2026', venue: 'Science City Mini Auditorium, J.B.S. Haldane Ave', slots: 'Open' },
  { city: 'Patna', date: 'November 14 - 16, 2026', venue: 'Bapu Sabhagar, Gandhi Maidan', slots: 'Open' }
];

const FAQS = [
  {
    q: 'Do I need prior party membership or political background to apply?',
    a: 'No party affiliation is required. We actively scout independent civic activists, student union leaders, grassroots sarpanches, PIL lawyers, doctors, entrepreneurs, and union conveners who possess a fierce vision for governance.'
  },
  {
    q: 'What is the age requirement for contestants?',
    a: 'Contestants must be at least 21 years of age as of October 1, 2026, and must be citizens of India with a valid Aadhaar and Voter ID card.'
  },
  {
    q: 'What happens during the City Audition Rounds?',
    a: 'Selected online applicants face a 3-stage live gauntlet: (1) 2-Minute Spontaneous Zero Hour Speech, (2) Cross-Examination by senior political journalists, and (3) Psychological & background verification interview.'
  },
  {
    q: 'Is there an entry fee to apply?',
    a: 'No. Registration and auditioning for The Next Leader are 100% free. Production provides travel and lodging allowances for contestants selected for the final 26 Capitol House cohort.'
  },
  {
    q: 'What does the winner receive?',
    a: 'The winner receives a ₹5 Crore ($600,000) Campaign & Public Policy Seed Grant deposited into an independent political trust, plus an uninterrupted 15-minute televised primetime address across national networks.'
  }
];

export const AuditionRegistrationView: React.FC<{ onRegistrationSuccess?: (name: string) => void }> = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    age: '',
    gender: '',
    state: '',
    city: '',
    phone: '',
    email: '',
    currentProfession: '',
    politicalAspiration: '',
    selectedCoalitionInterest: '',
    experienceSummary: '',
    keyCivicAgenda: '',
    videoPitchUrl: '',
    acceptTerms: false
  });

  const [submittedCandidate, setSubmittedCandidate] = useState<RegistrationFormData | null>(null);
  const [applicationId, setApplicationId] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert('Please accept the eligibility criteria and declaration to proceed.');
      return;
    }
    const genId = 'TNL-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(genId);
    setSubmittedCandidate({ ...formData });
    if (onRegistrationSuccess) {
      onRegistrationSuccess(formData.fullName);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0B1120]">
        <div className="absolute inset-0">
          <img 
            src={SHOW_IMAGES.parliamentDebate} 
            alt="The Next Leader Stage" 
            className="w-full h-full object-cover opacity-25"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/90 to-transparent" />
        </div>

        <div className="relative p-6 sm:p-10 lg:p-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>National Auditions Now Open · Season 1</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Do You Have What It Takes To Lead 1.4 Billion People?
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            <em>The Next Leader</em> is hunting for 26 audacious, articulate, and relentless citizens to enter <strong>The Capitol House</strong> for 70 days. Face daily Zero Hour clashes, 3 AM unannounced crises, and real-world rural townhall battles for the ₹5 Crore Grand Mandate.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#registration-form" 
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Register Your Profile</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#audition-schedule" 
              className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white font-medium text-xs tracking-wider rounded-lg transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Audition Cities & Dates</span>
            </a>
          </div>
        </div>
      </div>

      {/* Submission Success Screen */}
      {submittedCandidate && (
        <div className="bg-emerald-950/40 border border-emerald-500/50 p-8 rounded-2xl space-y-6 shadow-xl animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-white">Application Successfully Submitted!</h2>
              <p className="text-sm text-emerald-300">
                Welcome to the selection pipeline, <span className="font-semibold text-white">{submittedCandidate.fullName}</span>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/80 p-5 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Application Tracking ID</span>
              <div className="text-base font-mono font-bold text-amber-400 mt-0.5">{applicationId}</div>
            </div>
            <div>
              <span className="text-slate-400">Aspirational Office</span>
              <div className="text-sm font-semibold text-white mt-0.5">{submittedCandidate.politicalAspiration}</div>
            </div>
            <div>
              <span className="text-slate-400">Home Region</span>
              <div className="text-sm font-semibold text-white mt-0.5">{submittedCandidate.city}, {submittedCandidate.state}</div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 bg-slate-900/40 p-4 rounded-lg border border-slate-800/60">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-amber-400" /> Next Selection Steps:
            </h4>
            <p>1. Our political research and casting jury will review your profile summary and video pitch.</p>
            <p>2. If shortlisted, you will receive an official Audition Call Letter via SMS & Email with your assigned City Audition time-slot.</p>
            <p>3. Keep your valid ID proof (Aadhaar/Voter Card) and a copy of your application confirmation ready.</p>
          </div>

          <button
            onClick={() => setSubmittedCandidate(null)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold rounded-lg border border-slate-700 cursor-pointer"
          >
            Submit Another Application
          </button>
        </div>
      )}

      {/* 4-Step Audition Process Roadmap */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Road To The Capitol House
          </div>
          <h2 className="text-2xl font-bold font-display text-white">
            The 4-Stage Audition & Screening Process
          </h2>
          <p className="text-xs text-slate-400">
            Rigorous, transparent, and non-partisan scouting across every Indian state.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-xl space-y-2 relative">
            <span className="text-2xl font-display font-black text-amber-400/30 absolute top-3 right-4">01</span>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase">Phase 1</div>
            <h3 className="text-sm font-bold text-white">Online Digital Dossier</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Register your civic track record, key constitutional agenda, and upload a 60-second video pitch answering: <em>"Why do you deserve the nation’s mandate?"</em>
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-xl space-y-2 relative">
            <span className="text-2xl font-display font-black text-amber-400/30 absolute top-3 right-4">02</span>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase">Phase 2</div>
            <h3 className="text-sm font-bold text-white">City Audition Gauntlet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Face a 2-minute spontaneous Zero Hour podium speech and an unscripted grilling by veteran political correspondents in 6 major metropolitan hubs.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-xl space-y-2 relative">
            <span className="text-2xl font-display font-black text-amber-400/30 absolute top-3 right-4">03</span>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase">Phase 3</div>
            <h3 className="text-sm font-bold text-white">Bootcamp & Psychological Test</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Top 100 qualifiers undergo intense 48-hour pressure trials, parliamentary procedure mockups, and independent legal/ethical vetting.
            </p>
          </div>

          <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-xl space-y-2 relative">
            <span className="text-2xl font-display font-black text-amber-400/30 absolute top-3 right-4">04</span>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase">Phase 4</div>
            <h3 className="text-sm font-bold text-white">The 26 Cohort Sworn In</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              26 final contenders from across India enter The Capitol House live on national television to begin their 70-day battle for the mandate.
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Registration Form & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Registration Form Column (7 Cols) */}
        <div id="registration-form" className="lg:col-span-7 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-1 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <UserCheck className="w-4 h-4" />
              <span>Contestant Profile Registration</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white">
              Apply For Season 1 Auditions
            </h2>
            <p className="text-xs text-slate-400">
              Fill in your details accurately. All submissions are strictly confidential.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Full Legal Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Adv. Priya Sen / Rajesh Deshmukh"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Age <span className="text-amber-400">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="21"
                  max="75"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="21+"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Gender & Profession */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Gender Identification <span className="text-amber-400">*</span>
                </label>
                <select
                  required
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-Binary / Third Gender">Non-Binary / Third Gender</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Current Profession / Background <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.currentProfession}
                  onChange={(e) => setFormData({ ...formData, currentProfession: e.target.value })}
                  placeholder="e.g. Constitutional Lawyer, Sarpanch, Doctor, Student Leader"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  City / District <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Jalna, Varanasi, Bengaluru, Guwahati"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  State / Union Territory <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Maharashtra, Uttar Pradesh, Assam, Bihar"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Mobile Number (WhatsApp Enabled) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@domain.com"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Political Aspiration & Coalition Interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Aspirational Public Office <span className="text-amber-400">*</span>
                </label>
                <select
                  required
                  value={formData.politicalAspiration}
                  onChange={(e) => setFormData({ ...formData, politicalAspiration: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select Office</option>
                  <option value="Lok Sabha Member of Parliament (MP)">Lok Sabha Member of Parliament (MP)</option>
                  <option value="Rajya Sabha Parliamentarian">Rajya Sabha Parliamentarian</option>
                  <option value="State Chief Minister / MLA">State Chief Minister / MLA</option>
                  <option value="Municipal Corporation Mayor">Municipal Corporation Mayor</option>
                  <option value="Zila Parishad / Panchayat Chairperson">Zila Parishad / Panchayat Chairperson</option>
                  <option value="National Grassroots Movement Leader">National Grassroots Movement Leader</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Preferred Coalition Alignment <span className="text-amber-400">*</span>
                </label>
                <select
                  required
                  value={formData.selectedCoalitionInterest}
                  onChange={(e) => setFormData({ ...formData, selectedCoalitionInterest: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">Select Primary Ideology</option>
                  <option value="Rashtriya Vikas Morcha (Economic Reform & Tech)">Rashtriya Vikas Morcha (Economic Reform & Tech)</option>
                  <option value="Kisan & Shramik Gathbandhan (Agrarian & Labor)">Kisan & Shramik Gathbandhan (Agrarian & Labor)</option>
                  <option value="Samvidhaan Suraksha Manch (Constitutional Rights)">Samvidhaan Suraksha Manch (Constitutional Rights)</option>
                  <option value="Yuva Swaraj Dal (Youth & Anti-Dynasty)">Yuva Swaraj Dal (Youth & Anti-Dynasty)</option>
                  <option value="Nirpeksh Krantikari (Grassroots Maverick)">Nirpeksh Krantikari (Grassroots Maverick)</option>
                </select>
              </div>
            </div>

            {/* Experience Summary */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Summary of Civic / Leadership Experience (150 - 250 words) <span className="text-amber-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={formData.experienceSummary}
                onChange={(e) => setFormData({ ...formData, experienceSummary: e.target.value })}
                placeholder="Mention past grassroots organizing, policy campaigns, community service, strikes led, or court petitions filed..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            {/* Key Civic Agenda */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Your #1 Flagship Policy If You Win The ₹5 Crore Grant <span className="text-amber-400">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.keyCivicAgenda}
                onChange={(e) => setFormData({ ...formData, keyCivicAgenda: e.target.value })}
                placeholder="e.g. Decentralized solar water grids in arid districts, digital APMC pricing transparency, or police accountability boards..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            {/* Video Pitch Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>60-Second Audition Video Link (YouTube / Google Drive / Dropbox)</span>
                <span className="text-[10px] text-amber-400">Highly Recommended</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.videoPitchUrl}
                  onChange={(e) => setFormData({ ...formData, videoPitchUrl: e.target.value })}
                  placeholder="https://youtu.be/... or https://drive.google.com/..."
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <Video className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
              <p className="text-[10px] text-slate-500">
                Video tip: State your name, where you come from, and deliver your sharpest 45-second message to the Indian electorate.
              </p>
            </div>

            {/* Terms & Declarations */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-0.5 rounded text-amber-400 bg-slate-900 border-slate-700 focus:ring-0 focus:ring-offset-0"
                />
                <span>
                  I declare that I am an Indian citizen aged 21+, free of criminal convictions of moral turpitude, and willing to isolate inside The Capitol House for 70 days if selected.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Contestant Profile for Audition</span>
              </button>
            </div>
          </form>
        </div>

        {/* Schedule & Guidelines Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Audition Tour Schedule */}
          <div id="audition-schedule" className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>6-City Audition Tour</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                Oct - Nov 2026
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Walk-in registrations are strictly limited. Register online above to receive a prioritized entry badge.
            </p>

            <div className="space-y-3">
              {AUDITION_CITIES.map((c, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{c.city}</span>
                    <span className="text-[10px] font-semibold text-amber-400">{c.date}</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{c.venue}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Status: {c.slots}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility & Vetting Rules */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Eligibility & Verification Checklist
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Valid Government Identity: Aadhaar Card + Indian Voter ID.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Minimum age 21 years (eligible to contest municipal/panchayat polls).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Full physical and mental fitness to withstand 70 days of media confinement.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Complete absence of pending active non-bailable criminal warrants.</span>
              </li>
            </ul>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-3 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              Frequently Asked Audition Questions
            </h3>
            <div className="space-y-2">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-3 text-xs font-semibold text-slate-200 flex items-center justify-between gap-2 hover:text-amber-400 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-amber-400 font-mono text-sm">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="p-3 pt-0 text-xs text-slate-400 border-t border-slate-800/80 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
