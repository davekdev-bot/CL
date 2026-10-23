import React, { useState } from 'react';
import { UserProfile, CareerRoute, SynapseNode } from '../types';
import { CAREER_ROUTES, SYNAPSE_NODES } from '../constants';
import {
  Compass,
  Zap,
  CheckCircle2,
  Square,
  CheckSquare,
  ArrowRight,
  ShieldAlert,
  Flame,
  Layers,
  Sparkles,
  Sliders,
  DollarSign,
  Play,
  RotateCcw,
  Target,
  Clock,
  Radio,
  FileText
} from 'lucide-react';

interface CreatorDeskTabProps {
  profile: UserProfile;
  onNavigateTab: (tabKey: any) => void;
  onOpenUniversalNavigator: () => void;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const CreatorDeskTab: React.FC<CreatorDeskTabProps> = ({
  profile,
  onNavigateTab,
  onOpenUniversalNavigator,
  onUpdateProfile
}) => {
  const currentRoute: CareerRoute =
    CAREER_ROUTES.find((r) => r.id === profile.assignedRouteId) || CAREER_ROUTES[0];

  const [dutyDone, setDutyDone] = useState<boolean>(false);
  const [routineDone, setRoutineDone] = useState<boolean>(false);
  const [bonusDone, setBonusDone] = useState<boolean>(false);

  // Filter the synapses connected specifically to this route
  const activeSynapses: SynapseNode[] = SYNAPSE_NODES.filter((syn) =>
    currentRoute.synapseKeys.includes(syn.id)
  );

  const completedCount = (dutyDone ? 1 : 0) + (routineDone ? 1 : 0) + (bonusDone ? 1 : 0);
  const progressPercent = Math.round((completedCount / 3) * 100);

  return (
    <div className="space-y-6">
      {/* Top Cockpit Header */}
      <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl">{currentRoute.avatarIcon}</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-brand-coral border border-rose-500/30">
              {currentRoute.badge}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              Standort: {profile.experienceLevel} &bull; {profile.weeklyHours}h/Woche
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Willkommen an deinem Creator Desk, {profile.name}!
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
            Aktiver Schlachtplan: <strong className="text-white">{currentRoute.title}</strong>. Deine Synapsen und täglichen Prioritäten wurden automatisch auf dein Ziel kalibriert.
          </p>
        </div>

        {/* Action Controls & Navigator */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={onOpenUniversalNavigator}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition border border-neutral-700 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Compass className="w-4 h-4 text-brand-coral" />
            <span>Alle 20+ Funktionen (CMD+K)</span>
          </button>

          <button
            onClick={() => onNavigateTab('career_routes')}
            className="px-4 py-2.5 rounded-xl bg-brand-coral hover:bg-brand-coralHover text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Route wechseln</span>
          </button>
        </div>
      </div>

      {/* Daily Battle Plan & Weekly Sprint Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tägliche Pflicht- & Bonusmissionen */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-coral" />
                Heutiger Schlachtplan (Tagesziele)
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Konsequenz schlägt Inspiration. Schließe die Pflicht-Mission ab, um den Algorithmus zu füttern.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-neutral-900">{completedCount} von 3</span>
              <div className="w-20 bg-neutral-100 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-brand-coral h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Pflicht */}
            <div
              onClick={() => setDutyDone(!dutyDone)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                dutyDone ? 'bg-emerald-50/50 border-emerald-200 opacity-75' : 'bg-rose-50/40 border-rose-200'
              }`}
            >
              <button type="button" className="mt-0.5 text-neutral-400">
                {dutyDone ? <CheckSquare className="w-5 h-5 text-emerald-600" /> : <Square className="w-5 h-5 text-rose-400" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-rose-500 text-white tracking-wider">
                    PFLICHT (UNVERZICHTBAR)
                  </span>
                </div>
                <p className={`text-xs font-semibold ${dutyDone ? 'line-through text-neutral-400' : 'text-neutral-900'}`}>
                  {currentRoute.battlePlan.dailyChecklist.duty}
                </p>
              </div>
            </div>

            {/* Soll */}
            <div
              onClick={() => setRoutineDone(!routineDone)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                routineDone ? 'bg-emerald-50/50 border-emerald-200 opacity-75' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <button type="button" className="mt-0.5 text-neutral-400">
                {routineDone ? <CheckSquare className="w-5 h-5 text-emerald-600" /> : <Square className="w-5 h-5 text-neutral-300" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 tracking-wider">
                    ROUTINE (SOLL)
                  </span>
                </div>
                <p className={`text-xs font-medium ${routineDone ? 'line-through text-neutral-400' : 'text-neutral-800'}`}>
                  {currentRoute.battlePlan.dailyChecklist.routine}
                </p>
              </div>
            </div>

            {/* Bonus */}
            <div
              onClick={() => setBonusDone(!bonusDone)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                bonusDone ? 'bg-emerald-50/50 border-emerald-200 opacity-75' : 'bg-neutral-50 border-neutral-200'
              }`}
            >
              <button type="button" className="mt-0.5 text-neutral-400">
                {bonusDone ? <CheckSquare className="w-5 h-5 text-emerald-600" /> : <Square className="w-5 h-5 text-neutral-300" />}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 tracking-wider">
                    EXTRA-HEBEL (BONUS)
                  </span>
                </div>
                <p className={`text-xs font-medium ${bonusDone ? 'line-through text-neutral-400' : 'text-neutral-800'}`}>
                  {currentRoute.battlePlan.dailyChecklist.bonus}
                </p>
              </div>
            </div>
          </div>

          {/* Danger Trap Alert from Route */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-900 block">Vermeide diesen tödlichen Fehler auf deiner Route:</strong>
              <span className="text-[11px] leading-relaxed text-amber-900">{currentRoute.dangerTrapWarning}</span>
            </div>
          </div>
        </div>

        {/* Right: Wochen-Sprint & Monats-Kriegsziel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-neutral-100 pb-2">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-coral" />
                Wochen-Sprint & Monats-Ziele
              </h3>
              <span className="text-xs text-neutral-500 font-mono">Fokus dieser 7 Tage</span>
            </div>

            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase text-brand-coral block">
                Sprint: {currentRoute.battlePlan.weeklySprint.focusTitle}
              </span>
              <p className="text-neutral-800 font-semibold">
                Ziel: {currentRoute.battlePlan.weeklySprint.targetDeliverable}
              </p>
              <span className="text-[11px] text-neutral-500 block font-mono">
                Key Metric: {currentRoute.battlePlan.weeklySprint.reviewMetric}
              </span>
            </div>

            <div className="p-3.5 bg-neutral-900 text-white rounded-xl space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase text-amber-300 block">
                🎯 30-Tage Monats-Kriegsziel:
              </span>
              <div className="space-y-1 text-[11px] text-neutral-200 font-mono">
                <div>• Einkommens-Ziel: <strong className="text-emerald-400">{currentRoute.battlePlan.monthlyWarGoal.targetIncome}</strong></div>
                <div>• Reichweite: <strong>{currentRoute.battlePlan.monthlyWarGoal.targetFollowers}</strong></div>
                <div>• Eigener Asset-Besitz: <strong className="text-white">{currentRoute.battlePlan.monthlyWarGoal.ownedAssetDeliverable}</strong></div>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs text-neutral-500">
              <span>Nächster Meilenstein:</span>
              <strong className="text-neutral-900 font-semibold">{currentRoute.nextMilestoneUnlocked}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Synapse Modules specifically for this User Route */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-coral" />
              Aktive Gehirn-Synapsen für "{currentRoute.title}"
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Diese Werkzeuge sind direkt mit deinem aktuellen Standpunkt verknüpft und bringen dich am schnellsten voran.
            </p>
          </div>

          <span className="text-xs font-mono text-neutral-400">
            {activeSynapses.length} Synapsen aktiv
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {activeSynapses.map((syn) => (
            <div
              key={syn.id}
              onClick={() => onNavigateTab(syn.targetTabKey)}
              className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 hover:bg-neutral-100/80 hover:border-brand-coral transition cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-600">
                    {syn.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono group-hover:text-brand-coral transition">
                    Öffnen →
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 group-hover:text-brand-coral transition">
                  {syn.label}
                </h4>
                <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
                  {syn.description}
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-200 text-[10px] font-mono text-neutral-600 flex items-center justify-between">
                <span>Fokus-Hebel:</span>
                <span className="font-bold text-neutral-900">{syn.primaryMetric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
