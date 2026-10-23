import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, LayoutDashboard, Route, Disc3, BrainCircuit } from 'lucide-react';
import { getAiProvider, setAiProvider, type AiProvider } from '../services/geminiService';

export type TabKey =
  | 'creator_desk'
  | 'genre_engine'
  | 'career_routes'
  | 'thumbnails'
  | 'voice_teleprompter'
  | 'deal_simulator'
  | 'transcript_pipeline'
  | 'autonomy_roadmap'
  | 'repurposer_studio'
  | 'storyboard'
  | 'viral_audit'
  | 'competitor_heatmap'
  | 'audio_remixer'
  | 'revenue'
  | 'licensing'
  | 'contest'
  | 'samplepack'
  | 'collab'
  | 'scripts'
  | 'carousel'
  | 'split'
  | 'radar'
  | 'generator'
  | 'strategies'
  | 'tools'
  | 'score'
  | 'music'
  | 'epk'
  | 'profile'
  | 'plan';

interface NavbarProps {
  activeTab: TabKey;
  onSelectTab: (tabKey: any) => void;
  openAiModal: () => void;
  openUniversalNavigator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  openAiModal,
  openUniversalNavigator
}) => {
  const [aiProvider, updateAiProvider] = useState<AiProvider>('gemini');
  useEffect(() => { updateAiProvider(getAiProvider()); }, []);
  const handleAiProviderChange = (provider: AiProvider) => {
    setAiProvider(provider);
    updateAiProvider(provider);
  };
  const tabs: { key: TabKey; label: string; badge?: string; isHighlight?: boolean }[] = [
    { key: 'creator_desk', label: 'Mein Desk', badge: 'Cockpit', isHighlight: true },
    { key: 'genre_engine', label: 'Genre Engine', badge: 'Neuro', isHighlight: true },
    { key: 'career_routes', label: 'Schlachtpläne & Routen', badge: 'Synapsen', isHighlight: true },
    { key: 'transcript_pipeline', label: 'Transkript zu Clips', badge: '100% Free' },
    { key: 'thumbnails', label: 'Thumbnail Studio', badge: 'A/B CTR' },
    { key: 'voice_teleprompter', label: 'Voice Prompter', badge: 'Live Mic' },
    { key: 'deal_simulator', label: 'Deal Simulator', badge: 'Major vs DIY' },
    { key: 'autonomy_roadmap', label: 'Autonomie Roadmap', badge: '0€ to Own' },
    { key: 'repurposer_studio', label: 'Clips Repurposer', badge: 'CapCut SRT' },
    { key: 'storyboard', label: 'Storyboard Studio', badge: 'Kamera' },
    { key: 'viral_audit', label: 'TikTok 2026 Audit', badge: '5 Regeln' },
    { key: 'competitor_heatmap', label: 'Competitor Radar', badge: 'Heatmap' },
    { key: 'audio_remixer', label: 'Audio Remixer', badge: 'Stem Lab' },
    { key: 'revenue', label: 'Umsatz-Rechner', badge: 'Forecast' },
    { key: 'licensing', label: 'Sync & Lizenz', badge: 'Vertrag' },
    { key: 'contest', label: 'Viral Contest', badge: 'Duett' },
    { key: 'samplepack', label: 'Sample Store', badge: 'WAV/MIDI' },
    { key: 'collab', label: 'Collab Finder', badge: 'Match' },
    { key: 'scripts', label: 'Script Studio', badge: '15-60s' },
    { key: 'carousel', label: 'Karussell Builder', badge: 'IG/PDF' },
    { key: 'split', label: 'Hook A/B Tester', badge: 'Score' },
    { key: 'radar', label: 'Trend Radar', badge: 'Live' },
    { key: 'generator', label: 'Generator' },
    { key: 'strategies', label: 'Strategien' },
    { key: 'tools', label: 'Tools' },
    { key: 'score', label: 'Score' },
    { key: 'music', label: 'Musik Release', badge: 'VÖ' },
    { key: 'epk', label: 'EPK Kit', badge: 'Presse' },
    { key: 'profile', label: 'Profil' },
    { key: 'plan', label: 'Plan' },
  ];

  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* Main Title & Tagline matching OCR style */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-brand-coral" />
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                Creator Compass
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Dein autonomes All-in-One Creator OS. 100% Kostenlos, de-platforming-sicher & ohne Abofallen.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <label className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-xs text-neutral-700" title="Wählt aus, welches serverseitig konfigurierte Modell die KI-Tools verwenden.">
              <BrainCircuit className="w-4 h-4 text-neutral-500" />
              <span>KI</span>
              <select
                aria-label="KI-Anbieter auswählen"
                className="bg-transparent font-semibold outline-none"
                value={aiProvider}
                onChange={(event) => handleAiProviderChange(event.target.value as AiProvider)}
              >
                <option value="gemini">Gemini</option>
                <option value="openai">OpenAI</option>
              </select>
            </label>
            <button
              onClick={openUniversalNavigator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition cursor-pointer"
              title="Alle Module durchsuchen"
            >
              <Compass className="w-4 h-4 text-brand-coral" />
              <span>Navigator</span>
            </button>

            <button
              onClick={openAiModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>KI-Copilot</span>
            </button>
          </div>
        </div>

        {/* Tab Pills matching the OCR look */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onSelectTab(tab.key)}
                className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 border whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-brand-coral text-brand-coral bg-rose-50/50 shadow-xs font-semibold'
                    : tab.isHighlight
                    ? 'border-neutral-300 bg-neutral-50 text-neutral-900 font-bold hover:bg-neutral-100'
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`ml-1.5 text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full border ${
                    isActive 
                      ? 'bg-rose-100 text-brand-coral border-rose-200' 
                      : tab.isHighlight
                      ? 'bg-neutral-200 text-neutral-800 border-neutral-300'
                      : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
