import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, StoryboardFrame, FramingType, CameraMotion, LightingSetup } from '../types';
import { generateAiContent } from '../services/geminiService';
import {
  Film,
  Camera,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Plus,
  Trash2,
  Sliders,
  Sun,
  Move,
  Layers,
  Copy,
  Check,
  Clock,
  Eye,
  FileDown,
  Volume2,
  Mic,
  Maximize2
} from 'lucide-react';

interface VideoStoryboardTabProps {
  profile: UserProfile;
}

const DEFAULT_FRAMES: StoryboardFrame[] = [
  {
    id: 'f1',
    frameNumber: 1,
    timeRange: '0:00 - 0:02',
    durationSeconds: 2,
    framing: 'Close-Up',
    cameraMotion: 'Fast Whip Pan',
    lighting: 'Ring Light Warm (High Key)',
    visualAction: 'Hand schlägt mit Löffel gegen Kaffeetasse, schneller Reißschwenk direkt in das überraschte Gesicht.',
    dialogueVoiceover: 'Hör auf diesen teuren Fehler beim Produzieren zu machen!',
    audioCue: 'Scharfer Klick + Record Scratch SFX',
    thumbnailPlaceholderColor: 'bg-rose-950'
  },
  {
    id: 'f2',
    frameNumber: 2,
    timeRange: '0:02 - 0:08',
    durationSeconds: 6,
    framing: 'POV / Screen Recording',
    cameraMotion: 'Slow Push-In / Zoom',
    lighting: 'Neon Cyberpunk (Red/Cyan Split)',
    visualAction: 'Kamera blickt über die Schulter auf Ableton/BandLab Waveform. Hand schiebt den Filter-Regler nach oben.',
    dialogueVoiceover: '90% der Leute vergessen den Sub-Bass im Stereofeld Mono zu schalten...',
    audioCue: 'Filter-Sweep von dumpf auf glasklar',
    thumbnailPlaceholderColor: 'bg-blue-950'
  },
  {
    id: 'f3',
    frameNumber: 3,
    timeRange: '0:08 - 0:22',
    durationSeconds: 14,
    framing: 'Medium Shot',
    cameraMotion: 'Snap Cut / Glitch',
    lighting: 'Neon Cyberpunk (Red/Cyan Split)',
    visualAction: 'Creator nickt mit Kopfhörern im Rhythmus, Hand drückt die Leertaste genau auf den Bass-Drop.',
    dialogueVoiceover: 'Hau den Limiter auf -1dB True Peak und schau was beim Drop passiert!',
    audioCue: 'Massiver Bass-Drop (Sub Boom)',
    thumbnailPlaceholderColor: 'bg-emerald-950'
  },
  {
    id: 'f4',
    frameNumber: 4,
    timeRange: '0:22 - 0:30',
    durationSeconds: 8,
    framing: 'Close-Up',
    cameraMotion: 'Static Locked-Off',
    lighting: 'Ring Light Warm (High Key)',
    visualAction: 'Creator zeigt mit Zeigefinger nach unten zum Profil-Button. Sample-Pack Cover wird rechts eingeblendet.',
    dialogueVoiceover: 'Die kostenlose Vorlage liegt im Link in meiner Bio. Schnapp sie dir!',
    audioCue: 'Sanftes Ausblenden des Beats',
    thumbnailPlaceholderColor: 'bg-amber-950'
  }
];

export const VideoStoryboardTab: React.FC<VideoStoryboardTabProps> = ({ profile }) => {
  const [frames, setFrames] = useState<StoryboardFrame[]>(DEFAULT_FRAMES);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [isPlayingSim, setIsPlayingSim] = useState<boolean>(false);
  const [simElapsedSeconds, setSimElapsedSeconds] = useState<number>(0);
  const [speechWpm, setSpeechWpm] = useState<number>(140); // 140 words per minute average
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [aiStoryboardTopic, setAiStoryboardTopic] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  const activeFrame = frames[activeFrameIndex] || frames[0];
  const totalDuration = frames.reduce((acc, f) => acc + f.durationSeconds, 0);

  // Recalculate time ranges whenever frame durations change
  const recalculateTimeRanges = (frameList: StoryboardFrame[]) => {
    let currentStart = 0;
    return frameList.map((f, i) => {
      const start = currentStart;
      const end = currentStart + f.durationSeconds;
      currentStart = end;
      return {
        ...f,
        frameNumber: i + 1,
        timeRange: `${Math.floor(start / 60)}:${String(start % 60).padStart(2, '0')} - ${Math.floor(
          end / 60
        )}:${String(end % 60).padStart(2, '0')}`
      };
    });
  };

  const handleUpdateFrame = (field: keyof StoryboardFrame, value: any) => {
    setFrames((prev) => {
      const updated = prev.map((f, i) => (i === activeFrameIndex ? { ...f, [field]: value } : f));
      return recalculateTimeRanges(updated);
    });
  };

  const handleAddFrame = () => {
    const newFrame: StoryboardFrame = {
      id: 'f_' + Date.now(),
      frameNumber: frames.length + 1,
      timeRange: '0:00 - 0:05',
      durationSeconds: 5,
      framing: 'Medium Shot',
      cameraMotion: 'Static Locked-Off',
      lighting: 'Ring Light Warm (High Key)',
      visualAction: 'Neue Szene: Bewegung und Text-Callout',
      dialogueVoiceover: 'Hier deinen Dialog für diesen Clip eingeben...',
      audioCue: 'Whoosh SFX',
      thumbnailPlaceholderColor: 'bg-neutral-900'
    };
    setFrames((prev) => recalculateTimeRanges([...prev, newFrame]));
    setActiveFrameIndex(frames.length);
  };

  const handleDeleteFrame = (index: number) => {
    if (frames.length <= 1) return;
    setFrames((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      return recalculateTimeRanges(filtered);
    });
    setActiveFrameIndex(Math.max(0, index - 1));
  };

  // Playback timer simulator
  useEffect(() => {
    if (isPlayingSim) {
      timerRef.current = window.setInterval(() => {
        setSimElapsedSeconds((prev) => {
          const next = prev + 1;
          if (next >= totalDuration) {
            setIsPlayingSim(false);
            return 0;
          }

          // Compute active frame based on elapsed time
          let accumulated = 0;
          for (let i = 0; i < frames.length; i++) {
            accumulated += frames[i].durationSeconds;
            if (next < accumulated) {
              setActiveFrameIndex(i);
              break;
            }
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingSim, totalDuration, frames]);

  const resetPlayback = () => {
    setIsPlayingSim(false);
    setSimElapsedSeconds(0);
    setActiveFrameIndex(0);
  };

  // Estimate spoken duration based on word count
  const getWordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
  const activeWordCount = getWordCount(activeFrame.dialogueVoiceover);
  const recommendedDurationForWords = Math.max(2, Math.round((activeWordCount / (speechWpm / 60))));

  const handleCopyDirectorCut = () => {
    const text = frames
      .map(
        (f) =>
          `[FRAME ${f.frameNumber} // ${f.timeRange}] (${f.durationSeconds}s)
• KAMERA: ${f.framing}
• BEWEGUNG: ${f.cameraMotion}
• LICHT: ${f.lighting}
• VISUELLE AKTION: ${f.visualAction}
• SPRECHTEXT / DIALOG: "${f.dialogueVoiceover}"
• AUDIO / SFX CUE: ${f.audioCue}`
      )
      .join('\n\n--------------------\n\n');

    navigator.clipboard.writeText(`VIDEO STORYBOARD & DREHPLAN (${totalDuration} Sek)\nNische: ${profile.niche}\n\n${text}`);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleGenerateAiStoryboard = async () => {
    if (!aiStoryboardTopic.trim()) return;
    setIsGeneratingAi(true);

    try {
      const prompt = `Erstelle einen professionellen, shot-by-shot Video-Drehplan (Storyboard) für ein virales Kurzvideo (15-30s).
Thema: "${aiStoryboardTopic}"
Nische: ${profile.niche}

Antworte STRENG als valides JSON mit diesem Format:
{
  "frames": [
    {
      "durationSeconds": 2,
      "framing": "Close-Up",
      "cameraMotion": "Fast Whip Pan",
      "lighting": "Ring Light Warm (High Key)",
      "visualAction": "Exakte visuelle Regie-Anweisung",
      "dialogueVoiceover": "Gesprochener Satz",
      "audioCue": "SFX Geräusch"
    }
  ]
}
Erstelle exakt 4 logisch aufeinanderfolgende Frames (Frame 1: visueller Hook, Frame 2: Setup/Problem, Frame 3: Climax/Payoff, Frame 4: Call-to-Action). Gib nur das JSON aus.`;

      const responseText = await generateAiContent(
        prompt,
        'Du bist ein preisgekrönter Regisseur für virale Kurzvideos und Social Media Storyboards.'
      );

      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      if (parsed.frames && Array.isArray(parsed.frames)) {
        const colors = ['bg-rose-950', 'bg-blue-950', 'bg-emerald-950', 'bg-amber-950'];
        const newFrames: StoryboardFrame[] = parsed.frames.map((f: any, idx: number) => ({
          id: 'ai_frame_' + Date.now() + '_' + idx,
          frameNumber: idx + 1,
          timeRange: '0:00',
          durationSeconds: f.durationSeconds || 5,
          framing: f.framing || 'Close-Up',
          cameraMotion: f.cameraMotion || 'Fast Whip Pan',
          lighting: f.lighting || 'Ring Light Warm (High Key)',
          visualAction: f.visualAction || 'Visuelle Regie',
          dialogueVoiceover: f.dialogueVoiceover || 'Dialog',
          audioCue: f.audioCue || 'SFX',
          thumbnailPlaceholderColor: colors[idx % colors.length]
        }));

        setFrames(recalculateTimeRanges(newFrames));
        setActiveFrameIndex(0);
        setAiStoryboardTopic('');
      }
    } catch (e) {
      alert('Konnte Storyboard nicht generieren. Bitte versuche es erneut.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Storyboard Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Video Storyboard Studio: Shot-by-Shot Visualizer
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Plane deine 9:16 Kurzvideos Bild für Bild mit Kameraperspektiven, Schnittanweisungen, Licht-Presets und automatischer Sprechzeit-Kalkulation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlayingSim(!isPlayingSim)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                isPlayingSim
                  ? 'bg-brand-coral text-white shadow-xs'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              {isPlayingSim ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Stop Simulation
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Dreh-Simulation ({simElapsedSeconds}s / {totalDuration}s)
                </>
              )}
            </button>

            <button
              onClick={resetPlayback}
              className="p-1.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 transition cursor-pointer"
              title="Zurücksetzen"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyDirectorCut}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition cursor-pointer"
            >
              {copiedScript ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Drehplan kopiert!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Drehplan kopieren
                </>
              )}
            </button>
          </div>
        </div>

        {/* Frame Timeline Ribbon */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>Sequenz-Dauer: <strong className="text-neutral-900">{totalDuration} Sekunden</strong></span>
            <span>&bull;</span>
            <span>{frames.length} Einstellungen</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Sprechgeschwindigkeit:</span>
            <input
              type="range"
              min="110"
              max="180"
              step="5"
              value={speechWpm}
              onChange={(e) => setSpeechWpm(Number(e.target.value))}
              className="w-20 accent-brand-coral"
            />
            <span className="font-mono text-neutral-700">{speechWpm} WPM</span>
          </div>
        </div>
      </div>

      {/* Frame Sequence Visual Scroller */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {frames.map((frame, idx) => {
          const isSelected = activeFrameIndex === idx;
          return (
            <div
              key={frame.id}
              onClick={() => setActiveFrameIndex(idx)}
              className={`w-40 sm:w-48 shrink-0 rounded-xl border p-2.5 transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-brand-coral bg-rose-50/40 ring-2 ring-brand-coral shadow-sm'
                  : 'border-neutral-200 bg-white hover:bg-neutral-50'
              }`}
            >
              {/* Mockup Frame Screen with Visual Silhouette Overlay */}
              <div
                className={`w-full aspect-[9/16] max-h-40 rounded-lg ${frame.thumbnailPlaceholderColor} p-2.5 flex flex-col justify-between text-white shadow-inner mb-2 relative overflow-hidden`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono opacity-80 z-10">
                  <span className="bg-black/60 px-1.5 py-0.5 rounded font-bold">#{frame.frameNumber}</span>
                  <span className="bg-black/60 px-1.5 py-0.5 rounded font-bold">{frame.durationSeconds}s</span>
                </div>

                {/* Silhouette guides based on framing */}
                <div className="my-auto flex flex-col items-center justify-center opacity-40 z-0">
                  {frame.framing === 'Close-Up' && (
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-white flex items-center justify-center text-[8px] font-mono">
                      Face
                    </div>
                  )}
                  {frame.framing === 'Wide Shot' && (
                    <div className="w-24 h-12 border-2 border-dashed border-white rounded flex items-center justify-center text-[8px] font-mono">
                      Stage / Room
                    </div>
                  )}
                  {frame.framing === 'Medium Shot' && (
                    <div className="w-14 h-20 border-2 border-dashed border-white rounded-t-xl flex items-center justify-center text-[8px] font-mono">
                      Torso
                    </div>
                  )}
                  {frame.framing === 'Extreme Close-Up' && (
                    <div className="w-12 h-8 border-2 border-dashed border-white rounded flex items-center justify-center text-[8px] font-mono">
                      Eye / Hands
                    </div>
                  )}
                  {frame.framing === 'POV / Screen Recording' && (
                    <div className="w-20 h-16 border-2 border-dashed border-white rounded flex items-center justify-center text-[8px] font-mono">
                      Screen UI
                    </div>
                  )}
                  {frame.framing === 'Over-the-Shoulder' && (
                    <div className="w-16 h-16 border-2 border-dashed border-white rounded-bl-full flex items-center justify-center text-[8px] font-mono">
                      OTS
                    </div>
                  )}
                </div>

                <div className="z-10">
                  <p className="text-[10px] font-bold leading-tight line-clamp-2 drop-shadow-md">
                    "{frame.dialogueVoiceover}"
                  </p>
                  <span className="text-[9px] bg-black/70 px-1 py-0.5 rounded font-mono truncate block mt-1">
                    {frame.framing}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-900 truncate">
                <span>{frame.timeRange}</span>
                <span className="text-[10px] text-neutral-400 font-mono">{frame.durationSeconds}s</span>
              </div>
            </div>
          );
        })}

        <button
          onClick={handleAddFrame}
          className="w-36 h-48 shrink-0 rounded-xl border-2 border-dashed border-neutral-300 hover:border-brand-coral hover:bg-rose-50/20 text-neutral-400 hover:text-brand-coral flex flex-col items-center justify-center gap-1 transition cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs font-bold">+ Neuer Frame</span>
        </button>
      </div>

      {/* Frame Detail Studio Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Frame Technical Settings */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-brand-coral" />
              Frame #{activeFrame.frameNumber} Regie-Konfiguration ({activeFrame.timeRange})
            </h3>
            <button
              onClick={() => handleDeleteFrame(activeFrameIndex)}
              disabled={frames.length <= 1}
              className="text-neutral-400 hover:text-rose-600 text-xs flex items-center gap-1 disabled:opacity-30 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Szene löschen
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Framing */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                Einstellungsgröße
              </label>
              <select
                value={activeFrame.framing}
                onChange={(e) => handleUpdateFrame('framing', e.target.value as FramingType)}
                className="w-full text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none font-medium"
              >
                <option value="Close-Up">Close-Up (Nahaufnahme)</option>
                <option value="Medium Shot">Medium Shot (Halbnah)</option>
                <option value="Wide Shot">Wide Shot (Totale)</option>
                <option value="Extreme Close-Up">Extreme Close-Up (Auge/Hand)</option>
                <option value="Over-the-Shoulder">Over-the-Shoulder (OTS)</option>
                <option value="POV / Screen Recording">POV / Screen Recording</option>
              </select>
            </div>

            {/* Camera Motion */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                Kamerabewegung
              </label>
              <select
                value={activeFrame.cameraMotion}
                onChange={(e) => handleUpdateFrame('cameraMotion', e.target.value as CameraMotion)}
                className="w-full text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none font-medium"
              >
                <option value="Fast Whip Pan">Fast Whip Pan (Reißschwenk)</option>
                <option value="Slow Push-In / Zoom">Slow Push-In (Heranfahren)</option>
                <option value="Static Locked-Off">Static Locked-Off (Stativ)</option>
                <option value="Snap Cut / Glitch">Snap Cut / Glitch-Schnitt</option>
                <option value="Tracking Gimbal">Tracking Gimbal (Bewegung)</option>
              </select>
            </div>

            {/* Lighting Setup */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                Licht-Preset
              </label>
              <select
                value={activeFrame.lighting}
                onChange={(e) => handleUpdateFrame('lighting', e.target.value as LightingSetup)}
                className="w-full text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none font-medium"
              >
                <option value="Ring Light Warm (High Key)">Ring Light Warm (High Key)</option>
                <option value="Neon Cyberpunk (Red/Cyan Split)">Neon Cyberpunk (Rot/Cyan)</option>
                <option value="Natural Daylight Window">Natürliches Fensterlicht</option>
                <option value="Moody Rim Light (Low Key)">Moody Rim Light (Low Key)</option>
              </select>
            </div>
          </div>

          {/* Duration Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-neutral-700">Dauer dieser Einstellung:</span>
              <span className="font-mono text-brand-coral font-bold">{activeFrame.durationSeconds} Sekunden</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={activeFrame.durationSeconds}
              onChange={(e) => handleUpdateFrame('durationSeconds', Number(e.target.value))}
              className="w-full accent-brand-coral cursor-pointer"
            />
          </div>

          {/* Visual Action Description */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-700 mb-1">
              Visuelle Regie & Bewegung vor der Kamera
            </label>
            <textarea
              rows={2}
              value={activeFrame.visualAction}
              onChange={(e) => handleUpdateFrame('visualAction', e.target.value)}
              className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>

          {/* Dialogue & Voiceover with Speech WPM Timer */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] font-bold text-neutral-700">
                Gesprochener Dialog / Voiceover
              </label>
              <span className="text-[10px] text-neutral-400 font-mono">
                {activeWordCount} Wörter &bull; Empfohlene Sprechzeit: ~{recommendedDurationForWords}s
              </span>
            </div>
            <textarea
              rows={2}
              value={activeFrame.dialogueVoiceover}
              onChange={(e) => handleUpdateFrame('dialogueVoiceover', e.target.value)}
              className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none font-medium"
            />
          </div>

          {/* Audio Cue */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-700 mb-1">
              Soundeffekt (SFX) / Musik-Einsatz
            </label>
            <input
              type="text"
              value={activeFrame.audioCue}
              onChange={(e) => handleUpdateFrame('audioCue', e.target.value)}
              className="w-full text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>
        </div>

        {/* Right: Live Frame Screen Preview Simulator */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-neutral-950 text-white rounded-xl p-6 border border-neutral-800 space-y-4">
          <div className="w-full max-w-[210px] aspect-[9/16] rounded-2xl border-2 border-neutral-700 bg-neutral-900 flex flex-col justify-between p-4 shadow-2xl relative overflow-hidden">
            {/* Live Camera Grid Lines */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 opacity-15">
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-r border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-white" />
              <div className="border-r border-white" />
              <div />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 z-10">
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${isPlayingSim ? 'bg-rose-500 text-white animate-pulse' : 'bg-neutral-800'}`}>
                {isPlayingSim ? 'LIVE REC' : 'PREVIEW'}
              </span>
              <span>{activeFrame.timeRange}</span>
            </div>

            <div className="my-auto space-y-2 text-center z-10">
              <span className="text-[9px] uppercase font-bold text-brand-coral block tracking-wider">
                {activeFrame.framing}
              </span>
              <p className="text-xs font-bold text-neutral-100 italic leading-snug drop-shadow-md">
                „{activeFrame.dialogueVoiceover}“
              </p>
              <span className="text-[9px] text-neutral-400 block font-mono">
                {activeFrame.cameraMotion} &bull; {activeFrame.lighting.split('(')[0]}
              </span>
            </div>

            <div className="text-[9px] font-mono text-neutral-400 border-t border-neutral-800 pt-1 text-center z-10">
              🔊 SFX: {activeFrame.audioCue}
            </div>
          </div>

          <div className="text-center text-xs text-neutral-400">
            Gesamtlänge des Storyboards: <strong className="text-white font-mono">{totalDuration} Sekunden</strong>
          </div>
        </div>
      </div>

      {/* AI Storyboard Prompt Bar */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h3 className="text-sm font-bold">Storyboard per Gemini KI ausarbeiten</h3>
        </div>
        <p className="text-xs text-neutral-300">
          Gib dein Video-Thema ein. Die KI berechnet 4 perfekt getaktete Shots mit Kameraperspektiven, B-Rolls und Voiceovers.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <input
            type="text"
            value={aiStoryboardTopic}
            onChange={(e) => setAiStoryboardTopic(e.target.value)}
            placeholder="z.B. Wie man mit Suno einen viralen Sommer-Hit baut..."
            className="flex-1 w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-coral"
          />

          <button
            onClick={handleGenerateAiStoryboard}
            disabled={isGeneratingAi || !aiStoryboardTopic.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-coral hover:bg-brand-coralHover font-semibold text-xs text-white transition disabled:opacity-50 cursor-pointer"
          >
            {isGeneratingAi ? (
              <span>Generiere Drehplan...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                Storyboard erstellen
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
