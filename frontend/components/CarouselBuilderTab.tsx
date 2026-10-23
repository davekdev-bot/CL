import React, { useState } from 'react';
import { UserProfile, CarouselDocument, CarouselSlide } from '../types';
import { NICHES_DATA } from '../constants';
import { generateAiContent } from '../services/geminiService';
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Sparkles,
  Download,
  Palette,
  FileText,
  Sliders,
  Maximize2
} from 'lucide-react';

interface CarouselBuilderTabProps {
  profile: UserProfile;
}

const DEFAULT_CAROUSELS: Record<string, CarouselDocument> = {
  music_producer: {
    id: 'car_music_1',
    title: '5 Schritte: Wie du Suno AI mit deiner DAW zu Club-Tracks machst',
    platform: 'Instagram',
    slideCount: 6,
    colorTheme: 'dark-neon',
    slides: [
      {
        slideNumber: 1,
        role: 'Cover / Hook',
        headline: 'Vom 10-Sekunden KI-Prompt zum Club-Banger',
        subheadline: 'Der exakte 5-Schritte Workflow, den Top-Produzenten 2026 nutzen (ohne Fake-Sound).',
        bulletPoints: [
          'Warum rohe KI-Tracks auf Spotify floppen',
          'Wie du Stems sauber separierst',
          'Das Geheimnis von -14 LUFS Mastering'
        ],
        visualDesignNote: 'Großer, fetter Schriftzug zentriert. Dunkler Hintergrund (#0f172a) mit dezentem Neon-Glow um die Wellenform-Grafik.',
        layoutTemplate: 'bold-title'
      },
      {
        slideNumber: 2,
        role: 'Problem & Agitation',
        headline: '95% aller KI-Songs klingen blechern & flach',
        subheadline: 'Der Algorithmus erkennt ungemischte Audio-Artefakte sofort und drosselt deine Reichweite.',
        bulletPoints: [
          'Keine Stereobreite bei Suno v3/v4 Standardexporten',
          'Clashing im Frequenzbereich zwischen 250Hz - 500Hz',
          'Mangelnde Dynamik für Club-Soundsysteme'
        ],
        visualDesignNote: 'Rot durchgestrichenes Waveform-Diagramm. Deutlicher Kontrast-Kasten mit Warnsymbol.',
        layoutTemplate: 'comparison'
      },
      {
        slideNumber: 3,
        role: 'Core Framework',
        headline: 'Schritt 1 & 2: Stem-Separation & Transient-Design',
        subheadline: 'Zerlege den Song in seine Einzelteile, bevor du etwas veränderst.',
        bulletPoints: [
          '1. Exportiere als unkomprimierte WAV (24-bit / 48kHz)',
          '2. Nutze Ultimate Vocal Remover oder BandLab Splitter',
          '3. Ersetze die KI-Kickdrum komplett durch ein analoges Sample'
        ],
        visualDesignNote: 'Nummerierte Boxen 01 und 02 mit leuchtenden Zahlen. Icons für Audio-Spuren.',
        layoutTemplate: 'checklist'
      },
      {
        slideNumber: 4,
        role: 'Deep Dive / Step',
        headline: 'Schritt 3 & 4: Sidechain & Stereo-Imaging',
        subheadline: 'So bringst du den typischen Club-Druck in deine Vocals und Bassline.',
        bulletPoints: [
          'Ducke den Sub-Bass um 4dB bei jedem Kick-Treffer',
          'Lege Chorus oder OTT (15%) auf die Suno-Leadsounds',
          'Halte alle Frequenzen unter 120Hz strikt Mono'
        ],
        visualDesignNote: 'Equalizer-Kurven-Grafik im Mockup-Format. Klare Markierung des Sub-Bass Bereichs.',
        layoutTemplate: 'split-card'
      },
      {
        slideNumber: 5,
        role: 'Cheat Sheet / Summary',
        headline: 'Die Spickzettel-Übersicht',
        subheadline: 'Speichere dir diese Checkliste vor deinem nächsten Release ab:',
        bulletPoints: [
          '✅ Rohes Audio trennen (Vocals / Bass / Drums)',
          '✅ Kickdrum manuell layern',
          '✅ Mono-Kompatibilität bei 100Hz prüfen',
          '✅ Limiter auf -1.0dB True Peak einstellen'
        ],
        visualDesignNote: 'Kompakte Checklist mit grünen Häkchen. Hervorhebung: "📌 Für später speichern!"',
        layoutTemplate: 'checklist'
      },
      {
        slideNumber: 6,
        role: 'Call to Action',
        headline: 'Möchtest du mein kostenloses Preset-Pack?',
        subheadline: 'Kommentiere "BEAT" unter diesem Post oder klicke auf den Link in meiner Bio.',
        bulletPoints: [
          'Gratis Ableton / FL Studio Effekt-Chain',
          'Die 10 besten Suno-Prompts für Club-Vocals',
          'Wöchentliche Tipps für Producer'
        ],
        visualDesignNote: 'Profilbild des Creators mit animiertem Pfeil zum Kommentarfeld und Bio-Link.',
        layoutTemplate: 'cta-final'
      }
    ]
  },
  generic: {
    id: 'car_gen_1',
    title: '7 unauffällige Hebel für exponentielles Wachstum',
    platform: 'LinkedIn',
    slideCount: 5,
    colorTheme: 'clean-white',
    slides: [
      {
        slideNumber: 1,
        role: 'Cover / Hook',
        headline: '7 kleine Routinen, die dir 2026 monatlich 50 Stunden sparen',
        subheadline: 'Wie moderne Solo-Creator und Gründer mehr Output ohne Burnout erzielen.',
        bulletPoints: [
          'Warum Motivation überbewertet ist',
          'Der 90-Minuten Batching-Zyklus',
          'Die Vorlagen-Architektur'
        ],
        visualDesignNote: 'Große minimalistische Typografie auf warmem Off-White. Akzentuierte Schriftzeile in Brand-Coral.',
        layoutTemplate: 'bold-title'
      },
      {
        slideNumber: 2,
        role: 'Core Framework',
        headline: 'Hebel 1: Der "Ein-Ideen-Trichter"',
        subheadline: 'Eine einzige gute Beobachtung wird zu 4 verschiedenen Formaten recycelt.',
        bulletPoints: [
          '1. Thought-Leadership Post auf LinkedIn',
          '2. 30-Sekunden Talking-Head Reel auf Instagram',
          '3. Visuelles Karussell mit Key-Takeaways',
          '4. Vertiefender Newsletter am Sonntag'
        ],
        visualDesignNote: 'Trichter-Diagramm mit Pfeilen zu 4 Plattform-Icons.',
        layoutTemplate: 'split-card'
      },
      {
        slideNumber: 3,
        role: 'Deep Dive / Step',
        headline: 'Hebel 2 & 3: Kalte Hooks & 0-Sekunden Intros',
        subheadline: 'Verabschiede dich von Höflichkeitsfloskeln. Biete den Payoff sofort.',
        bulletPoints: [
          'Streiche: "In diesem Post möchte ich euch erzählen..."',
          'Schreibe stattdessen: "Das ist der teuerste Fehler in Q2:"',
          'Zeige das Endergebnis in Slide 1'
        ],
        visualDesignNote: 'Vorher/Nachher Vergleichskarte (Rot vs. Grün).',
        layoutTemplate: 'comparison'
      },
      {
        slideNumber: 4,
        role: 'Cheat Sheet / Summary',
        headline: 'Die Wochen-Formel im Überblick',
        subheadline: 'Drucke dir diese Übersicht aus oder speichere den Beitrag ab:',
        bulletPoints: [
          'Mo: Recherche & Google Trends Scan',
          'Di: 3 Skripte in 45 Minuten verfassen',
          'Mi: Gebatchter Aufnahmetag',
          'Do: Schnitt mit CapCut Auto-Captions'
        ],
        visualDesignNote: 'Wochenkalender-Layout mit klaren Farbkodierungen.',
        layoutTemplate: 'checklist'
      },
      {
        slideNumber: 5,
        role: 'Call to Action',
        headline: 'Folge @alex_creates für wöchentliche Creator-Strategien',
        subheadline: 'Teile dieses Dokument mit deinem Team oder speichere es als PDF ab.',
        bulletPoints: [
          '📌 Klicke auf "Speichern"',
          '💬 Was ist dein wichtigster Hebel?',
          '🔗 Link zum Creator Compass in der Bio'
        ],
        visualDesignNote: 'Klare CTA-Schaltfläche und Repost-Icon.',
        layoutTemplate: 'cta-final'
      }
    ]
  }
};

export const CarouselBuilderTab: React.FC<CarouselBuilderTabProps> = ({ profile }) => {
  const currentNiche = NICHES_DATA.find((n) => n.id === profile.niche) || NICHES_DATA[0];

  const [carouselDoc, setCarouselDoc] = useState<CarouselDocument>(() => {
    return DEFAULT_CAROUSELS[profile.niche] || DEFAULT_CAROUSELS.generic;
  });

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // AI Prompt generation
  const [topicPrompt, setTopicPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentSlide = carouselDoc.slides[activeSlideIndex] || carouselDoc.slides[0];

  const handleNextSlide = () => {
    if (activeSlideIndex < carouselDoc.slides.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    }
  };

  const handleCopySlideText = () => {
    const text = `SLIDE ${currentSlide.slideNumber} (${currentSlide.role})\n\nÜBERSCHRIFT: ${currentSlide.headline}\nSUBTITLE: ${currentSlide.subheadline}\n\nPUNKTE:\n${currentSlide.bulletPoints.map((b) => `• ${b}`).join('\n')}\n\nDESIGN-NOTIZ:\n${currentSlide.visualDesignNote}`;
    navigator.clipboard.writeText(text);
    setCopiedType('slide');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyFullCarousel = () => {
    const fullText = carouselDoc.slides
      .map(
        (s) =>
          `--- SLIDE ${s.slideNumber}: ${s.role} ---\n${s.headline}\n${s.subheadline}\n\n${s.bulletPoints.map((b) => `• ${b}`).join('\n')}\n\n[Design]: ${s.visualDesignNote}`
      )
      .join('\n\n====================\n\n');

    navigator.clipboard.writeText(`KARUSSELL: ${carouselDoc.title} (${carouselDoc.platform})\n\n${fullText}`);
    setCopiedType('full');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleGenerateAiCarousel = async () => {
    if (!topicPrompt.trim()) return;
    setIsGenerating(true);

    try {
      const prompt = `Erstelle ein professionelles, virales 6-Slide Karussell für ${carouselDoc.platform}.
Nische: ${currentNiche.title}
Thema: ${topicPrompt}
Creator: ${profile.handle}

Antworte STRENG als valides JSON in diesem Format:
{
  "title": "Prägnanter Karussell-Titel",
  "slides": [
    {
      "slideNumber": 1,
      "role": "Cover / Hook",
      "headline": "Starke, scroll-stoppende Überschrift",
      "subheadline": "Erklärende Subline mit Neugierde",
      "bulletPoints": ["Punkt 1", "Punkt 2", "Punkt 3"],
      "visualDesignNote": "Genaue Anweisung für Canva / Illustrator",
      "layoutTemplate": "bold-title"
    }
  ]
}
Erstelle exakt 6 Slides (1: Hook, 2: Problem/Fehler, 3-4: Schritte/Lösung, 5: Checkliste/Zusammenfassung, 6: CTA). Gib nur das JSON aus.`;

      const responseText = await generateAiContent(
        prompt,
        'Du bist der erfolgreichste Infografik- und Karussell-Designer für Instagram & LinkedIn.'
      );

      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      const newDoc: CarouselDocument = {
        id: 'car_ai_' + Date.now(),
        title: parsed.title || topicPrompt,
        platform: carouselDoc.platform,
        slideCount: parsed.slides?.length || 6,
        colorTheme: carouselDoc.colorTheme,
        slides: parsed.slides.map((s: any, idx: number) => ({
          slideNumber: idx + 1,
          role: s.role || `Slide ${idx + 1}`,
          headline: s.headline || '',
          subheadline: s.subheadline || '',
          bulletPoints: Array.isArray(s.bulletPoints) ? s.bulletPoints : [],
          visualDesignNote: s.visualDesignNote || 'Clean layout with high contrast typography',
          layoutTemplate: s.layoutTemplate || 'split-card'
        }))
      };

      setCarouselDoc(newDoc);
      setActiveSlideIndex(0);
      setTopicPrompt('');
    } catch (e) {
      alert('Konnte Karussell nicht generieren. Bitte versuche es erneut oder passe den Text an.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Karussell & PDF-Dokument Builder (5–10 Slides)
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Erstelle hochkonvertierende Instagram-Karussells (1080x1350) & LinkedIn PDF-Guides für maximale Saves und Shares.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCarouselDoc((prev) => ({
                  ...prev,
                  platform: prev.platform === 'Instagram' ? 'LinkedIn' : 'Instagram'
                }))
              }
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition cursor-pointer"
            >
              Format: <strong>{carouselDoc.platform}</strong>
            </button>

            <button
              onClick={handleCopyFullCarousel}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition shadow-xs cursor-pointer"
            >
              {copiedType === 'full' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Ganzes Deck kopiert!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Alles kopieren
                </>
              )}
            </button>
          </div>
        </div>

        {/* Slide Selector strip */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {carouselDoc.slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlideIndex(idx)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border whitespace-nowrap cursor-pointer transition ${
                  activeSlideIndex === idx
                    ? 'border-brand-coral bg-rose-50 text-brand-coral font-bold shadow-xs'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                Slide {s.slideNumber}: {s.role.split('/')[0]}
              </button>
            ))}
          </div>

          <span className="text-xs text-neutral-400 font-mono shrink-0 pl-2">
            {activeSlideIndex + 1} von {carouselDoc.slides.length}
          </span>
        </div>
      </div>

      {/* Main Slide Interactive Preview & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Visual Slide Mockup (Instagram 4:5 Aspect Ratio feel) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            className={`w-full max-w-md aspect-[4/5] rounded-2xl p-7 flex flex-col justify-between shadow-lg border relative transition-all duration-200 ${
              carouselDoc.colorTheme === 'dark-neon'
                ? 'bg-neutral-950 text-white border-neutral-800'
                : 'bg-white text-neutral-900 border-neutral-200'
            }`}
          >
            {/* Top Bar of Slide */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider opacity-60">
              <span>{profile.handle || '@creator'}</span>
              <span className="bg-neutral-800/40 px-2 py-0.5 rounded text-[10px]">
                {currentSlide.slideNumber}/{carouselDoc.slides.length}
              </span>
            </div>

            {/* Content Body */}
            <div className="space-y-4 my-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-coral block">
                {currentSlide.role}
              </span>

              <h3 className="text-xl sm:text-2xl font-black leading-tight tracking-tight">
                {currentSlide.headline}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 opacity-90 leading-relaxed font-sans">
                {currentSlide.subheadline}
              </p>

              {currentSlide.bulletPoints.length > 0 && (
                <div className="space-y-2 pt-2">
                  {currentSlide.bulletPoints.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80"
                    >
                      <span className="text-brand-coral font-bold">•</span>
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Footer Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-800/40 text-[10px] text-neutral-400">
              <span className="italic">Swipe nach links 👉</span>
              <span>📌 Für später speichern</span>
            </div>
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handlePrevSlide}
              disabled={activeSlideIndex === 0}
              className="p-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-700" />
            </button>
            <span className="text-xs font-semibold text-neutral-600">
              Slide {activeSlideIndex + 1} / {carouselDoc.slides.length}
            </span>
            <button
              onClick={handleNextSlide}
              disabled={activeSlideIndex === carouselDoc.slides.length - 1}
              className="p-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-neutral-700" />
            </button>
          </div>
        </div>

        {/* Right: Slide Specs, Design Notes & Copy Paste */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-900">
                Slide {currentSlide.slideNumber} Regie & Design
              </h3>
              <button
                onClick={handleCopySlideText}
                className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-md px-2.5 py-1 bg-neutral-50 cursor-pointer"
              >
                {copiedType === 'slide' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" /> Kopiert
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Nur diese Slide
                  </>
                )}
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                Rolle im Karussell
              </label>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800">
                {currentSlide.role}
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                Visual & Canva Design-Notiz
              </label>
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/80 text-xs text-amber-950 leading-relaxed">
                🎨 {currentSlide.visualDesignNote}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                Headline Formula
              </label>
              <div className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-mono text-neutral-800">
                {currentSlide.headline}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">
                Empfohlene Schriftgrößen (Canva / Figma)
              </label>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600">
                <div className="p-2 bg-neutral-50 rounded border border-neutral-100">
                  Headline: <strong>64 - 82 pt Bold</strong>
                </div>
                <div className="p-2 bg-neutral-50 rounded border border-neutral-100">
                  Body-Text: <strong>28 - 34 pt Regular</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Carousel Generator Bar */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h3 className="text-sm font-bold">Neues Karussell-Deck per KI generieren</h3>
        </div>
        <p className="text-xs text-neutral-300">
          Gib dein Kern-Thema ein. Die KI strukturiert automatisch 6 logisch aufbauende Slides mit Cover-Hook, Agitation, Framework und Call-to-Action.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <input
            type="text"
            value={topicPrompt}
            onChange={(e) => setTopicPrompt(e.target.value)}
            placeholder="z.B. Die 5 häufigsten Fehler beim Mischen von 808 Basslines..."
            className="flex-1 w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-coral"
          />

          <button
            onClick={handleGenerateAiCarousel}
            disabled={isGenerating || !topicPrompt.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-coral hover:bg-brand-coralHover font-semibold text-xs text-white transition disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <span>Generiere 6 Slides...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                Deck erstellen
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
