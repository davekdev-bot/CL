import React, { useState } from 'react';
import { UserProfile, PlatformId } from '../types';
import { PLATFORM_LIMITS_2026 } from '../constants';
import {
  TikTokLogo,
  InstagramLogo,
  YouTubeLogo,
  SpotifyLogo,
  LinkedInLogo,
  XTwitterLogo,
  WhatsAppLogo,
  TelegramLogo,
  ThreadsLogo,
  PinterestLogo,
  FacebookLogo,
  SoundCloudLogo
} from './PlatformLogos';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Zap,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface PlatformHubTabProps {
  profile: UserProfile;
  onSelectPlatformGenerator?: (platform: PlatformId) => void;
}

interface PlatformGuide {
  id: PlatformId;
  name: string;
  category: 'Video & Viral' | 'Audio & Music' | 'Professional & Text' | 'Community & Direct';
  color: string;
  badge: string;
  logo: React.ReactNode;
  specs: {
    ratio: string;
    maxDuration: string;
    idealLength: string;
    audioSpecs: string;
  };
  algorithmHacks2026: string[];
  repurposingFlow: string;
  starterHook: string;
}

export const PlatformHubTab: React.FC<PlatformHubTabProps> = ({ profile, onSelectPlatformGenerator }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('tiktok');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const PLATFORMS_DATA: PlatformGuide[] = [
    {
      id: 'tiktok',
      name: 'TikTok',
      category: 'Video & Viral',
      color: '#000000',
      badge: 'Mass Outreach & 2026 Reset',
      logo: <TikTokLogo className="w-5 h-5 text-neutral-900" />,
      specs: {
        ratio: '9:16 Vertikal (1080 x 1920 px)',
        maxDuration: 'Bis zu 60 Min Upload, 10 Min In-App',
        idealLength: '12 - 24 Sekunden (für Re-Loops) oder 60s+ (Creator Rewards)',
        audioSpecs: 'Commercial Library oder Original Sound mit On-Screen Cutpoint'
      },
      algorithmHacks2026: [
        'Jeder Post wird als neuer Creator bewertet: Followerzahl garantiert keine Views mehr.',
        'Watch-Time Completion-Schwelle: > 65% entscheidet über den viralen Sprung in Welle 2.',
        'Kommentar-Qualität: Echte inhaltliche Diskussionen & Creator-Replies schlagen einfache Bot-Emojis.',
        '72-Stunden Trendfenster: Schnelligkeit schlägt Perfektionismus.'
      ],
      repurposingFlow: 'TikTok Video ohne Wasserzeichen (via CapCut) -> Direkt zu YouTube Shorts & Instagram Reels.',
      starterHook: 'Hör niemals auf Leute, die sagen man braucht X für Erfolg – hier ist der Beweis in Sekunde 3:'
    },
    {
      id: 'instagram',
      name: 'Instagram Reels & Stories',
      category: 'Video & Viral',
      color: '#E1306C',
      badge: 'Saves, DMs & Personal Brand',
      logo: <InstagramLogo className="w-5 h-5 text-rose-600" />,
      specs: {
        ratio: '9:16 Reels (1080 x 1920 px) & 4:5 Feed (1080 x 1350 px)',
        maxDuration: 'Reels bis 3 Min (optimal 7-15s für Viralität)',
        idealLength: '7-12 Sekunden für Audio-Trends / 45s für Tutorials',
        audioSpecs: 'Trending Audio Tagging + Original Audio Master'
      },
      algorithmHacks2026: [
        'Saves und DM-Shares sind die #1 Rankingfaktoren (mehr wert als Likes).',
        'Frame 1 Visual Contrast: Der Feed-Ausschnitt muss sofort ins Auge stechen.',
        'Karussell-Dokumente (4:5) generieren bis zu 3-fach längere Verweildauern.',
        'Story-Interaktionen (Polls, Slider, Q&A) wärmen den Algorithmus für neue Reels auf.'
      ],
      repurposingFlow: 'Bestes Reel der Woche -> Screenshots der Kernaussagen als 5-Slide Karussell posten.',
      starterHook: 'Speichere dir diesen Beitrag für später ab 📌 (Das spart dir 10 Stunden Arbeit):'
    },
    {
      id: 'shorts',
      name: 'YouTube Shorts',
      category: 'Video & Viral',
      color: '#FF0000',
      badge: 'Search Traffic & Abo-Wachstum',
      logo: <YouTubeLogo className="w-5 h-5 text-red-600" />,
      specs: {
        ratio: '9:16 Vertikal (1080 x 1920 px)',
        maxDuration: 'Bis zu 3 Minuten (seit Okt 2024)',
        idealLength: '25 - 45 Sekunden',
        audioSpecs: '100% Rechtefreies Audio oder offizielle YouTube Audio Library'
      },
      algorithmHacks2026: [
        '"Viewed vs Swiped away"-Quote muss über 75% liegen für den großen Vorstoß.',
        'Shorts dienen als Akquise-Kanal für Longform-Videos: Nutze das "Verwandtes Video" Verlinkungs-Feature!',
        'SEO-Titel mit Suchintention: YouTube ist nach Google die zweitgrößte Suchmaschine der Welt.',
        'Klare End-Loop-Übergänge halten die Retention über 100%.'
      ],
      repurposingFlow: 'Shorts Teaser -> Verlinkt direkt auf das 10-Minuten Tutorial / den kompletten Song auf YouTube.',
      starterHook: 'Das ist die 1 Methode, die 90% aller Anfänger komplett übersehen:'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      category: 'Professional & Text',
      color: '#0A66C2',
      badge: 'B2B, Consulting & Thought Leadership',
      logo: <LinkedInLogo className="w-5 h-5 text-blue-700" />,
      specs: {
        ratio: 'PDF-Karusselle (1080 x 1350 px) & Text + Single Image',
        maxDuration: 'Bis zu 3.000 Zeichen pro Post',
        idealLength: '150 - 250 Wörter Text oder 6-8 Slides PDF',
        audioSpecs: 'Videos mit zwingenden Hardcoded-Untertiteln (90% schauen stumm)'
      },
      algorithmHacks2026: [
        'Die ersten 2 Zeilen vor "...mehr anzeigen" entscheiden über 80% der Reichweite.',
        'PDF-Dokumente (Slide Decks) erzielen die höchste organische Reichweite.',
        'Keine externen Links im Hauptpost: Verlinke Ressourcen im ersten Kommentar oder Profil.',
        'Persönliche Learnings & "Build in Public" schlagen trockene Pressemitteilungen.'
      ],
      repurposingFlow: 'LinkedIn PDF Guide -> Inverted als Instagram-Karussell recyceln.',
      starterHook: 'In den letzten Monaten habe ich in der Praxis beobachtet, dass viele an den falschen Hebeln drehen:'
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      category: 'Professional & Text',
      color: '#000000',
      badge: 'Echtzeit-Debatten & Tech-Radar',
      logo: <XTwitterLogo className="w-5 h-5 text-neutral-900" />,
      specs: {
        ratio: '16:9 Video oder Quadratische Screenshots',
        maxDuration: '280 Zeichen (Free) / Bis zu 25.000 (Premium)',
        idealLength: '1 starker Hook-Tweet + 4-5 Antwort-Tweets als Thread',
        audioSpecs: 'Kurze Audio-Snippets oder Video-Trailer'
      },
      algorithmHacks2026: [
        'Threads mit provokanter These in Tweet 1 gehen viral; Verlinkungen erst in Tweet 5.',
        'Antworte innerhalb von 10 Minuten auf Top-Replies für den Re-Engagement-Boost.',
        'Screenshots von Daten, Dashboards oder Code-Snippets erzielen höchste Bookmark-Raten.',
        'Grok AI scannt Relevanz und Realtime-Kontext in den ersten 60 Minuten.'
      ],
      repurposingFlow: 'Bester Tweet-Thread -> Zusammenfassen als Skript für ein 45-Sekunden TikTok.',
      starterHook: 'Niemand in der Branche gibt es offen zu, aber hier ist die ungeschminkte Wahrheit über X:'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp & Telegram Kanäle',
      category: 'Community & Direct',
      color: '#25D366',
      badge: 'Direkte Conversion & Fan-Treue',
      logo: <WhatsAppLogo className="w-5 h-5 text-emerald-600" />,
      specs: {
        ratio: 'Fotos, Sprachnachrichten & Dokumente',
        maxDuration: 'Direktnachrichten aufs Handy',
        idealLength: 'Maximal 1-2 fokussierte Updates pro Tag (Anti-Spam!)',
        audioSpecs: 'Exklusive Sprachnotizen & MP3-Demos vor offiziellem Release'
      },
      algorithmHacks2026: [
        '100% organische Reichweite: Keine Algorithmus-Drosselung wie im Social Feed.',
        'Umfragen & Emojis-Reaktionen halten den Kanal in der Favoritenliste der Abonnenten.',
        'Nahbar wie ein guter Freund: Exklusive Sprachnotizen ("Behind the Beat") schaffen unbrechbare Bindung.',
        'Höchste Klickrate (CTR > 15%) für Produkt-Launches, Merch & Tickets.'
      ],
      repurposingFlow: 'TikTok Video-Hook -> "Den Link & das volle Sample findest du jetzt im kostenlosen Telegram/WhatsApp Kanal".',
      starterHook: '🚨 Kurzes Update direkt aus dem Studio: Ich habe gerade etwas getestet, das alles verändert...'
    }
  ];

  const activeGuide = PLATFORMS_DATA.find((p) => p.id === selectedPlatform) || PLATFORMS_DATA[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Universal Portal Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Universal Creator Portal: Plattform-Enzyklopädie 2026
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              100% Kostenlos & werbefrei. Alle Algorithmus-Regeln, Videoformate, Hook-Einstiege und Repurposing-Workflows für jede Plattform auf einen Blick.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Free Open Resource
            </span>
          </div>
        </div>

        {/* Platform Grid Pills with Real Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-2 border-t border-neutral-100">
          {PLATFORMS_DATA.map((p) => {
            const isSelected = selectedPlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100/80 text-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-neutral-800 text-white' : 'bg-white shadow-2xs'}`}>
                    {p.logo}
                  </div>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-neutral-400' : 'text-neutral-400'}`}>
                    2026
                  </span>
                </div>
                <span className="text-xs font-bold leading-tight truncate">{p.name}</span>
                <span className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {p.category.split('&')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Platform Detail Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Specs & Technical Blueprint */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-neutral-100">{activeGuide.logo}</div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">{activeGuide.name}</h3>
                  <span className="text-[10px] text-brand-coral font-semibold">{activeGuide.badge}</span>
                </div>
              </div>
            </div>

            {/* Technical Specs Cards */}
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                  Optimales Bild-Format:
                </span>
                <strong className="text-neutral-900">{activeGuide.specs.ratio}</strong>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                  Maximale & Ideale Dauer:
                </span>
                <div className="text-neutral-700">
                  <span>Limit: {activeGuide.specs.maxDuration}</span>
                  <span className="block font-semibold text-brand-coral mt-0.5">
                    Empfohlen: {activeGuide.specs.idealLength}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                  Audio & Sound-Regeln:
                </span>
                <p className="text-neutral-700 leading-snug">{activeGuide.specs.audioSpecs}</p>
              </div>
            </div>

            {/* Repurposing Flow */}
            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-blue-900 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                Cross-Plattform Repurposing Ablauf
              </span>
              <p className="text-neutral-700 leading-relaxed text-[11px]">{activeGuide.repurposingFlow}</p>
            </div>
          </div>
        </div>

        {/* Right: 2026 Algorithm Hacks & Starter Hooks */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-coral" />
                Die 4 wichtigsten Algorithmus-Hebel für {activeGuide.name}
              </h3>
              <span className="text-[11px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                Stand 2026
              </span>
            </div>

            {/* Algorithm list */}
            <div className="space-y-2.5">
              {activeGuide.algorithmHacks2026.map((hack, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-neutral-50/70 border border-neutral-200/80 text-xs text-neutral-800 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{hack}</p>
                </div>
              ))}
            </div>

            {/* Ready to use Hook Formula */}
            <div className="p-4 bg-neutral-900 text-white rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 text-[11px] uppercase tracking-wider">
                  Erprobte Einstiegszeile für {activeGuide.name}:
                </span>
                <button
                  onClick={() => handleCopy(activeGuide.starterHook, activeGuide.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white cursor-pointer"
                >
                  {copiedText === activeGuide.id ? (
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

              <p className="text-neutral-100 italic font-medium leading-relaxed bg-neutral-800/80 p-3 rounded-lg border border-neutral-700">
                "{activeGuide.starterHook}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
