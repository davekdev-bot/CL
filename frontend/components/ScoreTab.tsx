import React, { useState } from 'react';
import { UserProfile, WeeklyCheckinData, ScoreBreakdown } from '../types';
import { Activity, TrendingUp, AlertCircle, CheckCircle, RefreshCcw, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ScoreTabProps {
  profile: UserProfile;
}

export const ScoreTab: React.FC<ScoreTabProps> = ({ profile }) => {
  const [formData, setFormData] = useState<WeeklyCheckinData>({
    postsCount: 5,
    experimentsCount: 2,
    followerGrowth: 150,
    linkClicks: 45,
    revenueEst: 35,
    notes: '2 Reels gingen gut durch. Hook mit Verlustangst hat funktioniert.',
    date: new Date().toISOString().split('T')[0],
  });

  const calculateScore = (data: WeeklyCheckinData): ScoreBreakdown => {
    // 1. Consistency (Max 30): Target 5+ posts per week
    const consistency = Math.min(30, Math.round((data.postsCount / 5) * 30));

    // 2. Testing / A/B experiments (Max 20): Target 2+ experiments
    const testing = Math.min(20, Math.round((data.experimentsCount / 2) * 20));

    // 3. Growth rate (Max 30): Target 100+ new followers/week
    const growth = Math.min(30, Math.round((Math.max(0, data.followerGrowth) / 100) * 30));

    // 4. Conversion / Impact (Max 20): Clicks & sales
    const impact = Math.min(20, Math.round((data.linkClicks / 50) * 20));

    const total = consistency + testing + growth + impact;

    // Actionable algorithm feedback rules from the knowledge base
    const recommendations: string[] = [];

    if (consistency < 20) {
      recommendations.push(
        '⚠️ Zu wenig Posts: Nutze die Batch-Produktion (1 Drehtag für 5 Clips), um die Frequenz zu stabilisieren.'
      );
    } else {
      recommendations.push(
        '✅ Solide Frequenz: Der Algorithmus hat genügend Datenpunkte zur Auswertung deiner Zielgruppe.'
      );
    }

    if (testing < 15) {
      recommendations.push(
        '💡 Zu wenig A/B-Tests: Variiere wöchentlich mindestens 2 Hooks (z.B. Negative Hook vs. Curiosity Gap).'
      );
    }

    if (growth < 15 && consistency >= 20) {
      recommendations.push(
        '🔍 Hoher Aufwand, geringes Wachstum: Das Problem liegt im Hook! Kürze die Einleitung auf unter 2 Sekunden.'
      );
    }

    if (growth >= 25) {
      recommendations.push(
        '🚀 Gewinner-Format gefunden: Erstelle sofort 5 Variationen deines stärksten Beitrags der letzten 7 Tage!'
      );
    }

    if (impact < 10) {
      recommendations.push(
        '🔗 Wenig Link-Klicks: Platziere einen klaren CTA (z.B. "Link in Bio für Vorlage") anstatt generischem Text.'
      );
    }

    return { consistency, testing, growth, impact, total, recommendations };
  };

  const scoreResult = calculateScore(formData);

  const chartData = [
    { name: 'Konstanz', score: scoreResult.consistency, max: 30 },
    { name: 'Tests', score: scoreResult.testing, max: 20 },
    { name: 'Wachstum', score: scoreResult.growth, max: 30 },
    { name: 'Wirkung', score: scoreResult.impact, max: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-coral" />
            Der Creator Score & Wachstums-Algorithmus
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Trage wöchentlich deine Zahlen ein. Der Algorithmus analysiert deinen Flaschenhals und leitet exakte nächste Schritte ab.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="text-right">
            <span className="text-2xl font-black text-neutral-900">{scoreResult.total}</span>
            <span className="text-xs text-neutral-400"> / 100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider text-neutral-400">
            Wöchentlicher Check-In
          </h3>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Veröffentlichte Beiträge (Woche)
            </label>
            <input
              type="number"
              min="0"
              value={formData.postsCount}
              onChange={(e) => setFormData({ ...formData, postsCount: Number(e.target.value) })}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Durchgeführte Hook-Tests / Experimente
            </label>
            <input
              type="number"
              min="0"
              value={formData.experimentsCount}
              onChange={(e) => setFormData({ ...formData, experimentsCount: Number(e.target.value) })}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Netto Follower-Wachstum
            </label>
            <input
              type="number"
              value={formData.followerGrowth}
              onChange={(e) => setFormData({ ...formData, followerGrowth: Number(e.target.value) })}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Link-in-Bio Klicks / Profilaufrufe
            </label>
            <input
              type="number"
              min="0"
              value={formData.linkClicks}
              onChange={(e) => setFormData({ ...formData, linkClicks: Number(e.target.value) })}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Geschätzte Einnahmen (€)
            </label>
            <input
              type="number"
              min="0"
              value={formData.revenueEst}
              onChange={(e) => setFormData({ ...formData, revenueEst: Number(e.target.value) })}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>
        </div>

        {/* Breakdown Chart & Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Card */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Score-Zusammensetzung
            </h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 30]} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#e05244" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actionable Rules / Recommendations */}
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-coral" />
              Algorithmus-Feedback & Nächste Schritte
            </h4>
            <div className="space-y-2">
              {scoreResult.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-800 leading-relaxed"
                >
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
