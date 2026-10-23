import React, { useState } from 'react';
import { UserProfile, DealComparisonInputs, DealTimelinePoint } from '../types';
import {
  Scale,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Award,
  Sliders,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface DealSimulatorTabProps {
  profile: UserProfile;
}

export const DealSimulatorTab: React.FC<DealSimulatorTabProps> = ({ profile }) => {
  const [dealInputs, setDealInputs] = useState<DealComparisonInputs>({
    advanceAmount: 75000,
    majorLabelMasterRoyaltyPercent: 15,
    labelTouringMerchCutPercent: 20,
    monthlyStreams: 800000,
    streamPayoutPer1000: 3.50,
    monthlyPhysicalMerchIncome: 2500,
    labelMarketingDeductionsMonthly: 2000,
    catalogueValuationMultipleYears: 12 // 12x annual net multiple
  });

  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Compute 5-Year Cumulative Simulation & Catalogue Equity
  const compute5YearTimeline = (): DealTimelinePoint[] => {
    const points: DealTimelinePoint[] = [];

    const monthlyGrossStreaming = (dealInputs.monthlyStreams / 1000) * dealInputs.streamPayoutPer1000;
    const monthlyMerch = dealInputs.monthlyPhysicalMerchIncome;

    let cumulativeMajorArtist = dealInputs.advanceAmount;
    let unrecoupedDebt = dealInputs.advanceAmount;

    let cumulativeIndieArtist = 0;
    let cumulativeHybridArtist = 0;

    for (let yr = 1; yr <= 5; yr++) {
      const yearlyStreamsRev = monthlyGrossStreaming * 12;
      const yearlyMerch = monthlyMerch * 12;
      const yearlyDeductions = dealInputs.labelMarketingDeductionsMonthly * 12;

      // 1. Indie DIY (DistroKid/RouteNote):
      const yearlyIndieGross = (yearlyStreamsRev - 22) + yearlyMerch;
      cumulativeIndieArtist += yearlyIndieGross;

      // 2. Major 360 Deal:
      const artistRoyaltyCredit = yearlyStreamsRev * (dealInputs.majorLabelMasterRoyaltyPercent / 100);
      const labelMerchCut = yearlyMerch * (dealInputs.labelTouringMerchCutPercent / 100);
      const artistMerchNet = yearlyMerch - labelMerchCut;

      const netRoyaltyTowardsAdvance = artistRoyaltyCredit - yearlyDeductions;
      if (netRoyaltyTowardsAdvance > 0) {
        if (unrecoupedDebt > netRoyaltyTowardsAdvance) {
          unrecoupedDebt -= netRoyaltyTowardsAdvance;
          cumulativeMajorArtist += artistMerchNet;
        } else {
          const excess = netRoyaltyTowardsAdvance - unrecoupedDebt;
          unrecoupedDebt = 0;
          cumulativeMajorArtist += artistMerchNet + excess;
        }
      } else {
        unrecoupedDebt += Math.abs(netRoyaltyTowardsAdvance);
        cumulativeMajorArtist += artistMerchNet;
      }

      // 3. Modern Hybrid Indie Label (50/50 profit split, no 360 cut)
      const yearlyHybrid = (yearlyStreamsRev * 0.5) + yearlyMerch;
      cumulativeHybridArtist += yearlyHybrid;

      // Catalogue Equity Valuation:
      // Indie owns 100% of masters => Valuation = Yearly Streaming * Multiple
      const catalogueEquityIndie = Math.round(yearlyStreamsRev * dealInputs.catalogueValuationMultipleYears);
      // Major artist owns 0% of masters => Valuation = 0
      const catalogueEquityMajor = 0;

      points.push({
        year: `Jahr ${yr}`,
        major360DealCumulative: Math.round(cumulativeMajorArtist),
        indieDistroCumulative: Math.round(cumulativeIndieArtist),
        hybridSplitCumulative: Math.round(cumulativeHybridArtist),
        unrecoupedDebtMajor: Math.round(unrecoupedDebt),
        catalogueEquityIndie,
        catalogueEquityMajor
      });
    }

    return points;
  };

  const timelineData = compute5YearTimeline();
  const year5Major = timelineData[4].major360DealCumulative;
  const year5Indie = timelineData[4].indieDistroCumulative;
  const year5Debt = timelineData[4].unrecoupedDebtMajor;
  const year5IndieEquity = timelineData[4].catalogueEquityIndie;

  // Break-even streams needed to recoup
  const artistRoyaltyPerStream = (dealInputs.streamPayoutPer1000 / 1000) * (dealInputs.majorLabelMasterRoyaltyPercent / 100);
  const streamsToRecoup = Math.round(dealInputs.advanceAmount / artistRoyaltyPerStream);

  const handleCopyReport = () => {
    const report = `DEAL SIMULATOR // MAJOR 360 VS. DIY DISTROKID BERICHT
Künstler: ${profile.name} (${profile.handle})
Vorschuss (Advance): ${dealInputs.advanceAmount.toLocaleString()} $
Künstler-Beteiligung Major: ${dealInputs.majorLabelMasterRoyaltyPercent}% (Label behält 85%)
360 Merch-Abzug Label: ${dealInputs.labelTouringMerchCutPercent}%

5-JAHRES-PROGNOSE:
• Einnahmen mit Indie DistroKid (100% Master): ${year5Indie.toLocaleString()} $
• Einnahmen mit Major 360 Deal: ${year5Major.toLocaleString()} $
• Differenz: ${(year5Indie - year5Major).toLocaleString()} $ mehr Gewinn auf eigener Hand!
• Katalogwert (Catalogue Equity bei 100% Master-Besitz): ${year5IndieEquity.toLocaleString()} $ (beim Major: 0 $, da das Label die Master besitzt)
• Restschuld beim Label nach 5 Jahren: ${year5Debt > 0 ? `${year5Debt.toLocaleString()} $ (UNRECOUPED TRAP)` : 'Vollständig zurückgezahlt'}
• Streams nötig nur für Vorschuss-Rückzahlung: ${streamsToRecoup.toLocaleString()} Streams!`;

    navigator.clipboard.writeText(report);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-brand-coral" />
            <h2 className="text-base font-bold text-neutral-900">
              Record Label vs. DIY Distribution Deal Simulator
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Enthülle die ungeschminkte Wahrheit über 360-Deals, Vorschuss-Schuldenfallen (Recoupment) und warum 100% eigene Masterrechte fast immer gewinnen.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-neutral-400 block font-mono">Indie Vorsprung (5 Jahre)</span>
            <span className="text-xl font-black text-emerald-600">
              +{(year5Indie - year5Major).toLocaleString()} $
            </span>
          </div>

          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition cursor-pointer"
          >
            {copiedKey ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Bericht kopiert!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Deal-Analyse kopieren
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs vs Recharts Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Deal Sliders & Contract Terms */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between border-b border-neutral-100 pb-2">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-brand-coral" />
              Vertrags-Parameter
            </span>
            <span className="text-xs text-neutral-400">Vergleichs-Werte</span>
          </h3>

          {/* Advance Amount Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-neutral-700">Label-Vorschuss (Advance):</span>
              <span className="font-mono text-brand-coral font-bold">{dealInputs.advanceAmount.toLocaleString()} $</span>
            </div>
            <input
              type="range"
              min="10000"
              max="250000"
              step="5000"
              value={dealInputs.advanceAmount}
              onChange={(e) => setDealInputs({ ...dealInputs, advanceAmount: Number(e.target.value) })}
              className="w-full accent-brand-coral cursor-pointer"
            />
            <span className="text-[10px] text-neutral-400">
              Achtung: Vorschüsse sind kein Geschenk, sondern ein zinsloser Kredit gegen deine 15% Tantiemen!
            </span>
          </div>

          {/* Label Master Royalty */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-neutral-700">Künstler-Anteil an Streaming-Tantiemen:</span>
              <span className="font-mono text-neutral-900 font-bold">{dealInputs.majorLabelMasterRoyaltyPercent}% (Label behält {100 - dealInputs.majorLabelMasterRoyaltyPercent}%)</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="1"
              value={dealInputs.majorLabelMasterRoyaltyPercent}
              onChange={(e) => setDealInputs({ ...dealInputs, majorLabelMasterRoyaltyPercent: Number(e.target.value) })}
              className="w-full accent-neutral-900 cursor-pointer"
            />
          </div>

          {/* 360 Tour & Merch Cut */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-neutral-700">Label 360-Klausel (Anteil an deinen Merch/Gigs):</span>
              <span className="font-mono text-amber-600 font-bold">{dealInputs.labelTouringMerchCutPercent}% Abzug</span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              step="5"
              value={dealInputs.labelTouringMerchCutPercent}
              onChange={(e) => setDealInputs({ ...dealInputs, labelTouringMerchCutPercent: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Monthly Streams */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-neutral-700">Monatliche Streaming-Plays:</span>
              <span className="font-mono text-emerald-600 font-bold">{dealInputs.monthlyStreams.toLocaleString()} Plays</span>
            </div>
            <input
              type="range"
              min="100000"
              max="5000000"
              step="100000"
              value={dealInputs.monthlyStreams}
              onChange={(e) => setDealInputs({ ...dealInputs, monthlyStreams: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Break-even calculation box */}
          <div className="p-3.5 bg-neutral-900 text-white rounded-xl text-xs space-y-1.5 font-mono">
            <span className="text-amber-300 font-bold block text-[11px] uppercase">
              🎯 Recoupment-Meilenstein:
            </span>
            <p className="text-neutral-200 text-[11px] leading-relaxed">
              Du benötigst ca. <strong className="text-white text-sm">{streamsToRecoup.toLocaleString()} Streams</strong>, bevor dir das Label auch nur einen einzigen weiteren Cent an Tantiemen auszahlt!
            </p>
          </div>
        </div>

        {/* Right: Multi-Year Recoupment Timeline Chart */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                5-Jahres Kumulativer Cashflow (Künstler-Erlöse)
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Vergleicht das tatsächliche Netto-Geld auf deinem Bankkonto nach 5 Jahren.
              </p>
            </div>
          </div>

          {/* Recharts Timeline */}
          <div className="h-56 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} formatter={(val) => `${Math.round(Number(val) / 1000)}k $`} />
                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} $`, '']} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="indieDistroCumulative" name="Indie DIY (100% Master)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="hybridSplitCumulative" name="Hybrid 50/50 Deal" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="major360DealCumulative" name="Major 360 Deal" stroke="#e05244" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-900 block">Indie DIY (DistroKid/RouteNote):</span>
              <span className="text-xl font-black text-emerald-700 font-mono">
                {year5Indie.toLocaleString()} $
              </span>
              <p className="text-[11px] text-emerald-900 leading-snug">
                Katalog-Vermögen: <strong className="font-mono text-emerald-700">+{year5IndieEquity.toLocaleString()} $</strong>. Du behältst alle Master-Rechte und 100% deines Merchs auf ewig.
              </p>
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
              <span className="font-bold text-rose-900 block">Major 360 Deal:</span>
              <span className="text-xl font-black text-rose-700 font-mono">
                {year5Major.toLocaleString()} $
              </span>
              <p className="text-[11px] text-rose-900 leading-snug">
                Restschuld beim Label: <strong className="font-mono">{year5Debt.toLocaleString()} $</strong>. Dein Katalogwert beträgt 0 $, da das Label Eigentümer deiner Musik ist!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
