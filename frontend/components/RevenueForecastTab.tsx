import React, { useState } from 'react';
import { UserProfile, RevenueForecastInputs, RevenueStreamBreakdown } from '../types';
import { TIKTOK_2026_ALGORITHM_RULES } from '../constants';
import {
  DollarSign,
  TrendingUp,
  Sliders,
  Sparkles,
  HelpCircle,
  Award,
  Wallet,
  ArrowUpRight,
  Flame,
  Zap,
  Users,
  CheckCircle2,
  Copy,
  Check,
  BarChart3,
  Percent
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface RevenueForecastTabProps {
  profile: UserProfile;
}

export const RevenueForecastTab: React.FC<RevenueForecastTabProps> = ({ profile }) => {
  const [inputs, setInputs] = useState<RevenueForecastInputs>({
    monthlyStreams: 140000,
    streamPpsRate: 0.0035, // average ~3,50€ per 1,000 streams on Spotify/Apple Music
    socialFollowing: 25000,
    patreonMembers: 45,
    patreonTierPrice: 12,
    monthlyVideoViews: 120000,
    brandDealsCount: 2,
    brandCpmAverage: 22,
    samplePackMonthlySales: 35,
    samplePackPriceAvg: 29,
    affiliateClicksMonthly: 60,
    affiliateCommissionAvg: 15,
    // 2026 Algorithm Parameters
    tiktokAudienceInterestTier: 'Broad (Mass Appeal)',
    tiktokCompletionRatePercent: 68,
    tiktokCommentQualityRatio: 'High (Discussions & Replies)',
    tiktokTrendVelocityMultiplier: 1.8
  });

  const [activeSubTab, setActiveSubTab] = useState<'financial_model' | 'tiktok_algorithm' | 'funnel_breakdown'>('financial_model');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // TikTok Algorithm Reach Multiplier
  const getAudienceMultiplier = () => {
    if (inputs.tiktokAudienceInterestTier === 'Broad (Mass Appeal)') return 1.5;
    if (inputs.tiktokAudienceInterestTier === 'Mid-Tier (General Music/Tech)') return 1.0;
    return 0.65;
  };

  const getCompletionMultiplier = () => {
    // 2026 TikTok algorithm rewards > 65% completion with exponential viral push
    if (inputs.tiktokCompletionRatePercent >= 70) return 2.2;
    if (inputs.tiktokCompletionRatePercent >= 55) return 1.3;
    return 0.7;
  };

  const getCommentQualityMultiplier = () => {
    if (inputs.tiktokCommentQualityRatio === 'High (Discussions & Replies)') return 1.4;
    if (inputs.tiktokCommentQualityRatio === 'Medium (Standard Emojis)') return 1.0;
    return 0.75;
  };

  const viralMultiplierTotal =
    getAudienceMultiplier() *
    getCompletionMultiplier() *
    getCommentQualityMultiplier() *
    inputs.tiktokTrendVelocityMultiplier;

  // Calculated revenues
  const spotifyRevenue = Math.round(inputs.monthlyStreams * inputs.streamPpsRate);
  const patreonRevenue = Math.round(inputs.patreonMembers * inputs.patreonTierPrice);
  const brandDealRevenue = Math.round(
    ((inputs.monthlyVideoViews * viralMultiplierTotal) / 1000) *
      inputs.brandCpmAverage *
      inputs.brandDealsCount *
      0.5
  );
  const samplePackRevenue = Math.round(inputs.samplePackMonthlySales * inputs.samplePackPriceAvg);
  const affiliateRevenue = Math.round(inputs.affiliateClicksMonthly * inputs.affiliateCommissionAvg);

  const totalMonthlyGross =
    spotifyRevenue + patreonRevenue + brandDealRevenue + samplePackRevenue + affiliateRevenue;
  const totalAnnualGross = totalMonthlyGross * 12;

  // Platform & Tax deductions
  const estimatedPlatformFees = Math.round(totalMonthlyGross * 0.08); // DistroKid, Stripe, Patreon fees
  const estimatedTaxes = Math.round(totalMonthlyGross * 0.22); // Net income tax bracket
  const estimatedMonthlyNet = totalMonthlyGross - estimatedPlatformFees - estimatedTaxes;

  // Funnel numbers
  const simulatedMonthlyImpressions = Math.round(inputs.monthlyVideoViews * viralMultiplierTotal);
  const simulatedLinkClicks = Math.round(simulatedMonthlyImpressions * 0.025); // ~2.5% CTR to bio
  const simulatedEmailLeads = Math.round(simulatedLinkClicks * 0.2); // ~20% opt-in to freebies

  const breakdownData: RevenueStreamBreakdown[] = [
    {
      channel: 'Spotify & Apple Streams',
      grossAmount: spotifyRevenue,
      sharePercent: totalMonthlyGross > 0 ? Math.round((spotifyRevenue / totalMonthlyGross) * 100) : 0,
      color: '#10b981',
      benchmarkTip: 'Basis: 3,50 € pro 1.000 Streams (DistroKid Auszahlung).'
    },
    {
      channel: 'Digitale Sample Packs & Presets',
      grossAmount: samplePackRevenue,
      sharePercent: totalMonthlyGross > 0 ? Math.round((samplePackRevenue / totalMonthlyGross) * 100) : 0,
      color: '#e05244',
      benchmarkTip: 'Höchste Marge (>92% Reingewinn ohne physischen Versand).'
    },
    {
      channel: 'Brand Deals & Sponsorings',
      grossAmount: brandDealRevenue,
      sharePercent: totalMonthlyGross > 0 ? Math.round((brandDealRevenue / totalMonthlyGross) * 100) : 0,
      color: '#f59e0b',
      benchmarkTip: 'Gekoppelt an 2026 TikTok Algorithmus & Views Multiplikator.'
    },
    {
      channel: 'Community / Patreon / Skool',
      grossAmount: patreonRevenue,
      sharePercent: totalMonthlyGross > 0 ? Math.round((patreonRevenue / totalMonthlyGross) * 100) : 0,
      color: '#3b82f6',
      benchmarkTip: 'Monatlich wiederkehrender Cashflow (MRR).'
    },
    {
      channel: 'Affiliate & Empfehlungen',
      grossAmount: affiliateRevenue,
      sharePercent: totalMonthlyGross > 0 ? Math.round((affiliateRevenue / totalMonthlyGross) * 100) : 0,
      color: '#8b5cf6',
      benchmarkTip: 'Audio-Plugins, BandLab, Hardware & Kurs-Provisionen.'
    }
  ];

  const chartData = breakdownData.map((item) => ({
    name: item.channel.split(' ')[0],
    amount: item.grossAmount,
    color: item.color
  }));

  const handleCopySummary = () => {
    const summary = `CREATOR COMPASS // REVENUE & VIRAL FORECAST 2026
Creator: ${profile.name} (${profile.handle})
Monatlich Brutto: ${totalMonthlyGross.toLocaleString()} €
Monatlich Netto (ca.): ${estimatedMonthlyNet.toLocaleString()} €
Jahresprognose: ${totalAnnualGross.toLocaleString()} €

KANÄLE:
• Spotify/Streams: ${spotifyRevenue.toLocaleString()} € (${inputs.monthlyStreams.toLocaleString()} Plays)
• Sample Packs / Presets: ${samplePackRevenue.toLocaleString()} € (${inputs.samplePackMonthlySales} Verkäufe)
• Brand Deals: ${brandDealRevenue.toLocaleString()} € (${inputs.brandDealsCount} Platzierungen)
• Fan Subs: ${patreonRevenue.toLocaleString()} € (${inputs.patreonMembers} Fans)
• Affiliate: ${affiliateRevenue.toLocaleString()} €

TIKTOK 2026 FUNNEL PERFORMANCE:
• Zielgruppen-Interesse: ${inputs.tiktokAudienceInterestTier}
• Completion-Rate: ${inputs.tiktokCompletionRatePercent}% (Schwelle für Boost: >65%)
• Kommentar-Qualität: ${inputs.tiktokCommentQualityRatio}
• Prognostizierte monatliche Video-Reichweite: ${simulatedMonthlyImpressions.toLocaleString()} Views
• Link-in-Bio Klicks: ~${simulatedLinkClicks.toLocaleString()}`;

    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Summary Stats */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-neutral-900">
              Umsatz- & Cashflow-Simulator (inkl. TikTok 2026 Algorithmus-Engine)
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Verbindet realistische Monetarisierungskanäle mit den 5 neuen TikTok-Algorithmus-Regeln (Completion-Rate, Kommentarqualität & 72h-Trend-Fenster).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-neutral-400 block font-mono">Prognose Brutto / Monat</span>
            <span className="text-2xl font-black text-neutral-900">{totalMonthlyGross.toLocaleString()} €</span>
          </div>
          <div className="text-right pl-3 border-l border-neutral-200">
            <span className="text-xs text-emerald-600 font-mono block">Netto ca.</span>
            <span className="text-xl font-black text-emerald-600">{estimatedMonthlyNet.toLocaleString()} €</span>
          </div>

          <button
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition shadow-xs cursor-pointer ml-1"
          >
            {copiedSummary ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Kopiert!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Forecast teilen
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setActiveSubTab('financial_model')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition ${
            activeSubTab === 'financial_model'
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          Einnahmen-Modell & Sliders
        </button>

        <button
          onClick={() => setActiveSubTab('tiktok_algorithm')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition flex items-center gap-1.5 ${
            activeSubTab === 'tiktok_algorithm'
              ? 'border-brand-coral bg-rose-50 text-brand-coral font-bold'
              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          TikTok 2026 Algorithmus-Hebel
        </button>

        <button
          onClick={() => setActiveSubTab('funnel_breakdown')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition ${
            activeSubTab === 'funnel_breakdown'
              ? 'border-neutral-900 bg-neutral-900 text-white'
              : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
          }`}
        >
          Conversion-Funnel Analyse
        </button>
      </div>

      {/* Main Tab: Financial Model & Sliders */}
      {activeSubTab === 'financial_model' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input Sliders */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-5">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-brand-coral" />
                  Einnahmen-Regler & Benchmarks
                </span>
                <span className="text-xs text-neutral-400 font-normal">Live berechnet</span>
              </h3>

              {/* Slider 1: Monthly Spotify Streams */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-neutral-700">Spotify & Apple Music Plays / Monat:</span>
                  <span className="font-mono text-emerald-600 font-bold">
                    {inputs.monthlyStreams.toLocaleString()} Plays ({spotifyRevenue} €)
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="1500000"
                  step="5000"
                  value={inputs.monthlyStreams}
                  onChange={(e) => setInputs({ ...inputs, monthlyStreams: Number(e.target.value) })}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                  <span>5K Plays</span>
                  <span>500K</span>
                  <span>1.5M+ Plays</span>
                </div>
              </div>

              {/* Slider 2: Digital Sample Packs & Presets */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-neutral-700">Sample Packs & Preset Bundles verkauft:</span>
                  <span className="font-mono text-brand-coral font-bold">
                    {inputs.samplePackMonthlySales} Sales à {inputs.samplePackPriceAvg} € ({samplePackRevenue} €)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="250"
                  step="1"
                  value={inputs.samplePackMonthlySales}
                  onChange={(e) => setInputs({ ...inputs, samplePackMonthlySales: Number(e.target.value) })}
                  className="w-full accent-brand-coral cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                  <span>0 Sales</span>
                  <span>50 Sales</span>
                  <span>250+ Sales</span>
                </div>
              </div>

              {/* Slider 3: Brand Sponsorships */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-neutral-700">Bezahlte Brand Deals & Platzierungen:</span>
                  <span className="font-mono text-amber-600 font-bold">
                    {inputs.brandDealsCount} Deals à CPM {inputs.brandCpmAverage} € ({brandDealRevenue} €)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={inputs.brandDealsCount}
                  onChange={(e) => setInputs({ ...inputs, brandDealsCount: Number(e.target.value) })}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                  <span>0 Deals</span>
                  <span>2 Deals</span>
                  <span>8 Deals/Monat</span>
                </div>
              </div>

              {/* Slider 4: Fan Memberships (Patreon / Discord) */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-neutral-700">Patreon / Skool / Discord VIP Abonnenten:</span>
                  <span className="font-mono text-blue-600 font-bold">
                    {inputs.patreonMembers} Fans à {inputs.patreonTierPrice} € ({patreonRevenue} €)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="300"
                  step="5"
                  value={inputs.patreonMembers}
                  onChange={(e) => setInputs({ ...inputs, patreonMembers: Number(e.target.value) })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                  <span>0 Fans</span>
                  <span>100</span>
                  <span>300+ Mitglieder</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Revenue Visualization & Channel Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Einnahmen-Aufteilung ({totalAnnualGross.toLocaleString()} € / Jahr)
                </span>
                <span className="text-xs text-neutral-500 font-mono">Brutto</span>
              </h3>

              {/* Chart Visualizer */}
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(value: any) => [`${Number(value).toLocaleString()} €`, 'Umsatz']}
                    />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* List breakdown cards */}
              <div className="space-y-2 pt-1 text-xs">
                {breakdownData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-neutral-200/80 bg-neutral-50/50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="font-bold text-neutral-900 block">{item.channel}</span>
                        <span className="text-[10px] text-neutral-500">{item.benchmarkTip}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-2">
                      <span className="font-bold font-mono text-neutral-900">
                        {item.grossAmount.toLocaleString()} €
                      </span>
                      <span className="text-[10px] text-neutral-400 block font-mono">
                        ({item.sharePercent}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Net Breakdown Notice */}
              <div className="p-3 bg-neutral-900 text-white rounded-xl text-xs flex items-center justify-between">
                <div>
                  <span className="text-neutral-400 text-[10px] block font-mono">
                    Netto nach Steuern & Plattformgebühren
                  </span>
                  <span className="text-base font-bold text-emerald-400">
                    ca. {(estimatedMonthlyNet * 12).toLocaleString()} € / Jahr
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 max-w-[140px] text-right">
                  Abzug: ~8% Plattformkosten + 22% Schätzsteuer.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub Tab: TikTok 2026 Algorithm Engine */}
      {activeSubTab === 'tiktok_algorithm' && (
        <div className="space-y-5">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-brand-coral" />
                  TikTok 2026 Algorithmus Viralitäts-Multiplikator
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Berechnet deinen Reichweiten-Hebel basierend auf den 5 Kern-Änderungen (Followerzahl zählt nicht mehr als Views-Garant).
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-neutral-400 block">Gesamt-Multiplikator</span>
                <span className="text-xl font-black text-brand-coral font-mono">
                  {viralMultiplierTotal.toFixed(2)}x
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Audience Interest Size */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <span className="font-bold text-neutral-800 block">
                  1. Audience Interest Size
                </span>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  Themen mit hoher Breitenwirkung (ChatGPT &gt Gemini, Club-Banger &gt Modularer Synth).
                </p>
                <select
                  value={inputs.tiktokAudienceInterestTier}
                  onChange={(e) =>
                    setInputs({ ...inputs, tiktokAudienceInterestTier: e.target.value as any })
                  }
                  className="w-full p-2 border border-neutral-300 rounded-lg bg-white text-xs font-semibold outline-none"
                >
                  <option value="Broad (Mass Appeal)">Breites Publikum (Mass Appeal: 1.5x)</option>
                  <option value="Mid-Tier (General Music/Tech)">Mittlere Nische (Producer/Tech: 1.0x)</option>
                  <option value="Micro-Niche (Specific DAW/Genre)">Mikro-Nische (Spezifisch: 0.65x)</option>
                </select>
              </div>

              {/* Completion Rate */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <div className="flex justify-between font-bold text-neutral-800">
                  <span>2. Completion Rate (%)</span>
                  <span className="text-brand-coral font-mono">{inputs.tiktokCompletionRatePercent}%</span>
                </div>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  Ziel 2026: &gt;65% Watch-Time für den großen Ausspielungs-Push an Nicht-Follower.
                </p>
                <input
                  type="range"
                  min="30"
                  max="95"
                  step="1"
                  value={inputs.tiktokCompletionRatePercent}
                  onChange={(e) =>
                    setInputs({ ...inputs, tiktokCompletionRatePercent: Number(e.target.value) })
                  }
                  className="w-full accent-brand-coral cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400">
                  <span>30% (Flop)</span>
                  <span>65% (Schwelle)</span>
                  <span>95% (Viral)</span>
                </div>
              </div>

              {/* Comment Quality */}
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                <span className="font-bold text-neutral-800 block">
                  3. Kommentarqualität
                </span>
                <p className="text-neutral-500 text-[11px] leading-relaxed">
                  Echte inhaltliche Diskussionen & Creator-Antworten schlagen einfache Bot-Emojis.
                </p>
                <select
                  value={inputs.tiktokCommentQualityRatio}
                  onChange={(e) =>
                    setInputs({ ...inputs, tiktokCommentQualityRatio: e.target.value as any })
                  }
                  className="w-full p-2 border border-neutral-300 rounded-lg bg-white text-xs font-semibold outline-none"
                >
                  <option value="High (Discussions & Replies)">Hoch (Diskussionen & Creator-Replies: 1.4x)</option>
                  <option value="Medium (Standard Emojis)">Mittel (Standard Feedback: 1.0x)</option>
                  <option value="Low (Few Reactions)">Niedrig (Kaum Interaktion: 0.75x)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5 Rules Breakdown Grid from Knowledge Base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TIKTOK_2026_ALGORITHM_RULES.map((rule) => (
              <div
                key={rule.ruleNumber}
                className="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs space-y-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px]">
                    {rule.ruleNumber}
                  </span>
                  <h4 className="font-bold text-neutral-900">{rule.title}</h4>
                </div>
                <p className="text-neutral-600 leading-relaxed text-[11px]">{rule.detail}</p>
                <div className="p-2 bg-rose-50/60 rounded-md border border-rose-100 text-brand-coral font-medium text-[11px]">
                  💡 Praxistipp: {rule.actionTip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub Tab: Conversion Funnel Analysis */}
      {activeSubTab === 'funnel_breakdown' && (
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-5">
          <div className="border-b border-neutral-100 pb-3">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-600" />
              Der Conversion-Trichter: Von Views zu echtem Cashflow
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Viele Views nützen nichts ohne klaren Trichter. Hier siehst du den monatlichen Durchlauf vom Short-Form Video zum Kauf.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Stufe 1: Monatliche Views
              </span>
              <span className="text-xl font-black text-neutral-900 font-mono">
                {simulatedMonthlyImpressions.toLocaleString()}
              </span>
              <span className="text-[10px] text-neutral-500 block mt-1">100% Reichweiten-Pool</span>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Stufe 2: Link-in-Bio Klicks
              </span>
              <span className="text-xl font-black text-brand-coral font-mono">
                {simulatedLinkClicks.toLocaleString()}
              </span>
              <span className="text-[10px] text-neutral-500 block mt-1">~2.5% Klick-Quote</span>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Stufe 3: Freebie / Email Leads
              </span>
              <span className="text-xl font-black text-blue-600 font-mono">
                {simulatedEmailLeads.toLocaleString()}
              </span>
              <span className="text-[10px] text-neutral-500 block mt-1">~20% Opt-In Quote</span>
            </div>

            <div className="p-4 bg-neutral-900 text-white rounded-xl border border-neutral-800">
              <span className="text-[10px] uppercase font-bold text-amber-300 block mb-1">
                Stufe 4: Zahlende Kunden
              </span>
              <span className="text-xl font-black text-emerald-400 font-mono">
                {inputs.samplePackMonthlySales + inputs.patreonMembers} Käufer
              </span>
              <span className="text-[10px] text-neutral-400 block mt-1">Monatlicher Cashflow</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
