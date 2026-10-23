import React, { useState } from 'react';
import { UserProfile } from '../types';
import { NICHES_DATA } from '../constants';
import { Layers, DollarSign, Lightbulb, Tag, ShieldAlert, Sparkles } from 'lucide-react';

interface StrategyTabProps {
  profile: UserProfile;
}

export const StrategyTab: React.FC<StrategyTabProps> = ({ profile }) => {
  const [selectedNicheId, setSelectedNicheId] = useState<string>(profile.niche);

  const activeNiche =
    NICHES_DATA.find((n) => n.id === selectedNicheId) || NICHES_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header & Niche Switcher */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
        <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5 text-brand-coral" />
          Nischen-Strategien & Monetarisierungs-Blaupausen
        </h2>
        <p className="text-xs text-neutral-500 mb-4">
          Wähle eine Nische, um die 5 erprobten Content-Säulen, virale Ideen und direkte Einnahmenmodelle einzusehen.
        </p>

        {/* Niche Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {NICHES_DATA.map((n) => {
            const isSelected = selectedNicheId === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setSelectedNicheId(n.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <span>{n.icon} {n.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Niche Deep Dive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Content Pillars & Audience */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
              Zielgruppe
            </span>
            <h3 className="text-sm font-bold text-neutral-900 mt-2">{activeNiche.audience}</h3>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-brand-coral" />
              Die 5 Content-Säulen
            </h4>
            <div className="space-y-1.5">
              {activeNiche.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-800"
                >
                  <span className="font-bold text-brand-coral mr-2">Säule {idx + 1}:</span>
                  {pillar}
                </div>
              ))}
            </div>
          </div>

          {/* Viral Tags */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-neutral-500" />
              Empfohlene Hashtags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {activeNiche.viralTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Ideas & Monetization Blueprint */}
        <div className="space-y-6">
          {/* Ideas */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              5 Virale Video-Formate für diese Woche
            </h4>
            <div className="space-y-2">
              {activeNiche.contentIdeas.map((idea, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-neutral-50/80 rounded-lg border border-neutral-100 text-xs text-neutral-800 leading-relaxed"
                >
                  <span className="font-bold text-neutral-900 block mb-0.5">Idee #{idx + 1}:</span>
                  {idea}
                </div>
              ))}
            </div>
          </div>

          {/* Monetization Blueprint */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Einnahmequellen & Monetarisierung
            </h4>
            <ul className="space-y-2 text-xs">
              {activeNiche.monetizationWays.map((way, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-100 text-neutral-800"
                >
                  <span className="text-emerald-700 font-bold shrink-0">€</span>
                  <span>{way}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Compliance & Legal Notice (from 2026 KB) */}
      <div className="bg-neutral-900 text-white rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold">Rechtliches & Plattform-Compliance 2026</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-300">
          <div className="p-3 bg-neutral-800/80 rounded-lg">
            <span className="font-bold text-white block mb-1">KI-Kennzeichnungspflicht</span>
            TikTok, YouTube und Meta verlangen Kennzeichnung bei realistisch wirkenden KI-generierten Gesichtern oder Stimmen.
          </div>
          <div className="p-3 bg-neutral-800/80 rounded-lg">
            <span className="font-bold text-white block mb-1">Musik & Urheberrecht</span>
            Kommerzielle Accounts dürfen TikTok Trend-Sounds oft nicht für Werbung nutzen. Nutze Royalty-Free oder eigene Suno-Rechte.
          </div>
          <div className="p-3 bg-neutral-800/80 rounded-lg">
            <span className="font-bold text-white block mb-1">Werbekennzeichnung</span>
            In DACH gilt: Affiliate-Links und Markendeals immer klar und an erster Stelle als "#Werbung" oder "Anzeige" deklarieren.
          </div>
        </div>
      </div>
    </div>
  );
};
