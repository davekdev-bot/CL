import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, VideoScript, ScriptScene } from '../types';
import { NICHES_DATA } from '../constants';
import { generateAiContent } from '../services/geminiService';
import {
  Clapperboard,
  Clock,
  Video,
  Volume2,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  Sliders,
  Plus,
  Trash2,
  FileDown
} from 'lucide-react';

interface ScriptStudioTabProps {
  profile: UserProfile;
}

const DEFAULT_SCRIPTS: Record<string, VideoScript[]> = {
  music_producer: [
    {
      id: 's_mp_1',
      title: 'Vom Küchengeräusch zum Club-Drop',
      targetDuration: 30,
      nicheId: 'music_producer',
      hookCategory: 'Curiosity & Transformation',
      scenes: [
        {
          id: 'sc1',
          timeRange: '0:00 - 0:02',
          secondsDuration: 2,
          stage: 'Hook',
          spokenText: 'Hör niemals auf Leute, die sagen man braucht ein 10.000€ Studio für einen Hit.',
          visualCue: 'Kamera im Weitwinkel, schlägt mit Löffel gegen Kaffeetasse, schneller Zoom in Gesicht.',
          audioSfx: 'Tassen-Klick wird isoliert und mit lautem Hall ("Whoosh") angezerrt.',
          bRollInstruction: 'Extreme Nahaufnahme auf Kaffeetasse und Mikrofon.'
        },
        {
          id: 'sc2',
          timeRange: '0:02 - 0:08',
          secondsDuration: 6,
          stage: 'Problem/Setup',
          spokenText: 'Ich habe dieses eine Geräusch in Ableton geladen, gepitcht und mit einem Filter versehen...',
          visualCue: 'Screen-Recording DAW im Splitscreen, schnelle Mausbewegung über EQ und Reverb-Plugin.',
          audioSfx: 'Gepitchtes Geräusch wiederholt sich im 1/4 Beat Rhythmus.',
          bRollInstruction: 'Bildschirm mit Waveform-Kurve, rotierendes Kamera-Highlight.'
        },
        {
          id: 'sc3',
          timeRange: '0:08 - 0:24',
          secondsDuration: 16,
          stage: 'Proof/Value',
          spokenText: 'Hau eine 808 drunter, füge einen Suno-Vocal-Chop hinzu und schau was beim Drop passiert!',
          visualCue: 'Creator nickt mit Kopfhörern zum Rhythmus, Hand greift zum Master-Fader, Countdown 3-2-1.',
          audioSfx: 'Massiver Bass-Drop (sub bass boom), High-Energy Synth-Lead setzt ein.',
          bRollInstruction: 'Studio-LED wechselt auf Neonrot, dynamic Shake-Effekt beim Drop.'
        },
        {
          id: 'sc4',
          timeRange: '0:24 - 0:30',
          secondsDuration: 6,
          stage: 'Action/CTA',
          spokenText: 'Den kompletten Track findest du jetzt auf Spotify – Link in Bio! Speichere den Sound für dein Reel.',
          visualCue: 'Creator zeigt mit Finger nach unten, Spotify-Cover Artwork wird animiert eingeblendet.',
          audioSfx: 'Track läuft im Hintergrund leiser aus (Duck filter).',
          bRollInstruction: 'Spotify Canvas Loop im Smartphone-Frame.'
        }
      ]
    },
    {
      id: 's_mp_2',
      title: '15-Sekunden Suno-Prompt vs. Echtes Arrangement',
      targetDuration: 15,
      nicheId: 'music_producer',
      hookCategory: 'AI Comparison',
      scenes: [
        {
          id: 'sc_f1',
          timeRange: '0:00 - 0:02',
          secondsDuration: 2,
          stage: 'Hook',
          spokenText: 'Kann eine KI in 10 Sekunden einen besseren Drop bauen als ich in 5 Jahren?',
          visualCue: 'Splitscreen: Links Suno Browser-Fenster, rechts Ableton DAW. Schneller Zoom auf Prompt-Feld.',
          audioSfx: 'Herzschlag-Bassdrum + Digital Beep.',
          bRollInstruction: 'Tastatur-Tippen in Zeitlupe.'
        },
        {
          id: 'sc_f2',
          timeRange: '0:02 - 0:07',
          secondsDuration: 5,
          stage: 'Problem/Setup',
          spokenText: 'Hier ist die Version von Suno...',
          visualCue: 'Creator drückt Leertaste, hält die Hand vor den Mund mit skeptischem Blick.',
          audioSfx: 'Suno Sample läuft kurz an (blechern gefiltert).',
          bRollInstruction: 'Wellenform auf Monitor.'
        },
        {
          id: 'sc_f3',
          timeRange: '0:07 - 0:15',
          secondsDuration: 8,
          stage: 'Proof/Value',
          spokenText: '...und hier ist was passiert, wenn man echte BandLab Effekte drüberlegt. Wer gewinnt? Kommentiere 1 oder 2!',
          visualCue: 'Volles Grinsen, Kopfhörer auf, massiver Bass-Drop.',
          audioSfx: 'Extrem fetter Master-Drop mit weitem Stereofeld.',
          bRollInstruction: 'Kamera wackelt synchron zum Bass-Impact.'
        }
      ]
    }
  ],
  generic: [
    {
      id: 's_gen_1',
      title: 'Die 3-Schritte Methode (30s Universal)',
      targetDuration: 30,
      nicheId: 'generic',
      hookCategory: 'Negativer Hook / Zeitersparnis',
      scenes: [
        {
          id: 'g1',
          timeRange: '0:00 - 0:03',
          secondsDuration: 3,
          stage: 'Hook',
          spokenText: 'Hör sofort auf, deine Zeit mit komplizierten Methoden zu verschwenden!',
          visualCue: 'Direkter Augenkontakt, Fingerzeig in die Linse, schneller Schnitt nach 1,5s.',
          audioSfx: 'Tiefer Sub-Hit + Record Scratch.',
          bRollInstruction: 'Kopfschütteln oder frustriertes Scrollen auf dem Handy.'
        },
        {
          id: 'g2',
          timeRange: '0:03 - 0:11',
          secondsDuration: 8,
          stage: 'Problem/Setup',
          spokenText: '90% der Leute scheitern, weil sie Schritt 1 überspringen und direkt das teuerste Tool kaufen.',
          visualCue: 'Text-Overlay mit rotem Durchstreichen, Creator schüttelt den Kopf.',
          audioSfx: 'Error-Buzzer Soundeffekt ganz subtil.',
          bRollInstruction: 'Screen-Recording von überfülltem Browser mit 20 offenen Tabs.'
        },
        {
          id: 'g3',
          timeRange: '0:11 - 0:24',
          secondsDuration: 13,
          stage: 'Proof/Value',
          spokenText: 'Mach stattdessen Folgendes: Erstens: Fokus auf 1 Hebel. Zweitens: 5 Tage täglich testen. Drittens: Vorlage nutzen.',
          visualCue: '3 nummerierte Bullet-Points ploppen synchron zum Sprechtext links neben dem Creator auf.',
          audioSfx: 'Pop / Click Soundeffekt bei jedem Punkt.',
          bRollInstruction: 'Glatte Screencast-Aufnahme des Workflows.'
        },
        {
          id: 'g4',
          timeRange: '0:24 - 0:30',
          secondsDuration: 6,
          stage: 'Action/CTA',
          spokenText: 'Die kostenlose Vorlage habe ich dir im Link in meiner Bio verlinkt. Schnapp sie dir!',
          visualCue: 'Zeigt auf Bildschirmrand, animierter Pfeil zum Profil-Button.',
          audioSfx: 'Upbeat Melodie blendet langsam aus.',
          bRollInstruction: 'Mockup der Vorlage auf einem Smartphone.'
        }
      ]
    }
  ]
};

export const ScriptStudioTab: React.FC<ScriptStudioTabProps> = ({ profile }) => {
  const currentNiche = NICHES_DATA.find((n) => n.id === profile.niche) || NICHES_DATA[0];
  
  // Available scripts
  const [scripts, setScripts] = useState<VideoScript[]>(() => {
    const nicheScripts = DEFAULT_SCRIPTS[profile.niche] || DEFAULT_SCRIPTS.generic;
    return nicheScripts;
  });

  const [activeScriptId, setActiveScriptId] = useState<string>(scripts[0]?.id || 's_mp_1');
  const [durationFilter, setDurationFilter] = useState<15 | 30 | 60>(30);
  const [copiedSceneId, setCopiedSceneId] = useState<string | null>(null);

  // Teleprompter Simulator State
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prompterSpeed, setPrompterSpeed] = useState<number>(140); // words per minute
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const prompterRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // AI Script Generation in Studio
  const [aiCustomTopic, setAiCustomTopic] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const activeScript = scripts.find((s) => s.id === activeScriptId) || scripts[0];

  // Calculate words and estimated reading time
  const fullSpokenText = activeScript?.scenes.map((s) => s.spokenText).join(' ') || '';
  const wordCount = fullSpokenText.trim().split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = Math.round((wordCount / (prompterSpeed / 60)));

  // Teleprompter Play/Pause Runner
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= (activeScript?.targetDuration || 30)) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });

        // Smooth scroll teleprompter
        if (prompterRef.current) {
          prompterRef.current.scrollTop += (prompterSpeed / 130);
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, prompterSpeed, activeScript]);

  const resetTeleprompter = () => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    if (prompterRef.current) {
      prompterRef.current.scrollTop = 0;
    }
  };

  const handleCopyFullScript = () => {
    if (!activeScript) return;
    const formatted = activeScript.scenes
      .map(
        (s) =>
          `[${s.timeRange}] (${s.stage})\nSPRACHE: "${s.spokenText}"\nVISUELL: ${s.visualCue}\nAUDIO/SFX: ${s.audioSfx}\nB-ROLL: ${s.bRollInstruction}`
      )
      .join('\n\n--------------------\n\n');

    navigator.clipboard.writeText(`SKRIPT: ${activeScript.title} (${activeScript.targetDuration}s)\n\n${formatted}`);
    setCopiedSceneId('full');
    setTimeout(() => setCopiedSceneId(null), 2000);
  };

  const handleCopyCapCutCaptions = () => {
    if (!activeScript) return;
    const captionsOnly = activeScript.scenes.map((s) => s.spokenText).join('\n\n');
    navigator.clipboard.writeText(captionsOnly);
    setCopiedSceneId('capcut');
    setTimeout(() => setCopiedSceneId(null), 2000);
  };

  const handleGenerateAiScript = async () => {
    if (!aiCustomTopic.trim()) return;
    setIsGeneratingAi(true);

    try {
      const prompt = `Erstelle ein professionelles, exakt formatiertes ${durationFilter}-Sekunden Video-Skript für Kurzvideos (TikTok, YouTube Shorts, Reels).
Nische: ${currentNiche.title}
Thema: ${aiCustomTopic}
Creator Handle: ${profile.handle}

Antworte bitte STRENG in einem strukturierten JSON-Format mit folgenden Feldern:
{
  "title": "Prägnanter Titel",
  "scenes": [
    {
      "timeRange": "0:00 - 0:02",
      "secondsDuration": 2,
      "stage": "Hook",
      "spokenText": "Gesprochener Hook-Text ohne Floskeln",
      "visualCue": "Exakte visuelle Regieanweisung",
      "audioSfx": "Geräusche, SFX, Beat-Cues",
      "bRollInstruction": "B-Roll oder Screen-Aufnahme Detail"
    }
  ]
}
Stelle sicher, dass die Szenen zusammen exakt ${durationFilter} Sekunden ergeben (15s = 3 Szenen, 30s = 4 Szenen, 60s = 5-6 Szenen). Gib nur valides JSON aus.`;

      const responseText = await generateAiContent(
        prompt,
        'Du bist ein preisgekrönter viraler Video-Editor und Skript-Autor. Liefere stets parsebares JSON.'
      );

      // Clean possible markdown code fences
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      const newScript: VideoScript = {
        id: 'ai_' + Date.now(),
        title: parsed.title || aiCustomTopic,
        targetDuration: durationFilter,
        nicheId: profile.niche,
        hookCategory: 'KI-Generiert',
        scenes: parsed.scenes.map((sc: any, idx: number) => ({
          id: `sc_ai_${idx}`,
          timeRange: sc.timeRange || `${idx * 5}s`,
          secondsDuration: sc.secondsDuration || 5,
          stage: sc.stage || 'Value',
          spokenText: sc.spokenText || '',
          visualCue: sc.visualCue || '',
          audioSfx: sc.audioSfx || '',
          bRollInstruction: sc.bRollInstruction || ''
        }))
      };

      setScripts((prev) => [newScript, ...prev]);
      setActiveScriptId(newScript.id);
      setAiCustomTopic('');
    } catch (err) {
      alert('Konnte Skript nicht als JSON parsen. Nutze stattdessen das KI-Copilot Modal oder prüfe den Text.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Banner & Mode Controls */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Clapperboard className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Script Studio: 15s bis 60s Video-Architektur
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Synchronisiere gesprochenen Text, visuelle Regie-Cues, Audio-Timestamps und B-Rolls für maximale Retention.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTeleprompterOpen(!isTeleprompterOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                isTeleprompterOpen
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Teleprompter-Modus
            </button>

            <button
              onClick={handleCopyCapCutCaptions}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition cursor-pointer"
              title="Kopiere nur den gesprochenen Text für CapCut Untertitel"
            >
              {copiedSceneId === 'capcut' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Captions kopiert!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Nur Text (CapCut)
                </>
              )}
            </button>

            <button
              onClick={handleCopyFullScript}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition shadow-xs cursor-pointer"
            >
              {copiedSceneId === 'full' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Skript kopiert!
                </>
              ) : (
                <>
                  <FileDown className="w-3.5 h-3.5" />
                  Alles kopieren
                </>
              )}
            </button>
          </div>
        </div>

        {/* Script Selection & Timing Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {scripts.map((script) => (
              <button
                key={script.id}
                onClick={() => setActiveScriptId(script.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap cursor-pointer transition ${
                  activeScript?.id === script.id
                    ? 'border-brand-coral bg-rose-50 text-brand-coral font-bold shadow-xs'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {script.title} ({script.targetDuration}s)
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Ziel-Länge: <strong>{activeScript?.targetDuration}s</strong></span>
            <span>&bull;</span>
            <span>Wortanzahl: <strong>{wordCount} Wörter</strong> (~{estimatedSeconds}s bei 140 WPM)</span>
          </div>
        </div>
      </div>

      {/* Teleprompter Overlay Simulator */}
      {isTeleprompterOpen && (
        <div className="bg-neutral-950 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold tracking-wide">Live Teleprompter & Dreh-Simulator</h3>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1 rounded-lg border border-neutral-800">
                <span>Geschwindigkeit:</span>
                <input
                  type="range"
                  min="100"
                  max="190"
                  value={prompterSpeed}
                  onChange={(e) => setPrompterSpeed(Number(e.target.value))}
                  className="w-20 accent-brand-coral"
                />
                <span className="font-mono text-neutral-400">{prompterSpeed} wpm</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Start'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
                </button>
                <button
                  onClick={resetTeleprompter}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
                  title="Zurücksetzen"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <span className="font-mono text-sm font-bold text-amber-400 bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-800">
                {elapsedSeconds}s / {activeScript?.targetDuration}s
              </span>
            </div>
          </div>

          <div
            ref={prompterRef}
            className="h-44 overflow-y-auto space-y-4 scroll-smooth pr-2 text-center select-none"
          >
            {activeScript?.scenes.map((scene, idx) => (
              <div key={scene.id} className="py-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-coral block mb-1">
                  {scene.stage} &bull; {scene.timeRange}
                </span>
                <p className="text-xl sm:text-2xl font-bold tracking-normal leading-relaxed text-neutral-100 max-w-2xl mx-auto">
                  "{scene.spokenText}"
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-neutral-400 mt-2 font-mono">
                  <span>📹 {scene.visualCue}</span>
                  <span>🔊 {scene.audioSfx}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Script Breakdown Grid / Scenes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
          <span className="font-bold text-neutral-700 uppercase tracking-wider">
            Szenen-Aufbau ({activeScript?.scenes.length} Schritte)
          </span>
          <span>Tipp: Der Hook muss visuell vor dem ersten gesprochenen Wort beginnen!</span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {activeScript?.scenes.map((scene, index) => {
            const isHook = scene.stage === 'Hook';
            return (
              <div
                key={scene.id}
                className={`bg-white border rounded-xl p-5 shadow-xs transition-all ${
                  isHook ? 'border-brand-coral/40 ring-1 ring-brand-coral/20' : 'border-neutral-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isHook ? 'bg-rose-100 text-brand-coral' : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {scene.timeRange}
                    </span>
                    <span className="text-xs font-bold text-neutral-900">
                      Szene {index + 1}: {scene.stage}
                    </span>
                    {isHook && (
                      <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-rose-500 text-white tracking-wider">
                        Retention-Kritisch
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-neutral-400 font-mono">
                    Dauer: ~{scene.secondsDuration} Sekunden
                  </span>
                </div>

                {/* Grid of Cue components */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                  {/* Spoken Text (Primary Focus) */}
                  <div className="md:col-span-5 bg-neutral-50/80 p-3.5 rounded-lg border border-neutral-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-neutral-900 uppercase tracking-wider text-[10px] text-neutral-400">
                      <Volume2 className="w-3.5 h-3.5 text-neutral-600" />
                      Gesprochener Dialog (Voiceover / On-Cam)
                    </div>
                    <p className="text-neutral-900 font-medium text-sm leading-relaxed pt-1">
                      "{scene.spokenText}"
                    </p>
                  </div>

                  {/* Visual & Camera Direction */}
                  <div className="md:col-span-4 bg-blue-50/40 p-3.5 rounded-lg border border-blue-100 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900 uppercase tracking-wider text-[10px]">
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                      Kamera & Schnitt-Regie
                    </div>
                    <p className="text-neutral-700 leading-relaxed pt-1">
                      {scene.visualCue}
                    </p>
                  </div>

                  {/* Audio/SFX & B-Roll */}
                  <div className="md:col-span-3 space-y-2">
                    <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                      <span className="text-[10px] font-bold uppercase text-amber-900 block mb-0.5">
                        Audio / SFX
                      </span>
                      <p className="text-neutral-700 text-[11px] leading-snug">
                        {scene.audioSfx}
                      </p>
                    </div>

                    <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                      <span className="text-[10px] font-bold uppercase text-neutral-500 block mb-0.5">
                        B-Roll Cutaway
                      </span>
                      <p className="text-neutral-700 text-[11px] leading-snug">
                        {scene.bRollInstruction}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Script Generator Trigger Bar */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h3 className="text-sm font-bold">Neues Skript mit Gemini KI generieren</h3>
        </div>
        <p className="text-xs text-neutral-300">
          Gib dein Thema ein. Das Studio berechnet automatisch passende Audio-SFX, B-Rolls und Teleprompter-Längen.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <input
            type="text"
            value={aiCustomTopic}
            onChange={(e) => setAiCustomTopic(e.target.value)}
            placeholder="z.B. Warum günstige Kopfhörer deine Beats ruinieren..."
            className="flex-1 w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-coral"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(Number(e.target.value) as any)}
              className="text-xs px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:outline-none"
            >
              <option value={15}>15 Sek (Quick Hit)</option>
              <option value={30}>30 Sek (Standard)</option>
              <option value={60}>60 Sek (Deep Dive)</option>
            </select>

            <button
              onClick={handleGenerateAiScript}
              disabled={isGeneratingAi || !aiCustomTopic.trim()}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-coral hover:bg-brand-coralHover font-semibold text-xs text-white transition disabled:opacity-50 cursor-pointer"
            >
              {isGeneratingAi ? (
                <span>Formatiere Skript...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  Skript bauen
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
