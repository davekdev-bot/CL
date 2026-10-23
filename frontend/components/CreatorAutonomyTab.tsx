import React, { useState } from 'react';
import { UserProfile, AutonomyMilestone, PlatformRiskGaugeInputs } from '../types';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Square,
  CheckSquare,
  Lock,
  Mail,
  Server,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  Sliders,
  Copy,
  Check,
  Zap,
  Globe,
  Radio
} from 'lucide-react';

interface CreatorAutonomyTabProps {
  profile: UserProfile;
}

const DEFAULT_AUTONOMY_MILESTONES: AutonomyMilestone[] = [
  // Stage 1: Zero-Cost Foundation
  {
    id: 'am_1',
    stageNr: 1,
    stageName: 'Stufe 1: 0€ Werkzeug-Fundament',
    title: 'Autonome Software-Ausrüstung ohne Monats-Abos aufsetzen',
    description: 'Ersetze teure Adobe- oder Schnitt-Abos durch DaVinci Resolve (Gratis), CapCut Desktop, Audacity und OBS Studio für Bildschirmaufnahmen.',
    freeToolsUsed: ['DaVinci Resolve', 'CapCut Desktop', 'Audacity', 'OBS Studio'],
    isCompleted: true,
    impactOnAutonomy: 'Fundament'
  },
  {
    id: 'am_2',
    stageNr: 1,
    stageName: 'Stufe 1: 0€ Werkzeug-Fundament',
    title: 'Lokale oder kostenlose Transkription mit Whisper einrichten',
    description: 'Niemals 20€/Monat für Transkripte zahlen. Nutze OpenAI Whisper (open-source lokal auf dem PC) oder TurboScribe im kostenlosen Kontingent.',
    freeToolsUsed: ['TurboScribe', 'Whisper Open Source'],
    isCompleted: true,
    impactOnAutonomy: 'Fundament'
  },
  // Stage 2: Owned Audience & Email Capture
  {
    id: 'am_3',
    stageNr: 2,
    stageName: 'Stufe 2: Unabhängige Lead-Erfassung',
    title: 'Kostenlose Newsletter-Basis mit 100% Export-Garantie einrichten',
    description: 'Plattform-Follower gehören TikTok & Meta. Richte ein Substack- oder Beehiiv-Konto ein (100% kostenlos) und sammle Fans mit 1-Klick CSV-Exportrecht.',
    freeToolsUsed: ['Substack (0€)', 'Beehiiv Free Tier', 'Beacons Free'],
    isCompleted: false,
    impactOnAutonomy: 'Eigenbesitz (Leads)'
  },
  {
    id: 'am_4',
    stageNr: 2,
    stageName: 'Stufe 2: Unabhängige Lead-Erfassung',
    title: 'Unwiderstehlichen 0€ Lead-Magneten (Cheat Sheet / Sample Pack) verlinken',
    description: 'Platziere einen unschlagbaren Mehrwert in der Bio. Tausche wertvolles Wissen (PDF-Checkliste, Preset-Pack) gegen die direkte E-Mail-Adresse der Zuschauer.',
    freeToolsUsed: ['Gumroad (0€ monatlich)', 'Payhip Free'],
    isCompleted: false,
    impactOnAutonomy: 'Eigenbesitz (Leads)'
  },
  // Stage 3: Platform Risk Diversification
  {
    id: 'am_5',
    stageNr: 3,
    stageName: 'Stufe 3: 3-Säulen Plattform-Diversifikation',
    title: 'Das 3-Ebenen-Ökosystem implementieren (Discovery -> Trust -> Direct)',
    description: 'Ebene 1 (Kurzvideos auf TikTok/Reels) dient nur als Entdeckungs-Trichter. Ebene 2 (YouTube/Podcast) baut Vertrauen auf. Ebene 3 (E-Mail/Telegram) gehört dir allein.',
    freeToolsUsed: ['Telegram Kanal', 'WhatsApp Kanal', 'YouTube Longform'],
    isCompleted: false,
    impactOnAutonomy: 'Risiko-Absicherung'
  },
  {
    id: 'am_6',
    stageNr: 3,
    stageName: 'Stufe 3: 3-Säulen Plattform-Diversifikation',
    title: 'Eigene Domain & Backup aller rohen Video- und Masterdateien sichern',
    description: 'Registriere deine eigene Domain für 10€/Jahr. Speichere alle ungeschnittenen Kameraaufnahmen und WAV-Masterdateien auf einer physischen externen Festplatte.',
    freeToolsUsed: ['Lokale SSD', 'Google Drive Free 15GB'],
    isCompleted: false,
    impactOnAutonomy: 'Risiko-Absicherung'
  },
  // Stage 4: Direct Recurring Revenue
  {
    id: 'am_7',
    stageNr: 4,
    stageName: 'Stufe 4: Wiederkehrender Direkt-Cashflow',
    title: 'Direkt-Monetarisierung ohne Algorithmus-Abhängigkeit starten',
    description: 'Erstelle deinen ersten digitalen Direktverkauf (Sample Pack, Notion Template oder Discord VIP Producer Circle). Kein Warten auf schwankende TikTok Creator Rewards.',
    freeToolsUsed: ['Payhip / Gumroad', 'Discord Community'],
    isCompleted: false,
    impactOnAutonomy: 'Direkter Cashflow'
  }
];

export const CreatorAutonomyTab: React.FC<CreatorAutonomyTabProps> = ({ profile }) => {
  const [milestones, setMilestones] = useState<AutonomyMilestone[]>(DEFAULT_AUTONOMY_MILESTONES);
  const [riskInputs, setRiskInputs] = useState<PlatformRiskGaugeInputs>({
    followersOnRentedPlatforms: 45000,
    emailSubscribersOwned: 850,
    recurringDirectRevenuePercent: 35,
    hasSelfHostedDomain: true,
    hasOwnPaymentCheckout: true,
    hasDirectCommunity: true
  });

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isCompleted: !m.isCompleted } : m))
    );
  };

  // Calculate Autonomy / De-Platforming Risk Index
  const completedCount = milestones.filter((m) => m.isCompleted).length;
  const roadmapProgressPercent = Math.round((completedCount / milestones.length) * 100);

  // Compute algorithmic vulnerability score (0 = completely autonomous, 100 = completely vulnerable to bans/algorithm changes)
  const computeVulnerabilityIndex = () => {
    let vulnerability = 85; // Baseline high risk if relying only on social accounts

    // Owned subscribers credit (more emails = lower risk)
    const emailRatio = riskInputs.emailSubscribersOwned / Math.max(1, riskInputs.followersOnRentedPlatforms);
    if (emailRatio > 0.05) vulnerability -= 25;
    else if (emailRatio > 0.02) vulnerability -= 15;
    else if (emailRatio > 0.005) vulnerability -= 8;

    // Direct recurring revenue credit
    vulnerability -= Math.round((riskInputs.recurringDirectRevenuePercent / 100) * 35);

    // Owned assets flags
    if (riskInputs.hasSelfHostedDomain) vulnerability -= 10;
    if (riskInputs.hasOwnPaymentCheckout) vulnerability -= 10;
    if (riskInputs.hasDirectCommunity) vulnerability -= 10;

    return Math.max(5, Math.min(95, vulnerability));
  };

  const vulnerabilityScore = computeVulnerabilityIndex();
  const autonomyScore = 100 - vulnerabilityScore;

  return (
    <div className="space-y-6">
      {/* Autonomy Hero Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
              Oberstes Ziel: Vollständige Autonomie
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Creator Autonomy Roadmap & De-Platforming Schutz
          </h2>
          <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
            Verlasse dich niemals allein auf Algorithmen oder geliehenes Land (TikTok & Instagram). Baue ein krisensicheres, rentables Geschäft mit eigenen E-Mail-Listen, direkten Downloads und null Fixkosten auf.
          </p>
        </div>

        {/* Live Independence Meter */}
        <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono text-neutral-400 block">Autonomie-Index</span>
            <span className={`text-2xl font-black font-mono ${
              autonomyScore >= 70 ? 'text-emerald-400' : autonomyScore >= 45 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {autonomyScore}% Unabhängig
            </span>
            <span className="text-[10px] text-neutral-400 block">
              {vulnerabilityScore}% Algorithmus-Risiko
            </span>
          </div>
        </div>
      </div>

      {/* Risk Gauge & Diversification Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Risk Calculator Inputs */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-brand-coral" />
              Plattform-Abhängigkeit prüfen
            </h3>
            <span className="text-xs text-neutral-400">Echtzeit-Diagnose</span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-neutral-700">Follower auf "gemieteten" Plattformen (TikTok, IG, YT):</span>
                <span className="font-mono font-bold text-neutral-900">{riskInputs.followersOnRentedPlatforms.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="200000"
                step="1000"
                value={riskInputs.followersOnRentedPlatforms}
                onChange={(e) => setRiskInputs({ ...riskInputs, followersOnRentedPlatforms: Number(e.target.value) })}
                className="w-full accent-neutral-900 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-neutral-700">Eigene E-Mail / Newsletter Kontakte (100% dein Besitz):</span>
                <span className="font-mono font-bold text-emerald-600">{riskInputs.emailSubscribersOwned.toLocaleString()} Kontakte</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="50"
                value={riskInputs.emailSubscribersOwned}
                onChange={(e) => setRiskInputs({ ...riskInputs, emailSubscribersOwned: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <span className="text-[10px] text-neutral-400">
                Verhältnis: {((riskInputs.emailSubscribersOwned / Math.max(1, riskInputs.followersOnRentedPlatforms)) * 100).toFixed(1)}% Konvertierungsrate
              </span>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-neutral-700">Anteil direkter Einnahmen (Sample Packs, Subs, Kurse):</span>
                <span className="font-mono font-bold text-brand-coral">{riskInputs.recurringDirectRevenuePercent}% Direktumsatz</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={riskInputs.recurringDirectRevenuePercent}
                onChange={(e) => setRiskInputs({ ...riskInputs, recurringDirectRevenuePercent: Number(e.target.value) })}
                className="w-full accent-brand-coral cursor-pointer"
              />
            </div>

            {/* Checkbox Owned Assets */}
            <div className="pt-2 border-t border-neutral-100 space-y-2">
              <span className="font-bold text-neutral-800 block text-[11px] uppercase">
                Besitz-Checkliste:
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={riskInputs.hasSelfHostedDomain}
                  onChange={(e) => setRiskInputs({ ...riskInputs, hasSelfHostedDomain: e.target.checked })}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                <span className="text-neutral-700">Eigene Domain (.de / .com) vorhanden</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={riskInputs.hasOwnPaymentCheckout}
                  onChange={(e) => setRiskInputs({ ...riskInputs, hasOwnPaymentCheckout: e.target.checked })}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                <span className="text-neutral-700">Direkter Zahlungs-Checkout (Payhip/Gumroad)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={riskInputs.hasDirectCommunity}
                  onChange={(e) => setRiskInputs({ ...riskInputs, hasDirectCommunity: e.target.checked })}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                <span className="text-neutral-700">Direkter Messenger-Kanal (Telegram / Discord)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Autonomy Diagnostic Verdict & Actionable Fixes */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              Sicherheits-Status & Diagnose
            </h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              vulnerabilityScore > 60 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {vulnerabilityScore > 60 ? 'Hohes Plattform-Risiko ⚠️' : 'Geschützt & Autonom 🛡️'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">De-Platforming Gefahr</span>
              <p className="text-neutral-700 leading-snug">
                {vulnerabilityScore > 60
                  ? 'Kritisch: Ein einziger Shadowban oder Account-Verlust auf TikTok/Instagram würde 80%+ deiner Einnahmen sofort vernichten.'
                  : 'Sicher: Selbst wenn dein TikTok-Konto gelöscht wird, erreichst du deine Fans weiterhin direkt über deine E-Mail-Liste.'}
              </p>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-neutral-400 block">Algorithmus-Immunität</span>
              <p className="text-neutral-700 leading-snug">
                {riskInputs.recurringDirectRevenuePercent >= 30
                  ? 'Stark: Dein Cashflow stammt aus treuen Fans und Downloads, nicht aus schwankenden Creator-Fund-Centbeträgen.'
                  : 'Gefährdet: Zu hohe Abhängigkeit von viralen Spikes. Baue eigene digitale Produkte auf.'}
              </p>
            </div>
          </div>

          {/* Golden Rules of Autonomy */}
          <div className="p-3.5 bg-neutral-900 text-white rounded-xl text-xs space-y-1.5">
            <span className="font-bold text-amber-300 block text-[11px] uppercase tracking-wider">
              💡 Die 3 Eisernen Gesetze der Creator-Autonomie:
            </span>
            <ul className="space-y-1 text-neutral-300 text-[11px] list-disc list-inside">
              <li><strong>Miete den Algorithmus, besitze das Publikum:</strong> Nutze Social Media ausschließlich als kostenlose Werbetafel, um User auf deine eigene E-Mail-Liste zu leiten.</li>
              <li><strong>Zero Subscriptions im Fundament:</strong> Nutze kostenlose Open-Source-Tools (Whisper, DaVinci, BandLab), damit deine Fixkosten bei 0 € bleiben.</li>
              <li><strong>1.000 Echte Fans schlagen 100.000 Geister-Follower:</strong> 500 Menschen, die deine Sample Packs oder Mitgliedschaft für 10€/Monat kaufen, bedeuten finanzielle Unabhängigkeit.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4-Stage Zero-Cost Roadmap Milestones Checklist */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-coral" />
              Autonomie-Meilensteine (Von 0 € zum unabhängigen Kanal)
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Hake erledigte Meilensteine ab, um deine Autonomie schrittweise auf 100% zu steigern.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-neutral-900">{completedCount} von {milestones.length} erledigt</span>
            <div className="w-24 bg-neutral-100 h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${roadmapProgressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-neutral-100">
          {milestones.map((m) => (
            <div
              key={m.id}
              onClick={() => toggleMilestone(m.id)}
              className={`py-3.5 px-2 flex items-start gap-3 cursor-pointer rounded-xl transition hover:bg-neutral-50/70 ${
                m.isCompleted ? 'opacity-70 bg-neutral-50/40' : ''
              }`}
            >
              <button type="button" className="mt-0.5 text-neutral-400 hover:text-neutral-900">
                {m.isCompleted ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-neutral-300" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-200 text-neutral-800">
                    {m.stageName}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    m.impactOnAutonomy === 'Fundament' ? 'bg-blue-100 text-blue-800' :
                    m.impactOnAutonomy === 'Eigenbesitz (Leads)' ? 'bg-emerald-100 text-emerald-800' :
                    m.impactOnAutonomy === 'Risiko-Absicherung' ? 'bg-amber-100 text-amber-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {m.impactOnAutonomy}
                  </span>
                  <span className={`text-sm font-bold ${m.isCompleted ? 'line-through text-neutral-400' : 'text-neutral-900'}`}>
                    {m.title}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {m.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {m.freeToolsUsed.map((tool, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                      🛠️ {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
