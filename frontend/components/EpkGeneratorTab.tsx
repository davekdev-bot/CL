import React, { useState } from 'react';
import { UserProfile, EpkProfile } from '../types';
import {
  Music,
  Disc3,
  Play,
  Pause,
  Download,
  Share2,
  Mail,
  Award,
  Globe,
  Radio,
  Sliders,
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react';

interface EpkGeneratorTabProps {
  profile: UserProfile;
}

export const EpkGeneratorTab: React.FC<EpkGeneratorTabProps> = ({ profile }) => {
  const [epkData, setEpkData] = useState<EpkProfile>({
    artistName: profile.name || 'Alex Beats',
    genre: 'Melodic House & Phonk / Hybrid Electronics',
    hometown: 'Berlin, Deutschland',
    tagline: 'Futuristische Club-Sounds zwischen organischen Analogsynths und modernen KI-Gespüren.',
    shortBio:
      'Alex Beats verbindet club-erprobte Basslines mit hypnotischen Melodien. Mit über 450.000 monatlichen Streams und Support in internationalen DJ-Sets zählt der Produzent zu den spannendsten Newcomern der elektronischen Underground-Szene.',
    fullBio:
      'Angefangen im heimischen Schlafzimmerstudio mit BandLab und Field-Recordings, entwickelte Alex Beats schnell einen unverkennbaren Sound. Durch die gezielte Verknüpfung von moderner KI-Vorproduktion (Suno) und akribischem DAW-Mixdown entstehen Tracks, die sowohl auf TikTok Millionen Views generieren als auch die Peak-Time auf Festival-Bühnen dominieren.',
    monthlyListeners: 482500,
    totalStreams: '3.8M+',
    socialFollowers: '125K+',
    pressQuotes: [
      {
        source: 'Electronic Wave Magazin',
        quote: '„Ein meisterhafter Spagat zwischen packender Club-Energie und melodischer Tiefe.“'
      },
      {
        source: 'Club Radar Podcast',
        quote: '„Die perfekte Blaupause dafür, wie moderne Producer 2026 klingen sollten.“'
      }
    ],
    featuredTracks: [
      {
        id: 't1',
        title: 'Midnight Mirage (Club VIP Mix)',
        bpm: 126,
        key: 'F Minor',
        duration: '3:24',
        streamCount: '1.4M Streams',
        isSunoCoProduced: true
      },
      {
        id: 't2',
        title: 'Echoes in the Neon',
        bpm: 128,
        key: 'A Minor',
        duration: '2:58',
        streamCount: '920K Streams',
        isSunoCoProduced: false
      },
      {
        id: 't3',
        title: 'Cybernetic Drift (Festival Edit)',
        bpm: 130,
        key: 'G Minor',
        duration: '3:45',
        streamCount: '1.2M Streams',
        isSunoCoProduced: true
      }
    ],
    bookingEmail: 'booking@alexbeats-music.com',
    managementContact: 'mgmt@aurora-agency.eu',
    riderRequirements: [
      '2x Pioneer CDJ-3000 oder CDJ-2000NXS2',
      '1x Pioneer DJM-900NXS2 oder DJM-V10 Mixer',
      'High-Power Monitorboxen links & rechts auf Kopfhöhe',
      'Stabiles WLAN / LAN-Anschluss am DJ-Pult'
    ]
  });

  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [isPlayingSim, setIsPlayingSim] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const togglePlayTrack = (id: string) => {
    if (activePlayingId === id && isPlayingSim) {
      setIsPlayingSim(false);
    } else {
      setActivePlayingId(id);
      setIsPlayingSim(true);
    }
  };

  const handleShareEpk = () => {
    navigator.clipboard.writeText(
      `EPK: ${epkData.artistName} - ${epkData.tagline}\nBooking: ${epkData.bookingEmail}\nStreams: ${epkData.totalStreams}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* EPK Top Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-coral" />
            <h2 className="text-base font-bold text-neutral-900">
              Electronic Press Kit (EPK) Generator
            </h2>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Das professionelle Aushängeschild für Festivals, Clubs, Labels und Presse. Live editierbar und direkt teilbar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareEpk}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 transition cursor-pointer"
          >
            {copiedLink ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Link kopiert!
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                EPK teilen
              </>
            )}
          </button>
        </div>
      </div>

      {/* EPK Presentation Container */}
      <div className="bg-neutral-950 text-white rounded-2xl shadow-xl border border-neutral-800 overflow-hidden">
        {/* Hero Section */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-neutral-900 to-neutral-950 border-b border-neutral-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Artist Avatar Mockup */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-neutral-800 border-2 border-brand-coral flex items-center justify-center font-black text-3xl text-brand-coral shadow-lg shrink-0">
                {epkData.artistName.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-coral">
                  Offizielles Electronic Press Kit
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5">
                  {epkData.artistName}
                </h1>
                <p className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                  <span>{epkData.genre}</span>
                  <span>&bull;</span>
                  <span>{epkData.hometown}</span>
                </p>
              </div>
            </div>

            {/* Spotify Stream Badges & Stats */}
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 text-center">
                <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                  Monthly Listeners
                </span>
                <span className="text-lg font-black text-emerald-400">
                  {epkData.monthlyListeners.toLocaleString()}
                </span>
              </div>
              <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 text-center">
                <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                  Total Streams
                </span>
                <span className="text-lg font-black text-white">
                  {epkData.totalStreams}
                </span>
              </div>
              <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 text-center">
                <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                  Follower
                </span>
                <span className="text-lg font-black text-brand-coral">
                  {epkData.socialFollowers}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-neutral-300 italic mt-6 border-l-2 border-brand-coral pl-3 max-w-2xl">
            „{epkData.tagline}“
          </p>
        </div>

        {/* Content Tabs / Split view */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Bio & Press Quotes */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Biografie
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                {epkData.shortBio}
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {epkData.fullBio}
              </p>
            </div>

            {/* Press Quotes */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Presse-Stimmen & Rezensionen
              </h3>
              <div className="space-y-2.5">
                {epkData.pressQuotes.map((quote, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 text-xs"
                  >
                    <p className="italic text-neutral-200">{quote.quote}</p>
                    <span className="text-[10px] font-bold text-brand-coral block mt-1">
                      — {quote.source}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Rider Checklist */}
            <div className="p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold uppercase text-neutral-300 flex items-center gap-2">
                <Radio className="w-4 h-4 text-brand-coral" />
                Technical Rider (DJ & Live Setup)
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-400">
                {epkData.riderRequirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Audio Player Mockup & Featured Singles */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center justify-between">
                <span>Top Tracks & Vorhör-Player</span>
                <span className="text-[10px] text-emerald-400">Master-Audio 24bit</span>
              </h3>

              <div className="space-y-2.5">
                {epkData.featuredTracks.map((track) => {
                  const isCurrent = activePlayingId === track.id && isPlayingSim;
                  return (
                    <div
                      key={track.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-neutral-900 border-brand-coral shadow-md'
                          : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => togglePlayTrack(track.id)}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
                              isCurrent
                                ? 'bg-brand-coral text-white'
                                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                            }`}
                          >
                            {isCurrent ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4 ml-0.5" />
                            )}
                          </button>

                          <div>
                            <h4 className="text-xs font-bold text-white line-clamp-1">
                              {track.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5 font-mono">
                              <span>{track.bpm} BPM</span>
                              <span>&bull;</span>
                              <span>{track.key}</span>
                              {track.isSunoCoProduced && (
                                <span className="text-amber-400">✨ Suno Hybrid</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-emerald-400 font-mono block">
                            {track.streamCount}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {track.duration}
                          </span>
                        </div>
                      </div>

                      {/* Animated audio waveform bar when playing */}
                      {isCurrent && (
                        <div className="mt-3 pt-2 border-t border-neutral-800 flex items-center gap-1 h-3">
                          {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 30, 85, 50, 70].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-brand-coral rounded-full animate-pulse"
                              style={{
                                height: `${h}%`,
                                animationDuration: `${0.4 + (i % 5) * 0.15}s`
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Booking Contact Form Card */}
            <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 space-y-3">
              <h4 className="text-xs font-bold uppercase text-neutral-200 flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-coral" />
                Booking & Management Anfragen
              </h4>

              <div className="text-xs space-y-2 text-neutral-300">
                <div className="flex justify-between pb-1 border-b border-neutral-800 text-[11px]">
                  <span className="text-neutral-500">Booking:</span>
                  <a href={`mailto:${epkData.bookingEmail}`} className="text-brand-coral hover:underline font-mono">
                    {epkData.bookingEmail}
                  </a>
                </div>
                <div className="flex justify-between pb-1 border-b border-neutral-800 text-[11px]">
                  <span className="text-neutral-500">Management:</span>
                  <span className="font-mono text-neutral-300">{epkData.managementContact}</span>
                </div>
              </div>

              <a
                href={`mailto:${epkData.bookingEmail}?subject=Booking Anfrage für ${epkData.artistName}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white hover:bg-neutral-200 text-neutral-900 font-bold text-xs transition cursor-pointer"
              >
                Gigs & Show anfragen
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
