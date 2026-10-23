import React, { useState } from 'react';
import { UserProfile, DailyTask } from '../types';
import { CheckSquare, Square, Clock, Calendar, Flag, Sparkles, Award } from 'lucide-react';

interface PlanTabProps {
  profile: UserProfile;
}

const DEFAULT_TASKS: DailyTask[] = [
  {
    id: 't1',
    title: '30 Min aktiver Engagement-Block (Kommentare & DMs)',
    type: 'pflicht',
    desc: 'Kommentiere bei 5 größeren Creatoren deiner Nische mit wertschöpfendem Mehrwert, bevor du selbst postest.',
    done: false,
  },
  {
    id: 't2',
    title: '1 Short-Form Video veröffentlichen (TikTok/Reel/Short)',
    type: 'pflicht',
    desc: 'Konsequenter Hook in Sekunde 1. Untertitel aktiviert. 1 Haupt-Hashtag + Link in Bio Hinweis.',
    done: false,
  },
  {
    id: 't3',
    title: '3 Content-Ideen in die Notion-Inbox notieren',
    type: 'soll',
    desc: 'Notiere Fragen deiner Zielgruppe, virale Sounds aus dem TikTok Creative Center oder YouTube Suchtrends.',
    done: false,
  },
  {
    id: 't4',
    title: 'Story / Status-Update teilen (Behind-the-Scenes)',
    type: 'soll',
    desc: 'Blick hinter die Kulissen: Was produzierst du gerade? Baue Bindung auf.',
    done: false,
  },
  {
    id: 't5',
    title: 'A/B Test für den nächsten Hook ausarbeiten',
    type: 'extra',
    desc: 'Schreibe 3 alternative Einstiegssätze für dein bestes Video der Woche auf.',
    done: false,
  },
  {
    id: 't6',
    title: 'Wöchentliche Analytics ins Logbuch eintragen',
    type: 'extra',
    desc: 'Welches Video hatte die höchste Retention? Welcher Sound hat am besten funktioniert?',
    done: false,
  },
];

export const PlanTab: React.FC<PlanTabProps> = ({ profile }) => {
  const [tasks, setTasks] = useState<DailyTask[]>(DEFAULT_TASKS);
  const [activePhase, setActivePhase] = useState<number>(1);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const phases = [
    {
      nr: 1,
      title: 'Fundament & Positionierung',
      desc: 'Woche 1-2: Bio optimieren, 3 Säulen definieren, erste 10 Posts ohne Perfektionismus live bringen.',
      badge: 'Start',
    },
    {
      nr: 2,
      title: 'Testen & Hooks validieren',
      desc: 'Woche 3-4: 15-30 Posts mit unterschiedlichen Einstiegen testen. Retention-Statistiken auswerten.',
      badge: 'Entdeckung',
    },
    {
      nr: 3,
      title: 'Skalieren & Batch-Produktion',
      desc: 'Woche 5-8: Content-Batching (1 Drehtag = Content für 2 Wochen). Plattformübergreifendes Repurposing.',
      badge: 'Wachstum',
    },
    {
      nr: 4,
      title: 'Monetarisieren & Community',
      desc: 'Woche 9+: Newsletter/Telegram-Kanal aufbauen, digitale Produkte / Pre-Saves / Bookings launchen.',
      badge: 'Einnahmen',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4-Phasen Roadmap Header */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Flag className="w-5 h-5 text-brand-coral" />
              Deine maßgeschneiderte 4-Phasen-Route
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Angepasst an dein Niveau: <strong className="text-neutral-800">{profile.experienceLevel}</strong> | Nische: <strong className="text-neutral-800">{profile.niche}</strong>
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-brand-coral border border-rose-200 self-start sm:self-auto">
            Ziel: {profile.weeklyHours}h/Woche Fokus
          </span>
        </div>

        {/* Phase selector tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {phases.map((p) => {
            const isSelected = activePhase === p.nr;
            return (
              <div
                key={p.nr}
                onClick={() => setActivePhase(p.nr)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 text-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-700'
                  }`}>
                    Phase {p.nr}
                  </span>
                  <span className={`text-[11px] font-medium ${isSelected ? 'text-rose-300' : 'text-neutral-400'}`}>
                    {p.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold">{p.title}</h4>
                <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                Tages-Checkliste: Pflicht, Soll & Extra
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Konsequenz schlägt Inspiration: Erfülle täglich die Pflicht-Aufgaben für nachhaltiges Wachstum.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-neutral-900">{completedCount} von {tasks.length}</span>
              <div className="w-24 bg-neutral-100 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-brand-coral h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`py-3 px-2 flex items-start gap-3 cursor-pointer rounded-lg transition hover:bg-neutral-50 ${
                  task.done ? 'opacity-60' : ''
                }`}
              >
                <button type="button" className="mt-0.5 text-neutral-500 hover:text-neutral-900">
                  {task.done ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-neutral-300" />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        task.done ? 'line-through text-neutral-400' : 'text-neutral-900'
                      }`}
                    >
                      {task.title}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        task.type === 'pflicht'
                          ? 'bg-rose-100 text-rose-800'
                          : task.type === 'soll'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {task.type}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{task.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Focus & Crashkurs */}
        <div className="space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-coral" />
              Wochen-Rhythmus
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-900 block">Montag: Planung & Trends</span>
                <span className="text-neutral-500">Google Trends & TikTok Creative Center durchforsten.</span>
              </div>
              <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-900 block">Dienstag & Mittwoch: Batch-Dreh</span>
                <span className="text-neutral-500">3-5 Clips an einem Tag aufnehmen. Spart 80% Rüstzeit.</span>
              </div>
              <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-900 block">Do - Sa: Schnitt & Vorplanung</span>
                <span className="text-neutral-500">CapCut Untertitel setzen, B-Rolls einbauen, Meta Suite vorplanen.</span>
              </div>
              <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                <span className="font-bold text-neutral-900 block">Sonntag: Review & Score-Check</span>
                <span className="text-neutral-500">Analytics eintragen und den Creator Score auswerten.</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Award className="w-4 h-4 text-amber-700" />
              Goldene Algorithmus-Regel
            </div>
            <p className="text-amber-800 leading-relaxed">
              Veröffentliche niemals ohne visuellen Hook in den ersten 1,5 Sekunden. Kein "Hallo Leute", kein langes Logo-Intro. Starte sofort mitten in der Handlung oder mit der Kernaussage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
