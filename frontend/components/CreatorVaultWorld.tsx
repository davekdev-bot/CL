import React, { useState } from 'react';
import {
  ArrowLeft, ArrowRight, AudioLines, BarChart3, BookOpen, BriefcaseBusiness,
  Camera, ChartNoAxesCombined, Clapperboard, Compass, Disc3, FileText,
  Film, FolderKanban, Headphones, LibraryBig, Lightbulb, Mic, Music2,
  Radar, Route, Sparkles, TrendingUp, Users, Video, WandSparkles, Wrench
} from 'lucide-react';
import type { TabKey } from './Navbar';

type RoomKey = 'music' | 'video' | 'office' | 'library';
type ModuleLink = { key: TabKey; label: string; description: string; icon: React.ComponentType<{ className?: string }> };
type Room = {
  key: RoomKey; title: string; subtitle: string; description: string;
  icon: React.ComponentType<{ className?: string }>; accent: string; wallpaper: string; modules: ModuleLink[];
};

const rooms: Room[] = [
  { key: 'music', title: 'Musikstudio', subtitle: 'Sound · Releases · Zusammenarbeit',
    description: 'Entwickle deinen Sound, plane Veröffentlichungen und baue deine Musik-Karriere auf.',
    icon: Disc3, accent: 'from-rose-500/25 via-red-950/30 to-slate-950', wallpaper: '/wallpapers/music-studio.jpg',
    modules: [
      { key: 'genre_engine', label: 'Genre Neuro Engine', description: 'Sound und Genre analysieren', icon: AudioLines },
      { key: 'music', label: 'Musik Release', description: 'Dein Release-Playbook', icon: Music2 },
      { key: 'audio_remixer', label: 'Audio Remixer', description: 'Audio und Stems bearbeiten', icon: Headphones },
      { key: 'samplepack', label: 'Sample Store', description: 'Sample Packs und Assets', icon: FolderKanban },
      { key: 'licensing', label: 'Sync & Lizenz', description: 'Musik für Medien platzieren', icon: FileText },
      { key: 'collab', label: 'Collab Finder', description: 'Passende Kollaborationen finden', icon: Users },
      { key: 'deal_simulator', label: 'Deal Simulator', description: 'Major- und DIY-Deals vergleichen', icon: BriefcaseBusiness },
    ] },
  { key: 'video', title: 'Videostudio', subtitle: 'Clips · Visuals · Storytelling',
    description: 'Mach aus Ideen Inhalte: vom ersten Hook bis zum fertigen Video und Kurzclip.',
    icon: Clapperboard, accent: 'from-violet-500/25 via-indigo-950/30 to-slate-950', wallpaper: '/wallpapers/video-studio.jpg',
    modules: [
      { key: 'thumbnails', label: 'Thumbnail Studio', description: 'Klickstarke Cover gestalten', icon: Camera },
      { key: 'storyboard', label: 'Storyboard Studio', description: 'Szenen und Kamera planen', icon: Film },
      { key: 'scripts', label: 'Script Studio', description: 'Skripte für Kurzvideos schreiben', icon: FileText },
      { key: 'voice_teleprompter', label: 'Voice Prompter', description: 'Sprechen und aufnehmen', icon: Mic },
      { key: 'repurposer_studio', label: 'Clips Repurposer', description: 'Inhalte neu verwerten', icon: Video },
      { key: 'transcript_pipeline', label: 'Transkript zu Clips', description: 'Aus Transkripten Clips machen', icon: WandSparkles },
      { key: 'carousel', label: 'Karussell Builder', description: 'Posts und Slides erstellen', icon: BookOpen },
      { key: 'split', label: 'Hook A/B Tester', description: 'Hooks vergleichen und testen', icon: ChartNoAxesCombined },
      { key: 'contest', label: 'Viral Contest', description: 'Duett- und Community-Ideen', icon: Sparkles },
    ] },
  { key: 'office', title: 'Büro', subtitle: 'Karriere · Planung · Strategie',
    description: 'Plane deine nächsten Schritte und bring deine Creator-Karriere in eine klare Richtung.',
    icon: BriefcaseBusiness, accent: 'from-amber-500/20 via-orange-950/25 to-slate-950', wallpaper: '/wallpapers/office.jpg',
    modules: [
      { key: 'career_routes', label: 'Schlachtpläne & Routen', description: 'Deinen Karriereweg planen', icon: Route },
      { key: 'profile', label: 'Profil', description: 'Dein Creator-Profil pflegen', icon: Users },
      { key: 'plan', label: 'Plan', description: 'Deine nächsten Schritte organisieren', icon: FolderKanban },
      { key: 'autonomy_roadmap', label: 'Autonomie Roadmap', description: 'Unabhängigkeit aufbauen', icon: TrendingUp },
      { key: 'strategies', label: 'Strategien', description: 'Plattformen und Vorgehensweisen', icon: Lightbulb },
      { key: 'epk', label: 'EPK Kit', description: 'Pressekit und Künstlerinfos', icon: FileText },
    ] },
  { key: 'library', title: 'Bibliothek & Analyse', subtitle: 'Wissen · Trends · Zahlen',
    description: 'Sammle Erkenntnisse, erkenne Chancen und bewerte, was tatsächlich funktioniert.',
    icon: LibraryBig, accent: 'from-cyan-500/20 via-sky-950/25 to-slate-950', wallpaper: '/wallpapers/library.jpg',
    modules: [
      { key: 'radar', label: 'Trend Radar', description: 'Neue Trends entdecken', icon: Radar },
      { key: 'viral_audit', label: 'TikTok 2026 Audit', description: 'Content anhand von Regeln prüfen', icon: ChartNoAxesCombined },
      { key: 'competitor_heatmap', label: 'Competitor Radar', description: 'Wettbewerb analysieren', icon: BarChart3 },
      { key: 'revenue', label: 'Umsatz-Rechner', description: 'Einnahmen prognostizieren', icon: TrendingUp },
      { key: 'score', label: 'Creator Score', description: 'Deinen Fortschritt bewerten', icon: ChartNoAxesCombined },
      { key: 'generator', label: 'Generator', description: 'Neue Ideen und Assets erzeugen', icon: WandSparkles },
      { key: 'tools', label: 'Tools', description: 'Weitere Creator-Werkzeuge', icon: Wrench },
    ] },
];

interface CreatorVaultWorldProps {
  onNavigateTab: (tab: TabKey) => void;
  onOpenNavigator: () => void;
}

export const CreatorVaultWorld: React.FC<CreatorVaultWorldProps> = ({ onNavigateTab, onOpenNavigator }) => {
  const [activeRoom, setActiveRoom] = useState<RoomKey | null>(null);
  const room = rooms.find((item) => item.key === activeRoom);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-[#080a10] text-white shadow-2xl ring-1 ring-white/10" style={{ backgroundImage: 'linear-gradient(180deg, rgba(5,8,13,.76), rgba(5,8,13,.46) 42%, rgba(5,8,13,.82)), url("/wallpapers/creator-vault-premium.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-rose-600/15 blur-3xl" />
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="absolute inset-x-0 bottom-0 h-2/5 opacity-25" style={{ backgroundImage: 'linear-gradient(to top, rgba(255,255,255,.12), transparent), repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0px, transparent 1px, transparent 90px), repeating-linear-gradient(0deg, rgba(255,255,255,.1) 0px, transparent 1px, transparent 52px)', transform: 'perspective(500px) rotateX(58deg) scale(1.8)', transformOrigin: 'bottom' }} />
      </div>
      <div className="relative p-5 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-rose-200"><Compass className="h-4 w-4" /> Personal Creator Environment</div>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Creator <span className="text-rose-300">Vault</span></h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Deine kreative Welt. Die beleuchtete Treppe verbindet alle Bereiche – wähle einen Raum oder öffne direkt ein Werkzeug.</p>
          </div>
          <button type="button" onClick={onOpenNavigator} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"><Compass className="h-4 w-4 text-rose-200" /> Alle Module finden</button>
        </div>

        {!room ? <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 [perspective:1200px]">
            {rooms.map((item, index) => {
              const Icon = item.icon;
              return <button key={item.key} type="button" onClick={() => setActiveRoom(item.key)} className={`group relative min-h-64 overflow-hidden rounded-2xl border border-white/20 bg-slate-950/45 p-5 text-left shadow-[0_18px_50px_rgba(0,0,0,.35)] backdrop-blur-md transition duration-300 [transform:rotateX(1deg)] hover:-translate-y-2 hover:scale-[1.015] hover:border-white/35 hover:shadow-[0_28px_70px_rgba(0,0,0,.5)] sm:min-h-72 sm:p-7`}>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-black/30" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 border-t border-white/10 bg-gradient-to-b from-white/[0.04] to-black/40" />
                <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/20 shadow-[inset_0_0_35px_rgba(255,255,255,.06)] transition duration-500 group-hover:scale-110" />
                <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-black/35 shadow-lg backdrop-blur-md"><Icon className="h-6 w-6" /></div>
                <div className="relative z-10 flex h-full min-h-52 flex-col justify-end"><span className="text-[10px] font-black tracking-[0.28em] text-white/55">ROOM 0{index + 1} / CREATOR SPACE</span><h3 className="mt-3 text-2xl font-black tracking-tight drop-shadow sm:text-3xl">{item.title}</h3><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">{item.subtitle}</p><p className="mt-3 max-w-sm text-sm leading-5 text-slate-100/85">{item.description}</p><span className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-black/25 px-3 py-2 text-sm font-bold backdrop-blur-md">Raum betreten <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div>
              </button>;
            })}
          </div>
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-3"><div className="rounded-xl bg-rose-300/10 p-2 text-rose-200"><Sparkles className="h-5 w-5" /></div><div><h3 className="font-semibold">Dein Kontrollzentrum</h3><p className="mt-1 text-sm text-slate-300">Dein bisheriger Desk bleibt erhalten und jederzeit erreichbar.</p></div></div>
            <button type="button" onClick={() => onNavigateTab('creator_desk')} className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-rose-100">Mein Desk öffnen</button>
          </div>
        </> : <>
          <div className="mt-8"><button type="button" onClick={() => setActiveRoom(null)} className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"><ArrowLeft className="h-4 w-4" /> Zurück zur Zentrale</button>
            <div className={`relative overflow-hidden rounded-2xl border border-white/20 bg-slate-950/55 p-5 shadow-[0_22px_60px_rgba(0,0,0,.4)] backdrop-blur-md sm:p-7`}><div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" /><div className="relative flex items-start gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-black/20"><room.icon className="h-7 w-7" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Du befindest dich in</p><h3 className="mt-1 text-3xl font-black">{room.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200/80">{room.description}</p></div></div></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{room.modules.map((module) => { const Icon = module.icon; return <button key={module.key} type="button" onClick={() => onNavigateTab(module.key)} className="group flex min-h-24 items-center gap-3 rounded-xl border border-white/15 bg-slate-950/55 p-4 text-left shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-slate-900/75"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-rose-200"><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block font-semibold text-white">{module.label}</span><span className="mt-1 block text-xs leading-5 text-slate-400">{module.description}</span></span><ArrowRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-rose-200" /></button>; })}</div>
          </div>
        </>}
      </div>
    </section>
  );
};

export default CreatorVaultWorld;
