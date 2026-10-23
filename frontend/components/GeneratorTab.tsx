import React, { useState } from 'react';
import { UserProfile, PlatformId } from '../types';
import { PLATFORM_LIMITS_2026, NICHES_DATA, HOOK_FRAMEWORKS } from '../constants';
import { Copy, Check, Sparkles, RefreshCw, Globe, MessageSquareQuote, FileText } from 'lucide-react';

interface GeneratorTabProps {
  profile: UserProfile;
}

export const GeneratorTab: React.FC<GeneratorTabProps> = ({ profile }) => {
  const [topic, setTopic] = useState('Das größte Geheimnis für schnelle Resultate');
  const [selectedHookType, setSelectedHookType] = useState(0);
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeNiche = NICHES_DATA.find((n) => n.id === profile.niche) || NICHES_DATA[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getHookText = () => {
    const fw = HOOK_FRAMEWORKS[selectedHookType];
    return language === 'de' ? fw.de : fw.en;
  };

  const generatePostForPlatform = (pId: PlatformId): string => {
    const hook = getHookText();
    const handle = profile.handle || '@creator';
    const link = profile.linkInBio || 'https://linktr.ee/deinlink';
    const tags = activeNiche.viralTags.slice(0, 4).join(' ') + ` #${profile.name.replace(/\s+/g, '')}`;

    if (pId === 'tiktok') {
      return `${hook} 💥

Hier sind die 3 wichtigsten Schritte, die fast jeder übersieht:
1️⃣ Schritt 1: Starte nicht mit Perfektion, sondern mit Volumen.
2️⃣ Schritt 2: Analysiere deine Retention in Sekunde 3.
3️⃣ Schritt 3: Nutze diesen Sound bevor er durch die Decke geht!

👉 Welcher Schritt fällt dir am schwersten? Schreib es in die Kommentare!

${tags} #viral #creatorguide`;
    }

    if (pId === 'instagram') {
      return `${hook} 💡
(Speichere dir diesen Beitrag für später ab 📌)

Viele fragen mich immer wieder nach dem genauen Ablauf. Hier ist die Blaupause:
• Fokus auf das wesentliche Ergebnis
• Teste verschiedene Hook-Varianten
• Baue eine echte Beziehung über DMs auf

🔗 Den vollständigen Guide & exklusive Downloads findest du im Link in der Bio: ${link}

Teile das mit jemandem, der diesen Tipp heute braucht! 🚀
.
.
${tags} #reelsinstagram #growthhack`;
    }

    if (pId === 'shorts') {
      return `${hook} ⚡

Das ist die Methode, die alles verändert hat. 
Achte vor allem auf Sekunde 15!

Abonniere ${handle} für tägliche Einblicke und den vollständigen Breakdown im langen Video auf dem Kanal! 🔔

${tags} #Shorts #viralvideo`;
    }

    if (pId === 'x') {
      // 280 chars strict limit for X free
      const rawText = `${hook.slice(0, 110)}...\n\n3 Learnings:\n1. Qualität folgt Quantität\n2. Hook schlägt Inhalt\n3. Konsistenz gewinnt\n\nMehr Insights bei ${handle} 👇`;
      return rawText.slice(0, 275);
    }

    if (pId === 'linkedin') {
      return `${hook}

In den letzten Monaten habe ich in der Praxis beobachtet, dass viele bei "${topic}" an den falschen Stellschrauben drehen.

Hier sind 3 strategische Hebel für messbare Ergebnisse:

1. Reduziere die Reibung für den Nutzer
2. Liefere den Mehrwert innerhalb der ersten 5 Sekunden
3. Dokumentiere den Prozess transparent ("Build in Public")

Was ist deine persönliche Erfahrung mit diesem Ansatz? Ich freue mich auf den Austausch in den Kommentaren! 💬

#Leadership #DigitalStrategy #CreatorEconomy ${handle}`;
    }

    if (pId === 'youtube') {
      return `Titel-Vorschläge:
1. ${topic} (Was dir niemand erzählt)
2. Ich habe ${topic} 30 Tage getestet – Das ist passiert!
3. Die ultimative Anleitung für ${activeNiche.title} 2026

Beschreibung:
In diesem Video zeige ich dir Schritt für Schritt, wie du ${topic} meisterst.

⏱️ TIMESTAMPS:
0:00 - Warum 90% hier scheitern
1:45 - Die 3 Kernprinzipien
4:20 - Der wichtigste Gamechanger
8:10 - Fazit & Nächste Schritte

🔗 ALLE LINKS & RESSOURCEN:
Mein Equipment & Vorlagen: ${link}
Folge mir auf Instagram: ${handle}

${tags}`;
    }

    if (pId === 'telegram') {
      return `🚨 **EXKLUSIVES UPDATE IM KANAL**

${hook}

Ich habe euch versprochen, die Details transparent zu teilen. Hier ist das komplette Breakdown zu "${topic}":

📌 **Wichtigste Erkenntnis:**
Wer heute nicht auf Video-Retention setzt, verschenkt 80% des Potenzials.

👉 Diskutiert gerne in den Kommentaren mit!
Euer ${handle}`;
    }

    // Default template for Threads/Facebook/Pinterest
    return `${hook} 🚀\n\nDas Thema "${topic}" wird komplett unterschätzt. Probiere diesen Ansatz aus und berichte mir von deinen Resultaten!\n\nLink zu weiteren Ressourcen: ${link}\n\n${tags}`;
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-coral" />
              Multi-Plattform Post-Generator
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Generiert maßgeschneiderte Vorlagen mit deinen Handles ({profile.handle || '@du'}), Tags und Links.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 transition"
            >
              <Globe className="w-3.5 h-3.5" />
              Sprache: {language === 'de' ? 'Deutsch 🇩🇪' : 'English 🇬🇧'}
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Dein aktuelles Thema oder Kernaussage
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="z.B. Wie man mit Suno AI fertige Club-Hits baut"
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50/50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Hook-Formel wählen
            </label>
            <select
              value={selectedHookType}
              onChange={(e) => setSelectedHookType(Number(e.target.value))}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50/50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
            >
              {HOOK_FRAMEWORKS.map((h, i) => (
                <option key={i} value={i}>
                  {h.type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hook Preview Pill */}
        <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-start gap-2.5 text-xs">
          <MessageSquareQuote className="w-4 h-4 text-brand-coral shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-neutral-800">Aktiver Hook:</span>
            <span className="italic text-neutral-600 ml-1">"{getHookText()}"</span>
          </div>
        </div>
      </div>

      {/* Generated Platform Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {profile.activePlatforms.map((pId) => {
          const info = PLATFORM_LIMITS_2026[pId];
          const postContent = generatePostForPlatform(pId);
          const isCopied = copiedId === pId;

          return (
            <div
              key={pId}
              className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">{info.name}</h3>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      Beste Zeit: {info.bestTimes}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(postContent, pId)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Kopieren
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 bg-neutral-50/80 rounded-lg border border-neutral-100 text-xs text-neutral-800 whitespace-pre-line font-mono leading-relaxed max-h-60 overflow-y-auto">
                  {postContent}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                <span>{postContent.length} Zeichen</span>
                <span className="text-neutral-400 truncate max-w-[200px]" title={info.algorithmTip}>
                  💡 {info.algorithmTip}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
