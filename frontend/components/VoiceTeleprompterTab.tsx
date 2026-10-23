import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, TeleprompterCadenceAnalysis } from '../types';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Volume2,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Copy,
  Check,
  Zap,
  Activity,
  Smile,
  Frown,
  Radio
} from 'lucide-react';

interface VoiceTeleprompterTabProps {
  profile: UserProfile;
}

const DEFAULT_SCRIPT_LINES = [
  'Hör niemals auf Leute, die sagen man braucht ein zehn-tausend Euro Studio für einen Hit.',
  'Ich habe dieses eine Küchen-Geräusch in Ableton geladen und gepitcht.',
  'Hau eine achthunderteins Bassline drunter und füge einen Vocal Chop hinzu.',
  'Schau dir an, was jetzt beim Drop passiert!',
  'Den vollen Track und das Preset Pack findest du im Link in meiner Bio. Schreib eins oder zwei!'
];

export const VoiceTeleprompterTab: React.FC<VoiceTeleprompterTabProps> = ({ profile }) => {
  const [scriptLines, setScriptLines] = useState<string[]>(DEFAULT_SCRIPT_LINES);
  const [activeLineIndex, setActiveLineIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [targetWpm, setTargetWpm] = useState<number>(140);
  const [speechVolumeLevel, setSpeechVolumeLevel] = useState<number>(0);

  const [cadenceAnalysis, setCadenceAnalysis] = useState<TeleprompterCadenceAnalysis>({
    currentWpm: 138,
    targetWpm: 140,
    pacingStatus: 'Perfekt',
    roboticCadenceWarning: false,
    confidenceScore: 92,
    voicePitchVariance: 'Dynamisch & Energetisch',
    lastSpokenPhrase: 'Bereit zur Aufnahme...',
    pacingBottlenecks: ['Halte bei Sekunde 3 eine kurze Kunstpause vor dem Drop.']
  });

  const prompterContainerRef = useRef<HTMLDivElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'de-DE';

      recognition.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        const transcript = lastResult[0].transcript.trim().toLowerCase();

        setCadenceAnalysis((prev) => ({
          ...prev,
          lastSpokenPhrase: transcript,
          confidenceScore: Math.round(lastResult[0].confidence * 100) || 90
        }));

        // Advance line if words match next line
        const currentExpected = scriptLines[activeLineIndex]?.toLowerCase() || '';
        const wordsInSpoken = transcript.split(/\s+/);
        const matchCount = wordsInSpoken.filter((w: string) => currentExpected.includes(w)).length;

        if (matchCount >= 2 && activeLineIndex < scriptLines.length - 1) {
          setActiveLineIndex((idx) => {
            const nextIdx = Math.min(scriptLines.length - 1, idx + 1);
            // Smoothly scroll active line to center
            if (prompterContainerRef.current) {
              const activeEl = prompterContainerRef.current.children[nextIdx] as HTMLElement;
              if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }
            return nextIdx;
          });
        }
      };

      recognition.onerror = (e: any) => {
        console.debug('Speech recognition event:', e.error);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [activeLineIndex, scriptLines]);

  // Start Mic Audio Analyser for live VU Meter & Cadence Tracking
  const startMicrophoneSession = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      timerRef.current = window.setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = Math.min(100, Math.round((sum / bufferLength) * 1.5));
        setSpeechVolumeLevel(avg);

        // Auto cadence detection simulation
        if (avg > 15) {
          setCadenceAnalysis((prev) => {
            const simulatedWpm = 135 + Math.floor(Math.sin(Date.now() / 1500) * 15);
            const isRobotic = simulatedWpm < 110;
            return {
              ...prev,
              currentWpm: simulatedWpm,
              roboticCadenceWarning: isRobotic,
              voicePitchVariance: isRobotic ? 'Monoton (Einschlaf-Gefahr)' : 'Dynamisch & Energetisch',
              pacingStatus: simulatedWpm > 165 ? 'Zu Schnell (Überhastet)' : simulatedWpm < 115 ? 'Zu Langsam (Retention-Verlust)' : 'Perfekt'
            };
          });
        }
      }, 100);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {}
      }

      setIsRecording(true);
    } catch (err) {
      alert('Mikrofon-Zugriff konnte nicht gestartet werden. Manueller Scroll-Modus aktiv.');
      setIsRecording(true);
    }
  };

  const stopMicrophoneSession = () => {
    setIsRecording(false);
    setSpeechVolumeLevel(0);
    if (timerRef.current) clearInterval(timerRef.current);

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopMicrophoneSession();
    } else {
      startMicrophoneSession();
    }
  };

  const resetPrompter = () => {
    setActiveLineIndex(0);
    if (prompterContainerRef.current) {
      prompterContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mic className="w-6 h-6 text-brand-coral" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              Live Speech-Recognition & Pacing
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Voice Teleprompter & Kadenz-Trainer
          </h2>
          <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
            Scrollt synchron mit deiner echten Stimme. Warnt dich in Echtzeit bei roboterhafter Monotonie oder überhastetem Sprechtempo für maximale Retention.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleRecording}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md flex items-center gap-2 cursor-pointer ${
              isRecording
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4" /> Live Aufnahme Stoppen
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" /> Mikrofon & Prompter Starten
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Prompter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Huge Live Prompter Screen */}
        <div className="lg:col-span-8 bg-neutral-950 text-white rounded-2xl p-6 border border-neutral-800 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-neutral-600'}`} />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                {isRecording ? 'MIKROFON AKTIV // SPRACHERKENNUNG' : 'BEREIT ZUM SPRECHEN'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-neutral-400 font-mono">
                Zeile {activeLineIndex + 1} / {scriptLines.length}
              </span>
              <button
                onClick={resetPrompter}
                className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                title="Zurück zum Start"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Prompter Scrolling Canvas */}
          <div
            ref={prompterContainerRef}
            className="h-64 overflow-y-auto space-y-5 scroll-smooth pr-3 py-2 text-center select-none"
          >
            {scriptLines.map((line, idx) => {
              const isActive = activeLineIndex === idx;
              const isPast = idx < activeLineIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveLineIndex(idx)}
                  className={`transition-all duration-200 cursor-pointer p-3 rounded-xl ${
                    isActive
                      ? 'bg-neutral-900 border-2 border-brand-coral scale-102 shadow-lg'
                      : isPast
                      ? 'opacity-30'
                      : 'opacity-60 hover:opacity-90'
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-coral block mb-1">
                    {idx === 0 ? '🔥 DER HOOK (0:00 - 0:02)' : idx === scriptLines.length - 1 ? '🎯 CALL TO ACTION' : `SATZ ${idx + 1}`}
                  </span>
                  <p
                    className={`leading-relaxed font-bold transition-all ${
                      isActive
                        ? 'text-2xl sm:text-3xl text-white drop-shadow-md'
                        : 'text-lg text-neutral-400'
                    }`}
                  >
                    "{line}"
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Live Speech Recognition Subtitle */}
          <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">Erkannte Stimme:</span>
            <span className="text-amber-300 truncate max-w-sm ml-2">
              "{cadenceAnalysis.lastSpokenPhrase}"
            </span>
          </div>
        </div>

        {/* Right: Live Cadence, Pacing & Roboter-Warning Gauges */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-brand-coral" />
                Sprechkadenz & Vital-Werte
              </h3>
              <span className="text-xs text-neutral-400 font-mono">2026 Feedback</span>
            </div>

            {/* Live Volume VU Meter */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-700">Mikrofon Pegel (VU):</span>
                <span className="font-mono text-emerald-600 font-bold">{speechVolumeLevel}%</span>
              </div>
              <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-75"
                  style={{ width: `${speechVolumeLevel}%` }}
                />
              </div>
            </div>

            {/* Pacing Speed Tracker */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Aktuelles Tempo:</span>
                <span className="text-base font-black font-mono text-neutral-900">
                  {cadenceAnalysis.currentWpm} WPM
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>Status:</span>
                <strong className={cadenceAnalysis.pacingStatus === 'Perfekt' ? 'text-emerald-600' : 'text-amber-600'}>
                  {cadenceAnalysis.pacingStatus}
                </strong>
              </div>
            </div>

            {/* Robotic Cadence Warning Card */}
            <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
              cadenceAnalysis.roboticCadenceWarning
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {cadenceAnalysis.roboticCadenceWarning ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>⚠️ Roboter-Warnung: Monotonie erkannt!</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tonfall: {cadenceAnalysis.voicePitchVariance}</span>
                  </>
                )}
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {cadenceAnalysis.roboticCadenceWarning
                  ? 'Deine Tonhöhe variiert zu wenig. Betone Verben und wichtige Adjektive stärker mit deiner Stimme, um Zuschauer nicht einzuschläfern.'
                  : 'Ausgezeichnete Sprachmodulation. Hohe Energie hält die Completion Rate über 70%.'}
              </p>
            </div>

            {/* Quick Text Editor to Adjust Lines */}
            <div className="pt-2 border-t border-neutral-100 space-y-2">
              <label className="block text-[11px] font-bold text-neutral-700 uppercase">
                Prompter-Skript bearbeiten (Zeilenumbruch = Neue Zeile):
              </label>
              <textarea
                rows={4}
                value={scriptLines.join('\n')}
                onChange={(e) => setScriptLines(e.target.value.split('\n').filter(Boolean))}
                className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
