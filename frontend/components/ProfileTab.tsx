import React, { useState } from 'react';
import { UserProfile, ExperienceLevel, HelpGoal, PlatformId, MusicGenreId } from '../types';
import { PLATFORM_LIMITS_2026, NICHES_DATA, GENRE_SPECS_DATABASE } from '../constants';
import { Save, Download, Upload, CheckCircle2, Sliders, ShieldCheck, Music, Disc3 } from 'lucide-react';

interface ProfileTabProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onContinueToPlan: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ profile, onUpdateProfile, onContinueToPlan }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePlatform = (pId: PlatformId) => {
    setFormData((prev) => {
      const exists = prev.activePlatforms.includes(pId);
      const activePlatforms = exists
        ? prev.activePlatforms.filter((p) => p !== pId)
        : [...prev.activePlatforms, pId];
      return { ...prev, activePlatforms };
    });
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const exportProfile = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `creator_compass_profile_${formData.handle || 'user'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setFormData(parsed);
        onUpdateProfile(parsed);
        alert('Profil erfolgreich geladen!');
      } catch (err) {
        alert('Ungültiges Format für die Profildatei.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-brand-coral" />
            Creator-Standort & Setup
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Hier legst du fest, wo du stehst. Dein Plan und deine Generatoren passen sich automatisch deinen Angaben an.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={exportProfile}
            title="Backup herunterladen"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export JSON
          </button>

          <label className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-700 cursor-pointer transition">
            <Upload className="w-3.5 h-3.5" />
            Import JSON
            <input type="file" accept=".json" onChange={importProfile} className="hidden" />
          </label>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Status & Erfahrung */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider text-neutral-400">
            1. Wo stehst du aktuell?
          </h3>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Erfahrungsstufe
            </label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => handleInputChange('experienceLevel', e.target.value as ExperienceLevel)}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50/50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
            >
              <option value="beginner">0 Vorahnung (Starte komplett bei Null)</option>
              <option value="intermediate">Bestehende Accounts (Erste Posts, kaum Reichweite)</option>
              <option value="creator">Aktiver Content Creator (Regelmäßiger Content, Suche nach Hebeln)</option>
              <option value="musician">Musik-Produzent / Beatmaker (Tracks am Start, brauche Hörer)</option>
              <option value="pro">Fortgeschritten / Business (Skalierung & direkte Monetarisierung)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Primäres Ziel
            </label>
            <select
              value={formData.primaryGoal}
              onChange={(e) => handleInputChange('primaryGoal', e.target.value as HelpGoal)}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50/50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
            >
              <option value="growth">Schneller Follower aufbauen (Viralität & Reichweite)</option>
              <option value="learn">Social-Media-Handwerk und Algorithmen von Grund auf verstehen</option>
              <option value="revenue">Direkte Einnahmen generieren (Monetarisierung & Sales)</option>
              <option value="ideas">Unendlicher Vorrat an Content-Ideen & Skripten</option>
              <option value="posts">Fertig formatierte Posts für alle Kanäle auf Knopfdruck</option>
              <option value="music_distro">Musik promoten (Spotify-Streams, Suno-Tracks, DJ-Bookings)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Wöchentliches Zeitbudget: <span className="font-bold text-neutral-900">{formData.weeklyHours} Stunden</span>
            </label>
            <input
              type="range"
              min="2"
              max="40"
              step="1"
              value={formData.weeklyHours}
              onChange={(e) => handleInputChange('weeklyHours', Number(e.target.value))}
              className="w-full accent-brand-coral cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
              <span>2 Std (Side-Project)</span>
              <span>10-15 Std (Fokus)</span>
              <span>40 Std (Fulltime)</span>
            </div>
          </div>
        </div>

        {/* Step 2: Nische & Profil-Details */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider text-neutral-400">
            2. Deine Nische & Identität
          </h3>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Content-Nische
            </label>
            <select
              value={formData.niche}
              onChange={(e) => handleInputChange('niche', e.target.value)}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50/50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
            >
              {NICHES_DATA.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.icon} {n.title}
                </option>
              ))}
            </select>
          </div>

          {/* Music Genre Selector */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1.5">
              <Disc3 className="w-3.5 h-3.5 text-brand-coral" />
              Primäres Musik-Genre (Neuro-Engine Kalibrierung)
            </label>
            <select
              value={formData.musicGenre || 'phonk_drift'}
              onChange={(e) => handleInputChange('musicGenre', e.target.value as MusicGenreId)}
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50/50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none font-medium"
            >
              {(Object.keys(GENRE_SPECS_DATABASE) as MusicGenreId[]).map((gId) => {
                const spec = GENRE_SPECS_DATABASE[gId];
                return (
                  <option key={gId} value={gId}>
                    {spec.icon} {spec.name} ({spec.bpmRange})
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Dein Name / Brand
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="z.B. BeatsByBen"
                className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50/50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Haupt-Handle
              </label>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => handleInputChange('handle', e.target.value)}
                placeholder="@deinhandle"
                className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50/50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Link-in-Bio / Haupt-Link
            </label>
            <input
              type="text"
              value={formData.linkInBio}
              onChange={(e) => handleInputChange('linkInBio', e.target.value)}
              placeholder="https://linktr.ee/deinname oder Beacons URL"
              className="w-full text-sm border border-neutral-200 rounded-lg p-2.5 bg-neutral-50/50 focus:ring-2 focus:ring-brand-coral focus:border-brand-coral outline-none"
            />
          </div>
        </div>

        {/* Step 3: Aktive Plattformen */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider text-neutral-400">
              3. Deine Plattformen ({formData.activePlatforms.length} ausgewählt)
            </h3>
            <span className="text-xs text-neutral-500">Tipp: Fokussiere dich als Anfänger auf 1-2 Hauptkanäle</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 pt-1">
            {(Object.keys(PLATFORM_LIMITS_2026) as PlatformId[]).map((pId) => {
              const active = formData.activePlatforms.includes(pId);
              const info = PLATFORM_LIMITS_2026[pId];
              return (
                <button
                  type="button"
                  key={pId}
                  onClick={() => togglePlatform(pId)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    active
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{info.name}</div>
                  <div className={`text-[10px] mt-1 line-clamp-1 ${active ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {info.maxLen}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Musik & Audio Spezifisch */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-brand-coral" />
            <h3 className="text-sm font-bold text-neutral-900">
              Musik-Creator & Beatmaker Optionen
            </h3>
          </div>
          <p className="text-xs text-neutral-500">
            Aktivieren, wenn du eigene Musik, DJ-Sets, Suno-Tracks oder Beat-Instrumentals über DistroKid & Co vermarktest.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <label className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg cursor-pointer bg-neutral-50/50 hover:bg-neutral-100">
              <input
                type="checkbox"
                checked={formData.musicTools.usesSuno}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    musicTools: { ...prev.musicTools, usesSuno: e.target.checked }
                  }))
                }
                className="w-4 h-4 accent-brand-coral rounded"
              />
              <span className="text-xs font-semibold text-neutral-800">Suno / KI-Audio</span>
            </label>

            <label className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg cursor-pointer bg-neutral-50/50 hover:bg-neutral-100">
              <input
                type="checkbox"
                checked={formData.musicTools.usesDistroKid}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    musicTools: { ...prev.musicTools, usesDistroKid: e.target.checked }
                  }))
                }
                className="w-4 h-4 accent-brand-coral rounded"
              />
              <span className="text-xs font-semibold text-neutral-800">DistroKid / Vertrieb</span>
            </label>

            <label className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg cursor-pointer bg-neutral-50/50 hover:bg-neutral-100">
              <input
                type="checkbox"
                checked={formData.musicTools.usesBandLab}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    musicTools: { ...prev.musicTools, usesBandLab: e.target.checked }
                  }))
                }
                className="w-4 h-4 accent-brand-coral rounded"
              />
              <span className="text-xs font-semibold text-neutral-800">BandLab / DAW</span>
            </label>

            <label className="flex items-center gap-2 p-3 border border-neutral-200 rounded-lg cursor-pointer bg-neutral-50/50 hover:bg-neutral-100">
              <input
                type="checkbox"
                checked={formData.musicTools.usesSpotify}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    musicTools: { ...prev.musicTools, usesSpotify: e.target.checked }
                  }))
                }
                className="w-4 h-4 accent-brand-coral rounded"
              />
              <span className="text-xs font-semibold text-neutral-800">Spotify Artist</span>
            </label>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Alle Daten werden ausschließlich lokal in deinem Browser (localStorage) gespeichert.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition shadow-xs"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Gespeichert!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Profil sichern
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onContinueToPlan}
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg bg-brand-coral hover:bg-brand-coralHover text-white transition shadow-xs"
            >
              Weiter zum Plan →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
