import React, { useState } from 'react';
import { UserProfile, ReleaseMilestone, MusicReleaseConfig } from '../types';
import {
  Music,
  Disc3,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Flame,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ListTodo,
  CheckSquare,
  Square,
  Share2
} from 'lucide-react';

interface MusicPlaybookProps {
  profile: UserProfile;
}

export const MusicPlaybook: React.FC<MusicPlaybookProps> = ({ profile }) => {
  // Release Date configuration
  const defaultReleaseDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 28); // Default 4 weeks in future (ideal for Spotify Editorial)
    return d.toISOString().split('T')[0];
  };

  const [releaseConfig, setReleaseConfig] = useState<MusicReleaseConfig>({
    trackTitle: 'Midnight Mirage (Club VIP Mix)',
    artistName: profile.name || 'Alex Beats',
    genre: 'Melodic House / Phonk',
    releaseDate: defaultReleaseDate(),
    isSunoTrack: profile.musicTools.usesSuno,
    hasDistroKid: profile.musicTools.usesDistroKid,
    preSaveUrl: 'https://distrokid.com/hyperfollow/deinname/midnight-mirage'
  });

  // Calculate dynamic milestone dates based on selected release date
  const computeMilestones = (targetDateStr: string): ReleaseMilestone[] => {
    const targetDate = new Date(targetDateStr);

    const calcDate = (offsetDays: number) => {
      const d = new Date(targetDate);
      d.setDate(d.getDate() + offsetDays);
      return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return [
      {
        id: 'm1',
        phaseDays: -28,
        phaseLabel: 'T-28 Tage',
        category: 'production',
        title: 'Master-Audio & Artwork Freeze (3000x3000px)',
        description:
          'Track fertig arrangiert, -14 LUFS gemastert (via BandLab/DAW). Cover-Art mit Leonardo AI / Canva im RGB Format fertiggestellt.',
        targetDate: calcDate(-28),
        isCompleted: true,
        priority: 'must'
      },
      {
        id: 'm2',
        phaseDays: -21,
        phaseLabel: 'T-21 Tage',
        category: 'distrokid',
        title: 'Upload via DistroKid / RouteNote mit Release-Datum',
        description:
          'Track hochladen. Setze das Veröffentlichungsdatum auf Freitag in 3 Wochen. ISRC Code und TikTok/Meta Snippet-Startpunkt festlegen.',
        targetDate: calcDate(-21),
        isCompleted: true,
        priority: 'must'
      },
      {
        id: 'm3',
        phaseDays: -18,
        phaseLabel: 'T-18 Tage',
        category: 'spotify',
        title: 'Spotify for Artists Editorial Pitch einreichen',
        description:
          'Sobald der Track in "Upcoming" bei Spotify for Artists erscheint: Song-Genre, Instrumente, Stimmung und Story für Playlisten-Kuratoren einreichen (mind. 7 Tage vorher Pflicht!).',
        targetDate: calcDate(-18),
        isCompleted: false,
        priority: 'must'
      },
      {
        id: 'm4',
        phaseDays: -14,
        phaseLabel: 'T-14 Tage',
        category: 'marketing',
        title: 'HyperFollow Pre-Save Kampagne & Teaser #1',
        description:
          'Pre-Save Link in Bio platzieren. Ersten 10-Sekunden TikTok/Reel Clip vor dem Drop posten ("Wer braucht diesen Track auf Spotify?").',
        targetDate: calcDate(-14),
        isCompleted: false,
        priority: 'recommended'
      },
      {
        id: 'm5',
        phaseDays: -7,
        phaseLabel: 'T-7 Tage',
        category: 'marketing',
        title: 'SoundCloud / Dropbox DJ Promo Pack versenden',
        description:
          'Sende WAV & Extended Mix an 10 DJs oder Playlisten-Kuratoren deiner Nische mit persönlicher Notiz.',
        targetDate: calcDate(-7),
        isCompleted: false,
        priority: 'recommended'
      },
      {
        id: 'm6',
        phaseDays: 0,
        phaseLabel: 'Release Day (Freitag)',
        category: 'marketing',
        title: '🔥 RELEASE DAY: Alle Plattformen Live + 3x Content-Blitz',
        description:
          'Verifiziere Spotify/Apple Music Links. Poste 1x Short um 12:00, 1x Reel um 18:00 mit dem offiziellen Sound. Instagram Story mit Sticker zum Song.',
        targetDate: calcDate(0),
        isCompleted: false,
        priority: 'must'
      },
      {
        id: 'm7',
        phaseDays: 7,
        phaseLabel: 'T+7 Tage',
        category: 'post_release',
        title: 'User-Generated Content & Duett-Challenge',
        description:
          'Reagiere auf Videos, die deinen Sound benutzt haben. Biete einen kostenlosen Download der Stem-Spuren für Remixer an.',
        targetDate: calcDate(7),
        isCompleted: false,
        priority: 'recommended'
      }
    ];
  };

  const [milestones, setMilestones] = useState<ReleaseMilestone[]>(() =>
    computeMilestones(releaseConfig.releaseDate)
  );

  const handleDateChange = (newDate: string) => {
    setReleaseConfig((prev) => ({ ...prev, releaseDate: newDate }));
    setMilestones(computeMilestones(newDate));
  };

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isCompleted: !m.isCompleted } : m))
    );
  };

  const completedCount = milestones.filter((m) => m.isCompleted).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-neutral-900 text-white rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Disc3 className="w-6 h-6 text-brand-coral" />
            <h2 className="text-xl font-bold">DJ- & Producer-Release OS (DistroKid & Suno)</h2>
          </div>
          <p className="text-xs text-neutral-300 max-w-2xl">
            Automatischer interaktiver Release-Kalender. Berechnet exakte Fristen für Spotify Editorial Playlisten, HyperFollow Pre-Saves und tägliche Promo-Aufgaben.
          </p>
        </div>

        <div className="text-right self-start sm:self-auto">
          <span className="text-xs text-neutral-400 block">Release Fortschritt</span>
          <span className="text-2xl font-black text-brand-coral">{progressPercent}%</span>
        </div>
      </div>

      {/* Interactive Release Calendar Scheduler Card */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-coral" />
              Interaktiver Release-Planer & Milestone-Rechner
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Wähle dein Ziel-Release-Datum. Der Algorithmus berechnet alle kritischen Deadlines rückwärts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs">
              <label className="block text-[11px] font-bold text-neutral-600 mb-0.5">
                VÖ-Datum (Freitag empfohlen)
              </label>
              <input
                type="date"
                value={releaseConfig.releaseDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="text-xs font-semibold px-3 py-1.5 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
              />
            </div>
          </div>
        </div>

        {/* Track Metadata Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div>
            <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Track Name</label>
            <input
              type="text"
              value={releaseConfig.trackTitle}
              onChange={(e) => setReleaseConfig({ ...releaseConfig, trackTitle: e.target.value })}
              className="w-full border border-neutral-200 rounded-lg p-2 bg-neutral-50/50"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Künstler / Alias</label>
            <input
              type="text"
              value={releaseConfig.artistName}
              onChange={(e) => setReleaseConfig({ ...releaseConfig, artistName: e.target.value })}
              className="w-full border border-neutral-200 rounded-lg p-2 bg-neutral-50/50"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Genre & Mood</label>
            <input
              type="text"
              value={releaseConfig.genre}
              onChange={(e) => setReleaseConfig({ ...releaseConfig, genre: e.target.value })}
              className="w-full border border-neutral-200 rounded-lg p-2 bg-neutral-50/50"
            />
          </div>
        </div>

        {/* Milestone Timeline List */}
        <div className="divide-y divide-neutral-100 pt-2">
          {milestones.map((m) => (
            <div
              key={m.id}
              onClick={() => toggleMilestone(m.id)}
              className={`py-3.5 px-3 flex items-start gap-3.5 rounded-xl cursor-pointer transition hover:bg-neutral-50 ${
                m.isCompleted ? 'bg-neutral-50/50 opacity-75' : ''
              }`}
            >
              <button type="button" className="mt-0.5 text-neutral-400 hover:text-neutral-900">
                {m.isCompleted ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-neutral-300" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      m.phaseDays === 0
                        ? 'bg-rose-500 text-white'
                        : m.phaseDays < 0
                        ? 'bg-neutral-200 text-neutral-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {m.phaseLabel}
                  </span>
                  <span className="text-xs font-mono font-semibold text-neutral-500">
                    Fällig am: {m.targetDate}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      m.isCompleted ? 'line-through text-neutral-400' : 'text-neutral-900'
                    }`}
                  >
                    {m.title}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Clip-Rezepte für Musik-Creator */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500" />
          4 Bewährte Video-Rezepte für TikTok & Reels
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 border border-neutral-200 rounded-lg bg-neutral-50/50">
            <h4 className="font-bold text-neutral-900 mb-1">1. Das "Kitchen Sample" Experiment</h4>
            <p className="text-neutral-600">
              Nimm ein Geräusch aus dem Alltag auf (Glas anschlagen, Schlüsselbund). Schneide es in die DAW und zeige, wie daraus ein bounciger Drop wird.
            </p>
          </div>

          <div className="p-3 border border-neutral-200 rounded-lg bg-neutral-50/50">
            <h4 className="font-bold text-neutral-900 mb-1">2. "POV: Du bist auf einem Festival..."</h4>
            <p className="text-neutral-600">
              Kamera schwenkt über dein DJ-Pult oder Studio-Monitore. Wenn der Drop fällt, blendest du Footage von einer tanzenden Menge ein.
            </p>
          </div>

          <div className="p-3 border border-neutral-200 rounded-lg bg-neutral-50/50">
            <h4 className="font-bold text-neutral-900 mb-1">3. KI-Prompt Enthüllung</h4>
            <p className="text-neutral-600">
              "Ich habe Suno diesen verrückten Prompt gegeben... und das Ergebnis in BandLab nachgebaut." Hoher Neugierde-Faktor!
            </p>
          </div>

          <div className="p-3 border border-neutral-200 rounded-lg bg-neutral-50/50">
            <h4 className="font-bold text-neutral-900 mb-1">4. Freunde / Fremde reagieren lassen</h4>
            <p className="text-neutral-600">
              Setze jemandem Kopfhörer auf. Filme die ungeschnittene Gesichtsausdruck-Reaktion genau in der Sekunde des Drops.
            </p>
          </div>
        </div>
      </div>

      {/* Suno & DistroKid Compliance Checklist */}
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 text-xs text-emerald-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          Rechtlicher Check für Suno & Spotify Tantiemen
        </div>
        <ul className="list-disc list-inside space-y-1 text-emerald-900">
          <li><strong>Suno-Abo:</strong> Nur mit Pro- oder Premier-Plan besitzt du die kommerziellen Nutzungsrechte für Streamingplattformen.</li>
          <li><strong>DistroKid Option:</strong> Nutze HyperFollow Landingpages, damit Fans den Track vor Veröffentlichung pre-saven können.</li>
          <li><strong>GEMA & Copyright:</strong> Registriere keine reinen KI-Songs ohne eigenes schöpferisches Arrangement als Eigenkomposition.</li>
        </ul>
      </div>
    </div>
  );
};
