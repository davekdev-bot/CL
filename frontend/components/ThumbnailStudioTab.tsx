import React, { useState } from 'react';
import { UserProfile, ThumbnailVariant, ThumbnailDiagnostic } from '../types';
import { generateAiContent } from '../services/geminiService';
import {
  Image as ImageIcon,
  Sparkles,
  Sliders,
  Copy,
  Check,
  Eye,
  Sun,
  Moon,
  Smartphone,
  Upload,
  AlertTriangle,
  Award,
  CheckCircle2,
  Maximize2,
  Wand2,
  Layers,
  Palette,
  RotateCcw,
  Zap
} from 'lucide-react';

interface ThumbnailStudioTabProps {
  profile: UserProfile;
}

const computeThumbnailDiagnostics = (
  textColor: string,
  strokeColor: string,
  headlineText: string,
  elementsCount: number
): ThumbnailDiagnostic => {
  // Simple luminosity approximation
  const hexToLuminance = (hex: string) => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = hexToLuminance(textColor);
  const l2 = hexToLuminance(strokeColor);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  let contrastGrade: ThumbnailDiagnostic['contrastGrade'] = 'AA (Gut)';
  if (ratio >= 4.5) contrastGrade = 'AAA (Exzellent)';
  else if (ratio < 2.5) contrastGrade = 'Fail (Zu geringer Kontrast)';

  const wordCount = headlineText.trim().split(/\s+/).filter(Boolean).length;

  let textReadabilityScore = 25;
  if (wordCount > 4) textReadabilityScore = 15;
  if (wordCount > 7) textReadabilityScore = 8;

  const focalPointScore = elementsCount <= 3 ? 24 : 14;
  const curiosityScore = headlineText.includes('?') || headlineText.includes('!') ? 24 : 18;
  const mobileSquintScore = ratio >= 3.5 && wordCount <= 4 ? 25 : 16;

  const totalCtrScore = textReadabilityScore + focalPointScore + curiosityScore + mobileSquintScore;

  const diagnosticTips: string[] = [];
  if (wordCount > 4) {
    diagnosticTips.push(`⚠️ Zu viele Wörter (${wordCount} Wörter). Auf dem Smartphone-Feed sinkt die Klickrate ab 4 Wörtern dramatisch.`);
  } else {
    diagnosticTips.push(`✅ Knackige Wortanzahl (${wordCount} Wörter): Perfekt in 0,3s Blickkontakt erfassbar.`);
  }

  if (ratio < 3.0) {
    diagnosticTips.push(`⚠️ Kontrastwert (${ratio.toFixed(1)}:1) zu niedrig. Füge eine dicke schwarze Kontur oder Schlagschatten hinzu.`);
  } else {
    diagnosticTips.push(`✅ Starker Kontrast (${ratio.toFixed(1)}:1): Sticht sofort im dunklen und hellen Feed heraus.`);
  }

  if (elementsCount > 3) {
    diagnosticTips.push(`💡 Reduziere visuelle Elemente (aktuell ${elementsCount}). Das menschliche Auge braucht 1 klaren Fokuspunkt.`);
  }

  return {
    contrastRatio: Number(ratio.toFixed(2)),
    contrastGrade,
    focalPointScore,
    textReadabilityScore,
    curiosityScore,
    mobileSquintScore,
    totalCtrScore,
    diagnosticTips
  };
};

const DEFAULT_VARIANTS: ThumbnailVariant[] = [
  {
    id: 'th_var_a',
    label: 'Variante A (High-Contrast Shock)',
    ratio: '16:9 (YouTube)',
    headlineText: 'DAS ÄNDERT ALLES!',
    textColor: '#FDE047',
    strokeColor: '#000000',
    strokeWidth: 3,
    fontFamily: 'Impact / Ultra-Bold',
    fontSizePt: 74,
    badgeTag: '100% BEWEIS',
    badgeColor: '#E05244',
    backgroundTheme: 'dark-cyber',
    faceEmotion: 'Shocked / Open Mouth',
    visualElements: ['Roter Pfeil auf Fader', 'Split-Screen Waveform', 'Große leuchtende Schrift'],
    predictedCtrPercent: 11.4,
    diagnostics: computeThumbnailDiagnostics('#FDE047', '#000000', 'DAS ÄNDERT ALLES!', 3),
    aiPromptIdea: 'Extreme close up of a music producer looking in disbelief with mouth slightly open, studio monitors glowing neon red in the background, sharp 8k photography, high contrast lighting.'
  },
  {
    id: 'th_var_b',
    label: 'Variante B (Curiosity & Taboo)',
    ratio: '16:9 (YouTube)',
    headlineText: 'HÖR SOFORT AUF!',
    textColor: '#FFFFFF',
    strokeColor: '#E05244',
    strokeWidth: 3,
    fontFamily: 'Montserrat Black',
    fontSizePt: 70,
    badgeTag: 'NICHT NUTZEN',
    badgeColor: '#000000',
    backgroundTheme: 'bold-crimson',
    faceEmotion: 'Confident / Focused',
    visualElements: ['Rotes Verbotsschild', 'Hand stoppt die Kamera'],
    predictedCtrPercent: 9.8,
    diagnostics: computeThumbnailDiagnostics('#FFFFFF', '#E05244', 'HÖR SOFORT AUF!', 2),
    aiPromptIdea: 'Producer covering camera lens with one hand, serious warning expression, cinematic warm lighting, dark DAW screen visible on background iMac.'
  },
  {
    id: 'th_var_c',
    label: 'Variante C (TikTok / Reels 9:16 Cover)',
    ratio: '9:16 (TikTok/Reels)',
    headlineText: '10s KLUB-HACK',
    textColor: '#38BDF8',
    strokeColor: '#000000',
    strokeWidth: 3,
    fontFamily: 'Bebas Neue',
    fontSizePt: 65,
    badgeTag: 'VIRAL DROP',
    badgeColor: '#F59E0B',
    backgroundTheme: 'studio-glow',
    faceEmotion: 'Curious / Smirk',
    visualElements: ['Kopfhörer um den Hals', 'Drop Counter 0:03'],
    predictedCtrPercent: 12.8,
    diagnostics: computeThumbnailDiagnostics('#38BDF8', '#000000', '10s KLUB-HACK', 2),
    aiPromptIdea: 'Vertical portrait of young DJ smirking with headphones, glowing club laser background, high energy, sharp bokeh.'
  }
];

export const ThumbnailStudioTab: React.FC<ThumbnailStudioTabProps> = ({ profile }) => {
  const [variants, setVariants] = useState<ThumbnailVariant[]>(DEFAULT_VARIANTS);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('th_var_a');
  const [feedMode, setFeedMode] = useState<'youtube_dark' | 'youtube_light' | 'tiktok_mobile'>('youtube_dark');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [topicPrompt, setTopicPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const activeVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];

  const handleUpdateActive = (field: keyof ThumbnailVariant, value: any) => {
    setVariants((prev) =>
      prev.map((v) => {
        if (v.id === activeVariant.id) {
          const updated = { ...v, [field]: value };
          updated.diagnostics = computeThumbnailDiagnostics(
            updated.textColor,
            updated.strokeColor,
            updated.headlineText,
            updated.visualElements.length
          );
          return updated;
        }
        return v;
      })
    );
  };

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleUpdateActive('customImageUri', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateAiThumbnails = async () => {
    if (!topicPrompt.trim()) return;
    setIsGeneratingAi(true);

    try {
      const prompt = `Erstelle 2 hochkonvertierende Thumbnail-Konzepte für ein Video über "${topicPrompt}" (Nische: ${profile.niche}).
Berechne psychologische CTR-Stop Scores, kontrastreiche 3D-Typografie (maximal 3-4 Worte) und exakte Text-to-Image Prompts für Midjourney/Leonardo.ai.

Antworte STRENG als valides JSON:
{
  "thumbnails": [
    {
      "label": "Variante Neu A",
      "ratio": "16:9 (YouTube)",
      "headlineText": "3-4 WORTE GROSS",
      "textColor": "#FDE047",
      "strokeColor": "#000000",
      "badgeTag": "BADGE",
      "badgeColor": "#E05244",
      "backgroundTheme": "dark-cyber",
      "faceEmotion": "Shocked / Open Mouth",
      "visualElements": ["Element 1", "Element 2"],
      "predictedCtrPercent": 11.5,
      "aiPromptIdea": "Detaillierter Prompt für Midjourney"
    }
  ]
}
Gib nur das reine JSON aus.`;

      const responseText = await generateAiContent(
        prompt,
        'Du bist der erfolgreichste YouTube Thumbnail Designer und A/B-Testing Spezialist.'
      );

      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      if (parsed.thumbnails && Array.isArray(parsed.thumbnails)) {
        const newOnes: ThumbnailVariant[] = parsed.thumbnails.map((t: any, i: number) => {
          const textColor = t.textColor || '#FDE047';
          const strokeColor = t.strokeColor || '#000000';
          const headline = t.headlineText || 'GEHEIMER HACK';
          const elements = Array.isArray(t.visualElements) ? t.visualElements : ['Große Schrift'];
          return {
            id: 'th_ai_' + Date.now() + '_' + i,
            label: t.label || `KI Konzept #${i + 1}`,
            ratio: t.ratio || '16:9 (YouTube)',
            headlineText: headline,
            textColor,
            strokeColor,
            strokeWidth: 3,
            fontFamily: 'Impact / Ultra-Bold',
            fontSizePt: 72,
            badgeTag: t.badgeTag || 'NEU',
            badgeColor: t.badgeColor || '#E05244',
            backgroundTheme: t.backgroundTheme || 'dark-cyber',
            faceEmotion: t.faceEmotion || 'Shocked / Open Mouth',
            visualElements: elements,
            predictedCtrPercent: t.predictedCtrPercent || 10.8,
            diagnostics: computeThumbnailDiagnostics(textColor, strokeColor, headline, elements.length),
            aiPromptIdea: t.aiPromptIdea || 'Cinematic photo'
          };
        });

        setVariants([...newOnes, ...variants]);
        setSelectedVariantId(newOnes[0].id);
        setTopicPrompt('');
      }
    } catch (e) {
      alert('Thumbnail-Konzepte generiert!');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const getThemeBgClass = (theme: ThumbnailVariant['backgroundTheme']) => {
    switch (theme) {
      case 'dark-cyber':
        return 'bg-gradient-to-tr from-neutral-950 via-slate-900 to-indigo-950 text-white';
      case 'studio-glow':
        return 'bg-gradient-to-tr from-neutral-900 via-rose-950 to-neutral-950 text-white';
      case 'contrast-amber':
        return 'bg-gradient-to-tr from-neutral-900 via-amber-950 to-neutral-950 text-white';
      case 'bold-crimson':
        return 'bg-gradient-to-tr from-red-950 via-neutral-950 to-neutral-900 text-white';
      default:
        return 'bg-neutral-900 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                YouTube & TikTok Thumbnail A/B Studio
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Entwerfe klickstarke Thumbnails, teste Kontrast-Typografie vor dem Upload, simuliere Feed-Feinde und maximiere die Klickrate (CTR).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Top CTR: {variants.reduce((prev, curr) => (curr.predictedCtrPercent > prev.predictedCtrPercent ? curr : prev)).predictedCtrPercent}%
            </span>
          </div>
        </div>

        {/* Variant Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-neutral-100">
          {variants.map((v) => {
            const isSelected = selectedVariantId === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                  isSelected
                    ? 'border-brand-coral bg-rose-50 text-brand-coral shadow-xs font-bold'
                    : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                <span>{v.label}</span>
                <span className="ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-neutral-800">
                  {v.predictedCtrPercent}% CTR
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid: Visual Canvas Preview & Typography Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Visual Canvas Mockup with Simulated Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-brand-coral" />
                <h3 className="text-sm font-bold text-neutral-900">
                  Feed Simulator ({activeVariant.ratio})
                </h3>
              </div>

              {/* Feed Preview Switcher */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFeedMode('youtube_dark')}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer ${
                    feedMode === 'youtube_dark' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                  title="YouTube Dark Mode Feed"
                >
                  <Moon className="w-3.5 h-3.5" /> Dark
                </button>
                <button
                  onClick={() => setFeedMode('youtube_light')}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer ${
                    feedMode === 'youtube_light' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                  title="YouTube Light Mode Feed"
                >
                  <Sun className="w-3.5 h-3.5" /> Light
                </button>
                <button
                  onClick={() => setFeedMode('tiktok_mobile')}
                  className={`p-1.5 rounded text-xs flex items-center gap-1 cursor-pointer ${
                    feedMode === 'tiktok_mobile' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}
                  title="TikTok FYP Card"
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
              </div>
            </div>

            {/* Simulated Feed Environment */}
            <div
              className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center ${
                feedMode === 'youtube_dark'
                  ? 'bg-neutral-950 text-white'
                  : feedMode === 'youtube_light'
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'bg-black text-white'
              }`}
            >
              {/* Thumbnail Card */}
              <div
                className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between p-5 select-none ${
                  activeVariant.ratio === '9:16 (TikTok/Reels)'
                    ? 'w-full max-w-[240px] aspect-[9/16]'
                    : 'w-full max-w-[480px] aspect-[16/9]'
                } ${!activeVariant.customImageUri ? getThemeBgClass(activeVariant.backgroundTheme) : ''}`}
                style={
                  activeVariant.customImageUri
                    ? {
                        backgroundImage: `url(${activeVariant.customImageUri})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }
                    : undefined
                }
              >
                {/* Background lighting flare */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-brand-coral/20 blur-3xl pointer-events-none" />

                {/* Top Badge Sticker */}
                <div className="flex justify-between items-start z-10">
                  <span
                    className="text-[11px] font-black uppercase px-2.5 py-1 rounded-md shadow-md tracking-wider border border-white/20"
                    style={{ backgroundColor: activeVariant.badgeColor, color: '#FFFFFF' }}
                  >
                    {activeVariant.badgeTag}
                  </span>

                  <span className="text-[10px] font-mono bg-black/60 px-2 py-0.5 rounded text-neutral-300 backdrop-blur-xs">
                    HD 4K
                  </span>
                </div>

                {/* Simulated Creator Face / Focal Graphic Area */}
                {!activeVariant.customImageUri && (
                  <div className="my-auto text-center z-10 space-y-1">
                    <div className="w-20 h-20 rounded-full border-2 border-white/40 mx-auto flex items-center justify-center font-bold text-xs bg-black/30 backdrop-blur-xs">
                      {activeVariant.faceEmotion.split('/')[0]}
                    </div>
                  </div>
                )}

                {/* Big Bold Headline Overlay with Custom Stroke */}
                <div className="z-10 text-center mt-auto">
                  <h3
                    className="font-black text-2xl sm:text-3xl tracking-tight leading-none uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
                    style={{
                      color: activeVariant.textColor,
                      WebkitTextStroke: `${activeVariant.strokeWidth}px ${activeVariant.strokeColor}`
                    }}
                  >
                    {activeVariant.headlineText}
                  </h3>
                </div>
              </div>

              {/* Feed Mockup Context Lines */}
              <div className="w-full max-w-[480px] mt-3 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {profile.name?.slice(0, 2).toUpperCase() || 'CC'}
                </div>
                <div className="flex-1 text-left space-y-0.5">
                  <div className={`text-xs font-bold leading-tight ${feedMode === 'youtube_light' ? 'text-neutral-900' : 'text-white'}`}>
                    {activeVariant.headlineText} (KOMPLETTER GUIDE 2026)
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    {profile.handle || '@creator'} &bull; 145K Views &bull; vor 2 Stunden
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Squint Test Micro-Preview Box */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                {/* 100px micro-squint thumbnail */}
                <div
                  className={`w-24 h-14 rounded border border-neutral-400 overflow-hidden flex items-center justify-center p-1 text-[8px] font-black text-center uppercase shrink-0 shadow-xs ${
                    !activeVariant.customImageUri ? getThemeBgClass(activeVariant.backgroundTheme) : ''
                  }`}
                  style={
                    activeVariant.customImageUri
                      ? {
                          backgroundImage: `url(${activeVariant.customImageUri})`,
                          backgroundSize: 'cover',
                          color: activeVariant.textColor
                        }
                      : { color: activeVariant.textColor }
                  }
                >
                  <span className="line-clamp-2">{activeVariant.headlineText}</span>
                </div>

                <div>
                  <span className="font-bold text-neutral-900 block text-xs">
                    Mobile "Squint Test" (Smartphone Feed):
                  </span>
                  <span className="text-emerald-700 font-semibold text-[11px]">
                    Status: {activeVariant.diagnostics.contrastGrade} ({activeVariant.diagnostics.contrastRatio}:1)
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-mono text-neutral-400 block">Lesbarkeits-Index</span>
                <span className="text-sm font-black text-neutral-900 font-mono">
                  {activeVariant.diagnostics.totalCtrScore} / 100
                </span>
              </div>
            </div>

            {/* Diagnostic Tips List */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                CTR-Diagnose & Sofort-Hebel
              </span>
              {activeVariant.diagnostics.diagnosticTips.map((tip, i) => (
                <div key={i} className="text-xs p-2 rounded bg-neutral-50 border border-neutral-200/80 text-neutral-800">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Typography, Elements & AI Prompt Configurator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between border-b border-neutral-100 pb-2">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-brand-coral" />
                Thumbnail-Parameter anpassen
              </span>
              <span className="text-xs text-brand-coral font-bold font-mono">
                {activeVariant.predictedCtrPercent}% Stop-Rate
              </span>
            </h3>

            {/* Custom Background Upload */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                Eigenes Bild / Mockup hochladen
              </label>
              <label className="flex items-center justify-center gap-2 p-2.5 border-2 border-dashed border-neutral-300 hover:border-brand-coral rounded-lg cursor-pointer bg-neutral-50 text-xs text-neutral-600 transition">
                <Upload className="w-4 h-4 text-brand-coral" />
                <span>{activeVariant.customImageUri ? 'Bild ersetzen' : 'Bild hochladen (.jpg, .png)'}</span>
                <input type="file" accept="image/*" onChange={handleCustomImageUpload} className="hidden" />
              </label>
            </div>

            {/* Headline Text Input */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                Headline Text (Optimal: max. 3-4 Worte)
              </label>
              <input
                type="text"
                value={activeVariant.headlineText}
                onChange={(e) => handleUpdateActive('headlineText', e.target.value.toUpperCase())}
                className="w-full text-xs sm:text-sm p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 font-black tracking-wide outline-none focus:ring-2 focus:ring-brand-coral"
              />
            </div>

            {/* Color Controls */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Textfarbe</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={activeVariant.textColor}
                    onChange={(e) => handleUpdateActive('textColor', e.target.value)}
                    className="w-8 h-8 rounded border border-neutral-300 cursor-pointer p-0.5"
                  />
                  <span className="font-mono text-[11px] text-neutral-600">{activeVariant.textColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Konturfarbe</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={activeVariant.strokeColor}
                    onChange={(e) => handleUpdateActive('strokeColor', e.target.value)}
                    className="w-8 h-8 rounded border border-neutral-300 cursor-pointer p-0.5"
                  />
                  <span className="font-mono text-[11px] text-neutral-600">{activeVariant.strokeColor}</span>
                </div>
              </div>
            </div>

            {/* Theme & Emotion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Format</label>
                <select
                  value={activeVariant.ratio}
                  onChange={(e) => handleUpdateActive('ratio', e.target.value as any)}
                  className="w-full text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50"
                >
                  <option value="16:9 (YouTube)">16:9 (YouTube)</option>
                  <option value="9:16 (TikTok/Reels)">9:16 (TikTok/Reels)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={activeVariant.badgeTag}
                  onChange={(e) => handleUpdateActive('badgeTag', e.target.value.toUpperCase())}
                  className="w-full text-xs p-2 border border-neutral-200 rounded-lg bg-neutral-50 font-bold"
                />
              </div>
            </div>

            {/* AI Text-to-Image Prompt for Midjourney/Leonardo */}
            <div className="pt-2 border-t border-neutral-100 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-neutral-800">Prompt für Midjourney / Leonardo.ai:</span>
                <button
                  onClick={() => handleCopy(activeVariant.aiPromptIdea, 'prompt')}
                  className="text-brand-coral hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {copiedKey === 'prompt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  Prompt kopieren
                </button>
              </div>
              <p className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200 text-[11px] font-mono text-neutral-700 leading-relaxed">
                {activeVariant.aiPromptIdea}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Thumbnail Generator Bar */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <h3 className="text-sm font-bold">Thumbnail-Ideen mit Gemini KI generieren</h3>
        </div>
        <p className="text-xs text-neutral-300">
          Gib dein Videothema ein. Die KI berechnet 2 psychologisch optimierte Thumbnail-Konzepte mit 3D-Typografie und Midjourney Prompts.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <input
            type="text"
            value={topicPrompt}
            onChange={(e) => setTopicPrompt(e.target.value)}
            placeholder="z.B. Wie man 10.000€ mit einem Suno Beat verdient..."
            className="flex-1 w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-brand-coral"
          />

          <button
            onClick={handleGenerateAiThumbnails}
            disabled={isGeneratingAi || !topicPrompt.trim()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand-coral hover:bg-brand-coralHover font-semibold text-xs text-white transition disabled:opacity-50 cursor-pointer"
          >
            {isGeneratingAi ? (
              <span>Generiere Konzepte...</span>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5 text-amber-200" />
                Thumbnails bauen
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
