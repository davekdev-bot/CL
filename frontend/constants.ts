import { ToolItem, NicheStrategy, PlatformId, CareerRoute, SynapseNode, MusicGenreSpec, MusicGenreId } from './types';

export const INITIAL_USER_PROFILE = {
  name: 'Alex Creator',
  handle: '@alex_creates',
  linkInBio: 'https://linktr.ee/alex_creates',
  experienceLevel: 'beginner' as const,
  primaryGoal: 'growth' as const,
  niche: 'music_producer',
  musicGenre: 'phonk_drift' as MusicGenreId,
  weeklyHours: 10,
  activePlatforms: ['tiktok', 'instagram', 'shorts', 'youtube'] as PlatformId[],
  isMusician: true,
  musicTools: {
    usesSuno: true,
    usesDistroKid: true,
    usesBandLab: true,
    usesSpotify: true,
  },
  monetizationTarget: '1000€/Monat durch Streams & Digital Products',
  assignedRouteId: 'route_suno_producer' as const,
  currentPhaseIndex: 0,
  ownedAudienceGoal: 1000,
};

// Genre Neuro-Engine: Complete Specifications for 8 Distinct Music Genres
export const GENRE_SPECS_DATABASE: Record<MusicGenreId, MusicGenreSpec> = {
  phonk_drift: {
    id: 'phonk_drift',
    name: 'Phonk / Drift Bass & Memphis',
    icon: '🏎️',
    badge: 'TikTok Breakout King',
    bpmRange: '128 - 140 BPM',
    primaryKeySignatures: ['F Minor', 'G Minor', 'D# Minor'],
    viralPlatforms: ['tiktok', 'shorts', 'instagram'],
    audienceDemographic: 'Gen Z, Car-Edits, Gym-Motivation, Anime/Gaming Communities (16-24 Jahre)',
    sunoMasterPromptTemplate: 'aggressive drift phonk, distorted cowbell lead melody, hard clipping 808 kick, slowed dark atmosphere, 132 bpm, memphis rap vocal chop, raw underground energy',
    dawMixChainGuide: [
      'Sub-Bass strikt Mono bis 120Hz limitieren',
      'Analog Soft-Clipper auf der Masterspur (+3dB Hebel)',
      'Cowbell mit Bitcrusher (12-bit) & Ping-Pong Delay anwärmen',
      'Kick und 808 exakt auf 50Hz tunen für Car-Subwoofer'
    ],
    algorithmWeights: {
      completionImportance: 85,
      loopReplayImportance: 95,
      commentDiscussionImportance: 60,
      shareSaveImportance: 90,
      dropWindowSeconds: 2.2,
      recommendedLufsMaster: -8.5,
      monoCutoffHz: 120
    },
    viralVideoConcept: 'Kamera zoomt auf Studio-Monitor mit Waveform. Wenn der Cowbell-Drop bei Sekunde 2.2 fällt, schneidet das Bild im 1/4 Takt zu Drift- oder Gym-Footage.',
    monetizationPathway: 'DistroKid Spotify Release alle 3 Wochen + Phonk Drum Kits & Serum Presets (Gumroad).'
  },
  melodic_techno_house: {
    id: 'melodic_techno_house',
    name: 'Melodic Techno & Peak-Time House',
    icon: '🎛️',
    badge: 'Club & Festival Royalty',
    bpmRange: '124 - 128 BPM',
    primaryKeySignatures: ['A Minor', 'C Minor', 'E Minor'],
    viralPlatforms: ['instagram', 'tiktok', 'youtube'],
    audienceDemographic: 'Clubber, Rave-Besucher, Festivalgänger, Afterlife / Cercle Fans (22-38 Jahre)',
    sunoMasterPromptTemplate: 'melodic techno, afterlife style rolling bassline, ethereal female vocal reverb drone, dramatic synth arpeggio buildup, punchy 4 on the floor kick, club anthem 126 bpm',
    dawMixChainGuide: [
      'Sidechain-Ducking von mindestens 4-5dB bei jedem Kick-Impact',
      'Lead-Synth mit Stereo-Chorus im 2.5kHz Bereich spreizen',
      'Master auf -13 bis -14 LUFS für Spotify & Club Soundsysteme',
      'Reverb-Tail im Drop für 0.5 Takte komplett stummschalten'
    ],
    algorithmWeights: {
      completionImportance: 75,
      loopReplayImportance: 80,
      commentDiscussionImportance: 70,
      shareSaveImportance: 95,
      dropWindowSeconds: 3.5,
      recommendedLufsMaster: -13.5,
      monoCutoffHz: 100
    },
    viralVideoConcept: 'POV: Du stehst um 4 Uhr morgens im Club. Kamera schwenkt über das Mischpult. Nach einem Filter-Sweep explodiert der Drop synchron zur Lichtshow.',
    monetizationPathway: 'DJ Live-Bookings, Beatport Charts & Ableton Melodic Preset Packs.'
  },
  lofi_chillhop: {
    id: 'lofi_chillhop',
    name: 'Lo-Fi Beats & Chillhop',
    icon: '☕',
    badge: 'Evergreen Stream Magnet',
    bpmRange: '75 - 90 BPM',
    primaryKeySignatures: ['Bb Major 7', 'Db Major', 'F Major 7'],
    viralPlatforms: ['youtube', 'spotify', 'tiktok'],
    audienceDemographic: 'Studenten, Programmierer, Gamer, Deep Work & Schlaf-Playlisten (18-35 Jahre)',
    sunoMasterPromptTemplate: 'lo-fi chillhop, vinyl crackle dust, jazzy electric piano rhodes chords, laidback dusty boom bap drum swing, warm tape saturation, nostalgic anime study mood 82 bpm',
    dawMixChainGuide: [
      'Vinyl-Knistern & Tape-Wow (-18dB leise im Hintergrund)',
      'High-Cut Filter bei 7kHz auf allen Instrumenten für wohligen Klang',
      'Drum-Transienten weich abfedern (kein harter Attack)',
      'Dynamischer Master mit -15 LUFS für stundenlanges Hören'
    ],
    algorithmWeights: {
      completionImportance: 95,
      loopReplayImportance: 98,
      commentDiscussionImportance: 50,
      shareSaveImportance: 85,
      dropWindowSeconds: 0.0, // kein harter Drop, sanfter Einstieg
      recommendedLufsMaster: -15.0,
      monoCutoffHz: 90
    },
    viralVideoConcept: 'Gemütliche B-Roll (Kaffee einschenken, Regen am Fenster). Lo-Fi Musik läuft im Hintergrund als Soundteppich für "Lerne mit mir 25 Minuten Pomodoro".',
    monetizationPathway: '24/7 YouTube Livestreams, Spotify Editorial "Lofi Beats" Platzierungen, Study Playlists.'
  },
  drill_trap: {
    id: 'drill_trap',
    name: 'UK/NY Drill & Heavy Trap',
    icon: '🥷',
    badge: '808 Slide Domination',
    bpmRange: '140 - 144 BPM',
    primaryKeySignatures: ['C# Minor', 'D Minor', 'F# Minor'],
    viralPlatforms: ['tiktok', 'youtube', 'instagram'],
    audienceDemographic: 'Urban Music Fans, Rap-Begeisterte, Beat-Leasing Kunden (15-28 Jahre)',
    sunoMasterPromptTemplate: 'dark uk drill beat, aggressive sliding 808 sub bass glides, sharp snare rimshot on 3, haunting piano loop minor key, sinister reversed melody 142 bpm',
    dawMixChainGuide: [
      '808-Glide Slides mit Pitch-Bend in der Piano-Roll programmieren',
      'Snare/Rimshot exakt bei 200Hz und 5kHz nach vorne schieben',
      'Hi-Hats mit Triolen-Rolls (1/32) im Stereopan links/rechts modulieren',
      'Master Limiter mit schnellem Release (0.1ms)'
    ],
    algorithmWeights: {
      completionImportance: 80,
      loopReplayImportance: 88,
      commentDiscussionImportance: 85,
      shareSaveImportance: 80,
      dropWindowSeconds: 1.8,
      recommendedLufsMaster: -9.5,
      monoCutoffHz: 110
    },
    viralVideoConcept: 'Screen-Recording: "Wie man diesen 808-Slide in 5 Sekunden baut". Kamera zoomt auf die glidenden Noten in der DAW.',
    monetizationPathway: 'Beat-Lizenzen auf BeatStars ($30 - $500), Custom Productions für Rapper.'
  },
  hyperpop_cyber: {
    id: 'hyperpop_cyber',
    name: 'Hyperpop & Glitchcore',
    icon: '⚡',
    badge: 'Maximalist Chaos',
    bpmRange: '150 - 175 BPM',
    primaryKeySignatures: ['E Major', 'B Major', 'G# Minor'],
    viralPlatforms: ['tiktok', 'instagram', 'discord'],
    audienceDemographic: 'Digital Natives, Anime-Community, Speed-Up Trends, Discord-Nutzer (14-22 Jahre)',
    sunoMasterPromptTemplate: 'hyperpop nightcore anthem, pitched up squeaky female vocals, metallized harsh bass, square wave synth melody, extreme autotune, energetic glitch breakdown 165 bpm',
    dawMixChainGuide: [
      'Vocals um +3 bis +5 Halbtöne hochpitchen (Formant-Shifting)',
      'Extremer OTT Multiband-Kompressionseffekt (70%+ Upward)',
      'Glitch-Stutter & Beat-Repeater vor jedem Taktwechsel',
      'Aggressiver Hochmitten-Boost bei 3.5kHz'
    ],
    algorithmWeights: {
      completionImportance: 90,
      loopReplayImportance: 92,
      commentDiscussionImportance: 75,
      shareSaveImportance: 85,
      dropWindowSeconds: 1.2,
      recommendedLufsMaster: -7.5,
      monoCutoffHz: 130
    },
    viralVideoConcept: 'Schnelle Schnitte im 100ms Takt. Text-on-Screen wechselt epileptisch schnell, passend zu maximalistischer Synthesizer-Explosion.',
    monetizationPathway: 'TikTok Speed-Up Sounds, Discord VIP Circles, Soundpacks.'
  },
  synthwave_retro: {
    id: 'synthwave_retro',
    name: 'Synthwave & Retrowave',
    icon: '🌆',
    badge: '80s Nostalgia Driver',
    bpmRange: '105 - 120 BPM',
    primaryKeySignatures: ['A Minor', 'D Minor', 'C Major'],
    viralPlatforms: ['youtube', 'tiktok', 'instagram'],
    audienceDemographic: '80er Fans, Neon-Ästheten, Sim-Racer, Sci-Fi Enthusiasten (25-45 Jahre)',
    sunoMasterPromptTemplate: '80s synthwave retrowave, vintage analog gated reverb snare, warm juno synth pads, driving bassline arp, neon cyberpunk sunset drive 116 bpm',
    dawMixChainGuide: [
      'Gated Reverb Snare (Phil Collins Snare-Effekt)',
      'Juno-106 Chorus auf allen Flächen und Arpeggios',
      'Sub-Bass warm mit Tape-Saturation anfetten',
      'Master mit analoger Röhren-Simulation wärmen'
    ],
    algorithmWeights: {
      completionImportance: 78,
      loopReplayImportance: 82,
      commentDiscussionImportance: 65,
      shareSaveImportance: 88,
      dropWindowSeconds: 3.0,
      recommendedLufsMaster: -12.0,
      monoCutoffHz: 95
    },
    viralVideoConcept: 'Synthesizer-Arpeggio synchron zu 80er Retro-Visuals (Neon-Gitter, fahrendes Auto in den Sonnenuntergang). Nostalgie-Trigger.',
    monetizationPathway: 'Gaming Soundtracks, Indie Game Lizenzen, YouTube Longform Compilations.'
  },
  hardstyle_rave: {
    id: 'hardstyle_rave',
    name: 'Hard Techno & Hardstyle Rave',
    icon: '🔊',
    badge: 'Industrial Kick Weapon',
    bpmRange: '150 - 165 BPM',
    primaryKeySignatures: ['F Minor', 'G# Minor', 'D Minor'],
    viralPlatforms: ['tiktok', 'instagram', 'youtube'],
    audienceDemographic: 'Raver, Festival-Besucher, Fitness-Hardcore-Gänger (18-30 Jahre)',
    sunoMasterPromptTemplate: 'industrial hard techno, brutal distorted rumble kick drum, dark rave acid synth line, screeching industrial percussion, warehouse club pressure 155 bpm',
    dawMixChainGuide: [
      'Distorted Rumble Kick: Reverb-Tail der Kick stark verzerren und unter die Dry-Kick mischen',
      'Resonanz-Peaks mit schmalem Notch-Filter bei 3kHz zähmen',
      'Hard Limiting für maximale Lautheit im Club',
      'Sub-Bass strikt bis 140Hz Mono'
    ],
    algorithmWeights: {
      completionImportance: 88,
      loopReplayImportance: 94,
      commentDiscussionImportance: 70,
      shareSaveImportance: 92,
      dropWindowSeconds: 1.5,
      recommendedLufsMaster: -7.0,
      monoCutoffHz: 140
    },
    viralVideoConcept: 'Kamera wackelt massiv synchron zum verzerrten Rumble-Kick. Creator hält sich die Ohren zu oder filmt tanzende Menge.',
    monetizationPathway: 'Club DJ Bookings, Festival Headlining, Custom Hardstyle Samples.'
  },
  cinematic_ambient: {
    id: 'cinematic_ambient',
    name: 'Cinematic, Filmscore & Ambient',
    icon: '🎻',
    badge: 'Sync & Movie Gold',
    bpmRange: '60 - 100 BPM',
    primaryKeySignatures: ['D Minor', 'B Minor', 'Eb Major'],
    viralPlatforms: ['youtube', 'tiktok', 'instagram'],
    audienceDemographic: 'Filmemacher, Content Creator, Storyteller, Meditation & Fantasy Fans (20-50 Jahre)',
    sunoMasterPromptTemplate: 'cinematic orchestral trailer music, massive hans zimmer braam brass impact, building emotional cello staccato, epic hybrid choir, trailer climax 90 bpm',
    dawMixChainGuide: [
      'Enorme dynamische Bandbreite bewahren (vom leisesten Pianissimo zum Brüllen)',
      'Sub-Braam Bass (Blechbläser + 808 Sub)',
      'Weite Hallräume mit 6-8 Sekunden Nachhallzeit (Concert Hall)',
      'Mastering mit -14 LUFS für Film- & Streaming-Sync'
    ],
    algorithmWeights: {
      completionImportance: 82,
      loopReplayImportance: 75,
      commentDiscussionImportance: 80,
      shareSaveImportance: 96,
      dropWindowSeconds: 4.0,
      recommendedLufsMaster: -14.0,
      monoCutoffHz: 85
    },
    viralVideoConcept: 'Atemberaubende Naturaufnahme oder Film-Trailer-Ausschnitt. Musik baut sich von zartem Cello zu einem orchestralen Donnerschlag auf.',
    monetizationPathway: 'Film-, TV- & Werbe-Sync Lizenzen ($500 - $15.000 pro Placement).'
  }
};

// Career Routes & Tailored Battle Plans (Das Nervensystem des Compass)
export const CAREER_ROUTES: CareerRoute[] = [
  {
    id: 'route_zero_to_hero',
    title: 'Zero to Hero: Anfänger ohne Vorkenntnisse',
    subtitle: 'Vom absoluten Startpunkt zu den ersten 1.000 echten Fans ohne Budget',
    badge: 'Kaltstart Blueprint',
    avatarIcon: '🌱',
    idealForProfile: 'Anfänger mit 0 Followern, keinen Schnitt-Kenntnissen und Angst vor teuren Abos.',
    targetFocus: 'Fundament & tägliche Veröffentlichungs-Routine etablieren',
    synapseKeys: ['syn_transcript', 'syn_prompter', 'syn_storyboard', 'syn_audit', 'syn_genre_neuro'],
    battlePlan: {
      dailyChecklist: {
        duty: '1 Short-Form Video veröffentlichen (Aufnahme via Handy, Schnitt mit CapCut Auto-Captions).',
        routine: '15 Minuten vor dem Posten bei 5 themenverwandten Creatoren gehaltvolle Mehrwert-Kommentare hinterlassen.',
        bonus: '3 Hook-Variationen für den Clip von morgen in das Ideen-Logbuch notieren.'
      },
      weeklySprint: {
        focusTitle: 'Batch-Produktion & Hook-Validierung',
        targetDeliverable: '5 fertig geplante Kurzvideos bis Freitag im Entwurfsordner.',
        reviewMetric: '3-Sekunden Stop-Rate (Ziel: > 60% bleiben nach dem Hook).'
      },
      monthlyWarGoal: {
        targetIncome: '0 € bis 250 € (Fokus liegt auf Reichweiten-Schwungrad)',
        targetFollowers: '500 bis 1.500 organische Follower',
        ownedAssetDeliverable: 'Kostenlose Newsletter-Landingpage via Substack oder Beacons eingerichtet.'
      }
    },
    keyChecklistItems: [
      'Bio nach der 3-Zeilen-Formel optimieren (Wer bist du? Was lernen sie? Wo klicken sie?)',
      'Erste 10 Videos ohne Perfektionismus veröffentlichen (Quantität schlägt Qualität in Phase 1)',
      'CapCut Desktop installieren & 100% kostenlose Textvorlage speichern',
      'Keine bezahlten Tools kaufen – 0€ Fixkosten-Garantie einhalten'
    ],
    dangerTrapWarning: 'Falle #1: Zu viel Zeit mit Logo, Website oder Ausrüstung vergeuden, bevor 30 Videos live sind!',
    nextMilestoneUnlocked: 'Freischaltung: Faceless Repurposing & Multi-Plattform Syndizierung'
  },
  {
    id: 'route_suno_producer',
    title: 'Musikproduzent, DJ & Suno AI Artist',
    subtitle: 'Vom Studio-Snippet & KI-Stem zu monatlichen Spotify-Tantiemen und Sync-Deals',
    badge: 'Audio & Release OS',
    avatarIcon: '🎵',
    idealForProfile: 'Beatmaker, DJs, Suno-Experimentierer, die eigene Musik auf Streaming-Diensten monetarisieren wollen.',
    targetFocus: 'Spotify Pre-Saves, Club-Reactions, Sample Packs & Sync-Deals',
    synapseKeys: ['syn_genre_neuro', 'syn_remixer', 'syn_music_release', 'syn_samplepack', 'syn_epk', 'syn_deals'],
    battlePlan: {
      dailyChecklist: {
        duty: '1 Audio-Teaser Clip posten ("Kitchen Sample" Drop oder Suno vs. DAW Challenge).',
        routine: 'SoundCloud / TikTok Audio-Link in der Bio aktualisieren und auf User-Duette reagieren.',
        bonus: '1 rohes Melodie-Loop als Preset für das nächste Community Sample Pack bouncen.'
      },
      weeklySprint: {
        focusTitle: 'Single Pre-Save Push & Drop-Polishing',
        targetDeliverable: 'Track 21 Tage vor VÖ bei DistroKid hochgeladen & Spotify Editorial Pitch ausgefüllt.',
        reviewMetric: 'Pre-Saves über HyperFollow (Ziel: 150+ vor Release).'
      },
      monthlyWarGoal: {
        targetIncome: '500 € bis 1.800 € (Streaming Tantiemen + Gratis Sample Pack Spenden)',
        targetFollowers: '5.000 monatliche Spotify-Hörer & 3.000 TikTok-Follower',
        ownedAssetDeliverable: 'Vollständiges Electronic Press Kit (EPK) an 10 Indie-Labels & DJs versendet.'
      }
    },
    keyChecklistItems: [
      'Suno Commercial License prüfen (Pro-Plan für Spotify-Veröffentlichungen zwingend)',
      'Master-Audio auf genre-spezifische LUFS mastern & Sub-Bass unter 100Hz strikt Mono schalten',
      'Spotify for Artists Editorial Pitch mind. 14 Tage vor VÖ einreichen',
      'Eigenes Sample Pack als 0€ Download einrichten, um Produzenten-Mails einzusammeln'
    ],
    dangerTrapWarning: 'Falle #2: 360-Labeldeals unterschreiben! Behalte immer 100% deiner Masterrechte via DistroKid.',
    nextMilestoneUnlocked: 'Freischaltung: Sync-Lizenzierung für Filme, Games & Werbekampagnen'
  },
  {
    id: 'route_faceless_autopilot',
    title: 'Faceless Video & Repurposing Autopilot',
    subtitle: 'Skalierbare Content-Maschine aus Transkripten, B-Rolls und Auto-Captions',
    badge: 'Automatisierung',
    avatarIcon: '⚡',
    idealForProfile: 'Creator, die ihr Gesicht nicht vor der Kamera zeigen wollen oder 1 Podcast in 10 Clips zerlegen.',
    targetFocus: 'Transkript-zu-Clips Extraktion, virale On-Screen Cues & maximale Frequenz',
    synapseKeys: ['syn_transcript', 'syn_repurposer', 'syn_competitor', 'syn_thumbnails', 'syn_genre_neuro'],
    battlePlan: {
      dailyChecklist: {
        duty: '2 Faceless Clips veröffentlichen (Pexels B-Roll + Voiceover + animierte Gelb/Grün Captions).',
        routine: 'TikTok Creative Center auf neue virale Audio-Sounds scannen (48h-Fenster nutzen).',
        bonus: '1 Longform-Transkript in 3 eigenständige Short-Drehbücher zerlegen.'
      },
      weeklySprint: {
        focusTitle: 'Systematisches Format-Recycling',
        targetDeliverable: '14 Faceless Clips für die nächsten 7 Tage vorproduziert und in Meta Suite eingeplant.',
        reviewMetric: 'Completion Rate (Ziel: > 68% durch nahtlose Loops).'
      },
      monthlyWarGoal: {
        targetIncome: '300 € bis 1.200 € (Affiliate Links in Bio & YouTube AdSense)',
        targetFollowers: '10.000 Follower plattformübergreifend',
        ownedAssetDeliverable: 'Automatisierter E-Mail-Trichter mit kostenlosem Notion-Template.'
      }
    },
    keyChecklistItems: [
      'Pexels & Pixabay B-Roll Ordner nach Emotionen vorsortieren (Fokus, Luxus, Tech, Natur)',
      'CapCut Vorlage mit 3 Zeilen Text zentriert anlegen (optimal für Daumen-Scroll-Verhalten)',
      'Anti-Repetition Regel beachten: Niemals denselben B-Roll Clip zweimal in derselben Woche nutzen',
      'Link-in-Bio CTA am Ende jedes Videos einblenden'
    ],
    dangerTrapWarning: 'Falle #3: Reine KI-Stimmen ohne emotionale Modulation klingen robotisch und senken die Watchtime!',
    nextMilestoneUnlocked: 'Freischaltung: TikTok Creator Rewards Skalierung & Brand Deals'
  },
  {
    id: 'route_personal_authority',
    title: 'Personal Authority & Thought Leader',
    subtitle: 'Vom Expertenwissen zu hochpreisigen Beratungen, PDF-Karussells und treuen Klienten',
    badge: 'High-Ticket Authority',
    avatarIcon: '👔',
    idealForProfile: 'Berater, C-Level, Dienstleister, Coaches & Programmierer mit fundiertem Fachwissen.',
    targetFocus: 'LinkedIn PDF-Guides, Instagram Karussells & E-Mail Newsletter Monopol',
    synapseKeys: ['syn_carousel', 'syn_split', 'syn_revenue', 'syn_collab'],
    battlePlan: {
      dailyChecklist: {
        duty: '1 textbasierter Insight-Post auf LinkedIn oder X mit provokanter Kernaussage in Zeile 1.',
        routine: 'Mit 3 potenziellen Kooperationspartnern oder B2B-Kunden in DMs interagieren.',
        bonus: 'Ein Kundenproblem der Woche in ein 6-Slide Karussell-Konzept übertragen.'
      },
      weeklySprint: {
        focusTitle: 'Deep-Dive Karussell & Newsletter',
        targetDeliverable: '1 umfassendes 8-Slide Karussell (1080x1350) + 1 Substack-Newsletter am Sonntag.',
        reviewMetric: 'Save- & Repost-Quote (Ziel: > 8% der Leser speichern den Beitrag).'
      },
      monthlyWarGoal: {
        targetIncome: '2.500 € bis 7.500 € (1-zu-1 Consulting oder bezahlte B2B-Projekte)',
        targetFollowers: '2.000 hochqualifizierte Branchen-Kontakte',
        ownedAssetDeliverable: 'E-Mail Liste mit 500+ Entscheidern im direkten Besitz.'
      }
    },
    keyChecklistItems: [
      'LinkedIn Header-Banner & Slogan auf den konkreten Kundennutzen zuschneiden',
      'Keine externen Links im Hauptpost setzen (Algorithmus-Drosselung vermeiden)',
      'Karussells im PDF-Format hochladen für native Slide-Funktion',
      'Substack oder Beehiiv Newsletter als primären Conversion-Trichter nutzen'
    ],
    dangerTrapWarning: 'Falle #4: Fachchinesisch! Formuliere komplexe Themen so, dass ein 14-Jähriger sie sofort begreift.',
    nextMilestoneUnlocked: 'Freischaltung: Mastermind Skool-Community & Produktisierte Dienstleistung'
  }
];

// Synapse Nodes connecting modules together
export const SYNAPSE_NODES: SynapseNode[] = [
  {
    id: 'syn_desk',
    label: 'Mein Creator Cockpit',
    targetTabKey: 'creator_desk',
    category: 'autonomy',
    description: 'Dein tagesaktuelles Hauptquartier mit personalisierten Missionen und Status.',
    primaryMetric: 'Tages-Progress'
  },
  {
    id: 'syn_genre_neuro',
    label: 'Genre & Nischen Neuro-Engine',
    targetTabKey: 'genre_engine',
    category: 'audio',
    description: 'BPM-Rechner, Drop-Timings, Suno-Prompts und virale Algorithmus-Profile je Musikrichtung.',
    primaryMetric: 'Genre-Algorithmus'
  },
  {
    id: 'syn_transcript',
    label: 'Transkript zu Clips',
    targetTabKey: 'transcript_pipeline',
    category: 'content',
    description: 'Roh-Texte & Podcasts in virale 15-30s Drehbücher zerlegen.',
    primaryMetric: '0€ Autonomie'
  },
  {
    id: 'syn_storyboard',
    label: 'Storyboard Studio',
    targetTabKey: 'storyboard',
    category: 'content',
    description: 'Shot-by-Shot Regieplan mit Kameraperspektiven und Sprechtimer.',
    primaryMetric: 'Regie-Exaktheit'
  },
  {
    id: 'syn_prompter',
    label: 'Voice Teleprompter',
    targetTabKey: 'voice_teleprompter',
    category: 'content',
    description: 'Sprachgesteuertes Echtzeit-Mitscrollen & Monotonie-Warner.',
    primaryMetric: 'WPM & Kadenz'
  },
  {
    id: 'syn_thumbnails',
    label: 'Thumbnail A/B Studio',
    targetTabKey: 'thumbnails',
    category: 'content',
    description: 'Kontrast-Typografie, Feed-Simulator und CTR-Stop Score.',
    primaryMetric: 'Visual CTR'
  },
  {
    id: 'syn_audit',
    label: 'TikTok 2026 Audit',
    targetTabKey: 'viral_audit',
    category: 'analysis',
    description: 'Entwürfe gegen die 5 neuen TikTok-Algorithmusregeln testen.',
    primaryMetric: 'Viral-Score / 100'
  },
  {
    id: 'syn_remixer',
    label: 'Audio Remixer & Stem Lab',
    targetTabKey: 'audio_remixer',
    category: 'audio',
    description: 'Suno Stems trennen, Pitch-Shift Drops und TikTok Loop-Schnittpunkte berechnen.',
    primaryMetric: 'Loop Retention'
  },
  {
    id: 'syn_music_release',
    label: 'Musik Release Kalender',
    targetTabKey: 'music',
    category: 'audio',
    description: 'Interaktiver 28-Tage Fristenrechner für Spotify Editorial & Pre-Saves.',
    primaryMetric: 'Release Deadlines'
  },
  {
    id: 'syn_samplepack',
    label: 'Sample Pack Store',
    targetTabKey: 'samplepack',
    category: 'monetization',
    description: 'Kostenlose oder bezahlte WAV/MIDI Bundles direkt zum Download anbieten.',
    primaryMetric: 'Direkt-Downloads'
  },
  {
    id: 'syn_deals',
    label: 'Deal Simulator',
    targetTabKey: 'deal_simulator',
    category: 'monetization',
    description: 'Major 360-Klauseln vs. 100% Indie DistroKid Tantiemen vergleichen.',
    primaryMetric: 'Katalog-Eigenbesitz'
  },
  {
    id: 'syn_revenue',
    label: 'Umsatz & Cashflow Rechner',
    targetTabKey: 'revenue',
    category: 'monetization',
    description: 'Monatliche Einnahmen über Streams, Sponsoring und digitale Produkte modellieren.',
    primaryMetric: 'Monatlicher Cashflow'
  },
  {
    id: 'syn_autonomy',
    label: 'Autonomie Roadmap',
    targetTabKey: 'autonomy_roadmap',
    category: 'autonomy',
    description: 'De-Platforming Schutz: Von 0€ zu 100% eigenen E-Mail Listen und Unabhängigkeit.',
    primaryMetric: 'Besitz-Quote'
  },
  {
    id: 'syn_competitor',
    label: 'Competitor Radar & Heatmap',
    targetTabKey: 'competitor_heatmap',
    category: 'analysis',
    description: 'Rivalen analysieren, virale Postingzeiten und Ermüdungsrisiken aufdecken.',
    primaryMetric: 'Peak Posting Zeit'
  },
  {
    id: 'syn_carousel',
    label: 'Karussell Builder',
    targetTabKey: 'carousel',
    category: 'content',
    description: 'Hochkonvertierende 6-Slide PDF-Guides für LinkedIn & Instagram bauen.',
    primaryMetric: 'Save-Rate'
  },
  {
    id: 'syn_split',
    label: 'Hook A/B Split-Tester',
    targetTabKey: 'split',
    category: 'content',
    description: 'Erste 2 Sekunden psychologisch vergleichen und Retention-Kurven simulieren.',
    primaryMetric: 'Scroll-Stop %'
  },
  {
    id: 'syn_epk',
    label: 'Electronic Press Kit',
    targetTabKey: 'epk',
    category: 'audio',
    description: 'Offizielles Pressepaket für DJ-Bookings, Festivals und Veranstalter.',
    primaryMetric: 'Booking Readiness'
  }
];

export const TIKTOK_2026_ALGORITHM_RULES = [
  {
    ruleNumber: 1,
    title: 'Jeder Post wird als neuer Creator bewertet',
    detail: 'Die Followerzahl bestimmt nicht mehr deine Start-Views. Entscheidend für den ersten Ausspielungs-Batch sind (a) Audience Interest Size deines Themas und (b) Completion Rate (Ziel: >65% der Zuschauer schauen bis zum Ende).',
    actionTip: 'Wähle breitere Framing-Hooks (z.B. "Jeder Musikfan" statt nur "Ableton User").'
  },
  {
    ruleNumber: 2,
    title: 'Kommentarqualität schlägt Quantität',
    detail: 'Der Algorithmus belohnt echte inhaltliche Diskussionen, Text-Replies des Creators und tiefe Reply-Threads. Stumpfe Emojis oder Bot-Spam werden entwertet.',
    actionTip: 'Stelle am Ende eine polarisierende Frage mit 2 klaren Optionen ("Klingt Version A oder B besser?").'
  },
  {
    ruleNumber: 3,
    title: 'Trends haben nur noch ein 48–72 Stunden Fenster',
    detail: 'Früher hielten Sounds 1–2 Wochen. 2026 erreichen Sounds ihren Peak nach 3 Tagen. Schnelligkeit schlägt Produktionsperfektionismus.',
    actionTip: 'Sobald ein Sound im Creative Center ansteigt: Am selben Tag Clip hochladen.'
  },
  {
    ruleNumber: 4,
    title: 'Anti-Repetition & Ermüdungsfilter',
    detail: 'Gleiche Clip-Strukturen werden nicht mehrfach an dieselben User ausgespielt. Wiederholung führt zu drastischem Drosseln.',
    actionTip: 'Wechsle die Video-Einstiege: Visual Shock, Text-on-Screen, Storytelling im Wechsel.'
  },
  {
    ruleNumber: 5,
    title: 'Der Conversion-Trichter (YouTube & Link-in-Bio)',
    detail: 'Kurzvideos dienen der Reichweiten-Akquise; monatliche Einnahmen entstehen erst durch Lead-Funnels, Giveaways & YouTube als "Build-Once Asset".',
    actionTip: 'Leite 3–5% der TikTok-Zuschauer konsequent auf ein digitales Freebie oder Spotify Pre-Save.'
  }
];

export const PLATFORM_LIMITS_2026: Record<
  PlatformId,
  { name: string; maxLen: string; hookWindow: string; bestTimes: string; algorithmTip: string }
> = {
  tiktok: {
    name: 'TikTok',
    maxLen: 'In-App bis 10 Min, Upload bis 60 Min',
    hookWindow: '1 - 2 Sekunden (entscheidet über Swipe-Through-Rate)',
    bestTimes: '18:00 - 21:00 & 12:00 - 14:00',
    algorithmTip: 'Hohe Completion-Rate schlägt Likes. Nutze Loop-Schnitt und on-screen Text in den ersten 500ms.',
  },
  instagram: {
    name: 'Instagram Reels',
    maxLen: 'Reels: Bis 3 Min (optimal: 7-15s für Viralität)',
    hookWindow: '1.5 Sekunden (Visueller Kontrast + Bewegung)',
    bestTimes: '11:00 - 13:00 & 19:00 - 21:00',
    algorithmTip: 'Saves und DM-Shares sind 2026 die stärksten Rankingfaktoren vor Likes.',
  },
  shorts: {
    name: 'YouTube Shorts',
    maxLen: 'Seit Ende 2024 bis zu 3 Minuten',
    hookWindow: '2 Sekunden (Zeige sofort das Endresultat / Hook)',
    bestTimes: '14:00 - 17:00 (Donnerstag - Sonntag)',
    algorithmTip: '"Viewed vs Swiped away"-Quote muss über 75% liegen für den großen Algorithmus-Push.',
  },
  youtube: {
    name: 'YouTube Longform',
    maxLen: 'Beliebig (8-15 Min ideal für Midrolls)',
    hookWindow: 'Erste 30 Sekunden ohne langes Intro',
    bestTimes: '15:00 - 18:00 werktags, 10:00 samstags',
    algorithmTip: 'Kombination aus CTR (Thumbnail + Titel) und durchschnittlicher Wiedergabedauer (AVD).',
  },
  x: {
    name: 'X (Twitter)',
    maxLen: '280 Zeichen (Basis) / Premium lang',
    hookWindow: 'Zeile 1 muss eine provokante oder wertvolle These sein',
    bestTimes: '08:00 - 10:00 & 17:00 - 19:00',
    algorithmTip: 'Verlinkungen erst im Reply-Thread posten, um den Hauptpost nicht im Algorithmus zu drosseln.',
  },
  linkedin: {
    name: 'LinkedIn',
    maxLen: 'Bis zu 3000 Zeichen, PDF-Karusselle',
    hookWindow: 'Vor dem "...mehr anzeigen" Klick (1-2 Sätze)',
    bestTimes: 'Dienstag - Donnerstag 07:30 - 09:30',
    algorithmTip: 'Persönliche Story + umsetzbares Berufs-Takeaway. PDF-Dokumente erzielen höchste Reichweite.',
  },
  facebook: {
    name: 'Facebook & Reels',
    maxLen: 'Video & Text unlimitiert',
    hookWindow: 'Emotionale oder relatable Trigger',
    bestTimes: '13:00 - 16:00',
    algorithmTip: 'Gruppen und Diskussionen dominieren. Facebook Reels haben teils überraschend organischen Spillover.',
  },
  threads: {
    name: 'Threads',
    maxLen: '500 Zeichen pro Post',
    hookWindow: 'Dialogstarter & kontroverse Fragen',
    bestTimes: 'Abends 20:00 - 22:00',
    algorithmTip: 'Belohnt schnelle Unterhaltungen und Antworten zwischen Creatorn.',
  },
  pinterest: {
    name: 'Pinterest',
    maxLen: 'Idea Pins & Graphic Pins',
    hookWindow: 'Suchbegriff-Grafik 1000x1500px vertikal',
    bestTimes: 'Samstag & Sonntag abends',
    algorithmTip: 'Pinterest ist eine Suchmaschine, kein soziales Netzwerk. SEO-Titel mit Keyword-Intent nutzen.',
  },
  telegram: {
    name: 'Telegram Kanal',
    maxLen: '4096 Zeichen pro Nachricht',
    hookWindow: 'Emojis + Fettgedruckte Überschrift',
    bestTimes: '12:30 & 19:30 direkt aufs Smartphone',
    algorithmTip: '100% organische Auslieferung an alle Abonnenten. Höchste Conversion für direkte Verkäufe.',
  },
  whatsapp: {
    name: 'WhatsApp Kanal',
    maxLen: 'Kurznachrichten, Sprachnotizen, Fotos',
    hookWindow: 'Nahbar wie ein Freund, max. 1-2 Updates am Tag',
    bestTimes: '18:00 - 20:00',
    algorithmTip: 'Strikte No-Spam Policy. Reaktionen und Abstimmungen halten den Kanal in der Favoritenliste.',
  },
};

export const TOOLS_DATABASE: ToolItem[] = [
  {
    name: 'CapCut',
    category: 'Content',
    desc: 'Video-Schnitt, Auto-Captions & virale Vorlagen',
    pricing: 'Gratis mit optionalem Pro-Plan',
    url: 'https://www.capcut.com',
    tip: 'Auto-Untertitel mit farbiger Hervorhebung erhöhen die Watch-Time um bis zu 40%.'
  },
  {
    name: 'Canva',
    category: 'Content',
    desc: 'Thumbnails, Karussells, Social Media Banner & Brand Kits',
    pricing: 'Großzügiger Gratis-Tarif',
    url: 'https://www.canva.com',
    tip: 'Nutze Vorlagen im Format 1080x1350 für Instagram-Karussells mit maximaler Bildschirmhöhe.'
  },
  {
    name: 'DaVinci Resolve',
    category: 'Content',
    desc: 'Profi-Schnitt & Color Grading Software',
    pricing: 'Umfangreiche Gratisversion ohne Wasserzeichen',
    url: 'https://www.blackmagicdesign.com/products/davinciresolve',
    tip: 'Branchenstandard für Film und High-End YouTube Produktionen.'
  },
  {
    name: 'Pexels / Pixabay',
    category: 'Content',
    desc: 'Gratis Stock-Videos und Bilder für B-Roll Clips',
    pricing: '100% Gratis / CC0 Lizenz',
    url: 'https://www.pexels.com',
    tip: 'Perfekt für atmosphärische B-Roll Hintergründe bei Voiceover-Shorts.'
  },
  {
    name: 'remove.bg',
    category: 'Content',
    desc: 'Hintergrund von Porträts und Objekten mit 1-Klick entfernen',
    pricing: 'Kostenlose Webnutzung',
    url: 'https://www.remove.bg',
    tip: 'Essentiell, um dich selbst sauber in YouTube-Thumbnails freizustellen.'
  },
  {
    name: 'Google AI Studio',
    category: 'KI',
    desc: 'Texte, Skripte, multimodale Prompt-Entwicklung',
    pricing: 'Kostenfreies Kontingent',
    url: 'https://aistudio.google.com',
    tip: 'Überragend zur Ausarbeitung ganzer 30-Tage Skriptpläne aus einem einzigen Video-Transkript.'
  },
  {
    name: 'ChatGPT / Claude / Gemini',
    category: 'KI',
    desc: 'Content-Ideen, Skripte, Captions & Übersetzungen',
    pricing: 'Starke Gratis-Modelle vorhanden',
    url: 'https://gemini.google.com',
    tip: 'Gib der KI immer eine klare Persona: "Handle als viraler Short-Form Editor für TikTok".'
  },
  {
    name: 'Leonardo AI',
    category: 'KI',
    desc: 'KI-Bildgenerierung für Cover, Thumbnails & Grafiken',
    pricing: 'Tägliches Gratis-Kontingent (150 Tokens)',
    url: 'https://leonardo.ai',
    tip: 'Erzeuge fotorealistische oder Anime-Artworks als Album-Cover oder Video-Hooks.'
  },
  {
    name: 'Suno AI',
    category: 'Musik',
    desc: 'Vollständige KI-Musik mit Gesang und Arrangement generieren',
    pricing: 'Gratisversion mit 50 Credits/Tag (Rechte prüfen)',
    url: 'https://www.suno.ai',
    tip: 'Pro-Abonnement erforderlich für kommerzielle Veröffentlichungsrechte auf Spotify!'
  },
  {
    name: 'BandLab',
    category: 'Musik',
    desc: 'Vollwertige DAW im Browser & auf dem Handy',
    pricing: '100% Kostenlos',
    url: 'https://www.bandlab.com',
    tip: 'Inklusive kostenlosem KI-Mastering für deine fertigen Tracks.'
  },
  {
    name: 'Audacity',
    category: 'Musik',
    desc: 'Open-Source Audio-Editor für Aufnahme & Voice-Cleaning',
    pricing: 'Kostenlos & Open Source',
    url: 'https://www.audacityteam.org',
    tip: 'Nutze die Rauschentfernung und den Kompressor für kristallklare Sprachaufnahmen.'
  },
  {
    name: 'DistroKid',
    category: 'Musik',
    desc: 'Musikvertrieb auf Spotify, Apple Music, TikTok, Instagram & Co.',
    pricing: 'Jahresabo (~22$/Jahr, unbegrenzte Uploads)',
    url: 'https://distrokid.com',
    tip: 'Behalte 100% deiner Tantiemen. Unterstützt "HyperFollow" Pre-Save Landingpages automatisch.'
  },
  {
    name: 'RouteNote',
    category: 'Musik',
    desc: 'Musikdistribution mit echter Gratis-Option',
    pricing: 'Kostenlos (15% Beteiligung) oder Premium',
    url: 'https://routenote.com',
    tip: 'Ideal für Einsteiger, die ohne Fixkosten Musik auf Streamingplattformen bringen möchten.'
  },
  {
    name: 'Bandcamp / SoundCloud',
    category: 'Musik',
    desc: 'Direktverkauf von Musik, Beat-Demos & Community-Feedback',
    pricing: 'Kostenlose Accounts verfügbar',
    url: 'https://bandcamp.com',
    tip: 'Am "Bandcamp Friday" gehen 100% der Einnahmen direkt an die Künstler.'
  },
  {
    name: 'Linktree / Beacons',
    category: 'Links',
    desc: 'All-in-One Link-in-Bio Landingpages mit Store-Integration',
    pricing: 'Starke Gratisversionen',
    url: 'https://beacons.ai',
    tip: 'Beacons bietet direkt kostenlose Email-Einsammlung und digitale Produkt-Checkouts.'
  },
  {
    name: 'Google Trends',
    category: 'Analyse',
    desc: 'Suchvolumen und Trend-Themen weltweit vergleichen',
    pricing: '100% Kostenlos',
    url: 'https://trends.google.de',
    tip: 'Filtere auf "YouTube-Suche" um aufsteigende Videothemen frühzeitig zu identifizieren.'
  },
  {
    name: 'TikTok Creative Center',
    category: 'Analyse',
    desc: 'Aktuelle Trends, virale Songs, Top-Hashtags nach Region',
    pricing: 'Kostenlos von TikTok bereitgestellt',
    url: 'https://ads.tiktok.com/business/creativecenter/trends',
    tip: 'Schau wöchentlich in die Audio-Charts, um Trend-Sounds in den ersten 48 Stunden zu nutzen.'
  },
  {
    name: 'YouTube Studio',
    category: 'Analyse',
    desc: 'Echtzeit-Statistiken, CTR-Analysen und A/B Thumbnail-Tests',
    pricing: 'Integriert in jeden YouTube Account',
    url: 'https://studio.youtube.com',
    tip: 'Das Tab "Recherche" zeigt dir genau, was deine Zuschauer sonst noch suchen.'
  },
  {
    name: 'Meta Business Suite',
    category: 'Planung',
    desc: 'Kostenloses Vorplanen von Reels, Posts & Stories für IG + FB',
    pricing: 'Offiziell von Meta, kostenlos',
    url: 'https://business.facebook.com',
    tip: 'Plane deinen Content immer mindestens 3 Tage im Voraus ein, um Konsistenz zu garantieren.'
  },
  {
    name: 'Notion',
    category: 'Planung',
    desc: 'Content-Kalender, Skript-Logbuch & Ideen-Inbox',
    pricing: 'Gratis für Solo-Nutzer',
    url: 'https://www.notion.so',
    tip: 'Baue dir eine Kanban-Tafel: Idee -> Skript -> Gefilmt -> Geschnitten -> Veröffentlicht.'
  },
  {
    name: 'RapidTags',
    category: 'SEO',
    desc: 'Blitzschnell relevante YouTube & TikTok Tags generieren',
    pricing: 'Kostenloser Web-Generator',
    url: 'https://rapidtags.io',
    tip: 'Kopiere die wichtigsten 5-8 Tags direkt in deine Videobeschreibung.'
  },
  {
    name: 'TurboScribe',
    category: 'Transkript',
    desc: 'Sprache in Text umwandeln mit Whisper KI',
    pricing: 'Gratis-Kontingent (3 Dateien/Tag)',
    url: 'https://turboscribe.ai',
    tip: 'Lade Podcast- oder Video-Audios hoch, um daraus sekundenschnell Blogposts und Twitter-Threads zu bauen.'
  }
];

export const NICHES_DATA: NicheStrategy[] = [
  {
    id: 'music_producer',
    title: 'Musik-Produzent & DJ / KI-Musik',
    icon: '🎵',
    audience: 'Musikbegeisterte, DJs, Beat-Maker, Fans elektronischer & urbaner Musik, Suno-Experimentierer',
    pillars: [
      'Behind the Beat (Workflow, wie der Track entstand)',
      'Suno/KI vs. Real DAW Challenge & Re-Mastering',
      'Drop Reaction / Crowd Test Clips',
      'Sample Flipping / Bekannte Melodien neu interpretiert',
      'Release Countdown & Vorbestellungs-Aufrufe'
    ],
    contentIdeas: [
      '"Ich habe Suno gebeten einen 90er Rave Hit zu bauen, dann habe ich ihn in Ableton zerlegt..."',
      '"Wenn du diesen Beat hörst, welches Szenario siehst du vor dir?" (Hohe Kommentar-Quote)',
      'Side-by-Side: Handyaufnahme im Club vs. Master-Audio auf Spotify',
      'Tutorial: So masterst du deinen Track gratis mit BandLab in unter 3 Minuten',
      'Sound-Design Hack: Wie du aus einem Küchengeräusch eine fette Snare baust'
    ],
    monetizationWays: [
      'DistroKid / Spotify Streaming-Tantiemen (Release im 3-4 Wochen-Rhythmus)',
      'Sample- & Preset-Packs verkaufen (Gumroad / Payhip)',
      'Beat-Lizenzen an Content Creator für YouTube Hintergründe',
      'Ghost-Production & Mix/Mastering Services',
      'Live-Bookings, DJ Gigs und Event-Tickets'
    ],
    viralTags: ['#producerlife', '#beatmaking', '#djset', '#newmusicalert', '#sunomusic'],
    recommendedFormats: ['TikTok Vertikal (Drop-Fokus 12s)', 'YouTube Shorts Beat-Breakdowns', 'Spotify Canvas Loops']
  },
  {
    id: 'fitness_wellness',
    title: 'Fitness, Mindset & Ernährung',
    icon: '💪',
    audience: 'Menschen die abnehmen, Muskeln aufbauen oder mehr Energie im Alltag wollen',
    pillars: ['Schnelle Rezepte (High Protein)', 'Workout Fehler & Haltungskorrektur', 'Mindset & Disziplin Tipps', 'Vorher-Nachher & Mythen-Busting'],
    contentIdeas: [
      '"Hör auf diese 3 Übungen zu machen, wenn du Rückenschmerzen hast"',
      '"50g Protein Mahlzeit in unter 7 Minuten für 2.50€"',
      '"Der größte Fehler beim Bankdrücken, den 90% im Gym machen"',
      '"Was passiert wirklich in deinem Körper, wenn du 14 Tage auf Zucker verzichtest?"',
      'Mein täglicher 15-Minuten Mobility Flow am Morgen'
    ],
    monetizationWays: ['1-on-1 Online Coaching', 'Digitale Trainingspläne & E-Books', 'Supplement Affiliate-Links', 'Bezahlte Marken-Kooperationen'],
    viralTags: ['#fitnesstipps', '#workoutroutine', '#highprotein', '#gesunderezepte', '#gymmotivation'],
    recommendedFormats: ['Reels Splitscreen Übungs-Vergleich', 'Karussell-Rezeptkarten auf Instagram & LinkedIn']
  },
  {
    id: 'tech_coding',
    title: 'Tech, KI-Tools & Programmieren',
    icon: '💻',
    audience: 'Entwickler, Tech-Enthusiasten, Gründer, Produktivitäts-Jäger',
    pillars: ['Neue KI-Tools der Woche', 'Coding Tricks & Shortcuts', 'Projekt-Showcases (Build in Public)', 'Karriere- & Gehalts-Realität'],
    contentIdeas: [
      '"5 geheime Webseiten, die sich illegal anfühlen zu kennen"',
      '"Ich habe eine App in 2 Stunden mit Cursor & Claude gebaut"',
      '"Senior vs. Junior Developer beim Beheben dieses Bugs"',
      '"Das beste Setup unter 500€ für maximalen Fokus"',
      '"GitHub Repositories, die jeder Entwickler gespeichert haben muss"'
    ],
    monetizationWays: ['SaaS Abonnements', 'Freelancing & Dev Consulting', 'Tech-Hardware Affiliate', 'YouTube AdSense für Tech-Nischen (Hoher CPM)'],
    viralTags: ['#techtok', '#aitools', '#programmieren', '#codinglife', '#developer'],
    recommendedFormats: ['Screen-Recordings mit Facetime-Overlay', 'LinkedIn Text+PDF Guide']
  },
  {
    id: 'business_finance',
    title: 'Business, Finanzen & Sidehustles',
    icon: '📈',
    audience: 'Berufstätige, Studenten & angehende Gründer auf der Suche nach finanzieller Freiheit',
    pillars: ['Geldanlage & ETF-Wissen', 'Sidehustles ohne Startkapital', 'Psychologie des Geldes', 'Case Studies erfolgreicher Unternehmer'],
    contentIdeas: [
      '"Wenn ich heute mit 0€ starten müsste, würde ich diesen Weg wählen"',
      '"So legst du 100€ monatlich an, um mit 50 finanziell frei zu sein"',
      '"Warum 99% aller Dropshipping-Stores im ersten Monat scheitern"',
      '"3 unauffällige Anzeichen, dass du finanziell vor der Mittelschicht liegst"',
      '"Buchhaltungs-Hacks, die dir das Finanzamt nicht freiwillig erzählt"'
    ],
    monetizationWays: ['Finanz-Broker Affiliate (Scalable/Trade Republic)', 'Mastermind Community (Skool/Discord)', 'Digitale Vorlagen (Notion Finanztracker)', 'Keynotes & Vorträge'],
    viralTags: ['#finanzen', '#investieren', '#sidehustle', '#unternehmertum', '#mindset'],
    recommendedFormats: ['YouTube Longform Erklärvideos', 'Karussells mit Infografiken']
  },
  {
    id: 'art_creative',
    title: 'Kunst, Design & DIY Handwerk',
    icon: '🎨',
    audience: 'Design-Interessierte, Hobbykünstler, Heimwerker und Ästhetik-Fans',
    pillars: ['Entstehungsprozess (Timelapses)', 'Material-Tests & Vergleiche', 'Auftragsarbeiten & Reaktionen', 'Fehler & Wie ich sie gerettet habe'],
    contentIdeas: [
      '"Ein Kunde bat mich um das Unmögliche... schau was daraus wurde"',
      '"1€ vs. 50€ Farbkasten: Sieht man den Unterschied wirklich?"',
      '"Befriedigendes Abziehen von Abdeckband (ASMR Tape Peel)"',
      '"Wie du aus altem Restholz diesen Design-Tisch baust"',
      '"3 Photoshop-Tricks die deine Grafiken sofort professionell machen"'
    ],
    monetizationWays: ['Originale & Kunstdrucke verkaufen (Etsy)', 'Auftragsarbeiten & Custom Merch', 'Patreon / exklusive Tutorials', 'Werkzeug-Partnerschaften'],
    viralTags: ['#arttok', '#satisfyingart', '#diyproject', '#handmade', '#designinspiration'],
    recommendedFormats: ['Timelapse mit ASMR Sound', 'Vorher / Nachher Enthüllungs-Clip']
  },
  {
    id: 'food_cooking',
    title: 'Food, Kochen & Genuss',
    icon: '🍳',
    audience: 'Feinschmecker, Studenten, Familien, schnelle Alltags-Köche',
    pillars: ['15-Minuten Gerichte', 'Meal Prep für die ganze Woche', 'Streetfood nachkochen', 'Profi-Küchenhacks'],
    contentIdeas: [
      '"Die cremigste Pasta der Welt mit nur 4 Zutaten"',
      '"Hör auf Zwiebeln so zu schneiden! Mach es wie im Sternerestaurant"',
      '"Meal Prep für 5 Tage: 15€ Gesamtkosten & 1 Stunde Arbeit"',
      '"Was passiert wenn man diesen Snack in die Heißluftfritteuse steckt?"',
      '"Beste Knoblauchsauce deines Lebens (besser als beim Döner)"'
    ],
    monetizationWays: ['Eigenes Kochbuch (Self-Publishing via Amazon KDP)', 'Küchengeräte & Pfannen Affiliate', 'Brand Deals mit Supermärkten', 'Exklusive Rezept-Mitgliedschaft'],
    viralTags: ['#foodtok', '#schnellerezepte', '#kochenlernen', '#mealprep', '#lecker'],
    recommendedFormats: ['Dynamische Makro-Aufnahmen mit saftigem Sounddesign']
  }
];

export const HOOK_FRAMEWORKS = [
  {
    type: 'Curiosity Gap (Neugierde)',
    de: 'Die meisten machen X völlig falsch – hier ist der 1 Trick der alles ändert.',
    en: 'Most people are doing X completely wrong – here is the 1 trick that changes everything.'
  },
  {
    type: 'Negativer Hook (Verlustangst)',
    de: 'Hör sofort auf mit X, wenn du dein Ziel Y nicht zerstören willst.',
    en: 'Stop doing X immediately if you don’t want to destroy your chances of Y.'
  },
  {
    type: 'Proof & Spezifität',
    de: 'Wie ich von 0 auf 10.000 Follower in 43 Tagen gekommen bin (ohne Werbebudget):',
    en: 'How I went from 0 to 10k followers in 43 days (with zero ad spend):'
  },
  {
    type: 'Kontroverse / Tabubruch',
    de: 'Niemand in der Branche gibt es zu, aber die Wahrheit über X ist...',
    en: 'Nobody in the industry admits this, but the ugly truth about X is...'
  },
  {
    type: 'Relatable Story',
    de: 'Ich stand kurz davor alles hinzuschmeißen, bis dieser eine Moment passierte...',
    en: 'I was literally on the verge of quitting everything until this happened...'
  }
];
