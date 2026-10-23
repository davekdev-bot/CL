import React, { useState } from 'react';
import { UserProfile, CompetitorProfile, PostingTimeHeatCell } from '../types';
import {
  Users,
  Search,
  Flame,
  Clock,
  AlertOctagon,
  Copy,
  Check,
  TrendingUp,
  Sliders,
  Plus,
  Radio,
  Sparkles,
  Zap,
  ExternalLink
} from 'lucide-react';

interface CompetitorHeatmapTabProps {
  profile: UserProfile;
}

const DEFAULT_COMPETITORS: CompetitorProfile[] = [
  {
    id: 'comp_1',
    handle: '@alex_soundlabs',
    platform: 'TikTok',
    niche: 'Music Production',
    followers: '280K',
    avgViews: '420K',
    viralScore: 94,
    topHookPattern: 'Curiosity Split: "Suno vs Ableton Drop Challenge"',
    peakHour: '18:00 - 20:30 Uhr',
    postingFrequency: '2x täglich',
    fatigueRisk: 'Gering',
    winningFormats: ['ASMR Kitchen Sample Beat', 'Festival Crowd Drop POV', 'Fast Tutorial 12s']
  },
  {
    id: 'comp_2',
    handle: '@producer_sam',
    platform: 'TikTok',
    niche: 'Beatmaking',
    followers: '115K',
    avgViews: '65K',
    viralScore: 68,
    topHookPattern: 'Negative Hook: "Hör auf diese Plugins zu nutzen"',
    peakHour: '12:30 & 19:00 Uhr',
    postingFrequency: '1x täglich',
    fatigueRisk: 'Mittel',
    winningFormats: ['Plugin Tier List', '808 Bass Slide Trick']
  },
  {
    id: 'comp_3',
    handle: '@tech_audio_daily',
    platform: 'Instagram',
    niche: 'AI Audio Tools',
    followers: '450K',
    avgViews: '180K',
    viralScore: 82,
    topHookPattern: 'Secret Tool: "3 Webseiten die sich illegal anfühlen"',
    peakHour: '21:00 Uhr',
    postingFrequency: '3x wöchentlich',
    fatigueRisk: 'Kritisch (Spam)',
    winningFormats: ['Karussell Cheat-Sheets', 'Faceless AI B-Roll']
  }
];

const DAYS: PostingTimeHeatCell['day'][] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const HOURS = [8, 10, 12, 14, 16, 18, 19, 20, 21, 22];

const HEATMAP_MATRIX: Record<string, Record<number, number>> = {
  Mo: { 8: 30, 10: 45, 12: 65, 14: 40, 16: 60, 18: 85, 19: 90, 20: 80, 21: 70, 22: 40 },
  Di: { 8: 25, 10: 40, 12: 70, 14: 45, 16: 65, 18: 90, 19: 95, 20: 85, 21: 75, 22: 45 },
  Mi: { 8: 35, 10: 50, 12: 75, 14: 50, 16: 70, 18: 92, 19: 98, 20: 88, 21: 80, 22: 50 },
  Do: { 8: 30, 10: 45, 12: 70, 14: 55, 16: 75, 18: 95, 19: 100, 20: 90, 21: 82, 22: 55 },
  Fr: { 8: 20, 10: 35, 12: 65, 14: 60, 16: 80, 18: 98, 19: 100, 20: 95, 21: 90, 22: 75 },
  Sa: { 8: 15, 10: 50, 12: 80, 14: 75, 16: 70, 18: 85, 19: 92, 20: 90, 21: 85, 22: 60 },
  So: { 8: 20, 10: 60, 12: 85, 14: 80, 16: 85, 18: 95, 19: 98, 20: 92, 21: 80, 22: 50 }
};

export const CompetitorHeatmapTab: React.FC<CompetitorHeatmapTabProps> = ({ profile }) => {
  const [competitors, setCompetitors] = useState<CompetitorProfile[]>(DEFAULT_COMPETITORS);
  const [newHandle, setNewHandle] = useState('');
  const [selectedCompId, setSelectedCompId] = useState<string>(competitors[0].id);
  const [copiedPattern, setCopiedPattern] = useState<string | null>(null);

  const activeComp = competitors.find((c) => c.id === selectedCompId) || competitors[0];

  const handleAddCompetitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandle.trim()) return;

    const newComp: CompetitorProfile = {
      id: 'comp_' + Date.now(),
      handle: newHandle.startsWith('@') ? newHandle : `@${newHandle}`,
      platform: 'TikTok',
      niche: profile.niche,
      followers: '85K',
      avgViews: '120K',
      viralScore: 78,
      topHookPattern: 'Curiosity Shock: "Das Geheimnis hinter dem Sound"',
      peakHour: '18:30 - 20:00 Uhr',
      postingFrequency: '1x täglich',
      fatigueRisk: 'Gering',
      winningFormats: ['Breakdown Clip', 'Sound Teaser']
    };

    setCompetitors([...competitors, newComp]);
    setSelectedCompId(newComp.id);
    setNewHandle('');
  };

  const handleCopyPattern = (pattern: string, id: string) => {
    navigator.clipboard.writeText(pattern);
    setCopiedPattern(id);
    setTimeout(() => setCopiedPattern(null), 2000);
  };

  const getHeatmapColor = (intensity: number) => {
    if (intensity >= 95) return 'bg-rose-500 text-white font-bold';
    if (intensity >= 80) return 'bg-rose-300 text-neutral-900 font-semibold';
    if (intensity >= 60) return 'bg-amber-200 text-neutral-900';
    if (intensity >= 40) return 'bg-neutral-100 text-neutral-600';
    return 'bg-neutral-50 text-neutral-400';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Competitor Radar & Posting-Zeiten Heatmap
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Analysiere erfolgreiche Accounts deiner Nische: Top-Performer Hook-Muster, virale Uhrzeiten und Warnung vor Duplicate-Content Ermüdung.
            </p>
          </div>

          <form onSubmit={handleAddCompetitor} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="@competitor eingeben..."
              value={newHandle}
              onChange={(e) => setNewHandle(e.target.value)}
              className="text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50 outline-none focus:ring-2 focus:ring-brand-coral"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-neutral-900 text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition cursor-pointer shrink-0"
            >
              + Profil tracken
            </button>
          </form>
        </div>

        {/* Competitor Profile Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-neutral-100">
          {competitors.map((c) => {
            const isSelected = selectedCompId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCompId(c.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                  isSelected
                    ? 'border-brand-coral bg-rose-50 text-brand-coral shadow-xs font-bold'
                    : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <span>{c.handle}</span>
                <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-neutral-800">
                  {c.followers}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Active Competitor Analysis & Posting Time Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Competitor Detail Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  Analysierter Account
                </span>
                <h3 className="text-base font-bold text-neutral-900">{activeComp.handle}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 block font-mono">Viral-Score</span>
                <span className="text-xl font-black text-brand-coral font-mono">
                  {activeComp.viralScore}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Durchschnittl. Views</span>
                <span className="font-bold text-neutral-900 font-mono text-sm">{activeComp.avgViews}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Peak-Postingzeit</span>
                <span className="font-bold text-emerald-700 font-mono text-sm">{activeComp.peakHour}</span>
              </div>
            </div>

            {/* Top Hook Pattern with copy button */}
            <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200 text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-brand-coral">
                <span>Stärkste Hook-Formel</span>
                <button
                  onClick={() => handleCopyPattern(activeComp.topHookPattern, activeComp.id)}
                  className="inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  {copiedPattern === activeComp.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" /> Kopiert
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Formel kopieren
                    </>
                  )}
                </button>
              </div>
              <p className="font-semibold text-neutral-900 leading-snug">
                "{activeComp.topHookPattern}"
              </p>
            </div>

            {/* Winning Formats */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-neutral-700 block text-[11px] uppercase">
                Gewinner-Formate (Wiederholbar):
              </span>
              <ul className="space-y-1 text-neutral-600">
                {activeComp.winningFormats.map((fmt, i) => (
                  <li key={i} className="p-2 bg-neutral-50 rounded border border-neutral-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
                    <span>{fmt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fatigue Risk / Anti-Duplicate Warning */}
            <div className={`p-3 rounded-lg border text-xs flex items-start gap-2 ${
              activeComp.fatigueRisk === 'Gering'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block">Content-Ermüdungsrisiko: {activeComp.fatigueRisk}</strong>
                <p className="text-[11px] mt-0.5 leading-snug">
                  {activeComp.fatigueRisk === 'Gering'
                    ? 'Hohe visuelle Variation bei jedem Post. Geringe Gefahr von Algorithmus-Drosselung.'
                    : 'Achtung: Dieser Creator wiederholt dieselbe Hook-Struktur zu oft. TikTok 2026 filtert Wiederholungen rigoros.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 2026 Posting-Zeiten Heatmap */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-coral" />
                  TikTok Ausspielungs-Heatmap (DACH / Europa)
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Höchste Aktivität = Höchste Wahrscheinlichkeit, dass User deinen Clip in der ersten Test-Welle komplett schauen.
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="w-2.5 h-2.5 rounded bg-neutral-100" /> Ruhig
                <span className="w-2.5 h-2.5 rounded bg-amber-200" /> Gut
                <span className="w-2.5 h-2.5 rounded bg-rose-500" /> Peak
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-2">
              <table className="w-full text-center text-[10px] font-mono border-collapse">
                <thead>
                  <tr>
                    <th className="p-1 text-neutral-400 font-normal">Tag</th>
                    {HOURS.map((h) => (
                      <th key={h} className="p-1 text-neutral-500 font-semibold">
                        {h}:00
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map((day) => (
                    <tr key={day}>
                      <td className="p-1 font-bold text-neutral-700 text-left">{day}</td>
                      {HOURS.map((hour) => {
                        const intensity = HEATMAP_MATRIX[day]?.[hour] || 30;
                        return (
                          <td key={hour} className="p-0.5">
                            <div
                              className={`p-1.5 rounded text-[10px] transition cursor-pointer hover:ring-1 hover:ring-neutral-900 ${getHeatmapColor(
                                intensity
                              )}`}
                              title={`${day} um ${hour}:00 Uhr – Aktivitätslevel: ${intensity}%`}
                            >
                              {intensity}%
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Actionable takeaway box */}
            <div className="p-3 bg-neutral-900 text-white rounded-xl text-xs space-y-1">
              <span className="font-bold text-amber-300 block">
                🔥 Goldene Veröffentlichungs-Regel:
              </span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                Lade deinen Clip <strong>30 bis 45 Minuten vor dem Peak</strong> hoch (optimal: 17:30 bis 18:15 Uhr an Donnerstagen und Freitagen). So sammelt TikTok die ersten 200 Test-Impressions rechtzeitig vor der Haupt-Watchtime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
