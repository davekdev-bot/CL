import React, { useState } from 'react';
import { UserProfile, TrendItem, TrendCategory } from '../types';
import { NICHES_DATA } from '../constants';
import {
  Flame,
  Search,
  Music2,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Filter,
  Copy,
  Check,
  Compass,
  Zap,
  BarChart2
} from 'lucide-react';

interface TrendRadarTabProps {
  profile: UserProfile;
  onSendToGenerator?: (topic: string) => void;
}

const TREND_DATABASE: TrendItem[] = [
  // Rising TikTok Audio Formats
  {
    id: 'tr_a1',
    category: 'audio',
    title: 'The 3-Second Drop Cut (Loop Beat)',
    velocity: '+195% diese Woche',
    velocityLevel: 'breakout',
    nichePillar: 'Behind the Beat & Production',
    platform: 'TikTok',
    description:
      'Kurze, hypnotische Phonk/Deep House Loops mit einem harten Bass-Drop bei exakt 0:03. Zuschauer verweilen länger, weil der Loop nahtlos ins Video übergeht.',
    actionSnippet: 'Starte das Video mit einem stummen Handgriff, Sound knallt bei Sekunde 3 rein.',
    metrics: { volume: '1.2M Posts', competition: 'Mittel' }
  },
  {
    id: 'tr_a2',
    category: 'audio',
    title: 'Nostalgic Slowed + Reverb 90s Flips',
    velocity: '+140% dieser Monat',
    velocityLevel: 'rising',
    nichePillar: 'Remix & Sample Flipping',
    platform: 'TikTok',
    description:
      'Alte Vintage-Hits (90s Eurodance / RnB) um 20% verlangsamt mit starkem Raumhall. Extrem hohe Save- und Share-Rate in der Generation Z.',
    actionSnippet: 'Suno / DAW Prompt: 90s vocal sample pitched down -2 semitones with lush cathedral reverb.',
    metrics: { volume: '850K Posts', competition: 'Niedrig' }
  },
  {
    id: 'tr_a3',
    category: 'audio',
    title: 'Aggressive Brazilian Phonk & Drift Stems',
    velocity: '+320% Breakout',
    velocityLevel: 'breakout',
    nichePillar: 'High Energy & Motivation',
    platform: 'Multi',
    description:
      'Gecuttete Cowbell-Melodien mit extrem verzerrten 808-Kicks. Perfekt für Gym-Content, Gaming-Clips und Car-Edits.',
    actionSnippet: 'Verwende den Track als Hintergrund für High-Speed Tutorials oder Transformationen.',
    metrics: { volume: '2.5M Posts', competition: 'Hoch' }
  },

  // High-Performing YouTube Search Queries
  {
    id: 'tr_y1',
    category: 'youtube_search',
    title: 'Suno AI vs Ableton: Ganzen Song fertigstellen',
    velocity: '+280% Suchvolumen',
    velocityLevel: 'breakout',
    nichePillar: 'KI-Tools & Workflow',
    platform: 'YouTube',
    description:
      'Explodierende Nachfrage nach praktischen Tutorials: Wie exportiert man Stems aus Suno und mastert sie in einer echten DAW für Spotify?',
    actionSnippet: 'Titel-Formel: "Ich habe einen Suno Track in Ableton gemastert... Das Ergebnis ist krank!"',
    metrics: { volume: '45K / Monat', competition: 'Niedrig' }
  },
  {
    id: 'tr_y2',
    category: 'youtube_search',
    title: 'DistroKid Spotify Release Strategie 2026',
    velocity: '+115% Evergreen',
    velocityLevel: 'evergreen',
    nichePillar: 'Monetarisierung & Release',
    platform: 'YouTube',
    description:
      'Musiker suchen aktiv nach der richtigen Vorlaufzeit (3-4 Wochen) für den offiziellen Spotify Editorial Playlist Pitch.',
    actionSnippet: 'Zeige deinen eigenen HyperFollow Pre-Save Screen und die Freischaltung im Spotify for Artists Dashboard.',
    metrics: { volume: '62K / Monat', competition: 'Mittel' }
  },
  {
    id: 'tr_y3',
    category: 'youtube_search',
    title: 'CapCut Auto-Captions Viral Hack (Highlight Farben)',
    velocity: '+90% Stetig',
    velocityLevel: 'rising',
    nichePillar: 'Video-Schnitt & Content Hacks',
    platform: 'YouTube',
    description:
      'Creator wollen wissen, wie man Wörter automatisch in Gelb/Grün aufleuchten lässt, um die mobile Retention über 80% zu halten.',
    actionSnippet: '60s Step-by-Step Screen-Recording direkt auf dem Smartphone.',
    metrics: { volume: '110K / Monat', competition: 'Mittel' }
  },

  // Viral Hook Patterns
  {
    id: 'tr_h1',
    category: 'hook_pattern',
    title: 'Der "Negative Verlust-Filter" Hook',
    velocity: 'Top-Performer Q1/Q2',
    velocityLevel: 'rising',
    nichePillar: 'Fehler & Mythbusting',
    platform: 'Multi',
    description:
      'Psychologischer Trigger: Menschen reagieren 2,5-mal stärker auf die Vermeidung von Verlusten als auf Gewinne.',
    actionSnippet: '"Wenn du noch immer X machst, ruinierst du dir deine Chance auf Y. Hier ist der Beweis..."',
    metrics: { volume: 'Retention +35%', competition: 'Niedrig' }
  },
  {
    id: 'tr_h2',
    category: 'hook_pattern',
    title: 'Die "Geheime Website / Unfairer Vorteil" Formel',
    velocity: '+170% Saves & Shares',
    velocityLevel: 'breakout',
    nichePillar: 'Tools & Hacks',
    platform: 'TikTok',
    description:
      'Starker DM-Share Magnet. Zuschauer leiten das Video an Freunde weiter oder speichern es in den Favoriten.',
    actionSnippet: '"3 Webseiten die sich illegal anfühlen zu kennen – besonders Nummer 2 spart dir 10 Stunden."',
    metrics: { volume: 'Save-Rate > 12%', competition: 'Mittel' }
  },
  {
    id: 'tr_h3',
    category: 'hook_pattern',
    title: 'Der "Beweis vor der Behauptung" Hook',
    velocity: 'Hohe Glaubwürdigkeit',
    velocityLevel: 'evergreen',
    nichePillar: 'Behind the Scenes & Case Studies',
    platform: 'Instagram',
    description:
      'Zeige das fertige Ergebnis (z.B. Analytics-Graph, Spotify Streams, fertiges Artwork) in der allerersten Sekunde, bevor du erklärst wie es ging.',
    actionSnippet: '"Wie wir von 0 auf 50.000 monatliche Hörer gekommen sind – ganz ohne Plattenvertrag:"',
    metrics: { volume: 'Completion +28%', competition: 'Niedrig' }
  }
];

export const TrendRadarTab: React.FC<TrendRadarTabProps> = ({ profile, onSendToGenerator }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | TrendCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeNiche = NICHES_DATA.find((n) => n.id === profile.niche) || NICHES_DATA[0];

  const filteredTrends = TREND_DATABASE.filter((trend) => {
    const matchesCat = selectedCategory === 'all' || trend.category === selectedCategory;
    const matchesSearch =
      trend.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trend.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trend.nichePillar.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Trend Radar: Audio-Formate, Suchbegriffe & Hook-Muster
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Aktuelle Hebel für deine Nische: <strong className="text-neutral-800">{activeNiche.title}</strong>. Schneller auf Trends aufspringen bevor die Sättigung eintritt.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Zap className="w-3 h-3 text-emerald-600" />
              Algorithmus-Stand Q2 2026
            </span>
          </div>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Trends nach Audio, Keywords oder Nischen-Säule filtern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === 'all'
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              Alle ({TREND_DATABASE.length})
            </button>
            <button
              onClick={() => setSelectedCategory('audio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === 'audio'
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              🎵 Audio & Sounds
            </button>
            <button
              onClick={() => setSelectedCategory('youtube_search')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === 'youtube_search'
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              🔍 YouTube Such-Keywords
            </button>
            <button
              onClick={() => setSelectedCategory('hook_pattern')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === 'hook_pattern'
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              ⚡ Virale Hook-Muster
            </button>
          </div>
        </div>
      </div>

      {/* Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTrends.map((trend) => {
          const isBreakout = trend.velocityLevel === 'breakout';
          const isRising = trend.velocityLevel === 'rising';

          return (
            <div
              key={trend.id}
              className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition"
            >
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isBreakout
                        ? 'bg-rose-100 text-rose-800'
                        : isRising
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {trend.velocity}
                  </span>

                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded border border-neutral-100">
                    {trend.platform}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                    {trend.title}
                  </h3>
                  <span className="text-[11px] font-medium text-brand-coral block mt-0.5">
                    Säule: {trend.nichePillar}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {trend.description}
                </p>

                {/* Action Snippet Box */}
                <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase text-neutral-400">
                    <span>Praxis-Anwendung</span>
                    <button
                      onClick={() => handleCopySnippet(trend.actionSnippet, trend.id)}
                      className="text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === trend.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          Kopiert
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Kopieren
                        </>
                      )}
                    </button>
                  </div>
                  <p className="italic text-neutral-700 font-sans">
                    "{trend.actionSnippet}"
                  </p>
                </div>
              </div>

              {/* Footer Metrics */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>Volumen: <strong className="text-neutral-700">{trend.metrics.volume}</strong></span>
                <span>Wettbewerb: <strong className="text-neutral-700">{trend.metrics.competition}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
