import React, { useState } from 'react';
import { UserProfile, MusicGenreId, MusicGenreSpec } from '../types';
import { GENRE_SPECS_DATABASE } from '../constants';
import { generateAiContent } from '../services/geminiService';
import {
  Disc3,
  Sliders,
  Sparkles,
  Volume2,
  Copy,
  Check,
  Zap,
  Activity,
  Layers,
  Flame,
  Radio,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  Play
} from 'lucide-react';

interface GenreNeuroEngineTabProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateTab: (tabKey: any) => void;
}

export const GenreNeuroEngineTab: React.FC<GenreNeuroEngineTabProps> = ({
  profile,
  onUpdateProfile,
  onNavigateTab
}) => {
  const [selectedGenreId, setSelectedGenreId] = useState<MusicGenreId>(profile.musicGenre || 'phonk_drift');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [customSunoPrompt, setCustomSunoPrompt] = useState<string>('');
  const [isGeneratingAiPrompt, setIsGeneratingAiPrompt] = useState<boolean>(false);

  const activeGenre: MusicGenreSpec = GENRE_SPECS_DATABASE[selectedGenreId] || GENRE_SPECS_DATABASE.phonk_drift;

  const handleSelectGenre = (genreId: MusicGenreId) => {
    setSelectedGenreId(genreId);
    onUpdateProfile({
      ...profile,
      musicGenre: genreId
    });
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateCustomSunoPrompt = async () => {
    setIsGeneratingAiPrompt(true);
    try {
      const prompt = `Erstelle einen ultra-präzisen, viralen Suno AI v4 Prompt für das Genre "${activeGenre.name}".
BPM: ${activeGenre.bpmRange}
Tonart-Empfehlung: ${activeGenre.primaryKeySignatures.join(', ')}
Zielgruppe: ${activeGenre.audienceDemographic}

Formuliere den Prompt auf Englisch in maximal 200 Zeichen, optimiert für knackige Vocals, saubere Instrumententrennung und clubtauglichen Bass.`;

      const response = await generateAiContent(
        prompt,
        'Du bist der weltbeste Prompt-Engineer für Suno, Udio und moderne Audio-Synthese.'
      );
      setCustomSunoPrompt(response.trim());
    } catch (e) {
      setCustomSunoPrompt(activeGenre.sunoMasterPromptTemplate);
    } finally {
      setIsGeneratingAiPrompt(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{activeGenre.icon}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              Genre-Spezifische Neuro-Engine
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            {activeGenre.name} &bull; Algorithmus-Synapsen
          </h2>
          <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
            Jedes Genre hat eigene Gesetze: Phonk lebt von aggressiven 2-Sekunden Drops, Lo-Fi von 100% Re-Loops, Melodic Techno von Club-Stereobreite. Kalibriere deinen Sound für maximale Ausspielung.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-right">
            <span className="text-[10px] uppercase font-mono text-neutral-400 block">Optimaler Drop-Start</span>
            <span className="text-xl font-black text-brand-coral font-mono">
              {activeGenre.algorithmWeights.dropWindowSeconds === 0 ? 'Sanfter Einstieg' : `${activeGenre.algorithmWeights.dropWindowSeconds}s`}
            </span>
            <span className="text-[10px] text-neutral-400 block font-mono">
              Master: {activeGenre.algorithmWeights.recommendedLufsMaster} LUFS
            </span>
          </div>
        </div>
      </div>

      {/* Genre Selector Pills */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            Wähle dein Haupt-Genre (Aktualisiert das gesamte System):
          </span>
          <span className="text-[11px] text-brand-coral font-semibold">
            {activeGenre.badge}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-1">
          {(Object.keys(GENRE_SPECS_DATABASE) as MusicGenreId[]).map((gId) => {
            const item = GENRE_SPECS_DATABASE[gId];
            const isSelected = selectedGenreId === gId;
            return (
              <button
                key={gId}
                onClick={() => handleSelectGenre(gId)}
                className={`p-2.5 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-brand-coral bg-rose-50 text-brand-coral font-bold shadow-xs'
                    : 'border-neutral-200 bg-neutral-50/70 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <span className="text-xl mb-1">{item.icon}</span>
                <span className="text-xs font-bold leading-tight truncate">{item.name.split('/')[0]}</span>
                <span className="text-[10px] font-mono text-neutral-400 truncate mt-0.5">{item.bpmRange.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Genre Specifications & Algorithmic Weights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Suno Prompt Master & DAW Mixing Chain */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-coral" />
                <h3 className="text-sm font-bold text-neutral-900">
                  Suno v4 Master-Prompt ({activeGenre.name})
                </h3>
              </div>
              <button
                onClick={handleGenerateCustomSunoPrompt}
                disabled={isGeneratingAiPrompt}
                className="text-xs font-semibold text-brand-coral hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isGeneratingAiPrompt ? 'Generiere...' : 'KI-Variante bauen'}
              </button>
            </div>

            {/* Prompt Box */}
            <div className="p-3.5 bg-neutral-900 text-white rounded-xl space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-neutral-400 text-[10px] uppercase">
                <span>Prompt für Suno / Udio / BandLab:</span>
                <button
                  onClick={() => handleCopy(customSunoPrompt || activeGenre.sunoMasterPromptTemplate, 'prompt')}
                  className="text-amber-300 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  Kopieren
                </button>
              </div>
              <p className="text-neutral-100 leading-relaxed font-sans font-medium">
                "{customSunoPrompt || activeGenre.sunoMasterPromptTemplate}"
              </p>
            </div>

            {/* DAW Mixing & Mastering Chain Blueprint */}
            <div className="space-y-2 pt-1 text-xs">
              <h4 className="font-bold text-neutral-900 flex items-center gap-1.5 uppercase text-[11px] text-neutral-500">
                <Sliders className="w-3.5 h-3.5 text-brand-coral" />
                Mixing & Mastering Blueprint für {activeGenre.name}
              </h4>
              <div className="space-y-1.5">
                {activeGenre.dawMixChainGuide.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-neutral-800 flex items-start gap-2.5"
                  >
                    <span className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Viral Video Execution Recipe */}
            <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200 text-xs space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-brand-coral flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                Erprobtes Video-Rezept für diesen Sound:
              </span>
              <p className="text-neutral-800 leading-relaxed font-sans">
                {activeGenre.viralVideoConcept}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Algorithmic Multipliers & Platform Ranking Weights */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                Algorithmus-Gewichtung (TikTok & Spotify)
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Worauf der Algorithmus bei <strong>{activeGenre.name}</strong> am stärksten reagiert:
              </p>
            </div>

            {/* Algorithmic Weight Bars */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Loop & Wiederholungs-Rate (Re-Plays):</span>
                  <span className="font-mono text-brand-coral font-bold">
                    {activeGenre.algorithmWeights.loopReplayImportance}%
                  </span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-coral h-full rounded-full transition-all"
                    style={{ width: `${activeGenre.algorithmWeights.loopReplayImportance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Completion Rate (Vollständige Watch-Time):</span>
                  <span className="font-mono text-emerald-600 font-bold">
                    {activeGenre.algorithmWeights.completionImportance}%
                  </span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${activeGenre.algorithmWeights.completionImportance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Saves & Shares (DM-Weiterleitungen):</span>
                  <span className="font-mono text-blue-600 font-bold">
                    {activeGenre.algorithmWeights.shareSaveImportance}%
                  </span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all"
                    style={{ width: `${activeGenre.algorithmWeights.shareSaveImportance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Kommentar-Diskussionen & Reply-Tiefe:</span>
                  <span className="font-mono text-amber-600 font-bold">
                    {activeGenre.algorithmWeights.commentDiscussionImportance}%
                  </span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all"
                    style={{ width: `${activeGenre.algorithmWeights.commentDiscussionImportance}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Demographic and Monetization Blueprint */}
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-neutral-400 block">
                  Zielgruppe & Fan-Profil:
                </span>
                <p className="text-neutral-700 font-medium">{activeGenre.audienceDemographic}</p>
              </div>

              <div className="pt-2 border-t border-neutral-200">
                <span className="text-[10px] font-bold uppercase text-emerald-700 block">
                  Bester Monetarisierungs-Weg für dieses Genre:
                </span>
                <p className="text-neutral-800 font-semibold">{activeGenre.monetizationPathway}</p>
              </div>
            </div>

            {/* Quick action buttons linking to tools */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => onNavigateTab('audio_remixer')}
                className="w-full py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Diesen Sound im Audio Remixer bearbeiten</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigateTab('music')}
                className="w-full py-2 px-3 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Release-Fristen im Kalender berechnen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
