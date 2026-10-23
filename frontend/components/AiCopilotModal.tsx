import React, { useState } from 'react';
import { UserProfile } from '../types';
import { generateAiContent } from '../services/geminiService';
import { Sparkles, X, Copy, Check, Loader2 } from 'lucide-react';

interface AiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const AiCopilotModal: React.FC<AiCopilotModalProps> = ({ isOpen, onClose, profile }) => {
  const [prompt, setPrompt] = useState(
    `Erstelle mir ein virales 30-Sekunden Short-Video-Skript für meine Nische (${profile.niche}). Fokus: Hook in den ersten 2 Sekunden, prägnanter Mittelteil und starker Call-to-Action.`
  );
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');
    try {
      const systemInstruction = `Du bist der weltweit erfolgreichste Social Media Stratege. Der Nutzer ist auf dem Erfahrungslevel: "${profile.experienceLevel}". Handle: ${profile.handle}. Antworte strukturiert, motivierend und direkt anwendbar mit konkreten Hooks und Texten.`;
      const response = await generateAiContent(prompt, systemInstruction);
      setResult(response);
    } catch (err) {
      setResult('Fehler bei der Generierung. Stelle sicher, dass die Gemini-Verbindung aktiv ist.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-coral" />
            <h3 className="text-base font-bold text-neutral-900">
              Creator Compass KI-Copilot (Gemini 2.5)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Was soll die KI für dich ausarbeiten?
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full text-xs sm:text-sm border border-neutral-200 rounded-lg p-3 bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
              placeholder="z.B. Gib mir 5 kontroverse Hook-Sätze für mein nächstes TikTok Video..."
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400">
              Angepasst an: <strong className="text-neutral-700">{profile.niche}</strong>
            </span>
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  Denke nach...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Skript generieren
                </>
              )}
            </button>
          </div>

          {result && (
            <div className="mt-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-700">Ergebnis:</span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Kopiert!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      In die Zwischenablage
                    </>
                  )}
                </button>
              </div>
              <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-xs text-neutral-800 whitespace-pre-line leading-relaxed font-sans max-h-72 overflow-y-auto">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
