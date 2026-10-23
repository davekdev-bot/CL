import React, { useState } from 'react';
import { UserProfile, ViralContestConfig, ContestSubmission } from '../types';
import {
  Flame,
  Award,
  Trophy,
  Copy,
  Check,
  Share2,
  Users,
  Sparkles,
  Sliders,
  Calendar,
  Gift
} from 'lucide-react';

interface ViralContestTabProps {
  profile: UserProfile;
}

const DEFAULT_SUBMISSIONS: ContestSubmission[] = [
  {
    id: 'sub_1',
    handle: '@producer_tim',
    avatar: 'PT',
    postLink: 'https://tiktok.com/@producer_tim/video/849201',
    views: 184500,
    likes: 22400,
    shares: 4100,
    status: 'Finalist',
    audioSnippetName: 'Midnight Mirage Drum Flip'
  },
  {
    id: 'sub_2',
    handle: '@elena_drops',
    avatar: 'ED',
    postLink: 'https://tiktok.com/@elena_drops/video/392011',
    views: 94200,
    likes: 11800,
    shares: 1950,
    status: 'Finalist',
    audioSnippetName: 'Midnight Mirage Vocal Re-Chop'
  },
  {
    id: 'sub_3',
    handle: '@beatmaker_karl',
    avatar: 'BK',
    postLink: 'https://tiktok.com/@beatmaker_karl/video/190422',
    views: 31200,
    likes: 4200,
    shares: 480,
    status: 'In Review',
    audioSnippetName: 'Acoustic Guitar Remix'
  }
];

export const ViralContestTab: React.FC<ViralContestTabProps> = ({ profile }) => {
  const [contest, setContest] = useState<ViralContestConfig>({
    title: 'THE 15-SECOND REMIX DUETT CHALLENGE',
    campaignHashtag: '#MidnightMirageRemix',
    soundTitle: 'Midnight Mirage (Official Audio)',
    coreHookChallenge:
      'Lade die kostenlosen Stems herunter, baue deinen eigenen Drop über meinen Lead-Sound und duettiere mein Video!',
    durationDays: 14,
    rules: [
      '1. Duettiere das Original-Video oder nutze den offiziellen Sound auf TikTok / Instagram.',
      '2. Verwende zwingend den Hashtag #MidnightMirageRemix in deiner Caption.',
      '3. Tagge @alex_creates in deinem Beitrag, damit wir die Einreichung tracken können.',
      '4. Deadline: Sonntag in 2 Wochen um 23:59 Uhr.'
    ],
    prizes: [
      {
        place: '1. Platz',
        reward: 'Offizieller Co-Release auf Spotify via DistroKid + 500 € Studio Gear Gutschein',
        valueEst: '850 €'
      },
      {
        place: '2. Platz',
        reward: 'Volles Sample Pack Bundle VIP + 1-on-1 Feedback Call (45 Min)',
        valueEst: '250 €'
      },
      {
        place: '3. Platz',
        reward: 'Community Feature auf Instagram & Discord VIP Producer Rolle',
        valueEst: '100 €'
      }
    ],
    announcementScript: `🚨 DIE GROSSE #MidnightMirageRemix CHALLENGE IST LIVE! 🚨

Ich gebe euch die originalen Stems meines neuen Tracks völlig kostenlos! 

🎁 WAS GIBT ES ZU GEWINNEN?
🥇 1. Platz: Ein offizieller Co-Release auf Spotify & 500€ Studio-Gutschein!
🥈 2. Platz: Mein komplettes Sample Pack Archive + Feedback-Call.

SO BIST DU DABEI:
1️⃣ Schnapp dir die Stems über den Link in meiner Bio.
2️⃣ Mach ein Video mit deinem Drop und duettiere diesen Clip!
3️⃣ Nutze #MidnightMirageRemix in der Caption.

Ich reagiere auf jedes einzelne Video. Let’s go! 🔥`
  });

  const [submissions, setSubmissions] = useState<ContestSubmission[]>(DEFAULT_SUBMISSIONS);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Contest Banner */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              Fan Engagement & Duett-Wettbewerb
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">{contest.title}</h2>
          <p className="text-xs text-neutral-300 mt-1 max-w-xl">
            Aktive Kampagne: <strong className="text-brand-coral">{contest.campaignHashtag}</strong> &bull; Laufzeit: {contest.durationDays} Tage
          </p>
        </div>

        <button
          onClick={() => handleCopyText(contest.announcementScript, 'script')}
          className="px-4 py-2.5 rounded-lg bg-brand-coral hover:bg-brand-coralHover text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          {copiedType === 'script' ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              Ankündigung kopiert!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Ankündigungs-Text kopieren
            </>
          )}
        </button>
      </div>

      {/* Prize Tiers & Rules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Prize Tiers */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Gift className="w-4 h-4 text-brand-coral" />
              Gewinnstufen & Preise
            </h3>

            <div className="space-y-3">
              {contest.prizes.map((prize, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/60 flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block mb-0.5">
                      {prize.place}
                    </span>
                    <p className="text-xs text-neutral-600">{prize.reward}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    Wert: ~{prize.valueEst}
                  </span>
                </div>
              ))}
            </div>

            {/* Rules Container */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Offizielle Teilnahme-Regeln
              </h4>
              <ul className="space-y-1.5 text-xs text-neutral-600">
                {contest.rules.map((rule, i) => (
                  <li key={i} className="p-2 bg-neutral-50 rounded border border-neutral-100">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Leaderboard & Top Submissions */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-coral" />
                Live Submission Leaderboard ({submissions.length} Einreichungen)
              </h3>
              <span className="text-xs text-neutral-400">Sortiert nach Views</span>
            </div>

            <div className="space-y-2.5">
              {submissions.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="p-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-sm text-neutral-400 w-4">#{idx + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                      {sub.avatar}
                    </div>
                    <div>
                      <span className="font-bold text-neutral-900 block">{sub.handle}</span>
                      <span className="text-[11px] text-neutral-500">{sub.audioSnippetName}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-neutral-900 font-mono block">
                      {sub.views.toLocaleString()} Views
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
