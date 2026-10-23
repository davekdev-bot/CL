import React, { useState } from 'react';
import { UserProfile, SyncContractConfig, LicenseTierType } from '../types';
import {
  FileText,
  Shield,
  Download,
  Copy,
  Check,
  Scale,
  Film,
  Sliders,
  DollarSign,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface SyncLicensingTabProps {
  profile: UserProfile;
}

export const SyncLicensingTab: React.FC<SyncLicensingTabProps> = ({ profile }) => {
  const [contractConfig, setContractConfig] = useState<SyncContractConfig>({
    trackTitle: 'Midnight Mirage (Club VIP Mix)',
    artistLegalName: profile.name || 'Alexander Becker',
    licenseeName: 'Apex Media & Film Production GmbH',
    licenseeProject: 'Dokumentarfilm & Commercial Campaign 2026',
    licenseType: 'non_exclusive_standard',
    upfrontFee: 450,
    masterSharePercent: 50,
    publishingSharePercent: 50,
    territory: 'Worldwide',
    termDuration: '5 Years',
    cueSheetData: {
      isrc: 'DE-A82-26-00412',
      iswc: 'T-345.891.203-1',
      proAffiliation: 'GEMA',
      composerName: profile.name || 'Alexander Becker',
      publisherName: 'Self-Published / DistroKid Publishing',
      cueUsageType: 'Background Instrumental'
    }
  });

  const [activeTabSub, setActiveTabSub] = useState<'contract' | 'cue_sheet' | 'checklist'>('contract');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const licenseTiers = [
    {
      id: 'non_exclusive_standard' as LicenseTierType,
      title: 'Nicht-Exklusiv (Social & Content)',
      standardFee: '150 € - 500 €',
      desc: 'YouTube Videos, Podcasts, Twitch Streams & Social Ads. Mehrfach lizenzierbar.'
    },
    {
      id: 'exclusive_commercial' as LicenseTierType,
      title: 'Exklusiv (Brand Campaign)',
      standardFee: '1.200 € - 5.000 €',
      desc: 'Exklusiv für eine einzelne Marke. Track darf für die Laufzeit nicht weiterlizenziert werden.'
    },
    {
      id: 'sync_film_tv' as LicenseTierType,
      title: 'Sync Master (Film, TV & Gaming)',
      standardFee: '2.500 € - 15.000 € + Tantiemen',
      desc: 'Kino, Netflix, TV-Serien oder Videospiel-Soundtrack. Erfordert formelle Cue-Sheet Registrierung.'
    }
  ];

  const generateLegalContractText = (): string => {
    const isExclusive = contractConfig.licenseType === 'exclusive_commercial';
    const isSync = contractConfig.licenseType === 'sync_film_tv';

    return `LIZENZ- UND SYNC-VEREINBARUNG (URHEBERRECHTLICHER GESTATTUNGSVERTRAG)

Zwischen:
Lizenzgeber (Urheber/Master-Inhaber):
${contractConfig.artistLegalName} (nachfolgend „Urheber“)
Künstler-Alias: ${profile.name || '@creator'}

Und:
Lizenznehmer:
${contractConfig.licenseeName} (nachfolgend „Lizenznehmer“)
Produktionstitel: "${contractConfig.licenseeProject}"

1. VERTRAGSGEGENSTAND
Der Urheber gewährt dem Lizenznehmer die ${
      isExclusive ? 'EXKLUSIVE' : 'NICHT-EXKLUSIVE'
    } Werknutzungsbewilligung für die Tonaufnahme (Master) und das zugrundeliegende musikalische Werk mit dem Titel:
"${contractConfig.trackTitle}" (ISRC: ${contractConfig.cueSheetData.isrc}).

2. UMFANG DER NUTZUNGSRECHTE
(a) Nutzungsart: Einbindung der Tonaufnahme als Hintergrund- und Begleitmusik (${contractConfig.cueSheetData.cueUsageType}) im Rahmen der Produktion "${contractConfig.licenseeProject}".
(b) Territorium: ${contractConfig.territory}
(c) Vertragsdauer: ${contractConfig.termDuration} ab Datum der Unterzeichnung.
(d) Plattformen: Online-Streaming (YouTube, TikTok, Instagram, Meta), VOD-Dienste sowie digitale Medien.

3. VERGÜTUNG & ROYALTIES
(a) Synchronisationsgebühr (Upfront Buy-Out): Der Lizenznehmer zahlt an den Urheber eine einmalige Lizenzgebühr in Höhe von:
    ${contractConfig.upfrontFee} EUR (zahlbar rein netto binnen 14 Tagen).
(b) Master-Beteiligung: ${contractConfig.masterSharePercent}% an den Urheber.
(c) Aufführungsrechte: Gesetzliche Vergütungsansprüche über Verwertungsgesellschaften (${contractConfig.cueSheetData.proAffiliation}) verbleiben uneingeschränkt beim Urheber.

4. CUE SHEET REGISTRIERUNG
Der Lizenznehmer verpflichtet sich, innerhalb von 30 Tagen nach Fertigstellung ein offizielles Music Cue Sheet bei der zuständigen Verwertungsgesellschaft (${contractConfig.cueSheetData.proAffiliation}) einzureichen.

5. GARANTIEN & HAFTUNG
Der Urheber versichert, alleiniger Inhaber der Master- und Verlagsrechte zu sein und dass die Aufnahme frei von Rechten Dritter (einschließlich ungeklärter Samples) ist.

Ort, Datum: ________________________

_______________________________            _______________________________
Unterschrift Lizenzgeber (${contractConfig.artistLegalName})     Unterschrift Lizenznehmer (${contractConfig.licenseeName})`;
  };

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Sound Licensing & Sync-Vertrags-Generator
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Erstelle rechtssichere Verträge für Filmemacher, Marken und Content Creator. Inklusive Cue-Sheet Autofill und Split-Rechner.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTabSub('contract')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition ${
                activeTabSub === 'contract'
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Lizenzvertrag
            </button>
            <button
              onClick={() => setActiveTabSub('cue_sheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition ${
                activeTabSub === 'cue_sheet'
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Music Cue Sheet
            </button>
            <button
              onClick={() => setActiveTabSub('checklist')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition ${
                activeTabSub === 'checklist'
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              Sync-Pitch Checklist
            </button>
          </div>
        </div>

        {/* Tier selector pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-neutral-100">
          {licenseTiers.map((tier) => {
            const isSelected = contractConfig.licenseType === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setContractConfig({ ...contractConfig, licenseType: tier.id })}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? 'border-brand-coral bg-rose-50/40 ring-1 ring-brand-coral shadow-xs'
                    : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-neutral-900">{tier.title}</h4>
                  <span className="text-[10px] font-mono font-bold text-brand-coral">
                    {tier.standardFee}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Areas */}
      {activeTabSub === 'contract' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Configurator Form */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-brand-coral" />
                  Vertrags-Parameter
                </span>
                <span className="text-xs text-neutral-400">Rechtssicher anpassen</span>
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  Dein vollständiger bürgerlicher Name
                </label>
                <input
                  type="text"
                  value={contractConfig.artistLegalName}
                  onChange={(e) =>
                    setContractConfig({ ...contractConfig, artistLegalName: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                  Lizenznehmer (Firma, Creator oder Filmprojekt)
                </label>
                <input
                  type="text"
                  value={contractConfig.licenseeName}
                  onChange={(e) =>
                    setContractConfig({ ...contractConfig, licenseeName: e.target.value })
                  }
                  className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Upfront Fee (€)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={contractConfig.upfrontFee}
                    onChange={(e) =>
                      setContractConfig({ ...contractConfig, upfrontFee: Number(e.target.value) })
                    }
                    className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Laufzeit
                  </label>
                  <select
                    value={contractConfig.termDuration}
                    onChange={(e) =>
                      setContractConfig({ ...contractConfig, termDuration: e.target.value as any })
                    }
                    className="w-full text-xs p-2.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
                  >
                    <option value="1 Year">1 Jahr</option>
                    <option value="5 Years">5 Jahre</option>
                    <option value="In Perpetuity">Unbefristet (Buyout)</option>
                  </select>
                </div>
              </div>

              {/* Master / Publishing Split Slider */}
              <div>
                <div className="flex justify-between text-[11px] font-bold text-neutral-700 mb-1">
                  <span>Master- vs. Publishing-Split</span>
                  <span className="font-mono text-brand-coral">
                    {contractConfig.masterSharePercent}% Master /{' '}
                    {100 - contractConfig.masterSharePercent}% Publishing
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={contractConfig.masterSharePercent}
                  onChange={(e) =>
                    setContractConfig({
                      ...contractConfig,
                      masterSharePercent: Number(e.target.value),
                      publishingSharePercent: 100 - Number(e.target.value)
                    })
                  }
                  className="w-full accent-brand-coral cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right: Contract Preview & Copy Export */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-coral" />
                  <h3 className="text-sm font-bold text-neutral-900">
                    Vollständiger Vertragstext
                  </h3>
                </div>
                <button
                  onClick={() => handleCopyText(generateLegalContractText(), 'contract')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition cursor-pointer"
                >
                  {copiedType === 'contract' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Kopiert!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Vertrag kopieren
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs font-mono text-neutral-800 whitespace-pre-line leading-relaxed max-h-[460px] overflow-y-auto">
                {generateLegalContractText()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cue Sheet Sub-Tab */}
      {activeTabSub === 'cue_sheet' && (
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Standard Music Cue Sheet (GEMA / BMI / ASCAP konform)
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Muss von Film- & TV-Produktionen ausgefüllt werden, damit Sendetantiemen an dich fließen.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                ISRC-Code (Aufnahme)
              </span>
              <input
                type="text"
                value={contractConfig.cueSheetData.isrc}
                onChange={(e) =>
                  setContractConfig({
                    ...contractConfig,
                    cueSheetData: { ...contractConfig.cueSheetData, isrc: e.target.value }
                  })
                }
                className="w-full font-mono text-xs p-1.5 border border-neutral-300 rounded bg-white"
              />
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                ISWC-Code (Komposition)
              </span>
              <input
                type="text"
                value={contractConfig.cueSheetData.iswc}
                onChange={(e) =>
                  setContractConfig({
                    ...contractConfig,
                    cueSheetData: { ...contractConfig.cueSheetData, iswc: e.target.value }
                  })
                }
                className="w-full font-mono text-xs p-1.5 border border-neutral-300 rounded bg-white"
              />
            </div>

            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                Verwertungsgesellschaft (PRO)
              </span>
              <select
                value={contractConfig.cueSheetData.proAffiliation}
                onChange={(e) =>
                  setContractConfig({
                    ...contractConfig,
                    cueSheetData: { ...contractConfig.cueSheetData, proAffiliation: e.target.value as any }
                  })
                }
                className="w-full text-xs p-1.5 border border-neutral-300 rounded bg-white font-medium"
              >
                <option value="GEMA">GEMA (Deutschland / Europa)</option>
                <option value="BMI">BMI (USA)</option>
                <option value="ASCAP">ASCAP (USA)</option>
                <option value="PRS">PRS for Music (UK)</option>
                <option value="None">Keine (Direktvermarktung)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Sync-Pitch Checklist Sub-Tab */}
      {activeTabSub === 'checklist' && (
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Film className="w-4 h-4 text-brand-coral" />
            Checkliste vor dem Versenden an Musik-Supervisor & Werbeagenturen
          </h3>

          <div className="space-y-3 text-xs text-neutral-700">
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 flex items-start gap-3">
              <span className="font-bold text-brand-coral shrink-0">01</span>
              <div>
                <strong className="text-neutral-900 block mb-0.5">Instrumental & Stems bereitstellen:</strong>
                Supervisor benötigen zwingend die Instrumental-Version ohne Lead-Vocals sowie separate Stems (Drums, Bass, Synths) für Schnittanpassungen.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 flex items-start gap-3">
              <span className="font-bold text-brand-coral shrink-0">02</span>
              <div>
                <strong className="text-neutral-900 block mb-0.5">100% One-Stop Clearance garantieren:</strong>
                Schreibe in die Betreffzeile: <em>„One-Stop Cleared“</em>. Das signalisiert, dass du sowohl Master- als auch Verlagsrechte in einer einzigen Unterschrift freigeben kannst.
              </div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 flex items-start gap-3">
              <span className="font-bold text-brand-coral shrink-0">03</span>
              <div>
                <strong className="text-neutral-900 block mb-0.5">Metadaten in WAV/MP3 einbetten:</strong>
                Fülle die ID3-Tags vor dem Upload mit: Künstler, E-Mail-Adresse, Telefonnummer, BPM, Tonart und Kontaktlink. Supervisor speichern oft nur die Audiodatei.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
