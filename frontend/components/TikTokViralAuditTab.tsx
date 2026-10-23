import React, { useState } from 'react';
import { UserProfile, TikTokViralAuditDraft, TikTokViralAuditScore } from '../types';
import { TIKTOK_2026_ALGORITHM_RULES, NICHES_DATA } from '../constants';
import { generateAiContent } from '../services/geminiService';
import {
  Flame,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MessageSquare,
  Eye,
  Sliders,
  Copy,
  Check,
  RefreshCw,
  HelpCircle,
  Zap
} from 'lucide-react';

interface TikTokViralAuditTabProps {
  profile: UserProfile;
}

export const TikTokViralAuditTab: React.FC<TikTokViralAuditTabProps> = ({ profile }) => {
  const currentNiche = NICHES_DATA.find((n) => n.id === profile.niche) || NICHES_DATA[0];

  const [draft, setDraft] = useState<TikTokViralAuditDraft>({
    hookText: 'Warum 90% der Leute beim Musik-Produzieren scheitern (und der 1 Trick)',
    visualHookDescription: 'Hand schlägt auf Tisch, schneller Zoom in Kamera, rotes X durchgestrichen',
    coreTopic: 'Suno vs Ableton Remixing',
    topicInterestSize: 'Broad Mass Interest',
    plannedDurationSeconds: 24,
    callToActionQuestion: 'Findest du Version A oder Version B druckvoller? Schreib 1 oder 2!',
    isTrendBased: true,
    trendAgeHours: 28, // within the critical 72h window
    pacingType: 'Rapid Cut (< 1.5s)'
  });

  const [copiedFix, setCopiedFix] = useState(false);
  const [isAuditingAi, setIsAuditingAi] = useState(false);

  // Evaluate Draft according to the 2026 5 Algorithm Rules
  const calculateAuditScore = (data: TikTokViralAuditDraft): TikTokViralAuditScore => {
    // 1. Audience Interest Size (Max 25): (Rule 1: New Creator Reset)
    let audienceScore = 15;
    if (data.topicInterestSize === 'Broad Mass Interest') audienceScore = 25;
    else if (data.topicInterestSize === 'Mid-Tier Category') audienceScore = 19;
    else audienceScore = 12;

    // 2. Completion Probability (Max 30): Target <30s and rapid pacing
    let completionScore = 20;
    if (data.plannedDurationSeconds <= 18) completionScore += 8;
    else if (data.plannedDurationSeconds <= 30) completionScore += 5;
    else completionScore -= 6;

    if (data.pacingType === 'Rapid Cut (< 1.5s)') completionScore += 2;
    else if (data.pacingType === 'Slow Monologue') completionScore -= 8;
    completionScore = Math.max(5, Math.min(30, completionScore));

    // 3. Comment Depth (Max 25): (Rule 2: Quality > Quantity)
    let commentScore = 14;
    const hasDiscussionQuestion = data.callToActionQuestion.includes('?') || data.callToActionQuestion.includes('oder');
    if (hasDiscussionQuestion) commentScore += 8;
    if (data.callToActionQuestion.length > 20) commentScore += 3;
    commentScore = Math.min(25, commentScore);

    // 4. Trend Velocity (Max 20): (Rule 3: 72h Obsolescence window)
    let trendScore = 15;
    if (data.isTrendBased) {
      if (data.trendAgeHours <= 36) trendScore = 20; // Peak breakout window
      else if (data.trendAgeHours <= 72) trendScore = 14; // Maturing
      else trendScore = 6; // Obsolete / Saturated
    } else {
      trendScore = 16; // Evergreen original
    }

    const total = audienceScore + completionScore + commentScore + trendScore;

    // Check Rule 4: Duplicate Content / Fatigue
    let fatigueRiskAlert: string | null = null;
    if (data.hookText.toLowerCase().includes('die meisten machen x') && data.plannedDurationSeconds > 40) {
      fatigueRiskAlert = '⚠️ Anti-Repetition-Filter: Diese Standard-Hook-Formel ist aktuell auf TikTok übersättigt. Nutze einen visuellen Schock-Hook in den ersten 500ms.';
    }

    const automatedFixes: string[] = [];

    if (audienceScore < 20) {
      automatedFixes.push('Breitere Aufhänger wählen: Verbinde dein Fachthema mit einem Massen-Phänomen ("Warum dieser Sound jeden Club erobert").');
    }
    if (data.plannedDurationSeconds > 28) {
      automatedFixes.push('Länge auf unter 20 Sekunden trimmen: Erhöhe die Loop-Chance, indem der Hook nahtlos am Video-Ende anschließt.');
    }
    if (data.trendAgeHours > 72 && data.isTrendBased) {
      automatedFixes.push('Trend veraltet (>72h): Ersetze den Sound durch ein aufsteigendes Audio aus dem TikTok Creative Center der letzten 24h.');
    }
    if (!data.callToActionQuestion.includes('?')) {
      automatedFixes.push('Entscheidungs-Frage einbauen: TikTok 2026 belohnt Reply-Threads. Frage nach 2 konkreten Optionen ("A oder B?").');
    }
    if (automatedFixes.length === 0) {
      automatedFixes.push('Exzellent! Hook, Watchtime-Pacing und Kommentar-Trigger erfüllen alle 2026 Algorithmus-Kriterien.');
    }

    let verdict: TikTokViralAuditScore['verdict'] = 'Solide mit Feinschliff ⚠️';
    if (total >= 85) verdict = 'Sofort viral-ready 🚀';
    else if (total < 60) verdict = 'Gefahr von Shadow-Drop ❌';

    return {
      totalScore: total,
      verdict,
      audienceInterestScore: audienceScore,
      completionProbabilityScore: completionScore,
      commentDepthScore: commentScore,
      trendWindowScore: trendScore,
      fatigueRiskAlert,
      automatedFixes
    };
  };

  const auditScore = calculateAuditScore(draft);

  const handleRunAiAudit = async () => {
    setIsAuditingAi(true);
    try {
      const prompt = `Analysiere diesen TikTok Clip Entwurf nach den 5 neuen 2026 TikTok Algorithmus-Regeln:
1. Jeder ist wieder neuer Creator (Audience Interest & Completion Rate zählen, Follower irrelevant)
2. Kommentarqualität (echte Diskussionen) schlägt Quantität
3. Trends halten nur noch 48-72h
4. Anti-Wiederholungs-Filter
5. Conversion-Trichter

Entwurf:
Hook: "${draft.hookText}"
Visuell: "${draft.visualHookDescription}"
Zielgruppe: ${draft.topicInterestSize}
Dauer: ${draft.plannedDurationSeconds}s
CTA: "${draft.callToActionQuestion}"
Trend Alter: ${draft.trendAgeHours}h

Liefere 3 konkrete chirurgische Korrekturen für maximale Completion-Rate und ein optimiertes Skript.`;

      const response = await generateAiContent(
        prompt,
        'Du bist der führende TikTok-Viral-Stratege für den neuen 2026 Algorithmus.'
      );

      navigator.clipboard.writeText(response);
      alert('KI-Audit generiert und in Zwischenablage kopiert!\n\n' + response.slice(0, 200) + '...');
    } catch (e) {
      alert('Konnte KI-Audit nicht abschließen. Lokale Berechnung aktiv.');
    } finally {
      setIsAuditingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-6 h-6 text-brand-coral" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              TikTok 2026 Algorithm Engine
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            TikTok Viral Audit: 5-Regeln Prüfstand
          </h2>
          <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
            Deine Followerzahl schützt dich nicht mehr vor 200-View-Jails. Teste deinen Clip-Entwurf vor dem Upload gegen die neuen Algorithmus-Filter.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-neutral-900/90 p-4 rounded-xl border border-neutral-800 shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-mono text-neutral-400 block uppercase">Viral-Wahrscheinlichkeit</span>
            <span className={`text-2xl font-black font-mono ${
              auditScore.totalScore >= 80 ? 'text-emerald-400' : auditScore.totalScore >= 60 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {auditScore.totalScore} / 100
            </span>
            <span className="text-[11px] font-bold block text-neutral-200 mt-0.5">
              {auditScore.verdict}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Input Draft Setup & Audit Score Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Draft Parameters */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between border-b border-neutral-100 pb-2">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-brand-coral" />
                Clip-Entwurf Eingaben
              </span>
              <span className="text-xs text-neutral-400">Vor dem Upload testen</span>
            </h3>

            {/* Hook Text */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                Gesprochener Einstieg / Hook (Sekunde 0–2)
              </label>
              <textarea
                rows={2}
                value={draft.hookText}
                onChange={(e) => setDraft({ ...draft, hookText: e.target.value })}
                className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none font-medium"
              />
            </div>

            {/* Visual Action */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                Visuelle Bewegung in Frame 1 (0 bis 500ms)
              </label>
              <input
                type="text"
                value={draft.visualHookDescription}
                onChange={(e) => setDraft({ ...draft, visualHookDescription: e.target.value })}
                className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Audience Interest Size */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  1. Audience Interest Size
                </label>
                <select
                  value={draft.topicInterestSize}
                  onChange={(e) => setDraft({ ...draft, topicInterestSize: e.target.value as any })}
                  className="w-full text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none font-semibold"
                >
                  <option value="Broad Mass Interest">Breites Interesse (ChatGPT &gt; Gemini)</option>
                  <option value="Mid-Tier Category">Kategorie-Interesse (Music/Tech)</option>
                  <option value="Ultra-Niche Technical">Ultra-Nische (Plugin-Code)</option>
                </select>
              </div>

              {/* Pacing */}
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  Schnitt-Pacing
                </label>
                <select
                  value={draft.pacingType}
                  onChange={(e) => setDraft({ ...draft, pacingType: e.target.value as any })}
                  className="w-full text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
                >
                  <option value="Rapid Cut (< 1.5s)">Rapid Cut (&lt; 1.5s pro Schnitt)</option>
                  <option value="Smooth Flow">Smooth Flow (2-4s Cuts)</option>
                  <option value="Slow Monologue">Slow Monologue (Vermeiden)</option>
                </select>
              </div>
            </div>

            {/* Duration Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-700">Geplante Videolänge:</span>
                <span className="font-mono text-brand-coral font-bold">{draft.plannedDurationSeconds} Sekunden</span>
              </div>
              <input
                type="range"
                min="7"
                max="60"
                value={draft.plannedDurationSeconds}
                onChange={(e) => setDraft({ ...draft, plannedDurationSeconds: Number(e.target.value) })}
                className="w-full accent-brand-coral cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>7s (Hyper-Loop)</span>
                <span>20s (Sweet Spot 2026)</span>
                <span>60s (Longform)</span>
              </div>
            </div>

            {/* Trend Age Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-700">Alter des Sounds / Trends (72h-Regel):</span>
                <span className={`font-mono font-bold ${draft.trendAgeHours > 72 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {draft.trendAgeHours} Stunden alt {draft.trendAgeHours > 72 ? '(Übersättigt!)' : '(Im Zeitfenster)'}
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="120"
                step="2"
                value={draft.trendAgeHours}
                onChange={(e) => setDraft({ ...draft, trendAgeHours: Number(e.target.value) })}
                className="w-full accent-neutral-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>0h (Brandneu)</span>
                <span>48h - 72h (Peak Window)</span>
                <span>120h+ (Tot)</span>
              </div>
            </div>

            {/* Call to action question */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                Call to Action / Kommentar-Trigger
              </label>
              <input
                type="text"
                value={draft.callToActionQuestion}
                onChange={(e) => setDraft({ ...draft, callToActionQuestion: e.target.value })}
                className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Algorithm Score Breakdown & Automated Fixes */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between border-b border-neutral-100 pb-2">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-brand-coral" />
                Score-Zusammensetzung & Filter
              </span>
              <span className="text-xs text-neutral-400">2026 Matrix</span>
            </h3>

            {/* Score bars */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>1. Audience Interest Size (Max 25):</span>
                  <span className="font-mono">{auditScore.audienceInterestScore} / 25</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-coral h-full rounded-full transition-all"
                    style={{ width: `${(auditScore.audienceInterestScore / 25) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>2. Completion Probability (Max 30):</span>
                  <span className="font-mono">{auditScore.completionProbabilityScore} / 30</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${(auditScore.completionProbabilityScore / 30) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>3. Kommentarqualität & Diskussionstiefe (Max 25):</span>
                  <span className="font-mono">{auditScore.commentDepthScore} / 25</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all"
                    style={{ width: `${(auditScore.commentDepthScore / 25) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>4. 72h-Trend-Fenster Aktualität (Max 20):</span>
                  <span className="font-mono">{auditScore.trendWindowScore} / 20</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all"
                    style={{ width: `${(auditScore.trendWindowScore / 20) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Warning on duplicate content / fatigue risk */}
            {auditScore.fatigueRiskAlert && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{auditScore.fatigueRiskAlert}</span>
              </div>
            )}

            {/* Automated Fixes recommendations */}
            <div className="pt-2 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Automatisierte Hebel zur Freischaltung
              </h4>
              <ul className="space-y-1.5">
                {auditScore.automatedFixes.map((fix, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{fix}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Deep Audit Button */}
            <div className="pt-3 border-t border-neutral-100 flex justify-end">
              <button
                onClick={handleRunAiAudit}
                disabled={isAuditingAi}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isAuditingAi ? 'Berechne KI-Audit...' : 'Vollständiges Skript-Tuning (KI)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
