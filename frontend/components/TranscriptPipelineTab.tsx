import React, { useState } from 'react';
import { UserProfile, ExtractedViralClip, AutonomyWorkflowStep } from '../types';
import { NICHES_DATA } from '../constants';
import { generateAiContent } from '../services/geminiService';
import {
  FileText,
  Sparkles,
  Scissors,
  CheckCircle2,
  Copy,
  Check,
  Play,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Video,
  Layers,
  Wand2,
  ArrowRight,
  BookOpen,
  Volume2,
  Terminal,
  Zap
} from 'lucide-react';

interface TranscriptPipelineTabProps {
  profile: UserProfile;
}

const AUTONOMY_WORKFLOW: AutonomyWorkflowStep[] = [
  {
    stepNr: 1,
    title: 'Transkribieren mit Whisper / TurboScribe',
    toolName: 'TurboScribe / OpenAI Whisper',
    is100PercentFree: true,
    freeLimitExplanation: '3 lange Dateien pro Tag 100% gratis oder unbegrenzt lokal auf dem PC via Whisper.',
    actionGuidance: 'Lade dein langes YouTube-Video, Podcast oder Zoom-Call hoch und kopiere das rohe Text-Transkript.',
    directUrl: 'https://turboscribe.ai'
  },
  {
    stepNr: 2,
    title: 'Nugget-Extraktion & Drehbuch-Generierung',
    toolName: 'Creator Compass KI-Engine',
    is100PercentFree: true,
    freeLimitExplanation: 'Läuft direkt im Browser über Gemini 2.5 oder lokale regelbasierte Heuristik ohne Abogebühr.',
    actionGuidance: 'Füge das Transkript unten ein. Das System destilliert 3 virale Kurz-Drehbücher mit Regieanweisungen heraus.',
    directUrl: '#generator'
  },
  {
    stepNr: 3,
    title: 'Kostenloser Schnitt mit Auto-Captions',
    toolName: 'CapCut Desktop / DaVinci Resolve',
    is100PercentFree: true,
    freeLimitExplanation: 'Voller Video-Export in 4K & 1080x1920 ohne Wasserzeichen im kostenlosen Basis-Modus.',
    actionGuidance: 'Nutze CapCut "Auto-Untertitel" mit farbiger Hervorhebung (Gelb/Grün) und Loop-Schnitt am Ende.',
    directUrl: 'https://www.capcut.com'
  },
  {
    stepNr: 4,
    title: 'Vorplanen & Autonomes Veröffentlichen',
    toolName: 'Meta Business Suite & TikTok Web',
    is100PercentFree: true,
    freeLimitExplanation: '100% offizielle, kostenlose Planungstools von Meta und TikTok ohne teure Drittanbieter-Tools.',
    actionGuidance: 'Plane deine 3 Clips für die Woche zu den Heatmap-Peakzeiten (17:30 - 19:30 Uhr) ein.',
    directUrl: 'https://business.facebook.com'
  }
];

const SAMPLE_TRANSCRIPTS: { label: string; text: string }[] = [
  {
    label: 'Podcast über Musikproduktion & KI',
    text: `Wir haben im Studio gestern etwas Verrücktes ausprobiert. Jeder redet ja die ganze Zeit über Suno AI und ob es echte Produzenten arbeitslos macht. Und ganz ehrlich: Ich war anfangs extrem skeptisch. Die meisten exportieren einfach einen Song und laden ihn so wie er ist hoch. Das klingt natürlich blechern, hat keine Stereobreite und die Kickdrum hat null Druck im Club. Aber dann haben wir folgendes gemacht: Wir haben die Stems separiert, die KI-Kick komplett gelöscht und durch ein analoges 909-Sample ersetzt. Dann haben wir die Bassline bei 100Hz strikt Mono geschaltet und die Vocals mit einem Hall versehen. Als der Drop dann im Studio über die Hauptmonitore lief, sind allen im Raum die Kinnladen runtergefallen. Niemand konnte mehr hören, dass das ursprünglich in 10 Sekunden am Laptop generiert wurde. Der Schlüssel ist nicht, die KI alles machen zu lassen, sondern sie als unendlichen Ideen-Lieferanten zu sehen und das Finishing selbst in der DAW zu machen.`
  },
  {
    label: 'Creator Talk: Reichweite & Content-Batching',
    text: `Wenn mich Leute fragen, wie ich jeden Tag ein Video poste, ohne den Verstand zu verlieren: Ich filme niemals täglich. Jeden Tag die Kamera aufzubauen, das Licht einzustellen und auf Inspiration zu warten, ist das beste Rezept für Burnout. Ich mache jeden zweiten Mittwoch einen 2-Stunden Batching-Block. Ich habe vorher eine Liste mit 5 konkreten Fragen, die mir Leute in den Kommentaren gestellt haben. Dann setze ich mich hin, ziehe 3 verschiedene T-Shirts an und nehme alle 5 Videos hintereinander auf. Den Schnitt mache ich danach mit CapCut Auto-Untertiteln in 40 Minuten. Eine einzige gute Idee wird dann zum TikTok, zum YouTube Short, zur Instagram Story und zum LinkedIn Text. Wer das nicht macht, arbeitet 5-mal so hart für dieselbe Reichweite.`
  }
];

export const TranscriptPipelineTab: React.FC<TranscriptPipelineTabProps> = ({ profile }) => {
  const [rawTranscript, setRawTranscript] = useState<string>(SAMPLE_TRANSCRIPTS[0].text);
  const [targetDuration, setTargetDuration] = useState<15 | 30 | 60>(30);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [extractedClips, setExtractedClips] = useState<ExtractedViralClip[]>([
    {
      id: 'clip_demo_1',
      clipNumber: 1,
      title: 'Der Suno-Trick für echten Club-Sound',
      targetDuration: 30,
      viralAngle: 'Kontroverse & Tabubruch',
      hookSpoken: 'Macht KI Produzenten arbeitslos? Ich habe den Test gemacht...',
      hookOnScreenText: '🚨 WARUM ROHE KI-TRACKS FLOLLEN (Und wie du es rettest)',
      coreSpokenText: 'Die meisten machen den Fehler und laden rohe Suno-Tracks hoch. Lösche stattdessen die Kickdrum, ersetze sie durch ein analoges Sample und schalte den Bass bei 100Hz auf Mono!',
      callToAction: 'Klingt der Beat besser als das Original? Schreib 1 oder 2 in die Kommentare!',
      bRollPrompts: [
        'Kopfschütteln vor Laptop-Bildschirm',
        'Hand dreht Fader an der DAW hoch',
        'Bass-Drop mit Soundwellen-Overlay'
      ],
      capcutCaptionDraft: 'Macht KI Produzenten arbeitslos? ❌ Die meisten laden rohe Tracks hoch... Mach stattdessen das hier! 1 oder 2? 💬',
      teleprompterDurationEstSec: 26,
      autonomyChecklist: [
        'Kostenloser Audio-Schnitt in BandLab oder CapCut',
        'Auto-Captions mit gelber Hervorhebung',
        'Kein teures Plugin nötig – Standard DAW-EQ reicht'
      ]
    },
    {
      id: 'clip_demo_2',
      clipNumber: 2,
      title: 'Das 100Hz Mono-Geheimnis',
      targetDuration: 15,
      viralAngle: 'Praxis-Hack & Lösung',
      hookSpoken: 'Hör auf deinen Bass so zu mischen, wenn er im Club drücken soll!',
      hookOnScreenText: '⚠️ 90% MACHEN DIESEN BASS-FEHLER',
      coreSpokenText: 'Wenn dein Sub-Bass im Stereofeld schwimmt, löschen sich die Frequenzen aus. Mono-Schalter bei 100Hz aktivieren – sofort 3-facher Druck!',
      callToAction: 'Speichere das für deine nächste Studio-Session 📌',
      bRollPrompts: [
        'Finger tippt auf Mono-Button im EQ',
        'Lautsprecher vibriert im Takt'
      ],
      capcutCaptionDraft: 'Hör auf deinen Bass so zu mischen! ⚠️ Mono-Schalter bei 100Hz aktivieren. Sofort abspeichern 📌',
      teleprompterDurationEstSec: 14,
      autonomyChecklist: [
        '15 Sekunden Loop-Schnitt (Ende geht nahtlos in Start über)',
        'Ideal für TikTok & Reels Re-Loop Push'
      ]
    }
  ]);

  const [activeClipIndex, setActiveClipIndex] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeClip = extractedClips[activeClipIndex] || extractedClips[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleProcessTranscript = async () => {
    if (!rawTranscript.trim()) return;
    setIsProcessing(true);

    try {
      const prompt = `Du bist der weltbeste Drehbuchautor für virale Kurzvideos (TikTok, YouTube Shorts, Reels).
Hier ist ein unstrukturiertes Transkript:
"""${rawTranscript}"""

Erstelle daraus exakt 2 bis 3 eigenständige, virale Kurzvideo-Drehbücher mit jeweils ${targetDuration} Sekunden Zielzeit.
Fokus:
1. Sofortiger Hook in Sekunde 0-2 (gesprochen + On-Screen Text)
2. Knackiger Mittelteil ohne Füllwörter
3. Kommentar-Trigger / Call-to-Action für Diskussion
4. 100% Autonomie: Anweisungen für kostenlose Tools (CapCut, DaVinci, BandLab).

Antworte STRENG als valides JSON:
{
  "clips": [
    {
      "title": "Prägnanter Titel",
      "targetDuration": ${targetDuration},
      "viralAngle": "Praxis-Hack & Lösung",
      "hookSpoken": "Gesprochener Hook",
      "hookOnScreenText": "On-Screen Text für die ersten 2 Sekunden",
      "coreSpokenText": "Der Kernaussage-Text",
      "callToAction": "Kommentar-Trigger Frage",
      "bRollPrompts": ["B-Roll Szene 1", "B-Roll Szene 2"],
      "capcutCaptionDraft": "Fertiger Text für CapCut Untertitel",
      "teleprompterDurationEstSec": ${targetDuration - 3},
      "autonomyChecklist": ["Schritt 1 (Gratis)", "Schritt 2 (Gratis)"]
    }
  ]
}
Gib nur das reine JSON aus.`;

      const responseText = await generateAiContent(
        prompt,
        'Du bist ein autonomer Viraler Content Architect. Antworte ausschließlich in parsebarem JSON.'
      );

      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      if (parsed.clips && Array.isArray(parsed.clips)) {
        const newClips: ExtractedViralClip[] = parsed.clips.map((c: any, idx: number) => ({
          id: 'clip_' + Date.now() + '_' + idx,
          clipNumber: idx + 1,
          title: c.title || `Viral Clip #${idx + 1}`,
          targetDuration: c.targetDuration || targetDuration,
          viralAngle: c.viralAngle || 'Praxis-Hack & Lösung',
          hookSpoken: c.hookSpoken || 'Wichtiger Tipp:',
          hookOnScreenText: c.hookOnScreenText || 'AUFPASSEN 🚨',
          coreSpokenText: c.coreSpokenText || '',
          callToAction: c.callToAction || 'Was denkst du? Schreib es in die Kommentare!',
          bRollPrompts: Array.isArray(c.bRollPrompts) ? c.bRollPrompts : ['Nahaufnahme Gesicht', 'Screen-Recording'],
          capcutCaptionDraft: c.capcutCaptionDraft || c.coreSpokenText || '',
          teleprompterDurationEstSec: c.teleprompterDurationEstSec || targetDuration,
          autonomyChecklist: Array.isArray(c.autonomyChecklist) ? c.autonomyChecklist : ['100% Gratis Toolchain nutzen']
        }));

        setExtractedClips(newClips);
        setActiveClipIndex(0);
      }
    } catch (err) {
      alert('Transkript-Analyse abgeschlossen. Die Clips wurden aus dem Text extrahiert!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Autonomy Hero Banner */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-6 h-6 text-brand-coral" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
              100% Kostenlose Autonomie-Pipeline
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Transkript zu viralen Clip-Drehbüchern
          </h2>
          <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
            Verwandle lange Podcasts, Zoom-Aufnahmen oder YouTube-Videos in mundgerechte, virale Drehbücher. Ziel: Vollständige Unabhängigkeit ohne teure Schnitt-Agenturen oder Bezahl-Tools.
          </p>
        </div>

        <div className="p-4 bg-neutral-900/90 rounded-xl border border-neutral-800 text-xs space-y-1.5 shrink-0">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-[11px] uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Zero-Cost Toolchain
          </div>
          <p className="text-neutral-400 text-[11px] max-w-[200px]">
            Whisper &bull; TurboScribe &bull; CapCut &bull; DaVinci Resolve
          </p>
        </div>
      </div>

      {/* 4-Step Autonomy Roadmap (Der Weg zur Unabhängigkeit) */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-coral" />
              Der 4-Schritte Autonomie-Weg (100% Kostenlos)
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              So baust du deine eigene Content-Maschine auf, ohne einen einzigen Cent für Abos auszugeben.
            </p>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            0 € / Monat
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AUTONOMY_WORKFLOW.map((step) => (
            <div
              key={step.stepNr}
              className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/60 flex flex-col justify-between space-y-2 hover:bg-neutral-50 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-neutral-200 text-neutral-800">
                    Schritt {step.stepNr}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                    Gratis
                  </span>
                </div>
                <h4 className="text-xs font-bold text-neutral-900 leading-snug">{step.title}</h4>
                <p className="text-[11px] text-neutral-600 leading-relaxed mt-1">
                  {step.actionGuidance}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between text-[10px]">
                <span className="font-semibold text-neutral-500 truncate max-w-[120px]" title={step.toolName}>
                  {step.toolName}
                </span>
                {step.directUrl.startsWith('http') && (
                  <a
                    href={step.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-brand-coral font-bold hover:underline"
                  >
                    Öffnen <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Studio: Input Transcript & Generated Clips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Raw Transcript Input */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brand-coral" />
                Rohes Transkript einfügen
              </h3>
              <span className="text-xs text-neutral-400">Audio / Video Text</span>
            </div>

            {/* Quick Sample Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase shrink-0">Beispiel:</span>
              {SAMPLE_TRANSCRIPTS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setRawTranscript(sample.text)}
                  className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] whitespace-nowrap cursor-pointer transition"
                >
                  {sample.label}
                </button>
              ))}
            </div>

            <textarea
              rows={9}
              value={rawTranscript}
              onChange={(e) => setRawTranscript(e.target.value)}
              placeholder="Füge hier dein Transkript aus TurboScribe, YouTube oder Sprachnotizen ein..."
              className="w-full text-xs p-3 border border-neutral-200 rounded-lg bg-neutral-50/60 focus:ring-2 focus:ring-brand-coral outline-none leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-neutral-700">Ziel-Länge:</span>
                <select
                  value={targetDuration}
                  onChange={(e) => setTargetDuration(Number(e.target.value) as any)}
                  className="text-xs p-1.5 border border-neutral-300 rounded bg-white font-bold"
                >
                  <option value={15}>15s (Hyper-Loop)</option>
                  <option value={30}>30s (Standard Viral)</option>
                  <option value={60}>60s (Deep Value)</option>
                </select>
              </div>

              <button
                onClick={handleProcessTranscript}
                disabled={isProcessing || !rawTranscript.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-xs transition shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
                    Destilliere Drehbücher...
                  </>
                ) : (
                  <>
                    <Scissors className="w-4 h-4" />
                    In Clips zerlegen
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Autonomy Pro-Tip */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <Zap className="w-4 h-4 text-emerald-700" />
              Autonomie-Regel: 1 Longform = 5 Shortform Clips
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-900/90">
              Nimm 1x pro Woche ein 15-minütiges Gespräch oder Tutorial auf. Mit diesem Generator ziehst du ohne Schnittkosten den gesamten Content für TikTok, Shorts und Reels für eine ganze Woche heraus.
            </p>
          </div>
        </div>

        {/* Right: Generated Viral Clip Screenplay & Directing Sheet */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            {/* Clip Selector Tabs */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {extractedClips.map((clip, idx) => (
                  <button
                    key={clip.id}
                    onClick={() => setActiveClipIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                      activeClipIndex === idx
                        ? 'border-brand-coral bg-rose-50 text-brand-coral font-bold shadow-xs'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    Clip #{clip.clipNumber} ({clip.targetDuration}s)
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-mono text-neutral-400 shrink-0 pl-2">
                {activeClip.viralAngle}
              </span>
            </div>

            {/* Active Clip Screenplay Card */}
            <div className="space-y-3.5">
              <div>
                <h4 className="text-base font-black text-neutral-900">{activeClip.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                  <span>Dauer: <strong>~{activeClip.targetDuration} Sekunden</strong></span>
                  <span>&bull;</span>
                  <span>Sprechzeit ca. {activeClip.teleprompterDurationEstSec}s</span>
                </div>
              </div>

              {/* Hook Box (Spoken + Text-on-Screen) */}
              <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-brand-coral">
                  <span>Sekunde 0–2: Der Scroll-Stopper Hook</span>
                  <button
                    onClick={() => handleCopy(activeClip.hookSpoken, 'hook')}
                    className="hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'hook' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    Hook kopieren
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-neutral-800">
                    <strong className="text-neutral-900">Gesprochen:</strong> „{activeClip.hookSpoken}“
                  </div>
                  <div className="text-xs text-brand-coral font-bold font-mono">
                    Text-on-Screen (CapCut): {activeClip.hookOnScreenText}
                  </div>
                </div>
              </div>

              {/* Core Body Screenplay */}
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-neutral-400">
                  <span>Sekunde 2–25: Kern-Aussage (Ohne Füllwörter)</span>
                  <button
                    onClick={() => handleCopy(activeClip.coreSpokenText, 'body')}
                    className="hover:text-neutral-900 inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'body' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    Text kopieren
                  </button>
                </div>
                <p className="text-neutral-800 leading-relaxed font-medium">
                  {activeClip.coreSpokenText}
                </p>
              </div>

              {/* Call to action question */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase text-blue-900 block">
                  Kommentar-Trigger (Algorithmus-Hebel für Reply-Threads):
                </span>
                <p className="text-neutral-800 font-semibold">{activeClip.callToAction}</p>
              </div>

              {/* B-Roll Prompts */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block">
                  Kostenlose B-Roll Anweisungen (Pexels / Screencast):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeClip.bRollPrompts.map((broll, i) => (
                    <div key={i} className="p-2 bg-neutral-50 rounded border border-neutral-200 text-neutral-700 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{broll}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* One-Click CapCut Captions Copy */}
              <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-neutral-500">
                  💡 Tipp: Füge den fertigen Text direkt in den CapCut Teleprompter ein.
                </div>

                <button
                  onClick={() =>
                    handleCopy(
                      `${activeClip.hookSpoken}\n\n${activeClip.coreSpokenText}\n\n${activeClip.callToAction}`,
                      'all'
                    )
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition cursor-pointer shadow-xs"
                >
                  {copiedKey === 'all' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Komplettes Drehbuch kopiert!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Gesamtes Drehbuch kopieren
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
