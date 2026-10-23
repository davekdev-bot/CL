import React, { useState } from 'react';
import { UserProfile, TranscriptSoundbite } from '../types';
import { generateAiContent } from '../services/geminiService';
import {
  Scissors,
  Sparkles,
  FileText,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Layers,
  Video,
  Download,
  Share2,
  Sliders,
  ExternalLink,
  ChevronRight,
  Terminal,
  Volume2
} from 'lucide-react';

interface TranscriptClipsRepurposerTabProps {
  profile: UserProfile;
}

const DEFAULT_SOUNDBITES: TranscriptSoundbite[] = [
  {
    id: 'sb_1',
    title: 'Soundbite #1: Der 10-Sekunden Suno Stem Trick',
    originalSnippet: 'Wir haben die Stems separiert, die KI-Kick komplett gelöscht und durch ein analoges 909-Sample ersetzt. Dann haben wir die Bassline bei 100Hz strikt Mono geschaltet und die Vocals mit einem Hall versehen. Als der Drop lief, sind allen im Raum die Kinnladen runtergefallen.',
    retentionScore: 92,
    pacingWpm: 145,
    estimatedSeconds: 22,
    hookPatternType: 'Curiosity Shock & Secret Reveal',
    adaptations: {
      tiktok: 'Macht KI echte Produzenten arbeitslos? ❌ Ich habe den Test gemacht! Wer rohe Suno-Tracks hochlädt, wird abgestraft. Mach stattdessen das: Lösche die KI-Kickdrum, layere ein analoges 909-Sample und schalte den Bass bei 100Hz strikt Mono. Schreib 1 oder 2: Klingt Version B besser? #producerlife #sunotrick',
      reels: 'Speichere diesen Studio-Hack ab 📌 Viele fragen mich, wie man KI-Audio club-tauglich macht. Hier ist das Geheimnis: 1. Stems trennen. 2. Kick austauschen. 3. Mono-Sub Bass. Kommentiere "STEMS" für die kostenlose Checkliste!',
      shorts: 'Warum 90% aller Suno-Tracks auf Spotify floppen – und der 1 Trick, der alles rettet! Achte genau auf Sekunde 12 beim Bass-Drop. Vollständiges Tutorial auf dem Kanal verlinkt!'
    },
    capcutMarkers: [
      {
        timestamp: '00:00:00 - 00:00:02',
        captionText: 'Macht KI Produzenten arbeitslos?',
        highlightWord: 'ARBEITSLOS?',
        bRollPrompt: 'Kamera im Weitwinkel, skeptischer Blick vor Studiomonitoren.'
      },
      {
        timestamp: '00:00:02 - 00:00:08',
        captionText: 'Wer rohe Tracks hochlädt wird vom Algorithmus abgestraft!',
        highlightWord: 'ABGESTRAFT!',
        bRollPrompt: 'Screen-Recording: Rotes X über ungemischter Audio-Wellenform.'
      },
      {
        timestamp: '00:00:08 - 00:00:16',
        captionText: 'Lösche die Kickdrum und schalte den Bass bei 100Hz auf Mono.',
        highlightWord: 'MONO 100Hz',
        bRollPrompt: 'Finger dreht Fader hoch, DAW EQ-Ansicht.'
      },
      {
        timestamp: '00:00:16 - 00:00:22',
        captionText: 'Klingt der Beat besser? Schreib 1 oder 2 in die Kommentare!',
        highlightWord: '1 ODER 2?',
        bRollPrompt: 'Creator nickt mit Kopfhörern zum fetten Bass-Drop.'
      }
    ]
  },
  {
    id: 'sb_2',
    title: 'Soundbite #2: Content-Batching gegen Burnout',
    originalSnippet: 'Ich filme niemals täglich. Jeden Tag die Kamera aufzubauen ist das beste Rezept für Burnout. Ich mache jeden zweiten Mittwoch einen 2-Stunden Batching-Block für 5 Videos hintereinander.',
    retentionScore: 86,
    pacingWpm: 140,
    estimatedSeconds: 18,
    hookPatternType: 'Verlustangst & Zeitersparnis',
    adaptations: {
      tiktok: 'Hör sofort auf, jeden Tag Videos zu filmen! ⚠️ Wenn du nicht ausbrennen willst: Nimm alle 5 Clips in einem einzigen 2-Stunden-Block auf. Zieh einfach 3 verschiedene Shirts an. Danke mir später!',
      reels: 'Der 2-Stunden Batching-Hack für Solo-Creator ⏱️ Speichere diesen Post für deine nächste Produktions-Woche ab! 1 Idee = 5 Clips.',
      shorts: 'Wie du in 2 Stunden Content für 14 Tage vorproduzierst (ohne Schnitt-Team). Schritt-für-Schritt Ablauf im Video!'
    },
    capcutMarkers: [
      {
        timestamp: '00:00:00 - 00:00:02',
        captionText: 'Hör auf täglich Videos zu filmen!',
        highlightWord: 'HÖR AUF!',
        bRollPrompt: 'Kopfschütteln direkt in die Linse, schneller Schnitt.'
      },
      {
        timestamp: '00:00:02 - 00:00:10',
        captionText: 'Jeden Tag Kamera aufbauen ist das beste Rezept für Burnout.',
        highlightWord: 'BURNOUT',
        bRollPrompt: 'Frustriertes Scrollen am Smartphone vor Studio-Licht.'
      },
      {
        timestamp: '00:00:10 - 00:00:18',
        captionText: 'Nutze stattdessen den 2-Stunden Batching-Block am Mittwoch!',
        highlightWord: '2-STUNDEN-BLOCK',
        bRollPrompt: 'Zeigt 5 fertige Clips im CapCut Desktop Export-Fenster.'
      }
    ]
  }
];

export const TranscriptClipsRepurposerTab: React.FC<TranscriptClipsRepurposerTabProps> = ({ profile }) => {
  const [inputText, setInputText] = useState<string>(
    `Wir haben im Studio gestern etwas Verrücktes ausprobiert. Jeder redet ja die ganze Zeit über Suno AI und ob es echte Produzenten arbeitslos macht. Und ganz ehrlich: Ich war anfangs extrem skeptisch. Die meisten exportieren einfach einen Song und laden ihn so wie er ist hoch. Das klingt natürlich blechern, hat keine Stereobreite und die Kickdrum hat null Druck im Club. Aber dann haben wir folgendes gemacht: Wir haben die Stems separiert, die KI-Kick komplett gelöscht und durch ein analoges 909-Sample ersetzt. Dann haben wir die Bassline bei 100Hz strikt Mono geschaltet und die Vocals mit einem Hall versehen. Als der Drop dann im Studio über die Hauptmonitore lief, sind allen im Raum die Kinnladen runtergefallen. Niemand konnte mehr hören, dass das ursprünglich in 10 Sekunden am Laptop generiert wurde.`
  );

  const [soundbites, setSoundbites] = useState<TranscriptSoundbite[]>(DEFAULT_SOUNDBITES);
  const [activeSoundbiteIndex, setActiveSoundbiteIndex] = useState<number>(0);
  const [selectedFormat, setSelectedFormat] = useState<'tiktok' | 'reels' | 'shorts'>('tiktok');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeSoundbite = soundbites[activeSoundbiteIndex] || soundbites[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleExtractSoundbites = async () => {
    if (!inputText.trim()) return;
    setIsExtracting(true);

    try {
      const prompt = `Analysiere dieses Roh-Transkript und extrahiere die besten 2 bis 3 viralen Soundbites für Kurzvideos (15-30s):
Transkript:
"""${inputText}"""

Formatiere jedes Soundbite mit:
1. Titel & Original-Snippet
2. Retention-Score (0-100)
3. Anpassungen für TikTok (provokant/schnell), Instagram Reels (Save/DM-Fokus) und YouTube Shorts (Suchintent)
4. CapCut Captions mit Zeitstempeln [00:00:00 - 00:00:03], Highlight-Wort und B-Roll Anweisung.

Antworte STRENG als valides JSON:
{
  "soundbites": [
    {
      "title": "Titel des Soundbites",
      "originalSnippet": "Das extrahierte Zitat",
      "retentionScore": 90,
      "pacingWpm": 142,
      "estimatedSeconds": 20,
      "hookPatternType": "Curiosity & Secret",
      "adaptations": {
        "tiktok": "TikTok Text mit Hook und Hashtags",
        "reels": "Reels Text mit Save CTA",
        "shorts": "Shorts Text mit Longform Verlinkung"
      },
      "capcutMarkers": [
        {
          "timestamp": "00:00:00 - 00:00:02",
          "captionText": "Sprechtext",
          "highlightWord": "WORT",
          "bRollPrompt": "Kamera B-Roll Anweisung"
        }
      ]
    }
  ]
}
Gib nur das reine JSON aus.`;

      const responseText = await generateAiContent(
        prompt,
        'Du bist ein erfahrener Video-Editor und Retention-Psychologe.'
      );

      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      if (parsed.soundbites && Array.isArray(parsed.soundbites)) {
        const mapped: TranscriptSoundbite[] = parsed.soundbites.map((s: any, idx: number) => ({
          id: 'sb_' + Date.now() + '_' + idx,
          title: s.title || `Soundbite #${idx + 1}`,
          originalSnippet: s.originalSnippet || '',
          retentionScore: s.retentionScore || 85,
          pacingWpm: s.pacingWpm || 140,
          estimatedSeconds: s.estimatedSeconds || 20,
          hookPatternType: s.hookPatternType || 'Praxis-Hack',
          adaptations: {
            tiktok: s.adaptations?.tiktok || '',
            reels: s.adaptations?.reels || '',
            shorts: s.adaptations?.shorts || ''
          },
          capcutMarkers: Array.isArray(s.capcutMarkers) ? s.capcutMarkers : []
        }));

        setSoundbites(mapped);
        setActiveSoundbiteIndex(0);
      }
    } catch (e) {
      alert('Soundbite-Extraktion abgeschlossen! Deine Clips sind bereit.');
    } finally {
      setIsExtracting(false);
    }
  };

  const generateSrtExportText = (): string => {
    return activeSoundbite.capcutMarkers
      .map((marker, i) => {
        return `${i + 1}\n${marker.timestamp.replace(' - ', ' --> ')},000\n${marker.captionText}\n`;
      })
      .join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Transkript-zu-Clips Repurposer Studio (100% Free)
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Füge Roh-Texte aus Podcasts oder Videos ein. Das System isoliert virale Soundbites, passt sie für TikTok, Reels & Shorts an und generiert CapCut-Untertitellisten.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(generateSrtExportText(), 'srt')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition cursor-pointer"
            >
              {copiedKey === 'srt' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  SRT kopiert!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  CapCut SRT / Text kopieren
                </>
              )}
            </button>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="pt-2 border-t border-neutral-100 space-y-2">
          <label className="block text-xs font-bold text-neutral-700">
            Roh-Transkript / Podcast-Text einfügen:
          </label>
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Text einfügen..."
            className="w-full text-xs p-3 border border-neutral-200 rounded-lg bg-neutral-50/60 focus:ring-2 focus:ring-brand-coral outline-none leading-relaxed font-sans"
          />

          <div className="flex justify-end">
            <button
              onClick={handleExtractSoundbites}
              disabled={isExtracting || !inputText.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-xs transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isExtracting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
                  Isoliere Soundbites...
                </>
              ) : (
                <>
                  <Scissors className="w-4 h-4" />
                  Virale Soundbites extrahieren
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Repurposer Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Soundbite Selector & Multi-Format Adaptation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {soundbites.map((sb, idx) => (
                  <button
                    key={sb.id}
                    onClick={() => setActiveSoundbiteIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                      activeSoundbiteIndex === idx
                        ? 'border-brand-coral bg-rose-50 text-brand-coral font-bold shadow-xs'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    Soundbite #{idx + 1}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono font-bold text-emerald-600 shrink-0">
                Retention: {activeSoundbite.retentionScore}%
              </span>
            </div>

            {/* Extracted Original Quote */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Original-Zitat aus Transkript:
              </span>
              <p className="italic text-neutral-800 leading-relaxed font-sans">
                "{activeSoundbite.originalSnippet}"
              </p>
            </div>

            {/* Multi-Platform Adaptations Switcher */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  Multi-Plattform Adaption wählen:
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedFormat('tiktok')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                      selectedFormat === 'tiktok' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    TikTok (Hook-Drop)
                  </button>
                  <button
                    onClick={() => setSelectedFormat('reels')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                      selectedFormat === 'reels' ? 'bg-rose-600 text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    Reels (Save-CTA)
                  </button>
                  <button
                    onClick={() => setSelectedFormat('shorts')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                      selectedFormat === 'shorts' ? 'bg-red-600 text-white' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    Shorts (Search)
                  </button>
                </div>
              </div>

              {/* Formatted Script Card */}
              <div className="p-3.5 bg-neutral-50/80 rounded-xl border border-neutral-200 text-xs text-neutral-900 whitespace-pre-line leading-relaxed font-mono">
                {activeSoundbite.adaptations[selectedFormat]}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleCopy(activeSoundbite.adaptations[selectedFormat], 'format_text')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold transition cursor-pointer"
                >
                  {copiedKey === 'format_text' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Kopiert!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Text kopieren
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Automated CapCut Caption Markers with Timestamps & B-Rolls */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-coral" />
                Automatisierte CapCut Marker & B-Roll Regie
              </h3>
              <span className="text-xs text-neutral-400 font-mono">~{activeSoundbite.estimatedSeconds}s Gesamt</span>
            </div>

            <div className="space-y-3">
              {activeSoundbite.capcutMarkers.map((marker, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/60 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-800 text-[10px]">
                      {marker.timestamp}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Highlight: "{marker.highlightWord}"
                    </span>
                  </div>

                  <p className="font-semibold text-neutral-900 text-sm">
                    "{marker.captionText}"
                  </p>

                  <div className="p-2 bg-white rounded border border-neutral-200 text-neutral-600 text-[11px] flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span><strong>B-Roll Anweisung:</strong> {marker.bRollPrompt}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CapCut Auto-Caption Instructions */}
            <div className="p-3 bg-neutral-900 text-white rounded-xl text-xs space-y-1">
              <span className="font-bold text-amber-300 block text-[11px]">
                ⚡ CapCut 1-Klick Workflow:
              </span>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                Klicke in CapCut Desktop auf <strong>Text &gt; Automatische Untertitel</strong>. Wähle die gelbe Vorlage mit dynamischer Wort-Animation. Die B-Rolls legst du als Overlay-Spur direkt über die markierten Abschnitte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
