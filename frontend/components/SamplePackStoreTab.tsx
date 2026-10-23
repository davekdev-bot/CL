import React, { useState } from 'react';
import { UserProfile, SamplePackBundle, SampleTrackPreview, SamplePackTier } from '../types';
import {
  Package,
  Music,
  Play,
  Pause,
  Download,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  Disc,
  Sliders,
  Sparkles,
  ArrowRight,
  Volume2,
  Gift
} from 'lucide-react';

interface SamplePackStoreTabProps {
  profile: UserProfile;
}

const DEFAULT_SAMPLE_PACK: SamplePackBundle = {
  id: 'pack_mirage_vol1',
  title: 'NEON PROTOCOL // Vol. 1',
  tagline: '100% Kostenlose 24-Bit WAV Drums, Analog Serum Presets & Royalty-Free Suno Stems',
  coverBadge: '100% Gratis & Royalty Free',
  totalSamplesCount: 285,
  totalMidiCount: 45,
  totalPresetsCount: 50,
  totalSizeMb: 850,
  compatibility: ['Ableton Live', 'FL Studio', 'Logic Pro', 'BandLab', 'Cubase', 'Bitwig'],
  licenseType: 'Commercial Use Cleared (Spotify, Apple Music, TikTok, YouTube)',
  audioPreviews: [
    {
      id: 'prev_1',
      title: 'Dark Melodic Drop Lead & 808 Loop (126 BPM)',
      category: 'Melodic Loops',
      bpm: 126,
      key: 'F Minor',
      duration: '0:28',
      filesize: '4.8 MB'
    },
    {
      id: 'prev_2',
      title: 'Analog Punchy Sub Kick + Top Loop (Layered)',
      category: 'Kicks & 808s',
      bpm: 126,
      key: 'Key-C',
      duration: '0:16',
      filesize: '2.5 MB'
    },
    {
      id: 'prev_3',
      title: 'Emotional Vocal Chop Atmosphere (Reverb Wet)',
      category: 'Vocal Chops',
      bpm: 128,
      key: 'A Minor',
      duration: '0:22',
      filesize: '3.6 MB'
    },
    {
      id: 'prev_4',
      title: 'Phonk Cowbell & Pluck Arp Serum Preset Showcase',
      category: 'Serum Presets',
      bpm: 130,
      key: 'G Minor',
      duration: '0:30',
      filesize: '5.1 MB'
    },
    {
      id: 'prev_5',
      title: 'Late Night Neo-Soul & Phonk MIDI Progression',
      category: 'MIDI Chord Stacks',
      bpm: 124,
      key: 'D# Minor',
      duration: '0:20',
      filesize: '12 KB'
    }
  ],
  tiers: [
    {
      id: 'tier_starter',
      name: 'Community Starter Edition',
      price: 0,
      includedItems: '120 WAV Samples + 15 MIDI Loops',
      features: [
        '50 Punchy Kicks & 808 Bass Hits (Key-Labeled)',
        '40 Drum Loops (Full, Top, Perc)',
        '30 Synth & Melodic Loops',
        '15 Drag & Drop MIDI Chords',
        '24-Bit / 44.1kHz WAV Format',
        '100% Royalty-Free Lizenz (Keine Kosten)'
      ]
    },
    {
      id: 'tier_producer',
      name: 'Producer All-In Bundle',
      price: 0,
      badge: 'Community Liebling',
      isPopular: true,
      includedItems: '285 WAV Samples + 45 MIDIs + 50 Serum Presets',
      features: [
        'Alles aus der Starter Edition',
        '50 Signature Serum Presets (Bässe, Leads, Plucks)',
        '30 Vocal Chops & Atmosphere Drones',
        '3 komplette DAW-Projektvorlagen (Ableton + FL Studio)',
        'Mixing & Mastering Cheat-Sheet Guide (PDF)',
        'HyperFollow Pre-Save Landingpage Vorlage'
      ]
    },
    {
      id: 'tier_ultimate',
      name: 'Full Studio Stem Archive',
      price: 0,
      badge: '100% Free VIP',
      includedItems: 'Volle Sample Library + Stem-Exporte + Video Breakdowns',
      features: [
        'Alles aus dem Producer All-In Bundle',
        'Stem-Exporte aus 5 fertigen Spotify-Singles',
        '45 Minuten Video-Workflow Breakdown (Ableton/BandLab)',
        'Kostenlose Community-Updates für Vol. 2',
        'Kommerzielle Freigabe für Streaming & Club-Gigs'
      ]
    }
  ]
};

export const SamplePackStoreTab: React.FC<SamplePackStoreTabProps> = ({ profile }) => {
  const [pack, setPack] = useState<SamplePackBundle>(DEFAULT_SAMPLE_PACK);
  const [activePlayingId, setActivePlayingId] = useState<string | null>('prev_1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedTierId, setSelectedTierId] = useState<string>('tier_producer');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const togglePlayAudio = (id: string) => {
    if (activePlayingId === id && isPlaying) {
      setIsPlaying(false);
    } else {
      setActivePlayingId(id);
      setIsPlaying(true);
    }
  };

  const activeTier = pack.tiers.find((t) => t.id === selectedTierId) || pack.tiers[1];

  const handleInstantFreeDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      alert(`Gratis-Download gestartet: ${pack.title} (${activeTier.name}). Alle WAVs und Presets sind 100% rechtefrei für deine Musik nutzbar!`);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Store Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {pack.coverBadge}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              Kompatibel mit {pack.compatibility.slice(0, 4).join(', ')} u.v.m.
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {pack.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
            {pack.tagline}
          </p>
        </div>

        <div className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-800 flex items-center gap-4 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-mono text-neutral-400 block">Kostenloser Umfang</span>
            <span className="text-xl font-black text-emerald-400">
              {pack.totalSamplesCount} WAVs
            </span>
            <span className="text-xs text-neutral-400 block font-mono">
              + {pack.totalPresetsCount} Presets &bull; 0 € (Free)
            </span>
          </div>

          <button
            onClick={handleInstantFreeDownload}
            className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Kostenlos herunterladen
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Audio Previews & Pricing Tiers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Waveform & Audio Player Showcase */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-brand-coral" />
                  Live Audio-Demos & Stems vorhören
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Alle Samples sind verlustfrei in 24-bit gemastert & Key-Labeled.
                </p>
              </div>

              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-bold">
                100% Free
              </span>
            </div>

            {/* List of track previews */}
            <div className="space-y-2.5">
              {pack.audioPreviews.map((track) => {
                const isCurrent = activePlayingId === track.id && isPlaying;
                return (
                  <div
                    key={track.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-neutral-900 text-white border-brand-coral shadow-sm'
                        : 'bg-neutral-50/70 border-neutral-200/80 hover:bg-neutral-100/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => togglePlayAudio(track.id)}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
                            isCurrent
                              ? 'bg-brand-coral text-white'
                              : 'bg-white text-neutral-800 border border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          {isCurrent ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>

                        <div>
                          <h4 className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-neutral-900'}`}>
                            {track.title}
                          </h4>
                          <div
                            className={`flex items-center gap-2 text-[10px] font-mono mt-0.5 ${
                              isCurrent ? 'text-neutral-400' : 'text-neutral-500'
                            }`}
                          >
                            <span className="font-semibold">{track.category}</span>
                            <span>&bull;</span>
                            <span>{track.bpm} BPM</span>
                            <span>&bull;</span>
                            <span>{track.key}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`text-xs font-mono font-bold block ${
                            isCurrent ? 'text-brand-coral' : 'text-neutral-700'
                          }`}
                        >
                          {track.duration}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">{track.filesize}</span>
                      </div>
                    </div>

                    {isCurrent && (
                      <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center gap-1 h-3">
                        {[35, 65, 90, 45, 80, 50, 100, 30, 75, 60, 95, 40, 70, 85, 30, 60].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-brand-coral rounded-full animate-pulse"
                            style={{
                              height: `${h}%`,
                              animationDuration: `${0.35 + (i % 4) * 0.15}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* DAW Compatibility */}
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-600 flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-neutral-800">Unterstützte DAWs:</span>
              <div className="flex flex-wrap gap-1.5">
                {pack.compatibility.map((daw, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-white border border-neutral-200 rounded text-[11px] font-medium"
                  >
                    {daw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-emerald-900">
                100% GEMA-freie kommerzielle Veröffentlichungs-Lizenz (Keine Abos, Keine Kosten)
              </span>
              <p className="mt-0.5 leading-relaxed text-emerald-900/90 text-[11px]">
                Du behältst 100% aller Streaming-Tantiemen auf Spotify, Apple Music & YouTube Content-ID. Dieses Portal ist vollkommen kostenfrei für die weltweite Creator-Community gebaut.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Free Edition Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-coral" />
                Kostenlose Bundle-Auswahl
              </h3>
              <span className="text-xs text-emerald-600 font-bold font-mono">100% Gratis</span>
            </div>

            <div className="space-y-3">
              {pack.tiers.map((tier) => {
                const isSelected = selectedTierId === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-4 rounded-xl border transition cursor-pointer relative ${
                      isSelected
                        ? 'border-brand-coral bg-rose-50/30 ring-1 ring-brand-coral'
                        : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100/60'
                    }`}
                  >
                    {tier.badge && (
                      <span className="absolute -top-2.5 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                        {tier.badge}
                      </span>
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-neutral-900">{tier.name}</h4>
                      <span className="text-sm font-black text-emerald-600 font-mono">
                        KOSTENLOS
                      </span>
                    </div>

                    <p className="text-xs text-brand-coral font-medium mb-3">
                      {tier.includedItems}
                    </p>

                    <ul className="space-y-1.5 text-xs text-neutral-600">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Direct Instant Download Button */}
            <button
              onClick={handleInstantFreeDownload}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>{activeTier.name} (Sofort-Download)</span>
            </button>

            {downloadSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ZIP-Paket freigeschaltet! Viel Spaß beim Beat-Bauen.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
