import React, { useState } from 'react';
import { UserProfile, CreatorCollaborator } from '../types';
import { NICHES_DATA } from '../constants';
import { generateAiContent } from '../services/geminiService';
import {
  Users,
  Search,
  Filter,
  Sliders,
  Send,
  Copy,
  Check,
  Sparkles,
  Radio,
  ExternalLink,
  MessageSquare,
  Flame,
  Music
} from 'lucide-react';

interface CollabFinderTabProps {
  profile: UserProfile;
}

const COLLABORATORS_POOL: CreatorCollaborator[] = [
  {
    id: 'c1',
    name: 'Lena Soundworks',
    handle: '@lena_soundworks',
    avatarInitials: 'LS',
    niche: 'music_producer',
    primaryPlatform: 'TikTok',
    audienceSize: '10k-50k',
    followerCountLabel: '34.5K Follower',
    preferredDaw: 'Ableton Live',
    vibeGenres: ['Melodic Techno', 'Deep House', 'Suno Remastering'],
    collabPitchMatch: 'Hohe Affinität für Drop-Reactions und Sample Flipping Challenges.',
    strengths: ['Sound Design', 'Hook-Visuals', 'Schnitttempo'],
    openFor: ['Remix Swap', 'Co-Production', 'Sample Flip Challenge']
  },
  {
    id: 'c2',
    name: 'Kian 808',
    handle: '@kianbeats',
    avatarInitials: 'KB',
    niche: 'music_producer',
    primaryPlatform: 'Instagram',
    audienceSize: '50k-150k',
    followerCountLabel: '88.2K Follower',
    preferredDaw: 'FL Studio',
    vibeGenres: ['Phonk', 'Drift Bass', 'Trap Wave'],
    collabPitchMatch: 'Sucht regelmäßig frische Melodie-Loops für seine wöchentlichen Beat-Breakdowns.',
    strengths: ['Punchy Drums', 'Virale Reels', 'Große Spotify Playlist-Präsenz'],
    openFor: ['Co-Production', 'Joint Short-Form']
  },
  {
    id: 'c3',
    name: 'Noah Tech & Audio',
    handle: '@noah_audio',
    avatarInitials: 'NA',
    niche: 'tech_coding',
    primaryPlatform: 'YouTube',
    audienceSize: '10k-50k',
    followerCountLabel: '22.8K Abonnenten',
    preferredDaw: 'Logic Pro',
    vibeGenres: ['KI-Audio Workflows', 'Plugin Reviews', 'Coding Tools'],
    collabPitchMatch: 'Ideal für ein gemeinsames Vergleichsvideo: KI vs. Mensch in der Musikproduktion.',
    strengths: ['High-End Schnitt', 'Ausführliche YouTube Tutorials', 'SEO-Reichweite'],
    openFor: ['Podcast Guest', 'Joint Short-Form']
  },
  {
    id: 'c4',
    name: 'Aria Vibe',
    handle: '@aria_creates',
    avatarInitials: 'AV',
    niche: 'music_producer',
    primaryPlatform: 'Spotify',
    audienceSize: '50k-150k',
    followerCountLabel: '115K Monatl. Hörer',
    preferredDaw: 'BandLab',
    vibeGenres: ['Indie Lo-Fi', 'Chillhop', 'Vocal Chops'],
    collabPitchMatch: 'Perfekt für Split-Releases via DistroKid und Cross-Promotion in Playlisten.',
    strengths: ['Organische Spotify Streams', 'Vocal Hooks', 'Emotionale Melodien'],
    openFor: ['Split-Release' as any, 'Remix Swap']
  },
  {
    id: 'c5',
    name: 'Max Bassline',
    handle: '@max_bassline',
    avatarInitials: 'MB',
    niche: 'music_producer',
    primaryPlatform: 'TikTok',
    audienceSize: '1k-10k',
    followerCountLabel: '6.4K Follower',
    preferredDaw: 'Ableton Live',
    vibeGenres: ['Drum & Bass', 'Bass House', 'Field Recordings'],
    collabPitchMatch: 'Hungriger Newcomer mit extrem kreativen Alltagsgeräusch-Samples.',
    strengths: ['Extreme Aktivität', 'Schnelle Turnaround-Zeiten', 'Experimentierfreudig'],
    openFor: ['Sample Flip Challenge', 'Co-Production']
  }
];

export const CollabFinderTab: React.FC<CollabFinderTabProps> = ({ profile }) => {
  const [selectedDaw, setSelectedDaw] = useState<string>('All');
  const [selectedAudience, setSelectedAudience] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCollaborator, setSelectedCollaborator] = useState<CreatorCollaborator>(COLLABORATORS_POOL[0]);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);
  const [customPitchFormat, setCustomPitchFormat] = useState<'dm' | 'email' | 'challenge'>('dm');
  const [isAiGeneratingPitch, setIsAiGeneratingPitch] = useState<boolean>(false);

  const filteredCollabs = COLLABORATORS_POOL.filter((c) => {
    const matchesDaw = selectedDaw === 'All' || c.preferredDaw === selectedDaw;
    const matchesAudience = selectedAudience === 'All' || c.audienceSize === selectedAudience;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.vibeGenres.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDaw && matchesAudience && matchesSearch;
  });

  const generatePitchText = (): string => {
    const c = selectedCollaborator;
    const myHandle = profile.handle || '@mein_name';
    const myName = profile.name || 'Alex';

    if (customPitchFormat === 'dm') {
      return `Hey ${c.name.split(' ')[0]}! 👋

Ich feiere deinen Content rund um ${c.vibeGenres[0]} extrem – besonders dein letztes Video hatte einen echt nicen Flow.

Ich produziere ebenfalls mit ${profile.musicTools.usesSuno ? 'Suno + ' : ''}${c.preferredDaw} (${myHandle}). 

Hättest du Bock auf eine gemeinsame 15-Sekunden Sample-Flip Challenge für TikTok/Reels? 
Ich schicke dir einen rohen Stem/Melodie-Chop rüber, du machst den Drop fertig und wir taggen uns gegenseitig als Co-Autoren. 

Null Aufwand für dich, doppelter Spillover auf beiden Profilen. Schreib mir kurz, wenn du Bock hast! 🚀

Beste Grüße,
${myName}`;
    }

    if (customPitchFormat === 'challenge') {
      return `🔥 KONZEPT: Die 60-Sekunden DAW-Battle Challenge

Creator 1: ${myHandle} (${profile.musicTools.usesBandLab ? 'BandLab' : 'Ableton'})
Creator 2: ${c.handle} (${c.preferredDaw})

Format:
• Part 1 (Sekunde 0-3): ${myName} gibt ${c.name.split(' ')[0]} ein verrücktes Sample (z.B. Quietschende Tür).
• Part 2 (Sekunde 3-12): Beide zeigen ihren Bildschirm und den 1-Klick Sound-Design Trick.
• Part 3 (Sekunde 12-25): Side-by-Side Drop-Battle mit Abstimmungs-Sticker ("Welcher Beat gewinnt? 1 oder 2").

Call-to-Action: Verlinkung beider Profile in der Caption + Sound-Save Aufruf.`;
    }

    // Email Business Format
    return `Betreff: Kollaborations-Idee für gemeinsamen Track & Release // ${myName} x ${c.name}

Hallo ${c.name.split(' ')[0]},

mein Name ist ${myName} (${myHandle}). Ich verfolge deine Releases auf ${c.primaryPlatform} schon eine ganze Weile und schätze deinen Sound in ${c.vibeGenres.join(', ')} sehr.

Ich arbeite aktuell an einem neuen Club-Projekt und habe eine instrumentale Skizze fertig, die perfekt zu deiner Klangästhetik passen würde (126 BPM, F-Moll, gemastert auf -14 LUFS).

Mein Vorschlag für einen gemeinsamen Hebel:
1. Co-Release via DistroKid mit 50/50 Tantiemen-Split auf Spotify.
2. Synchronisierte Video-Kampagne auf TikTok & Instagram Reels zum Release-Tag.
3. Gegenseitiger Push in unsere Newsletter- & Community-Kanäle.

Hörprobe liegt unverbindlich hier: ${profile.linkInBio || 'https://linktr.ee/alex_creates'}

Ich freue mich über ein kurzes Feedback!

Herzliche Grüße,
${myName}`;
  };

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(generatePitchText());
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handleGenerateAiPitch = async () => {
    setIsAiGeneratingPitch(true);
    try {
      const prompt = `Schreibe eine hochkonvertierende, sympathische Outreach-DM von einem Creator (${profile.name}, Nische: ${profile.niche}, Handle: ${profile.handle}) an den Creator ${selectedCollaborator.name} (${selectedCollaborator.handle}, Nische: ${selectedCollaborator.niche}, DAW: ${selectedCollaborator.preferredDaw}, Genres: ${selectedCollaborator.vibeGenres.join(', ')}).
Fokus: Konkreter Mehrwert, kein Schleimen, gemeinsame Challenge oder Co-Production, hoher gegenseitiger Reichweiten-Spillover. Antworte direkt mit dem fertigen Nachrichtentext.`;

      const response = await generateAiContent(
        prompt,
        'Du bist der weltbeste Vermittler und Talent-Manager für Musiker und Content Creator.'
      );

      navigator.clipboard.writeText(response);
      alert('Maßgeschneiderter KI-Pitch generiert und in die Zwischenablage kopiert!');
    } catch (e) {
      alert('KI-Pitch konnte nicht generiert werden. Standard-Vorlage aktiv.');
    } finally {
      setIsAiGeneratingPitch(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Collab Finder Header */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-coral" />
              <h2 className="text-base font-bold text-neutral-900">
                Creator Collaboration & Cross-Promotion Finder
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Finde passende Partner für Beat-Swaps, Gastbeiträge und gemeinsame TikTok-Challenges für doppelten Reichweiten-Spillover.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-brand-coral border border-rose-200">
              Matching für: {profile.name || 'Alex'}
            </span>
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1 border-t border-neutral-100">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Name, Handle oder Genre filtern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-2 focus:ring-brand-coral outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedDaw}
              onChange={(e) => setSelectedDaw(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700 focus:outline-none"
            >
              <option value="All">Alle DAWs</option>
              <option value="Ableton Live">Ableton Live</option>
              <option value="FL Studio">FL Studio</option>
              <option value="Logic Pro">Logic Pro</option>
              <option value="BandLab">BandLab</option>
            </select>

            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-700 focus:outline-none"
            >
              <option value="All">Alle Größen</option>
              <option value="1k-10k">1K - 10K (Peer)</option>
              <option value="10k-50k">10K - 50K (Wachstum)</option>
              <option value="50k-150k">50K - 150K (Profi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Collaborators List & Outreach Composer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Collaborator Profiles Cards */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider px-1">
            Gefundene Creator ({filteredCollabs.length})
          </div>

          <div className="space-y-2.5">
            {filteredCollabs.map((creator) => {
              const isSelected = selectedCollaborator.id === creator.id;
              return (
                <div
                  key={creator.id}
                  onClick={() => setSelectedCollaborator(creator)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'border-brand-coral bg-rose-50/40 shadow-xs ring-1 ring-brand-coral'
                      : 'border-neutral-200 bg-white hover:bg-neutral-50/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {creator.avatarInitials}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-neutral-900 leading-snug">
                          {creator.name}
                        </h4>
                        <span className="text-xs text-neutral-500 font-mono">
                          {creator.handle} &bull; {creator.followerCountLabel}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200 font-mono">
                      {creator.preferredDaw}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">
                    💡 {creator.collabPitchMatch}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-neutral-100">
                    {creator.openFor.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Pitch Composer & DM Generator */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
                  <Send className="w-4 h-4 text-brand-coral" />
                  Outreach-Pitch & DM Vorlage
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Empfänger: <strong>{selectedCollaborator.name}</strong> ({selectedCollaborator.handle})
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCustomPitchFormat('dm')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                    customPitchFormat === 'dm'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Instagram DM
                </button>
                <button
                  onClick={() => setCustomPitchFormat('challenge')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                    customPitchFormat === 'challenge'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Challenge-Script
                </button>
                <button
                  onClick={() => setCustomPitchFormat('email')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                    customPitchFormat === 'email'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Mail
                </button>
              </div>
            </div>

            {/* Generated Message Box */}
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-800 whitespace-pre-line font-mono leading-relaxed max-h-72 overflow-y-auto">
              {generatePitchText()}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleGenerateAiPitch}
                disabled={isAiGeneratingPitch}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{isAiGeneratingPitch ? 'KI generiert...' : 'Mit KI personalisieren'}</span>
              </button>

              <button
                onClick={handleCopyPitch}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition cursor-pointer"
              >
                {copiedPitch ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    In Zwischenablage kopiert!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Nachricht kopieren
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Collab Golden Rules Card */}
          <div className="bg-neutral-900 text-white rounded-xl p-4 text-xs space-y-2">
            <span className="font-bold text-amber-300 block">
              🤝 Die 3 goldenen Collab-Regeln:
            </span>
            <ul className="space-y-1.5 text-neutral-300 text-[11px] list-disc list-inside">
              <li><strong>Kein generisches "Lass connecten":</strong> Schlage direkt eine konkrete 15s Video-Idee oder einen Beat-Tausch vor.</li>
              <li><strong>Zero Friction:</strong> Mach den ersten Schritt (z.B. Audio-Stem mitsenden), damit der Partner nur noch mit "Ja" antworten muss.</li>
              <li><strong>Split-Release:</strong> Bei gemeinsamen Songs immer den Spotify Co-Artist Tag nutzen, damit der Release in beiden Release Radars auftaucht.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
