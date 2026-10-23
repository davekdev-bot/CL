import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, StemChannel, AudioRemixPreset } from '../types';
import {
  Sliders,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  Scissors,
  Share2,
  Download,
  Music,
  Radio,
  Disc3,
  Layers,
  Wand2,
  Check,
  Copy
} from 'lucide-react';

interface AudioRemixerTabProps {
  profile: UserProfile;
}

const DEFAULT_STEMS: StemChannel[] = [
  { id: 'st_drums', name: 'Kick & 808 Drums', color: '#e05244', volume: 90, isMuted: false, isSolo: false, activeFx: ['Analog Clipper', 'Mono Sub 100Hz', 'Transient Shaper'] },
  { id: 'st_bass', name: 'Bassline & Reeses', color: '#f59e0b', volume: 85, isMuted: false, isSolo: false, activeFx: ['Sidechain Ducking', 'OTT Multiband', 'Saturator'] },
  { id: 'st_lead', name: 'Suno Melodic Lead', color: '#3b82f6', volume: 75, isMuted: false, isSolo: false, activeFx: ['Lush Stereo Reverb', 'Tape Pitch Wow', 'Low-Cut 180Hz'] },
  { id: 'st_vocal', name: 'Vocal Chops (Clean)', color: '#10b981', volume: 80, isMuted: false, isSolo: false, activeFx: ['High Pass 250Hz', 'Ping Pong Delay', 'Stereo Imager'] }
];

const PRESETS: AudioRemixPreset[] = [
  {
    id: 'pr_slowed',
    title: 'Slowed + Reverb (Gen-Z Viral Vibe)',
    genreVibe: 'Chill Phonk / Late Night Melodic',
    pitchSemitones: -2,
    bpm: 112,
    loopCutStartSec: 4.2,
    loopCutEndSec: 16.8,
    loopDurationSec: 12.6,
    reverbDecaySec: 4.5,
    filterLowCutHz: 80,
    ottCompressionPercent: 20,
    recommendedTikTokLoopHook: 'Starte das Video mit gedämpftem Filter, öffne ihn exakt bei Sekunde 4.2 für den Drop!'
  },
  {
    id: 'pr_club_vip',
    title: 'Club VIP Peak-Time Drop',
    genreVibe: 'Melodic Techno / Rave House',
    pitchSemitones: 0,
    bpm: 128,
    loopCutStartSec: 0.0,
    loopCutEndSec: 15.0,
    loopDurationSec: 15.0,
    reverbDecaySec: 2.2,
    filterLowCutHz: 120,
    ottCompressionPercent: 45,
    recommendedTikTokLoopHook: 'Nahtloser Audio-Loop: Letzter Takt schneidet direkt in den ersten Klick zurück!'
  },
  {
    id: 'pr_drift',
    title: 'Aggressive Brazilian Drift Pitch',
    genreVibe: 'Aggressive Cowbell Phonk',
    pitchSemitones: 2,
    bpm: 135,
    loopCutStartSec: 2.5,
    loopCutEndSec: 12.5,
    loopDurationSec: 10.0,
    reverbDecaySec: 1.5,
    filterLowCutHz: 140,
    ottCompressionPercent: 70,
    recommendedTikTokLoopHook: 'Kamera wackelt synchron zum ersten Bass-Impact bei Sekunde 2.5.'
  }
];

export const AudioRemixerTab: React.FC<AudioRemixerTabProps> = ({ profile }) => {
  const [stems, setStems] = useState<StemChannel[]>(DEFAULT_STEMS);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('pr_slowed');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [pitchSemitones, setPitchSemitones] = useState<number>(-2);
  const [ottAmount, setOttAmount] = useState<number>(20);
  const [loopDuration, setLoopDuration] = useState<number>(12.6);
  const [copiedLink, setCopiedLink] = useState(false);

  // Web Audio Context Synthesizer Simulation Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  const activePreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];

  const handleApplyPreset = (preset: AudioRemixPreset) => {
    setSelectedPresetId(preset.id);
    setPitchSemitones(preset.pitchSemitones);
    setOttAmount(preset.ottCompressionPercent);
    setLoopDuration(preset.loopDurationSec);
  };

  const toggleMute = (id: string) => {
    setStems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isMuted: !s.isMuted } : s))
    );
  };

  const handleVolumeChange = (id: string, val: number) => {
    setStems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, volume: val } : s))
    );
  };

  // Safe Web Audio Synthesizer implementation for instant browser audio feedback
  const playSynthesizedBeat = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Base Pitch Frequency modified by pitchSemitones
      const baseFreq = 130 * Math.pow(2, pitchSemitones / 12);

      // Kick Drum
      const kickStem = stems.find((s) => s.id === 'st_drums');
      if (kickStem && !kickStem.isMuted) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(baseFreq * 0.9, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.28);
        gain.gain.setValueAtTime((kickStem.volume / 100) * 0.6, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }

      // Melodic Lead Note
      const leadStem = stems.find((s) => s.id === 'st_lead');
      if (leadStem && !leadStem.isMuted) {
        const oscLead = ctx.createOscillator();
        const gainLead = ctx.createGain();
        const leadNotes = [baseFreq * 2, baseFreq * 2.4, baseFreq * 3, baseFreq * 1.8];
        const randomNote = leadNotes[Math.floor(Math.random() * leadNotes.length)];

        oscLead.type = 'sawtooth';
        oscLead.frequency.setValueAtTime(randomNote, ctx.currentTime);
        gainLead.gain.setValueAtTime((leadStem.volume / 100) * 0.15, ctx.currentTime);
        gainLead.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        // Lowpass Filter for Slowed Vibe
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(Math.max(400, 3200 - ottAmount * 15), ctx.currentTime);

        oscLead.connect(filter);
        filter.connect(gainLead);
        gainLead.connect(ctx.destination);
        oscLead.start();
        oscLead.stop(ctx.currentTime + 0.45);
      }
    } catch (err) {
      console.warn('AudioContext playback error (fallback mode active):', err);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      playSynthesizedBeat();
      const intervalMs = Math.round((60 / activePreset.bpm) * 1000);
      synthIntervalRef.current = window.setInterval(() => {
        playSynthesizedBeat();
      }, intervalMs);
    } else {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    }

    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    };
  }, [isPlaying, pitchSemitones, stems, activePreset, ottAmount]);

  const handleCopyLoopCode = () => {
    const text = `TIKTOK AUDIO LOOP ANWEISUNG // ${activePreset.title}
• Pitch Shift: ${pitchSemitones > 0 ? `+${pitchSemitones}` : pitchSemitones} Halbtöne
• Tempo: ${activePreset.bpm} BPM
• Start-Schnitt: ${activePreset.loopCutStartSec}s
• End-Schnitt: ${activePreset.loopCutEndSec}s (Dauer: ${activePreset.loopDurationSec}s)
• Hook Taktik: ${activePreset.recommendedTikTokLoopHook}`;

    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Remixer Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Disc3 className="w-6 h-6 text-brand-coral" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              100% Kostenloses Audio Lab
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            AI Audio Remixer & TikTok Loop Lab
          </h2>
          <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
            Pitsche fertige Suno-Tracks, trenne Frequenzbänder, teste FX-Chains und berechne exakte Loop-Schnittpunkte für unendliche TikTok & Reels Playback-Loops.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md flex items-center gap-2 cursor-pointer ${
              isPlaying
                ? 'bg-brand-coral text-white animate-pulse'
                : 'bg-white text-neutral-900 hover:bg-neutral-200'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> Live Loop Stoppen
              </>
            ) : (
              <>
                <Play className="w-4 h-4 ml-0.5" /> Audio-Remix Vorhören
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {PRESETS.map((p) => {
          const isSelected = selectedPresetId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleApplyPreset(p)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                isSelected
                  ? 'border-brand-coral bg-rose-50 text-brand-coral shadow-xs font-bold'
                  : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700'
              }`}
            >
              <span>{p.title}</span>
              <span className="ml-1.5 text-[10px] font-mono text-neutral-400">
                ({p.pitchSemitones > 0 ? `+${p.pitchSemitones}` : p.pitchSemitones} st)
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Stem Channels Mixer & Audio Chain FX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 4-Channel Stem Mixer */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-coral" />
              Suno Stem Separator (4 Spuren)
            </h3>
            <span className="text-xs text-neutral-400 font-mono">24-Bit / 48kHz WAV</span>
          </div>

          <div className="space-y-3">
            {stems.map((stem) => (
              <div
                key={stem.id}
                className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: stem.color }}
                    />
                    <span className="text-xs font-bold text-neutral-900">{stem.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMute(stem.id)}
                      className={`p-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                        stem.isMuted
                          ? 'bg-rose-100 text-rose-700 font-bold'
                          : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                      }`}
                    >
                      {stem.isMuted ? 'MUTED' : 'MUTE'}
                    </button>
                    <span className="text-xs font-mono font-bold text-neutral-700 w-8 text-right">
                      {stem.volume}%
                    </span>
                  </div>
                </div>

                {/* Volume Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stem.volume}
                  disabled={stem.isMuted}
                  onChange={(e) => handleVolumeChange(stem.id, Number(e.target.value))}
                  className="w-full accent-brand-coral cursor-pointer"
                />

                {/* Active FX tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stem.activeFx.map((fx, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-600"
                    >
                      {fx}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Master FX, Pitch Shifter & TikTok Loop Calculator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-brand-coral" />
                Master FX & Pitch Shifting
              </h3>
              <span className="text-xs text-neutral-400 font-mono">{activePreset.genreVibe}</span>
            </div>

            {/* Pitch Shift Slider */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-700">Tonhöhe (Pitch Shift):</span>
                <span className="font-mono text-brand-coral font-bold">
                  {pitchSemitones > 0 ? `+${pitchSemitones}` : pitchSemitones} Halbtöne
                </span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={pitchSemitones}
                onChange={(e) => setPitchSemitones(Number(e.target.value))}
                className="w-full accent-brand-coral cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>-6 st (Deep Phonk)</span>
                <span>0 (Original)</span>
                <span>+6 st (Nightcore)</span>
              </div>
            </div>

            {/* OTT Multiband Compression */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-700">OTT / Club Density:</span>
                <span className="font-mono text-emerald-600 font-bold">{ottAmount}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={ottAmount}
                onChange={(e) => setOttAmount(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>0% (Clean)</span>
                <span>40% (Punchy)</span>
                <span>100% (Extreme)</span>
              </div>
            </div>

            {/* TikTok Loop Cut Point Box */}
            <div className="p-3.5 bg-neutral-900 text-white rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Scissors className="w-4 h-4" />
                  <span>Exakter TikTok Loop-Schnittpunkt:</span>
                </div>
                <button
                  onClick={handleCopyLoopCode}
                  className="text-neutral-300 hover:text-white inline-flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Kopiert
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Kopieren
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 bg-neutral-800 rounded">
                  Start: <strong>{activePreset.loopCutStartSec}s</strong>
                </div>
                <div className="p-2 bg-neutral-800 rounded">
                  Ende: <strong>{activePreset.loopCutEndSec}s</strong>
                </div>
              </div>
              <p className="text-[11px] text-neutral-300 leading-snug">
                💡 {activePreset.recommendedTikTokLoopHook}
              </p>
            </div>

            {/* Export & Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => alert(`Kostenloser Remix-Download gestartet! Stems gerendert auf ${pitchSemitones} st mit ${activePreset.genreVibe} EQ-Kurve für CapCut und BandLab.`)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                Remix Stems für CapCut/DAW gratis exportieren
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
