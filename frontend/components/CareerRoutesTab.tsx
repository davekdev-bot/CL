import React, { useState } from 'react';
import { UserProfile, CareerRoute, CareerRouteId } from '../types';
import { CAREER_ROUTES, SYNAPSE_NODES } from '../constants';
import {
  Compass,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Flame,
  Layers,
  Sparkles,
  Award,
  Target,
  Check,
  RotateCcw
} from 'lucide-react';

interface CareerRoutesTabProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateTab: (tabKey: any) => void;
}

export const CareerRoutesTab: React.FC<CareerRoutesTabProps> = ({
  profile,
  onUpdateProfile,
  onNavigateTab
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<CareerRouteId>(profile.assignedRouteId);

  const activeRoute = CAREER_ROUTES.find((r) => r.id === selectedRouteId) || CAREER_ROUTES[0];

  const handleSelectRoute = (routeId: CareerRouteId) => {
    setSelectedRouteId(routeId);
    onUpdateProfile({
      ...profile,
      assignedRouteId: routeId
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigator Header */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Synapsen-Gehirn & Schlachtplan-Navigator
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Wähle deinen aktuellen Standpunkt oder ändere deine Marschrichtung. Alle 20+ Funktionen passen sich automatisch deinem Schlachtplan an.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Aktive Route: {activeRoute.title.split(':')[0]}
            </span>
          </div>
        </div>

        {/* Route Selector Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-neutral-100">
          {CAREER_ROUTES.map((route) => {
            const isCurrent = route.id === selectedRouteId;
            return (
              <div
                key={route.id}
                onClick={() => handleSelectRoute(route.id)}
                className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                  isCurrent
                    ? 'border-brand-coral bg-rose-50/40 ring-2 ring-brand-coral shadow-sm'
                    : 'border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{route.avatarIcon}</span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? 'bg-rose-500 text-white'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {route.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                    {route.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed mt-1 line-clamp-2">
                    {route.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-200/80 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500">Ziel:</span>
                  <span className="font-bold text-neutral-900 truncate max-w-[130px]">
                    {route.battlePlan.monthlyWarGoal.targetIncome}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Route Deep Dive & Synapse Wiring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Schlachtplan Details & Phasen */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeRoute.avatarIcon}</span>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">{activeRoute.title}</h3>
                <span className="text-xs text-brand-coral font-medium">{activeRoute.targetFocus}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('creator_desk')}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span>Zu meinem Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-neutral-400 block">
              Zielgruppe & Profil dieser Route:
            </span>
            <p className="text-neutral-700 leading-relaxed font-medium">
              {activeRoute.idealForProfile}
            </p>
          </div>

          {/* Key Checklist Steps */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-neutral-900 uppercase text-[11px] block">
              Die 4 Grundpfeiler für diese Route:
            </span>
            <div className="space-y-1.5">
              {activeRoute.keyChecklistItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-neutral-50/80 border border-neutral-200 text-neutral-800 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Trap Alert */}
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-rose-900 block">Vermeide diesen Fehler auf dieser Route:</strong>
              <p className="text-[11px] text-rose-900 leading-relaxed mt-0.5">
                {activeRoute.dangerTrapWarning}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Connected Synapse Brain Links */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="border-b border-neutral-100 pb-2">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Direkt verknüpfte Werkzeuge ({activeRoute.synapseKeys.length})
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Das Gehirn hat diese Synapsen für deine Route priorisiert:
            </p>
          </div>

          <div className="space-y-2.5">
            {SYNAPSE_NODES.filter((syn) => activeRoute.synapseKeys.includes(syn.id)).map((syn) => (
              <div
                key={syn.id}
                onClick={() => onNavigateTab(syn.targetTabKey)}
                className="p-3 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100 hover:border-brand-coral transition cursor-pointer flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-neutral-900">{syn.label}</h4>
                  <span className="text-[11px] text-neutral-500">{syn.description}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0 ml-2" />
              </div>
            ))}
          </div>

          <div className="p-3 bg-neutral-900 text-white rounded-xl text-xs space-y-1">
            <span className="font-bold text-amber-300 block text-[11px]">
              🧠 Automatische Anpassung:
            </span>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Jedes Mal, wenn du deinen Schlachtplan änderst, richtet der Creator Compass deine täglichen Aufgaben, Hook-Vorschläge und Toolchains neu aus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
