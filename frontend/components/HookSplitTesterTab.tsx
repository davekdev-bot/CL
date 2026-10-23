import React, { useState } from 'react';
import { UserProfile, HookVariant } from '../types';
import { NICHES_DATA } from '../constants';
import { generateAiContent } from '../services/geminiService';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  TrendingDown,
  Brain,
  Sliders,
  Plus
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface HookSplitTesterTabProps {
  profile: UserProfile;
}

const DEFAULT_VARIANTS: HookVariant[] = [
  {
    id: 'var_a',
    name: 'Variante A (Curiosity & Secret)',
    hookText: 'Niemand in der Musikszene redet darüber, aber hier ist wie 90% der viralen Sounds 2026 entstehen.',
    visualConcept: 'Hand deckt Kameralinse zu, zieht sie schnell weg mit ernstem Blick vor Studio-Monitoren.',
    soundCue: 'Tiefer Sub-Boom gefolgt von sofortiger Stille.',
    targetTrigger: 'curiosity',
    predictedStopRate: 84,
    retentionScore: 78,
    pros: [
      'Starker "Information Gap" Trigger (Neugierde zwingt zum Bleiben)',
      'Ernsthafter Tonfall erhöht wahrgenommene Glaubwürdigkeit',
      'Sofortiger Schnitt in den ersten 1,5 Sekunden'
    ],
    weaknesses: [
      'Gefahr von Clickbait-Vorwürfen, wenn das Versprechen nach Sekunde 10 nicht eingelöst wird'
    ]
  },
  {
    id: 'var_b',
    name: 'Variante B (Verlustangst & Fehler)',
    hookText: 'Hör sofort auf, deine Tracks so zu mastern, wenn du nicht willst, dass Spotify deinen Sound leiser dreht!',
    visualConcept: 'Roter Warn-Button im Screencast, Creator schlägt die Hände über dem Kopf zusammen.',
    soundCue: 'Dämpfungs-Filter (Muffled Audio) das plötzlich klar wird.',
    targetTrigger: 'loss_aversion',
    predictedStopRate: 91,
    retentionScore: 82,
    pros: [
      'Verlustangst aktiviert Amygdala 2,5x stärker als Gewinnversprechen',
      'Sehr konkreter Schmerzpunkt (Spotify Lautstärken-Normalisierung)',
      'Extrem hohe Save-Quote bei Fachpublikum'
    ],
    weaknesses: [
      'Funktioniert nur bei Zuschauern, die bereits eigene Musik veröffentlichen'
    ]
  },
  {
    id: 'var_c',
    name: 'Variante C (Zahlen & Beweis)',
    hookText: 'Wie wir aus einer 2-Minuten Suno-Skizze 350.000 monatliche Spotify-Hörer gemacht haben:',
    visualConcept: 'Live Handy-Screen mit Spotify for Artists Dashboard und 350k Counter.',
    soundCue: 'Upbeat Percussion-Hit + Audio-Notification.',
    targetTrigger: 'hyper_specific',
    predictedStopRate: 76,
    retentionScore: 88,
    pros: [
      'Spezifische Zahlen ("350.000") wirken sofort authentisch',
      'Visueller Beweis in Frame 1 stoppt das Scrollen sofort',
      'Höchste Retention über die gesamte Video-Länge'
    ],
    weaknesses: [
      'Etwas langsamerer Einstieg für Casual-Viewer ohne Musikbezug'
    ]
  }
];

// Retention curve data simulation
const RETENTION_DATA = [
  { second: '0s', variantA: 100, variantB: 100, variantC: 100 },
  { second: '2s', variantA: 84, variantB: 91, variantC: 76 },
  { second: '5s', variantA: 72, variantB: 79, variantC: 73 },
  { second: '10s', variantA: 58, variantB: 64, variantC: 69 },
  { second: '20s', variantA: 44, variantB: 49, variantC: 61 },
  { second: '30s', variantA: 36, variantB: 41, variantC: 54 }
];

export const HookSplitTesterTab: React.FC<HookSplitTesterTabProps> = ({ profile }) => {
  const currentNiche = NICHES_DATA.find((n) => n.id === profile.niche) || NICHES_DATA[0];

  const [variants, setVariants] = useState<HookVariant[]>(DEFAULT_VARIANTS);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('var_b');
  const [isSimulating, setIsSimulating] = useState(false);

  // New hook creator state
  const [newHookText, setNewHookText] = useState('');
  const [newVisualCue, setNewVisualCue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const activeVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];

  const handleRunAiAnalysis = async () => {
    if (!newHookText.trim()) return;
    setIsAnalyzing(true);

    try {
      const prompt = `Analysiere diesen Video-Hook für Kurzvideos (TikTok, Reels, Shorts):
Hook Text: "${newHookText}"
Visuelle Regie: "${newVisualCue || 'Direkt vor Kamera'}"
Nische: ${currentNiche.title}

Bewerte psychologische Trigger und liefere STRENG JSON:
{
  "name": "Variante Neu",
  "predictedStopRate": 85,
  "retentionScore": 79,
  "targetTrigger": "curiosity",
  "pros": ["Grund 1", "Grund 2"],
  "weaknesses": ["Schwäche 1"]
}
Gib nur das reine JSON aus.`;

      const responseText = await generateAiContent(
        prompt,
        'Du bist ein erfahrener Neuromarketer und Experte für Video-Watchtime.'
      );

      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      const newVar: HookVariant = {
        id: 'var_' + Date.now(),
        name: parsed.name || `Variante ${variants.length + 1}`,
        hookText: newHookText,
        visualConcept: newVisualCue || 'Dynamischer Schnitt in Frame 1',
        soundCue: 'Audio Drop',
        targetTrigger: parsed.targetTrigger || 'curiosity',
        predictedStopRate: parsed.predictedStopRate || 75,
        retentionScore: parsed.retentionScore || 70,
        pros: Array.isArray(parsed.pros) ? parsed.pros : ['Guter Einstieg'],
        weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : ['Optimierungsbedarf']
      };

      setVariants([...variants, newVar]);
      setSelectedVariantId(newVar.id);
      setNewHookText('');
      setNewVisualCue('');
    } catch (e) {
      alert('Analyse fehlgeschlagen. Bitte prüfe deinen Text oder nutze das Copilot-Modal.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Hook A/B Split-Tester & Scroll-Stop Simulator
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Vergleiche Einstiegssätze vor dem Dreh. Simuliert Scroll-Stopping-Raten und Retention-Kurven basierend auf psychologischen Triggern.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-brand-coral border border-rose-200">
              Top-Performer: {variants.reduce((prev, curr) => (curr.predictedStopRate > prev.predictedStopRate ? curr : prev)).name}
            </span>
          </div>
        </div>

        {/* Variant Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-neutral-100">
          {variants.map((v) => {
            const isSelected = selectedVariantId === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                  isSelected
                    ? 'border-brand-coral bg-rose-50 text-brand-coral shadow-xs font-bold'
                    : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <span>{v.name}</span>
                <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-neutral-800">
                  {v.predictedStopRate}% Stop
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split-Test Comparison Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Variant Deep Dive */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Aktive Variante
                </span>
                <h3 className="text-sm font-bold text-neutral-900">{activeVariant.name}</h3>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div>
                  <span className="text-xs text-neutral-400 block">Scroll-Stop Rate</span>
                  <span className="text-xl font-black text-brand-coral">
                    {activeVariant.predictedStopRate}%
                  </span>
                </div>
              </div>
            </div>

            {/* Hook Dialog Card */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">
                Gesprochener Einstieg (Sekunde 0 - 2)
              </span>
              <p className="text-sm font-bold text-neutral-900 leading-relaxed italic">
                „{activeVariant.hookText}“
              </p>
            </div>

            {/* Visual & Audio Cues */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-blue-800 block">
                  Visueller Trigger (Frame 1)
                </span>
                <p className="text-neutral-700">{activeVariant.visualConcept}</p>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100 space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-800 block">
                  Audio & Sound-Effekt Cue
                </span>
                <p className="text-neutral-700">{activeVariant.soundCue}</p>
              </div>
            </div>

            {/* Pros & Weaknesses */}
            <div className="space-y-2 pt-1 text-xs">
              <h4 className="font-bold text-neutral-800 flex items-center gap-1.5 text-xs">
                <Brain className="w-4 h-4 text-emerald-600" />
                Psychologische Hebel & Stärken
              </h4>
              <ul className="space-y-1">
                {activeVariant.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-neutral-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>

              {activeVariant.weaknesses.length > 0 && (
                <div className="pt-2">
                  <h4 className="font-bold text-neutral-800 flex items-center gap-1.5 text-xs text-amber-700">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Mögliche Risiken / Abbrüche
                  </h4>
                  <ul className="space-y-1 mt-1">
                    {activeVariant.weaknesses.map((weak, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-neutral-600">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Simulated Retention Drop-Off Chart */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-brand-coral" />
                Simulierte Video-Retention Kurve
              </h3>
              <span className="text-[10px] text-neutral-400 font-mono">0s bis 30s</span>
            </div>

            <p className="text-xs text-neutral-500">
              Zeigt den geschätzten Prozentsatz der Zuschauer, die nach dem Hook im Video verbleiben.
            </p>

            <div className="h-48 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RETENTION_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <XAxis dataKey="second" tick={{ fontSize: 11 }} />
                  <YAxis domain={[20, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="variantA" name="Var A" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="variantB" name="Var B (Top)" stroke="#e05244" strokeWidth={3} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="variantC" name="Var C" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Score Formula Card */}
          <div className="bg-neutral-900 text-white rounded-xl p-4 text-xs space-y-2">
            <span className="font-bold text-amber-300 block">
              💡 Die 2026 Hook-Formel für virale Replays:
            </span>
            <p className="text-neutral-300 leading-relaxed text-[11px]">
              Kombiniere immer einen <strong>visuellen Richtungswechsel</strong> in den ersten 500ms mit einer <strong>konträren Behauptung</strong>. Lass keine Pause zwischen dem Öffnen des Mundes und dem ersten Substantiv.
            </p>
          </div>
        </div>
      </div>

      {/* New Hook AI Tester Input Form */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-coral" />
          Eigenen Hook gegen die Datenbank testen
        </h3>
        <p className="text-xs text-neutral-500">
          Tippe deine geplante Einstiegszeile ein. Die KI berechnet die prognostizierte Stop-Rate und vergleicht sie mit den Top-Formeln.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-neutral-600 mb-1">
              Geplanter Sprechtext (max. 15 Wörter)
            </label>
            <input
              type="text"
              value={newHookText}
              onChange={(e) => setNewHookText(e.target.value)}
              placeholder="z.B. Hört auf diesen teuren Fehler beim Beat-Produzieren zu machen..."
              className="w-full text-xs sm:text-sm p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-600 mb-1">
              Visuelle Aktion in Frame 1
            </label>
            <input
              type="text"
              value={newVisualCue}
              onChange={(e) => setNewVisualCue(e.target.value)}
              placeholder="z.B. Hand stößt Mikrofon um / Schneller Zoom auf Bildschirm"
              className="w-full text-xs sm:text-sm p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleRunAiAnalysis}
            disabled={isAnalyzing || !newHookText.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <span>Analysiere Neuro-Trigger...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Hook testen & Variante hinzufügen
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
